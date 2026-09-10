import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const rootDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const imageDirectory = path.join(rootDirectory, "assets", "img");
const studyPagePath = path.join(rootDirectory, "study.html");
const certificates = [
  { file: "certificadoLogicaProgUdemy.jpg" },
  { file: "certificadoInformaticaProgBasicAvancUdemy.jpg" },
  { file: "certificadoLogicaProgCursoEmVideo.jpg" },
  { file: "certificadoHtmlCssOInicioUdemy.jpg" },
  { file: "certificadoHtmlCssMedioUdemy.jpg" },
  { file: "certificadoBootstrapUdemy.jpg" },
  { file: "certificadoFormacaoHtmlDeveloperDIO.png" },
  { file: "certificadoFormacaoCssDeveloperDIO.jpg" },
  { file: "certificadoFormacaoJavaScriptDeveloperDIO.jpg" },
  { file: "certificadoFormacaoReactDeveloperDIO.jpg" },
  { file: "certificadoAzureDio.jpg" },
  {
    file: "certificadoBootcampNexaFundamentosIAGenerativaDIO.jpg",
    markupFile: "certificadoBootcampNexaFundamentosIAGenerativaDio.jpg",
  },
  { file: "certificadoInteligenciaArtificialPratica.jpg" },
  { file: "github_copilot_turma_out2025_certificado.jpg" },
  { file: "certificadoLinuxDio.jpg" },
];

let studyPage = await readFile(studyPagePath, "utf8");

for (const {
  file: certificateFile,
  markupFile = certificateFile,
} of certificates) {
  const inputPath = path.join(imageDirectory, certificateFile);
  const outputFile = `${path.parse(certificateFile).name}.webp`;
  const outputPath = path.join(imageDirectory, outputFile);
  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(
      `Não foi possível identificar as dimensões de ${certificateFile}.`,
    );
  }

  await image.webp({ quality: 82, effort: 4 }).toFile(outputPath);

  const sourceAttribute = `src="/assets/img/${markupFile}"`;
  const optimizedAttributes = `src="/assets/img/${outputFile}" width="${metadata.width}" height="${metadata.height}" loading="lazy" decoding="async"`;
  const optimizedSourceAttribute = `src="/assets/img/${outputFile}"`;

  if (studyPage.includes(sourceAttribute)) {
    studyPage = studyPage.replace(sourceAttribute, optimizedAttributes);
  } else if (!studyPage.includes(optimizedSourceAttribute)) {
    throw new Error(
      `Não foi possível localizar ${certificateFile} em study.html.`,
    );
  }

  console.log(`${certificateFile} convertido para ${outputFile}.`);
}

await writeFile(studyPagePath, studyPage);
