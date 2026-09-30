# UORT · Estratégia de Marca, Comunicação e Crescimento

Apresentação interativa da **LOOK Assessoria de Comunicação** para a **UORT — Ortopedia & Traumatologia**.

Site estático (HTML, CSS e JavaScript puros, sem build e sem dependências), otimizado para desktop e celular.

## Recursos

- **Início** com atalhos: trilha personalizada, apresentação completa, sumário, mural e quiz
- **“O que você quer saber?”** — 2 perguntas montam uma trilha só com as lâminas de interesse
- **Apresentação** com as 61 lâminas, transições, barra de progresso por capítulo, zoom com pinça, navegação por teclado e gestos
- **Cards clicáveis** nas lâminas 12 e 18, que levam direto a cada tema
- **Sumário com busca** (sem diferenciar acentos)
- **Mural antes × depois** (lâmina 16): comparação deslizante ou lado a lado das 7 páginas
- **Áudios de exemplo da BTN** (lâmina 50): testemunhais da BandNews FM e da Jovem Pan FM
- **Televisão** (lâminas 57–60): dois cenários com mapa de inserções, comparativo e programação TV Bahia
- **Teste de conhecimentos** com link para a lâmina de cada resposta

## Como abrir no computador

Dê dois cliques em `ABRIR-APRESENTACAO.bat` (Windows). Ele inicia um servidor local em
`http://localhost:5173` e abre o navegador. Não é preciso instalar nada.

Alternativa manual:

```powershell
powershell -ExecutionPolicy Bypass -File servidor.ps1 -Porta 5173
```

## Publicar na web (Vercel)

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório.
2. **Framework Preset:** `Other` · **Build Command:** vazio · **Output Directory:** `.` (raiz).
3. Clique em *Deploy*. A cada `push` no GitHub, o site é atualizado automaticamente.

## Estrutura

```
index.html           página única (todas as telas são geradas pelo JS)
css/app.css          identidade visual, telas e responsividade
css/tv.css           visual das lâminas de Televisão (desenhadas em 1920×1080)
js/data.js           conteúdo: capítulos, títulos/resumos das lâminas, trilhas, quiz, mural e dados de TV
js/tv.js             gera as lâminas de Televisão a partir dos dados da planilha
js/app.js            navegação, trilha, sumário, zoom, mural, áudio e quiz
assets/slides/       lâminas em 1920 px (desktop)
assets/slides-m/     lâminas em 1000 px (celular)
assets/slides-t/     miniaturas
assets/mural/        páginas do mural antigo e novo
assets/audio/        exemplos de testemunhal BTN
assets/brand/        logos UORT e LOOK
servidor.ps1         servidor local em PowerShell
```

## Editar conteúdo

Textos, capítulos, perguntas do quiz, trilhas e os valores de TV ficam em `js/data.js`.

## Atalhos na apresentação

`←` `→` navegar · `S` sumário · `F` tela cheia · `Z` ampliar lâmina · `Esc` fechar
