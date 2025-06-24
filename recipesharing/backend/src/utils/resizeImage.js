import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

export const resizeImage = async (
  filePath,
  outputFilename,
  dimensions = { width: 500, height: 500 }
) => {
  const outputPath = path.join("src/uploads/resized", outputFilename);

  try {
    await sharp(filePath)
      .resize(dimensions.width, dimensions.height)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Clean up the original file
    await fs.unlink(filePath);

    return outputPath; // Return the path of the resized image
  } catch (error) {
    console.error("Error resizing image:", error.message);
    throw error;
  }
};