# Guia operacional para agentes

## Objetivo do repositório

Este é o portfólio pessoal estático de Matheus Henrique. Ele é composto por HTML, CSS e JavaScript puro, sem framework e sem etapa obrigatória de build para publicação. A página inicial é `aboutMe.html`.

O objetivo de qualquer mudança deve ser melhorar a apresentação profissional, acessibilidade, manutenção, desempenho ou confiabilidade sem transformar o projeto em uma aplicação complexa sem necessidade.

## Leitura obrigatória antes de alterar código

1. Leia este arquivo por inteiro.
2. Leia `readme.md` para os comandos disponíveis e o modo de publicação.
3. Leia `todo.md` e execute itens de alta para baixa prioridade, exceto quando o usuário indicar explicitamente outra prioridade.
4. Execute `git status --short --branch` antes de editar. O working tree pode conter exclusões ou alterações do usuário; preserve tudo o que não pertença diretamente à solicitação.
5. Leia o arquivo da página, CSS, JavaScript e template envolvidos antes de modificar qualquer comportamento.

## Estrutura atual

- `aboutMe.html`: apresentação e lista de tecnologias.
- `work.html`: experiência profissional e link para download do currículo.
- `top3Work.html`: áreas de especialidade.
- `study.html`: formação e certificados.
- `contact.html`: redes sociais e formulário baseado em `mailto:`.
- `assets/css/`: estilos globais e estilos por página.
- `assets/js/menu.js`: menu móvel, persistência do idioma e atualização da navegação.
- `assets/js/i18nAboutMe.js`, `i18nWork.js`, `i18nTop3Work.js` e `i18nStudy.js`: textos traduzidos específicos de cada página.
- `assets/js/contact.js`: coleta o formulário de contato com `FormData` e abre o cliente de e-mail do visitante.
- `assets/img/`: ilustrações, ícones, certificados originais e versões WebP geradas.
- `assets/cv/curriculo.pdf`: currículo disponibilizado por `work.html`.
- `templates/navigation.html`: fonte única do cabeçalho/menu.
- `scripts/generate-navigation.mjs`: injeta o menu gerado nas cinco páginas estáticas.
- `scripts/optimize-images.mjs`: gera os WebPs dos certificados utilizados em `study.html`.
- `.github/workflows/quality.yml`: checagem de qualidade no GitHub Actions.
- `biome.json`: configuração de formatação e análise estática.
- `netlify.toml`: mantém `/` servindo `aboutMe.html` no Netlify.

Não existe mais página `Projects`: `projects.html`, seu CSS, seu i18n e a rota no Netlify foram removidos. Não recrie essa página ou seus links sem solicitação explícita.

## Menu e internacionalização

O menu não deve ser mantido manualmente nos cinco HTMLs.

1. Edite somente `templates/navigation.html` quando a estrutura, links, rótulos-padrão ou atributos do menu precisarem mudar.
2. Execute `npm run generate` para propagar o menu.
3. Nunca edite manualmente o conteúdo entre `<!-- generated:navigation:start -->` e `<!-- generated:navigation:end -->` nas páginas; ele será substituído pelo gerador.
4. O item de currículo é incluído apenas em `work.html` pelo gerador. Não copie esse link para as demais páginas sem decisão explícita.

O idioma é salvo em `localStorage` sob a chave `portfolio-language`.

- `assets/js/menu.js` é a única fonte de `window.toggleLanguage`.
- Ao alternar idioma, o menu é atualizado imediatamente e o evento `portfolio:languagechange` é emitido.
- Cada arquivo `i18n*.js` escuta esse evento e atualiza apenas sua página.
- Para adicionar texto traduzido, mantenha os valores padrão em português no HTML para evitar headings vazios e adicione as chaves equivalentes em `pt` e `en` no i18n específico.
- Não crie outra função global chamada `toggleLanguage`, nem reinicialize i18next no menu.

## Certificados e imagens

Os certificados mostrados em `study.html` usam arquivos `.webp`, com `width`, `height`, `loading="lazy"` e `decoding="async"`. Os JPGs/PNGs originais devem permanecer como fonte e não devem ser apagados sem autorização explícita.

Quando mudar, incluir ou substituir certificado:

1. Atualize a lista de fontes em `scripts/optimize-images.mjs`.
2. Use o mapeamento `markupFile` se o nome utilizado pelo HTML diferir do nome físico do arquivo. Há um caso histórico de `DIO` no disco e `Dio` no HTML para o certificado do bootcamp Nexa.
3. Execute `npm run optimize:images` para gerar o WebP e atualizar atributos da imagem em `study.html`.
4. Confirme que os arquivos WebP gerados serão incluídos no commit junto da alteração HTML.

O script é idempotente: pode ser executado novamente sem exigir a restauração dos atributos JPG/PNG no HTML.

## Qualidade e comandos

Use apenas os scripts definidos em `package.json`:

```powershell
npm install
```

```powershell
npm run generate
```

```powershell
npm run optimize:images
```

```powershell
npm run check
```

```powershell
npm run format
```

`npm run check` executa primeiro `npm run check:generated`, que falha se o template do menu e as páginas geradas divergirem; depois executa `biome check .`.

### Regra de validação

Não execute automaticamente build, testes, lint, formatter ou validações. Sugira o comando mais barato aplicável e aguarde confirmação do usuário antes de executá-lo. A autorização explícita do usuário para uma validação específica permite executá-la, mas não autoriza outras validações não pedidas.

`biome.json` ignora `node_modules`, SVGs brutos e `templates/`. Os SVGs são consumidos como imagens externas com `alt` no HTML, e o template não é uma página final. Não remova essas exclusões sem tratar os diagnósticos que elas evitam.

## Integração contínua e publicação

O workflow `.github/workflows/quality.yml` executa em pull requests e pushes para `master`:

1. baixa o código com permissão `contents: read`;
2. prepara Node.js 22 e cache npm;
3. executa `npm ci`;
4. executa `npm run check`.

Esse workflow só bloqueia merges se a proteção da branch `master` no GitHub marcar o job **Biome** como required status check. Não alegue que merge está bloqueado sem verificar essa configuração remota.

O Netlify publica arquivos estáticos da raiz e redireciona `/` para `/aboutMe.html`. Não introduza `dist/`, um comando de build ou alteração de diretório de publicação sem atualizar e validar a configuração de deploy.

## Formulário de contato

O formulário não usa backend, banco de dados, token ou serviço externo. `assets/js/contact.js`:

1. escuta o `submit` do formulário `#contact-form`;
2. usa a validação nativa HTML antes do envio;
3. coleta nome, e-mail e mensagem por `FormData`;
4. monta uma URL `mailto:` usando `encodeURIComponent`;
5. delega o envio ao cliente de e-mail configurado no dispositivo visitante.

Esse fluxo pode falhar para visitantes sem cliente de e-mail configurado. Migrar para Formspree, Resend, Netlify Forms ou endpoint próprio exige decisão explícita, pois introduz serviço externo, proteção contra spam e possivelmente variáveis de ambiente.

## Dependências e VS Code

- O Biome e o Sharp são dependências de desenvolvimento e são fixados por `package-lock.json`.
- Para o editor, prefira o Biome local de `node_modules`, não uma instalação global do Winget. O binário local no Windows é `node_modules/@biomejs/cli-win32-x64/biome.exe`.
- O Windows pode bloquear executáveis do Biome quando o VS Code usa cópias temporárias. Feche o VS Code antes de atualizar dependências se `biome.runFromTemporaryLocation` estiver desativado.
- Preserve `.vscode/settings.json` quando não for parte do pedido: ele representa preferência local de desenvolvimento.

## Estado do working tree e segurança

O usuário removeu múltiplos projetos de demonstração e seus arquivos. Essas remoções aparecem como muitos arquivos `D` no Git; são alterações do usuário e não devem ser restauradas, descartadas ou misturadas automaticamente com trabalho novo.

- Não exponha senhas, tokens, chaves, dados pessoais desnecessários ou credenciais.
- Não use `git reset --hard`, `git checkout --`, remoção recursiva ampla ou comandos destrutivos para "limpar" o repositório.
- Ao instalar ou atualizar dependências, preserve `package-lock.json` e informe claramente as mudanças.
- Antes de renomear o repositório remoto, fazer push, publicar no Netlify ou alterar configuração no GitHub, confirme a autorização e o alvo exato com o usuário.

## Documentação e entrega

Após uma implementação:

1. Atualize `todo.md`, marcando somente o que foi efetivamente concluído.
2. Atualize `readme.md` se houver novo comando, fluxo de desenvolvimento ou comportamento público relevante.
3. Explique em pt-BR arquivos alterados, fluxo em tempo de execução, dependências/serviços envolvidos, validações realizadas ou apenas sugeridas, limitações e o que depende de homologação ou produção.
4. Ao sugerir comandos ao usuário, forneça cada comando em uma única linha, pronto para PowerShell.
5. Para commits, títulos de PR e mensagens relacionadas, use exclusivamente pt-BR, Conventional Commits com título e descrição detalhada.
