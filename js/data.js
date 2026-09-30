/* Conteúdo da apresentação UORT × LOOK
   Cada lâmina: t = título, d = resumo (usado no celular, na busca e como texto alternativo),
   k = palavras-chave extras para a busca, key = lâmina essencial (trilha rápida). */

window.DECK = {
  total: 64,
  minutesPerSlide: 0.3,

  chapters: [
    { id: 'abertura',      n: '00', title: 'Abertura',                  from: 1,  to: 1,  cover: 1,  desc: 'Estratégia de marca, comunicação e crescimento.' },
    { id: 'contexto',      n: '01', title: 'Contexto & Diagnóstico',    from: 2,  to: 7,  cover: 4,  desc: 'O cenário atual da UORT, os desafios da operação e os objetivos estratégicos.' },
    { id: 'posicionamento',n: '02', title: 'Posicionamento & Conceito', from: 8,  to: 12, cover: 11, desc: 'Uma narrativa única em torno do movimento e do cuidado ortopédico completo.' },
    { id: 'identidade',    n: '03', title: 'Nova Identidade Visual',    from: 13, to: 16, cover: 14, desc: 'Feed, papelaria, materiais digitais e o novo mural UORT.' },
    { id: 'marketing',     n: '04', title: 'Ações de Marketing',        from: 17, to: 43, cover: 19, desc: 'Campanhas, Onde dói?, Análise de Movimento, Comunidade, B2B e Google.' },
    { id: 'conteudo',      n: '05', title: 'Planejamento de Conteúdo',  from: 44, to: 46, cover: 45, desc: 'O calendário editorial de outubro, semana a semana.' },
    { id: 'online',        n: '06', title: 'Mídia Online',              from: 47, to: 49, cover: 48, desc: 'Google Ads, Meta Ads e o modelo de página de especialidade.' },
    { id: 'offline',       n: '07', title: 'Mídia Offline',             from: 50, to: 57, cover: 55, desc: 'Elevadores, BTN no rádio, painéis de LED e cenários de investimento.' },
    { id: 'tv',            n: '08', title: 'Televisão',                 from: 58, to: 63, cover: 59, desc: 'TV Bahia e TV Record: quatro cenários — inserções e merchandising — e o comparativo entre eles.' },
    { id: 'contato',       n: '—',  title: 'Contato',                   from: 64, to: 64, cover: 64, desc: 'LOOK Assessoria de Comunicação.' }
  ],

  slides: {
    1:  { t: 'Estratégia de marca, comunicação e crescimento', d: 'Uma nova forma de apresentar a estrutura, os especialistas e as possibilidades de cuidado da UORT.', key: true, k: 'capa abertura uort look' },
    2:  { t: 'Contexto & Diagnóstico', d: 'O cenário atual da UORT, os desafios da operação e os objetivos estratégicos.', divider: true },
    3:  { t: 'A UORT reúne em uma mesma estrutura', d: 'Subespecialidades da ortopedia, pronto atendimento, consultas ambulatoriais, infiltrações e bloqueios, PRP, fisioterapia e reabilitação. O desafio agora é fazer tudo isso ser percebido como parte de uma única marca.', key: true, k: 'serviços estrutura prp fisioterapia' },
    4:  { t: 'O que a UORT é × o que o público percebe', d: 'A UORT tem estrutura ampla, corpo clínico especializado e serviços que vão além da consulta. A comunicação ainda mostra presença pouco organizada, percepção limitada da marca e baixa tradução da real dimensão da estrutura.', key: true, k: 'percepção diagnóstico' },
    5:  { t: 'A UORT é a marca. Os especialistas são a prova.', d: 'Cada especialista ajuda a demonstrar a força da instituição e pode ser uma porta de entrada para a UORT — que também precisa agregar valor à presença do médico.', k: 'médicos corpo clínico' },
    6:  { t: 'O desafio não é apenas de comunicação', d: 'Existe uma necessidade concreta de ocupação e geração de demanda: o Pronto Atendimento tem capacidade instalada muito superior ao volume atual. O crescimento precisa vir em duas direções — demanda individual e volume contratado.', key: true, k: 'demanda convênios parcerias pronto atendimento' },
    7:  { t: 'Prioridades do marketing', d: '01 Pronto Atendimento · 02 Gerar novos pacientes · 03 Fortalecer a marca UORT · 04 Divulgar procedimentos e tratamentos. O Pronto Atendimento é o serviço que mais precisa ganhar visibilidade neste momento.', key: true, k: 'objetivos metas pronto atendimento' },
    8:  { t: 'Posicionamento & Conceito', d: 'A construção de uma narrativa única em torno do movimento e do cuidado ortopédico completo.', divider: true },
    9:  { t: 'O que precisamos aprimorar', d: 'Marca: fortalecer a UORT como instituição. Paciente: facilitar descoberta e acesso. Relacionamento: criar audiência própria. Mercado: aproximar empresas, operadoras, médicos e parceiros.', k: 'marca paciente relacionamento mercado' },
    10: { t: 'Posicionamento: cuidado ortopédico completo e especializado', d: 'Da urgência ao diagnóstico, do tratamento à recuperação, da consulta ao acompanhamento especializado — diferentes soluções e especialistas dentro da mesma instituição.', key: true, k: 'posicionamento' },
    11: { t: 'Movimento é o conceito', d: 'Ortopedia é a especialidade. Movimento é o que o paciente deseja recuperar: caminhar, trabalhar, praticar esporte, brincar e retomar a rotina.', key: true, k: 'conceito movimento narrativa' },
    12: { t: 'O que iremos fazer', d: 'Criar nova identidade visual, ações de marketing, planejamento de conteúdo, investimento em mídia online e em mídia offline. Toque em um card para ir direto ao tema.', key: true, k: 'escopo entregas' },
    13: { t: 'Nova identidade visual', d: 'Abertura do capítulo de identidade visual.', divider: true },
    14: { t: 'Preview do feed UORT', d: 'Conceitos de conteúdo para redes sociais — informação, educação, especialistas, qualidade de vida e confiança: “Seu ombro dói para levantar o braço?”, “Especialistas em movimento”, “Começou a correr?”, “Atendimento com hora marcada”, “Seu joelho dói ao subir escadas?”, “Pequenos avanços, grandes conquistas” e “Como podemos ajudar?”.', key: true, k: 'instagram redes sociais posts' },
    15: { t: 'Materiais institucionais', d: 'Papelaria e apresentação da marca: cartões de visita, envelope, pasta, papel timbrado e cartão de marcação de consultas.', k: 'papelaria cartão' },
    16: { t: 'Materiais digitais', d: 'Presença digital e pontos de contato: site responsivo e o novo mural UORT. Compare o mural antigo com o novo.', key: true, k: 'site mural digital' },
    17: { t: 'Ações de Marketing', d: 'Abertura do capítulo de ações de marketing.', divider: true },
    18: { t: 'Da estratégia à execução: o plano de entregas', d: 'Campanha de Fortalecimento de Marca, Ferramentas Digitais, Comunidade & Retenção, Materiais B2B e Google Business Profile. Toque em um card para ir direto ao tema.', key: true, k: 'plano de ação entregas' },
    19: { t: 'Campanha: “Caiu? Machucou? Quebrou?”', d: 'Antes eram três letras. Agora, lembre de quatro: UORT. A campanha parte de uma situação real do paciente — lesão, queda ou dor inesperada — em que a busca por atendimento ortopédico precisa ser rápida. A provocação resgata uma associação da memória da cidade e apresenta a UORT como referência atual. Aplicações em outdoor, digital e rádio.', key: true, k: 'campanha fortalecimento de marca conceito três letras' },
    20: { t: '“Caiu? Machucou? Quebrou?” no outdoor e no digital', d: 'Aplicações da Campanha de Fortalecimento de Marca no outdoor e no Instagram: “Antes eram três letras. Agora, lembre de quatro: UORT.” Ortopedia, traumatologia e pronto atendimento para você.', key: true, k: 'campanha fortalecimento de marca outdoor instagram digital aplicações' },
    21: { t: '“Caiu? Machucou? Quebrou?” no rádio e no digital', d: 'Mesmo conceito, diferentes canais: spot de rádio e desdobramento digital, com peças para redes sociais, streaming e plataformas de áudio.', k: 'campanha fortalecimento de marca rádio áudio spot streaming redes sociais' },
    22: { t: 'Campanha: “Salvador lembra de quatro letras”', d: '“Quando o assunto é ortopedia, Salvador lembra de quatro letras: UORT.” Uma provocação elegante para reforçar a lembrança de marca: a campanha parte de uma memória presente no dia a dia dos soteropolitanos e reposiciona a UORT como a referência em ortopedia na cidade, destacando especialidade, estrutura e atendimento completo.', k: 'campanha institucional fortalecimento de marca salvador conceito três letras' },
    23: { t: '“Salvador lembra de quatro letras” no digital', d: 'A mensagem ganha força também no ambiente digital: feed e stories no Instagram com o mesmo impacto, clareza e memorabilidade — “Especialistas, estrutura e atendimento ortopédico completo em Salvador.”', k: 'campanha institucional salvador instagram feed stories digital' },
    24: { t: '“Salvador lembra de quatro letras” no outdoor', d: '“Quando o assunto é ortopedia, Salvador se lembrava de três letras. Agora, são quatro: UORT.” Painel de alta visibilidade para reforçar a lembrança de marca em Salvador: presença nos principais pontos da cidade para impactar o público no dia a dia e fortalecer o recall da UORT como referência em ortopedia e traumatologia.', k: 'campanha institucional salvador outdoor painel' },
    25: { t: 'Campanha: “Quebrou o braço? Torceu o joelho?”', d: 'Campanha de transição, a mais comercial: conecta diretamente com as buscas do paciente, funciona muito bem para mídia de performance e alcança públicos que ainda não conhecem a marca. “Salvador tem uma referência em quatro letras: UORT.” Aplicações em outdoor, digital e rádio.', key: true, k: 'campanha transição fortalecimento de marca performance busca spot rádio' },
    26: { t: '“Quebrou o braço? Torceu o joelho?” no digital e no outdoor', d: 'Anúncio de performance no digital e mídia exterior com a mesma mensagem: pronto atendimento ortopédico em Salvador, sem agendamento, no Caminho das Árvores e com equipe de especialistas. A mesma mensagem, mais alcance para a marca.', k: 'campanha transição anúncio performance outdoor digital pronto atendimento' },
    27: { t: 'Campanha: “Agora, guarde quatro: UORT”', d: 'Durante anos, três letras vieram à cabeça quando alguém falava em ortopedia. Agora, guarde quatro: UORT. A campanha conversa com quem viveu a história da cidade, reforçando que a UORT já existia — uma clínica que já faz parte de Salvador e está pronta para um novo momento da ortopedia.', k: 'campanha fortalecimento de marca salvador história conceito' },
    28: { t: '“Agora, guarde quatro: UORT” no digital', d: 'Carrossel de revelação para o Instagram, em quatro telas: “Durante anos, três letras vieram à cabeça…”, “…quando alguém falava em ortopedia.”, “Agora, guarde quatro: UORT.” e “A mesma confiança. Uma nova fase para você.”', k: 'campanha carrossel instagram digital revelação salvador' },
    29: { t: 'Campanha: “Tempos de mudança: UORT”', d: 'Uma nova fase, a mesma excelência em ortopedia e traumatologia para Salvador. “Tempos de mudança: UORT. Quando o assunto é ortopedia e traumatologia.” e “Não fique desassistido — UORT, a sua nova referência em Ortopedia.” A campanha comunica a transição de forma clara, positiva e acolhedora, transmitindo confiança, continuidade e a UORT como a nova referência na cidade.', k: 'campanha transição fortalecimento de marca tempos de mudança não fique desassistido conceito salvador' },
    30: { t: '“Tempos de mudança: UORT” na mídia de elevador', d: 'Mídia de elevador e TV: alta frequência e visibilidade em ambientes de grande circulação. A presença da marca em elevadores, recepções e áreas de convivência repete a mensagem em momentos estratégicos do dia a dia, ampliando o reconhecimento e reforçando o posicionamento da UORT. A foto da clínica no primeiro criativo é simulada e será ajustada.', k: 'campanha transição elevador tv mídia indoor recepção' },
    31: { t: '“Tempos de mudança: UORT” no digital', d: 'A campanha se adapta a diferentes ambientes digitais: feed, stories e displays com a mesma mensagem, garantindo consistência, alta visibilidade e impacto no dia a dia do público.', k: 'campanha transição instagram feed stories display banner digital' },
    32: { t: 'Jornada “Onde dói?”', d: 'O paciente nem sempre sabe qual especialidade procurar, mas sabe responder onde dói: ombro, joelho, coluna, quadril, mão, pé e tornozelo.', key: true, k: 'onde dói ferramenta digital corpo' },
    33: { t: '“Onde dói?” será mais do que uma página', d: 'Uma porta de entrada digital dentro do site da UORT: entender a região, encontrar especialistas, conhecer tratamentos, fazer uma análise de movimento e agendar uma avaliação.', key: true, k: 'site jornada' },
    34: { t: 'Análise de Movimento UORT', d: 'Ferramenta que usa a câmera do próprio celular para observar movimentos funcionais — inicialmente ombro, joelho e coluna. Sem equipamento adicional e sem aplicativo para instalar.', key: true, k: 'tecnologia câmera celular análise' },
    35: { t: 'Como funciona a Análise de Movimento', d: '01 Escolha a região · 02 Posicione o celular · 03 Siga os movimentos orientados na tela · 04 Receba a análise. Uma experiência simples, feita pelo próprio usuário.', key: true, k: 'passo a passo' },
    36: { t: 'O que a análise observa', d: 'Amplitude do movimento, diferenças entre os lados, possíveis compensações, consistência entre repetições, velocidade e dor relatada — com resultado visual e fácil de compreender.' },
    37: { t: 'A ferramenta não tenta dar um diagnóstico', d: 'Ela não diz qual lesão a pessoa possui: registra características funcionais do movimento, como informação complementar a uma avaliação profissional ou para acompanhamento ao longo do tempo.', key: true, k: 'diagnóstico lesão' },
    38: { t: 'Da análise para o cuidado', d: 'Depois do resultado, o usuário pode conhecer especialistas, entender melhor os resultados, ver tratamentos relacionados e agendar uma avaliação — sem substituir a avaliação médica.' },
    39: { t: 'Comunidade UORT', d: 'Um grupo exclusivo no WhatsApp para aproximar a UORT das pessoas que querem cuidar melhor do movimento — construindo uma audiência própria para um relacionamento contínuo.', key: true, k: 'whatsapp grupo comunidade retenção' },
    40: { t: 'O que a comunidade recebe', d: 'Linha editorial (educação, autoridade médica, rotina e prevenção, serviços), formatos leves (texto, imagem, vídeo, áudio, enquete, PDF) e cadência semanal: terça, quinta e sábado.', key: true, k: 'whatsapp conteúdo cadência' },
    41: { t: 'Como a comunidade ativa relacionamento', d: 'Entrada → boas-vindas → conteúdo semanal → interação → relacionamento contínuo. Com lives mensais e materiais exclusivos, como guia do joelho e checklist de atividade física.', k: 'whatsapp lives materiais' },
    42: { t: 'Materiais B2B', d: 'Materiais para empresas, saúde ocupacional e apresentações comerciais: a publicidade atrai o indivíduo; o B2B aproxima empresas e amplia oportunidades de volume.', key: true, k: 'empresas rh saúde ocupacional convênios' },
    43: { t: 'Google Business Profile', d: 'O paciente de trauma não pesquisa em redes: ele decide em minutos pelo celular. Como funciona: 01 o paciente pesquisa no Google (“ortopedista perto de mim”, “pronto atendimento ortopédico”) · 02 a unidade aparece com fotos, avaliação, horário e endereço · 03 ele decide e entra em contato. O perfil coloca a UORT na frente de quem já está pronto para ser atendido.', key: true, k: 'google maps busca perfil local pronto atendimento' },
    44: { t: 'Planejamento de Conteúdo', d: 'Abertura do capítulo de planejamento de conteúdo.', divider: true },
    45: { t: 'Outubro · Semanas 1 e 2', d: 'Semana 1: consciência e identificação — ombro, especialistas em movimento e Pronto Atendimento Ortopédico (8h às 19h, sem agendamento). Semana 2: dor no dia a dia e qualidade de vida — joelho, Campanha de Fortalecimento de Marca e “Caiu? Machucou? Quebrou?”.', key: true, k: 'calendário editorial outubro posts' },
    46: { t: 'Outubro · Semanas 3 e 4', d: 'Semana 3: coluna, rotina e orientação — coluna, bastidores do atendimento, dor nas costas e quando procurar o Pronto Atendimento. Semana 4: movimento em todas as fases da vida — Campanha de Fortalecimento de Marca, como podemos ajudar, tour pelo Pronto Atendimento UORT e a UORT no Caminho das Árvores.', k: 'calendário editorial outubro posts' },
    47: { t: 'Mídia Online', d: 'Abertura do capítulo de mídia online.', divider: true },
    48: { t: 'Mídia Online: Google Ads + Meta Ads', d: 'Google Ads: R$ 5.000/mês para captar pacientes com intenção de busca. Meta Ads: R$ 2.500/mês para fortalecer a marca e alcançar novos públicos. Investimento total: R$ 7.500/mês.', key: true, k: 'investimento verba orçamento preço valor anúncios' },
    49: { t: 'Página de especialidade: Especialistas em Joelho', d: 'Modelo de landing page para as campanhas, mostrado como uma página de verdade: chamada principal com agendamento e WhatsApp; “Conviver com a dor virou rotina… mas não deveria”; como podemos ajudar (dor no joelho, lesão ligamentar, menisco e artrose); e o especialista — atendimento humanizado, membro da SBOT e tratamentos baseados em evidências.', html: 'page', key: true, k: 'landing page site joelho dor tratamentos menisco artrose lca especialista sbot',
      page: { src: 'assets/pages/lp-joelho.webp', w: 889, h: 2000, url: 'uort.com.br/especialidades/joelho',
        sections: [
          { y: 0,    t: 'Especialistas em Joelho',          d: 'Chamada principal, agendamento e WhatsApp' },
          { y: 500,  t: 'Conviver com a dor virou rotina',  d: 'O paciente se reconhece nos sintomas' },
          { y: 1000, t: 'Como podemos ajudar',              d: 'Dor, lesão ligamentar, menisco e artrose' },
          { y: 1500, t: 'Cuidado ortopédico com propósito', d: 'O especialista e o agendamento' }
        ] } },
    50: { t: 'Mídia Offline', d: 'Abertura do capítulo de mídia offline.', divider: true },
    51: { t: 'Estratégia de mídia offline', d: 'A UORT já tem mídia de elevadores contratada até dezembro. Os novos investimentos complementam essa presença: BTN nos deslocamentos e LED nas principais vias. Casa → deslocamento → cidade.', key: true, k: 'elevadores btn led estratégia' },
    52: { t: 'O que é a BTN?', d: 'Testemunhais de 10 segundos inseridos nos boletins de trânsito de diferentes rádios: A Tarde FM, BandNews, CBN, GFM, Jovem Pan e Nova Brasil. Ouça dois exemplos do formato.', key: true, k: 'rádio áudio testemunhal boletim trânsito bandnews jovem pan exemplo ouvir' },
    53: { t: 'Cenário 01 · R$ 5 mil', d: 'BTN para ampliar a frequência da UORT nos deslocamentos: 6 emissoras, 40+ inserções mínimas, testemunhal de 10”, 15 a 20 dias. Investimento: R$ 5.363,60.', key: true, k: 'investimento verba rádio btn preço valor' },
    54: { t: 'Cenário 02 · R$ 10 mil', d: 'BTN + 3 painéis de LED: R$ 5.363,60 + R$ 5.000,00, com 15 dias de LED em looping de 1min20s. Investimento: R$ 10.363,60.', key: true, k: 'investimento verba led preço valor' },
    55: { t: '03 painéis de LED em eixos de alto fluxo', d: 'Av. Luís Viana Filho (1.805.400 visualizações/mês), Av. Magalhães Neto (2.249.370) e Rio Vermelho/Juracy (2.437.710). 15 dias de veiculação, investimento conjunto de R$ 5.000,00.', k: 'led outdoor painel paralela' },
    56: { t: 'Por que estes 03 pontos?', d: 'A seleção combina circulação, retenção de veículos e presença em regiões estratégicas — para a UORT aparecer repetidamente em trajetos relevantes da cidade.', k: 'led pontos' },
    57: { t: 'Dois caminhos de investimento', d: 'Cenário 5K: BTN (6 rádios, 40+ inserções). Cenário 10K: BTN + 3 LEDs (15 dias, 3 eixos). Elevadores + BTN + LED = mais momentos de contato com a UORT.', key: true, k: 'investimento verba cenários preço valor' },
    58: { t: 'Televisão', d: 'Abertura da frente de televisão.', divider: true, k: 'tv' },
    59: { t: 'Cenário TV 01 · R$ 24.680,03', d: '9 inserções de 15” entre 11 e 16 de outubro. Produção e envio R$ 3.857,00 · TV Bahia R$ 20.823,03 · total bruto R$ 24.680,03.', html: 'tvCenario', scenario: 0, key: true, k: 'tv televisão investimento verba preço valor inserções' },
    60: { t: 'Cenário TV 02 · R$ 34.751,70', d: '14 inserções de 15” entre 11 e 23 de outubro. Produção e envio R$ 3.857,00 · TV Bahia R$ 30.894,70 · total bruto R$ 34.751,70.', html: 'tvCenario', scenario: 1, key: true, k: 'tv televisão investimento verba preço valor inserções' },
    61: { t: 'Cenário TV 03 · TV Record · R$ 21.289,02', d: '15 inserções de 30” na TV Record entre 12 e 22 de outubro, em 4 programas: Fala Brasil (5), Balanço Geral (3), Cidade Alerta (4) e Jornal da Record (3), com 86% de desconto sobre a tabela. Produção VT 30” R$ 4.000,00 · TV Record R$ 17.289,02 · total bruto R$ 21.289,02.', html: 'tvCenario', scenario: 2, key: true, k: 'tv televisão record investimento verba preço valor inserções fala brasil balanço geral cidade alerta jornal da record' },
    62: { t: 'Cenário TV 04 · Merchandising · R$ 20.294,15', d: '4 ações de merchandising de 60” na TV Record entre 13 e 22 de outubro: Balanço Geral (13 e 22/out) R$ 10.309,95 e Cidade Alerta (15 e 20/out) R$ 7.984,20, com 80% de desconto sobre a tabela. Cachê dos apresentadores R$ 2.000,00 · TV Record R$ 18.294,15 · total + cachê R$ 20.294,15.', html: 'tvCenario', scenario: 3, k: 'tv televisão record merchan merchandising apresentadores cachê balanço geral cidade alerta investimento' },
    63: { t: 'Quatro caminhos na TV', d: 'Comparativo dos 4 cenários de TV: Cenário 01 (TV Bahia) — 9 inserções de 15”, total bruto R$ 24.680,03 · Cenário 02 (TV Bahia) — 14 inserções de 15”, R$ 34.751,70 · Cenário 03 (TV Record) — 15 inserções de 30”, R$ 21.289,02 · Cenário 04 (merchandising na TV Record) — 4 ações de 60”, R$ 20.294,15.', html: 'tvComparativo', key: true, k: 'tv televisão cenários comparação comparativo investimento bahia record merchandising' },
    64: { t: 'Fale com a LOOK', d: 'Um olhar diferente. 71 99154-9332 · lookassessoria.com.br · contato@lookassessoria.com.br · @lookassessoria · Av. Juracy Magalhães Júnior, 300, Rio Vermelho, Salvador.', img: 59, key: true, k: 'contato telefone whatsapp email' }
  },

  /* Televisão — guia "TVBA" das planilhas PLANO DE MÍDIA UORT (Cenário 01 = arquivo V2, Cenário 02 = arquivo original) */
  tv: {
    station: 'TV Bahia',
    format: '15”',
    obs: ['Valores sujeitos a alteração com mudança de tabela.', 'Mídia sujeita a disponibilidade de espaço no ato da compra.'],
    programs: [
      { code: 'BPRA', name: 'Jornal da Manhã', time: '06:00', icon: 'sunrise', tab: 2190,   desc: 45, neg: 1204.5 },
      { code: 'PTV1', name: 'Bahia Meio Dia',  time: '',      icon: 'news',    tab: 3682.5, desc: 40, neg: 2209.5 },
      { code: 'GESP', name: 'Globo Esporte',   time: '',      icon: 'ball',    tab: 6645,   desc: 45, neg: 3654.75 },
      { code: 'VALE', name: 'Vale a Pena Ver de Novo', time: '', icon: 'tv',   tab: 3554.5, desc: 40, neg: 2132.7 },
      { code: 'STQ1', name: 'Chef Alto Nível', time: '',      icon: 'chef',    tab: 7325.5, desc: 30, neg: 5127.85 },
      { code: 'PANB', name: 'Panela de Bairro', time: '',     icon: 'pan',     tab: 3409.5, desc: 45, neg: 1875.225 }
    ],
    scenarios: [
      { label: 'Cenário TV 01', period: '11 a 16/out', periodLong: 'entre 11 e 16 de outubro',
        days: { BPRA: [11, 13, 15], PTV1: [12, 14], GESP: [13], VALE: [14], STQ1: [12], PANB: [16] },
        total: 20823.025, liquido: 16658.42, producao: 3857, bruto: 24680.025 },
      { label: 'Cenário TV 02', period: '11 a 23/out', periodLong: 'entre 11 e 23 de outubro',
        days: { BPRA: [11, 15, 18, 20, 22], PTV1: [12, 19], GESP: [13, 20], VALE: [14, 21], STQ1: [12], PANB: [16, 23] },
        total: 30894.7, liquido: 24715.76, producao: 3857, bruto: 34751.7 },

      /* Cenários 03 e 04 — TV Record (PLANO DE MÍDIA UORT - OUTUBRO 2026.xlsx: guias "RECORD" e "MERCHAN RECORD").
         Cenários com emissora própria trazem station/format/programs; days usa a chave "key" de cada programa. */
      { label: 'Cenário TV 03', station: 'TV Record', format: '30”', period: '12 a 22/out', periodLong: 'entre 12 e 22 de outubro',
        programs: [
          { key: 'FBR', name: 'Fala Brasil',      icon: 'sunrise', tab: 5032,  desc: 86, neg: 704.48 },
          { key: 'BGE', name: 'Balanço Geral',    icon: 'news',    tab: 9819,  desc: 86, neg: 1374.66 },
          { key: 'CAL', name: 'Cidade Alerta',    icon: 'news',    tab: 7604,  desc: 86, neg: 1064.56 },
          { key: 'JRE', name: 'Jornal da Record', icon: 'tv',      tab: 12820, desc: 86, neg: 1794.8 }
        ],
        days: { FBR: [12, 14, 16, 20, 22], BGE: [13, 15, 21], CAL: [12, 14, 20, 22], JRE: [13, 15, 19] },
        total: 17289.02, costs: [['Produção VT 30”', 4000], ['TV Record', 17289.02]], bruto: 21289.02 },
      { label: 'Cenário TV 04', tag: 'Merchandising', merchan: true, station: 'TV Record', format: '60”', period: '13 a 22/out', periodLong: 'entre 13 e 22 de outubro',
        programs: [
          { key: 'MBG', name: 'Balanço Geral', icon: 'news', tab: 51549.76, desc: 80, neg: 10309.952, total: 10309.952 },
          { key: 'MCA', name: 'Cidade Alerta', icon: 'news', tab: 39921,    desc: 80, neg: 7984.2,    total: 7984.2 }
        ],
        days: { MBG: [13, 22], MCA: [15, 20] },
        total: 18294.152, costs: [['Cachê apresentadores', 2000], ['TV Record', 18294.152]], bruto: 20294.152, brutoLabel: 'Total + cachê' }
    ]
  },

  /* Áreas clicáveis dentro das lâminas (em % da lâmina) */
  links: {
    12: [
      { x: 6.5,  y: 36, w: 16, h: 39.6, to: 13, label: 'Nova identidade visual' },
      { x: 24.1, y: 36, w: 16, h: 39.6, to: 17, label: 'Ações de marketing' },
      { x: 41.7, y: 36, w: 16, h: 39.6, to: 44, label: 'Planejamento de conteúdo' },
      { x: 59.3, y: 36, w: 16.2, h: 39.6, to: 47, label: 'Mídia online' },
      { x: 77.1, y: 36, w: 16.2, h: 39.6, to: 50, label: 'Mídia offline' }
    ],
    18: [
      { x: 3.8,  y: 40.2, w: 18, h: 46.6, to: 19, label: 'Campanha de marca' },
      { x: 22.5, y: 40.2, w: 17.9, h: 46.6, to: 32, label: 'Ferramentas digitais' },
      { x: 41.1, y: 40.2, w: 17.9, h: 46.6, to: 39, label: 'Comunidade & retenção' },
      { x: 59.7, y: 40.2, w: 17.9, h: 46.6, to: 42, label: 'Materiais B2B' },
      { x: 78.3, y: 40.2, w: 17.9, h: 46.6, to: 43, label: 'Google Business Profile' }
    ]
  },

  /* Observações discretas: ícone de atenção sobre a lâmina que mostra o texto ao clicar (posição em % da lâmina) */
  notes: {
    30: [{ x: 26.2, y: 66.8, text: 'Imagem simulada — a foto da clínica será ajustada.' }]
  },

  /* Recursos extras por lâmina */
  extras: {
    16: { type: 'mural' },
    32: { type: 'tool' },
    33: { type: 'tool' },
    34: { type: 'tool' },
    35: { type: 'tool' },
    36: { type: 'tool' },
    37: { type: 'tool' },
    38: { type: 'tool' },
    52: { type: 'audio' },
    53: { type: 'audio', short: true },
    59: { type: 'tvmap', scenario: 0 },
    60: { type: 'tvmap', scenario: 1 },
    61: { type: 'tvmap', scenario: 2 },
    62: { type: 'tvmap', scenario: 3 },
    64: { type: 'contact' }
  },

  /* Ferramenta de análise funcional (botão nas lâminas "Onde dói?" e Análise de Movimento) */
  tool: { url: 'https://moveo-omega.vercel.app/', title: 'Análise de Movimento UORT', label: 'Abrir a ferramenta de análise funcional' },

  audios: [
    { id: 'bandnews', src: 'assets/audio/bandnews-exemplo.mp3', radio: 'BandNews FM', seed: 7 },
    { id: 'jovempan', src: 'assets/audio/jovempan-exemplo.mp3', radio: 'Jovem Pan FM', seed: 3 }
  ],

  /* Trilha guiada */
  focus: [
    { id: 'cenario',  icon: 'chart',     title: 'Entender o cenário',        desc: 'Onde a UORT está hoje e o que precisa mudar', topics: ['diag', 'conceito'] },
    { id: 'marca',    icon: 'pen',       title: 'Ver a nova marca',          desc: 'Conceito, identidade visual e materiais', topics: ['conceito', 'identidade'] },
    { id: 'acoes',    icon: 'megaphone', title: 'Conhecer as ações',         desc: 'Campanhas, ferramentas digitais e comunidade', topics: ['campanhas', 'ondedoi', 'analise', 'comunidade'] },
    { id: 'midia',    icon: 'coins',     title: 'Falar de mídia e verba',    desc: 'Online, offline, rádio, LED, TV e cenários', topics: ['online', 'offline', 'tv'] }
  ],

  topics: [
    { id: 'diag',       label: 'Diagnóstico e desafios',        from: 2,  to: 7,  key: [3, 4, 6, 7] },
    { id: 'conceito',   label: 'Posicionamento e conceito',     from: 9,  to: 12, key: [10, 11, 12] },
    { id: 'identidade', label: 'Nova identidade visual',        from: 14, to: 16, key: [14, 16] },
    { id: 'campanhas',  label: 'Campanhas de marca',            from: 18, to: 31, key: [18, 19, 20, 25] },
    { id: 'ondedoi',    label: 'Jornada “Onde dói?”',           from: 32, to: 33, key: [32, 33] },
    { id: 'analise',    label: 'Análise de Movimento',          from: 34, to: 38, key: [34, 35, 37] },
    { id: 'comunidade', label: 'Comunidade no WhatsApp',        from: 39, to: 41, key: [39, 40] },
    { id: 'b2b',        label: 'B2B e Google Business Profile', from: 42, to: 43, key: [42, 43] },
    { id: 'conteudo',   label: 'Conteúdo de outubro',           from: 45, to: 46, key: [45] },
    { id: 'online',     label: 'Mídia online',                  from: 48, to: 49, key: [48, 49] },
    { id: 'offline',    label: 'Mídia offline, rádio e LED',    from: 51, to: 57, key: [51, 52, 53, 54, 57] },
    { id: 'tv',         label: 'Televisão (TV Bahia e Record)', from: 59, to: 63, key: [61, 63] }
  ],

  faq: [
    { q: 'Qual é o novo conceito da marca?', to: 11 },
    { q: 'Como funciona a Análise de Movimento?', to: 34 },
    { q: 'O que é a jornada “Onde dói?”', to: 32 },
    { q: 'Quanto será investido em mídia online?', to: 48 },
    { q: 'O que é a BTN? (ouça os áudios)', to: 52 },
    { q: 'Quais são os cenários de mídia offline?', to: 57 },
    { q: 'Como ficam os cenários de TV?', to: 63 },
    { q: 'Como será a Comunidade no WhatsApp?', to: 39 },
    { q: 'Como fica o conteúdo de outubro?', to: 45 }
  ],

  /* Mural: antigo × novo (páginas pareadas) */
  mural: [
    { title: 'Fisioterapia em Foco',   tag: '08.09', note: 'A faixa de cor com texto corrido dá lugar a fotografia real, título com hierarquia clara e a frase-assinatura “Cuidar é o nosso movimento” em destaque.' },
    { title: 'Enfermagem em Foco',     tag: '17.09', note: 'A mesma mensagem ganha foto da equipe, título em duas cores e a citação “Segurança também é uma forma de cuidar.” como fechamento.' },
    { title: 'Aniversariantes',        tag: 'Setembro', note: 'A lista vira uma grade de celebração, com fotos maiores, clima festivo e o “Parabéns a todos!” como assinatura.' },
    { title: 'Datas que Inspiram',     tag: 'Setembro', note: 'A lista de datas vira uma linha do tempo com ícones — e o Dia do Ortopedista (19/09) ganha destaque.' },
    { title: 'Setembro Amarelo',       tag: 'Conscientização', note: 'O amarelo continua como acento do tema, agora dentro da identidade UORT, e o “Disque 188” ganha um card de destaque.' },
    { title: 'Você Sabia?',            tag: 'Doação de órgãos', note: 'Os números principais (9.938 · 4.321 · 48.159) saem do meio do texto e viram destaques de leitura rápida.' },
    { title: 'Pausa com Propósito',    tag: 'Reflexão', note: 'A frase ganha protagonismo com tipografia forte, hierarquia em duas cores e uma imagem de cuidado.' }
  ],
  muralChanges: [
    'Paleta UORT consistente — antes, cada página usava uma cor diferente',
    'Fotografia real e humanizada no lugar de ilustrações genéricas',
    'Hierarquia tipográfica clara: título, apoio e texto',
    'Assinatura UORT no topo e “Apresentado por LOOK” no rodapé',
    'Formato vertical 9:16, pronto também para telas digitais'
  ],

  /* Teste de conhecimentos */
  quiz: [
    { q: 'Qual é o conceito central da nova comunicação da UORT?', a: ['Tecnologia', 'Movimento', 'Tradição', 'Velocidade'], c: 1, why: 'Ortopedia é a especialidade. Movimento é o que o paciente deseja recuperar.', s: 11 },
    { q: 'Qual serviço foi apontado como o que mais precisa ganhar visibilidade agora?', a: ['Fisioterapia', 'PRP', 'Pronto Atendimento', 'Consultas ambulatoriais'], c: 2, why: 'O Pronto Atendimento tem capacidade instalada muito superior ao volume atual.', s: 7 },
    { q: 'Qual é a provocação da campanha “Caiu? Machucou? Quebrou?”', a: ['Ortopedia é coisa séria.', 'Antes eram três letras. Agora, lembre de quatro: UORT.', 'Seu joelho merece mais.', 'Salvador tem pressa.'], c: 1, why: 'A campanha resgata uma associação da memória da cidade e apresenta a UORT como referência atual.', s: 19 },
    { q: 'O que a Análise de Movimento UORT NÃO faz?', a: ['Usa a câmera do celular', 'Observa a amplitude do movimento', 'Diz qual lesão a pessoa possui', 'Mostra um resultado visual'], c: 2, why: 'A ferramenta não dá diagnóstico: registra características funcionais como informação complementar.', s: 37 },
    { q: 'Em quais dias a Comunidade UORT recebe conteúdo?', a: ['Segunda, quarta e sexta', 'Terça, quinta e sábado', 'Todos os dias', 'Só aos domingos'], c: 1, why: 'Terça: UORT em 1 minuto. Quinta: conteúdo útil. Sábado: movimento do fim de semana.', s: 40 },
    { q: 'Qual é o investimento mensal total previsto em mídia online?', a: ['R$ 2.500', 'R$ 5.000', 'R$ 7.500', 'R$ 10.000'], c: 2, why: 'Google Ads (R$ 5.000) + Meta Ads (R$ 2.500) = R$ 7.500/mês.', s: 48 },
    { q: 'Na BTN, a UORT aparece em testemunhais de quantos segundos?', a: ['5 segundos', '10 segundos', '30 segundos', '1 minuto'], c: 1, why: 'Testemunhais de 10 segundos inseridos junto aos boletins de trânsito — ouça os exemplos na lâmina.', s: 52 },
    { q: 'Qual é a lógica da jornada de contato na mídia offline?', a: ['Casa → Deslocamento → Cidade', 'Cidade → Casa → Trabalho', 'Rádio → TV → Jornal', 'Online → Offline → Online'], c: 0, why: 'Elevadores (casa) + BTN (deslocamento) + LED (cidade).', s: 51 },
    { q: 'Quantas inserções de 15” na TV Bahia tem o Cenário TV 02?', a: ['6 inserções', '9 inserções', '14 inserções', '31 inserções'], c: 2, why: 'O Cenário 02 tem 14 inserções (11 a 23/out); o Cenário 01 tem 9 (11 a 16/out).', s: 60 }
  ]
};
