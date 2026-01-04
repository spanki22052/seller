import type { PixelCrop } from "react-image-crop";

export async function getCroppedCircularImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  imageElement: HTMLImageElement
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Get the displayed size of the image (with zoom and CSS applied)
  // Use getBoundingClientRect to account for CSS transforms
  const rect = imageElement.getBoundingClientRect();
  const displayedWidth = rect.width;
  const displayedHeight = rect.height;
  
  // Calculate scale factors between displayed size and natural size
  // For objectFit: contain, the image maintains aspect ratio, so we need to find
  // the actual displayed image size within the container
  const imageAspect = image.naturalWidth / image.naturalHeight;
  const containerAspect = displayedWidth / displayedHeight;
  
  let actualDisplayedWidth: number;
  let actualDisplayedHeight: number;
  
  if (imageAspect > containerAspect) {
    // Image is wider - width is the limiting factor
    actualDisplayedWidth = displayedWidth;
    actualDisplayedHeight = displayedWidth / imageAspect;
  } else {
    // Image is taller - height is the limiting factor
    actualDisplayedWidth = displayedHeight * imageAspect;
    actualDisplayedHeight = displayedHeight;
  }
  
  // Calculate scale factors
  const scaleX = image.naturalWidth / actualDisplayedWidth;
  const scaleY = image.naturalHeight / actualDisplayedHeight;
  
  // For objectFit: contain with aspect ratio maintained, scaleX should equal scaleY
  // But we use both to be safe
  const scale = Math.min(scaleX, scaleY); // Use min to ensure we don't go outside bounds

  // Convert PixelCrop coordinates (relative to displayed size) to natural size coordinates
  const naturalX = pixelCrop.x * scale;
  const naturalY = pixelCrop.y * scale;
  const naturalWidth = pixelCrop.width * scale;
  const naturalHeight = pixelCrop.height * scale;

  // For circular crop, use the smaller dimension to ensure a perfect circle
  const size = Math.min(naturalWidth, naturalHeight);
  canvas.width = size;
  canvas.height = size;

  // Create circular clipping path
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
  ctx.clip();

  // Calculate the center of the crop area in natural coordinates
  const centerX = naturalX + naturalWidth / 2;
  const centerY = naturalY + naturalHeight / 2;

  // Calculate source coordinates centered on the crop area
  const sourceX = centerX - size / 2;
  const sourceY = centerY - size / 2;

  // Ensure coordinates are within image bounds
  const clampedSourceX = Math.max(0, Math.min(sourceX, image.naturalWidth - size));
  const clampedSourceY = Math.max(0, Math.min(sourceY, image.naturalHeight - size));

  // Draw the cropped image with high quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  
  ctx.drawImage(
    image,
    clampedSourceX,
    clampedSourceY,
    size,
    size,
    0,
    0,
    size,
    size
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "circular-image.png", { type: "image/png" });
        resolve(file);
      },
      "image/png",
      0.95
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}
