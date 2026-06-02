import { useCallback, useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { fileToDataUrl } from "@/lib/fileToDataUrl";
import { productImageSrc } from "@/lib/productImage";

function pickImageFile(files) {
  const file = files?.[0];
  if (!file || !file.type.startsWith("image/")) return null;
  return file;
}

export default function SiteImageDropzone({
  label = "Image",
  value = "",
  onChange,
  className,
  helperText = "Drag & drop or click to upload. Saved with site content.",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const previewSrc = value ? productImageSrc(value) : "";

  const applyFile = useCallback(
    async (file) => {
      if (!file) return;
      setError("");
      setUploading(true);
      try {
        const dataUrl = await fileToDataUrl(file);
        onChange(dataUrl);
      } catch (err) {
        setError(err.message || "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const picked = pickImageFile(e.dataTransfer.files);
    if (picked) applyFile(picked);
  }

  return (
    <div className={cn("flex flex-col gap-ds-1 font-primary", className)}>
      <span className="text-sm font-medium text-text-primary">{label}</span>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        className={cn(
          "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-ds-sm border-2 border-dashed px-ds-3 py-ds-4 text-center transition-colors",
          dragOver
            ? "border-text-secondary bg-text-secondary/10"
            : "border-border-muted bg-surface-base hover:border-text-secondary/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const picked = pickImageFile(e.target.files);
            if (picked) applyFile(picked);
            e.target.value = "";
          }}
        />

        {uploading ? (
          <p className="text-sm text-text-disabled">Uploading…</p>
        ) : previewSrc ? (
          <>
            <img
              src={previewSrc}
              alt=""
              className="max-h-28 w-auto max-w-full rounded-ds-sm object-contain"
            />
            <p className="mt-ds-2 text-xs text-text-disabled">Drop or click to replace</p>
          </>
        ) : (
          <>
            <span
              className={cn(
                "mb-ds-2 flex h-11 w-11 items-center justify-center rounded-full",
                dragOver ? "bg-text-secondary text-surface-base" : "bg-surface-raised text-text-secondary"
              )}
            >
              {dragOver ? <Upload className="h-5 w-5" /> : <ImagePlus className="h-5 w-5" />}
            </span>
            <p className="text-sm font-medium text-text-primary">Drag & drop image</p>
            <p className="mt-1 text-xs text-text-disabled">PNG, JPG, WebP · max 3 MB</p>
          </>
        )}
      </div>

      {error && <p className="text-sm text-feedback-error">{error}</p>}
      {helperText && <p className="text-xs text-text-disabled">{helperText}</p>}

      {value && (
        <button
          type="button"
          className="self-start text-sm text-text-secondary hover:underline"
          onClick={() => onChange("")}
        >
          Remove image
        </button>
      )}
    </div>
  );
}
