import { execSync } from "child_process";
import { basename, dirname } from "path";
import { existsSync } from "fs";

async function convertPdfToTiff(inputPath, outputPath, options = {}) {
  const density = options.density || 300;
  const quality = options.quality || 100;

  // Validate input file exists
  if (!existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  // Docker command to run ImageMagick
  const dockerCmd = `
    docker run --rm \
      -v ${dirname(inputPath)}:/input \
      -v ${dirname(outputPath)}:/output \
      imagemagick:7-alpine \
      convert /input/${basename(inputPath)} \
      -density ${density} \
      -quality ${quality} \
      /output/${basename(outputPath)}
  `;

  try {
    console.log(`Converting ${inputPath} to ${outputPath}...`);
    execSync(dockerCmd.replace(/\n/g, " "), { stdio: "inherit" });
    console.log(`✓ Conversion complete: ${outputPath}`);
    return outputPath;
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

// Usage example
if (require.main === module) {
  convertPdfToTiff("./sample.pdf", "./output.tiff", {
    density: 300,
    quality: 95,
  }).catch(console.error);
}

module.exports = { convertPdfToTiff };
