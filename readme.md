# Portfólio de Matheus Henrique

Portfólio pessoal estático para apresentar experiência profissional, principais competências, formação e canais de contato.

## Páginas

- `aboutMe.html`: apresentação e habilidades.
- `work.html`: experiência profissional e currículo para download.
- `study.html`: formação e certificados.
- `contact.html`: redes sociais e formulário traduzido que abre o cliente de e-mail do visitante.

## Tecnologias e qualidade

- HTML, CSS e JavaScript puro.
- [i18next](https://www.i18next.com/) via CDN para conteúdo em português e inglês.
- [Biome](https://biomejs.dev/) para formatação e análise estática dos arquivos do projeto.
- `.editorconfig` e `biome.json` definem a formatação compartilhada: dois espaços, fim de linha LF e largura máxima de 100 colunas.
- Netlify para hospedagem e redirecionamento da rota inicial para `aboutMe.html`.

## Desenvolvimento local

Instale as dependências de desenvolvimento uma vez:

```powershell
npm install
```

Comandos de qualidade disponíveis após a instalação:

```powershell
npm run check
```

```powershell
npm run format
```

Para atualizar o menu compartilhado após editar o template:

```powershell
npm run generate
```

Para gerar novamente as versões WebP dos certificados usados na página de formação:

```powershell
npm run optimize:images
```

O GitHub Actions executa `npm run check` em pull requests e envios para `master`. Essa checagem também falha quando o menu gerado está desatualizado em relação a `templates/navigation.html`.

> O site não exige etapa de build. Para visualizá-lo localmente, utilize qualquer servidor HTTP estático apontado para a raiz do repositório.

## Publicação

O arquivo `netlify.toml` mantém a rota `/` servindo `aboutMe.html` e redireciona `/top3work` para `/work.html`. Antes de publicar, valide o menu nos dois idiomas e os links externos.
