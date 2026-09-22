# Engenharia em Dados — Controle de Andaimes

Portal estático e responsivo preparado para publicação no GitHub Pages.

## Publicar no GitHub Pages

1. Extraia o ZIP.
2. Envie todo o conteúdo da pasta `engenharia-em-dados` para a raiz do repositório.
3. No GitHub, abra **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main`, pasta `/ (root)` e clique em **Save**.

## Acesso demonstrativo

- Usuário: `planejamento`
- Senha: `engenharia2026`

O login e os lançamentos usam `localStorage`, portanto servem apenas para validação do fluxo neste protótipo. Não há segurança real nem sincronização entre dispositivos.

## Evolução recomendada

Para uso real, conectar a Supabase ou Firebase para autenticação, perfis por função, banco centralizado, auditoria e atualização automática dos indicadores. Nunca publicar chaves administrativas no código do navegador.

## Domínio próprio

Enquanto o GitHub Pages for temporário, não inclua arquivo `CNAME`. Quando decidir apontar `engenhariaemdados.com.br`, configure o domínio em **Settings > Pages > Custom domain** e ajuste os registros DNS conforme as instruções exibidas pelo GitHub.

## Estrutura

- `index.html`: interface e telas.
- `css/styles.css`: identidade visual responsiva.
- `js/app.js`: gráficos, filtros, login demonstrativo, registros e exportação CSV.
- `assets/`: logos e imagem da obra.

Os números apresentados derivam da base fornecida e devem ser identificados como cenário demonstrativo até validação de campo.
