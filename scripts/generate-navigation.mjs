import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(rootDirectory, 'templates', 'navigation.html');
const pageNames = ['aboutMe.html', 'work.html', 'study.html', 'contact.html'];
const startMarker = '<!-- generated:navigation:start -->';
const endMarker = '<!-- generated:navigation:end -->';
const checkOnly = process.argv.includes('--check');

const navigationTemplate = await readFile(templatePath, 'utf8');

function renderNavigation(pageName) {
  const resumeItem =
    pageName === 'work.html'
      ? `        <li>
          <a
            href="/assets/cv/curriculo.pdf"
            download="curriculo.pdf"
            class="curriculo linkcurriculo"
          >
            <i class="fa-solid fa-file-arrow-down"></i>
            <span data-navigation-key="resume">Baixar currículo</span>
          </a>
        </li>`
      : '';

  const templateWithResume = resumeItem
    ? navigationTemplate.replace('{{resume-item}}', resumeItem)
    : navigationTemplate.replace(/^{{resume-item}}\r?\n?/m, '');

  return templateWithResume.trimEnd();
}

let stalePageCount = 0;

for (const pageName of pageNames) {
  const pagePath = path.join(rootDirectory, pageName);
  const pageContent = await readFile(pagePath, 'utf8');
  const lineEnding = '\n';
  const markedNavigationPattern = new RegExp(`[\\t ]*${startMarker}[\\s\\S]*?[\\t ]*${endMarker}`);
  const navigationPattern = /<aside class="menu">[\s\S]*?<\/aside>/;
  const markedNavigation = pageContent.match(markedNavigationPattern)?.[0];
  const markerIndentation = markedNavigation?.match(/^[\t ]*/)?.[0] || '';
  const generatedNavigation = [startMarker, renderNavigation(pageName), endMarker]
    .join(lineEnding)
    .split(/\r?\n/)
    .map((line) => `${markerIndentation}${line}`)
    .join(lineEnding);
  const hasGeneratedNavigation = Boolean(markedNavigation);
  const hasLegacyNavigation = navigationPattern.test(pageContent);

  if (!hasGeneratedNavigation && !hasLegacyNavigation) {
    throw new Error(`Não foi possível localizar o menu em ${pageName}.`);
  }

  const updatedContent = hasGeneratedNavigation
    ? pageContent.replace(markedNavigationPattern, generatedNavigation)
    : pageContent.replace(navigationPattern, generatedNavigation);

  if (checkOnly) {
    if (updatedContent !== pageContent) {
      stalePageCount += 1;
      console.error(`Menu desatualizado em ${pageName}. Execute npm run generate.`);
    }
    continue;
  }

  if (updatedContent !== pageContent) {
    await writeFile(pagePath, updatedContent);
    console.log(`Menu atualizado em ${pageName}.`);
  }
}

if (checkOnly && stalePageCount > 0) {
  process.exitCode = 1;
}
