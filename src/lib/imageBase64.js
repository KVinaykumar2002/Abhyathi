/** Convert a File/Blob to a data URL for previews or JSON API payloads. */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function isDataImageUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}
