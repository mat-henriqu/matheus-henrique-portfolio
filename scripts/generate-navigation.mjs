import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const templatePath = path.join(rootDirectory, "templates", "navigation.html");
const pageNames = [
  "aboutMe.html",
  "work.html",
  "top3Work.html",
  "study.html",
  "contact.html",
];
const startMarker = "<!-- generated:navigation:start -->";
const endMarker = "<!-- generated:navigation:end -->";
const checkOnly = process.argv.includes("--check");

const navigationTemplate = await readFile(templatePath, "utf8");

function renderNavigation(pageName) {
  const resumeItem =
    pageName === "work.html"
      ? `                <li>
                    <a href="/assets/cv/curriculo.pdf" download="curriculo.pdf" class="curriculo linkcurriculo">
                        <i class="fa-solid fa-file-arrow-down"></i>
                        <span data-navigation-key="resume">Baixar currículo</span>
                    </a>
                </li>`
      : "";

  return navigationTemplate.replace("{{resume-item}}", resumeItem).trimEnd();
}

let stalePageCount = 0;

for (const pageName of pageNames) {
  const pagePath = path.join(rootDirectory, pageName);
  const pageContent = await readFile(pagePath, "utf8");
  const generatedNavigation = `${startMarker}\n${renderNavigation(pageName)}\n${endMarker}`;
  const markedNavigationPattern = new RegExp(
    `${startMarker}[\\s\\S]*?${endMarker}`,
  );
  const navigationPattern = /<aside class="menu">[\s\S]*?<\/aside>/;
  const hasGeneratedNavigation = markedNavigationPattern.test(pageContent);
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
      console.error(
        `Menu desatualizado em ${pageName}. Execute npm run generate.`,
      );
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
