# Servidor local da apresentação UORT (não precisa instalar nada).
# Uso:  powershell -ExecutionPolicy Bypass -File servidor.ps1 [-Porta 5173] [-NaoAbrir]
param([int]$Porta = 5173, [switch]$NaoAbrir)

$ErrorActionPreference = 'Stop'
$raiz = (Resolve-Path $PSScriptRoot).Path
$prefixo = "http://localhost:$Porta/"

$tipos = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'; '.webp' = 'image/webp'; '.ico' = 'image/x-icon'; '.mp3' = 'audio/mpeg'; '.txt' = 'text/plain; charset=utf-8'
}

$servidor = New-Object System.Net.HttpListener
$servidor.Prefixes.Add($prefixo)
try { $servidor.Start() } catch {
  Write-Host "Não foi possível usar a porta $Porta (talvez já esteja em uso). Tente: servidor.ps1 -Porta 5174" -ForegroundColor Red
  exit 1
}

Write-Host ''
Write-Host '  UORT · Apresentação interativa' -ForegroundColor Cyan
Write-Host "  Rodando em $prefixo" -ForegroundColor Green
Write-Host '  Deixe esta janela aberta durante a apresentação. Ctrl+C para encerrar.'
Write-Host ''
if (-not $NaoAbrir) { Start-Process $prefixo }

function Responder($ctx) {
  $req = $ctx.Request; $res = $ctx.Response
  try {
    $caminho = [Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
    if ($caminho -eq '') { $caminho = 'index.html' }
    $arquivo = [IO.Path]::GetFullPath((Join-Path $raiz $caminho))
    if (-not $arquivo.StartsWith($raiz, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $arquivo -PathType Leaf)) {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes('404 - arquivo não encontrado')
      $res.OutputStream.Write($b, 0, $b.Length); return
    }
    $ext = [IO.Path]::GetExtension($arquivo).ToLower()
    $res.ContentType = if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { 'application/octet-stream' }
    # sem cache: ao trocar ou renumerar lâminas, o navegador sempre mostra a versão atual
    $res.Headers['Cache-Control'] = 'no-cache'
    $res.Headers['Accept-Ranges'] = 'bytes'
    $fs = [IO.File]::OpenRead($arquivo)
    try {
      $total = $fs.Length; $ini = 0; $fim = $total - 1
      $range = $req.Headers['Range']
      if ($range -and $range -match 'bytes=(\d*)-(\d*)') {
        if ($matches[1]) { $ini = [long]$matches[1] }
        if ($matches[2]) { $fim = [Math]::Min([long]$matches[2], $total - 1) }
        if (-not $matches[1] -and $matches[2]) { $ini = $total - [long]$matches[2]; $fim = $total - 1 }
        $res.StatusCode = 206
        $res.Headers['Content-Range'] = "bytes $ini-$fim/$total"
      }
      $len = $fim - $ini + 1
      $res.ContentLength64 = $len
      if ($req.HttpMethod -ne 'HEAD') {
        $fs.Position = $ini
        $buf = New-Object byte[] 65536; $falta = $len
        while ($falta -gt 0) {
          $n = $fs.Read($buf, 0, [int][Math]::Min($buf.Length, $falta)); if ($n -le 0) { break }
          $res.OutputStream.Write($buf, 0, $n); $falta -= $n
        }
      }
    } finally { $fs.Dispose() }
  } catch {
    # conexão encerrada pelo navegador (normal ao trocar de áudio/imagem)
  } finally {
    try { $res.OutputStream.Close() } catch {}
  }
}

try {
  while ($servidor.IsListening) {
    $tarefa = $servidor.GetContextAsync()
    while (-not $tarefa.AsyncWaitHandle.WaitOne(300)) { }
    Responder $tarefa.GetAwaiter().GetResult()
  }
} finally {
  $servidor.Stop(); $servidor.Close()
}
