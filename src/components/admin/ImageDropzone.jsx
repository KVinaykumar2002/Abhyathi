import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

function pickImageFile(files) {
  const file = files?.[0];
  if (!file || !file.type.startsWith("image/")) return null;
  return file;
}

export default function ImageDropzone({ file, onFileChange, className }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const setFile = useCallback(
    (next) => {
      onFileChange(next);
    },
    [onFileChange]
  );

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const picked = pickImageFile(e.dataTransfer.files);
    if (picked) setFile(picked);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }

  return (
    <div className={cn("flex flex-col gap-ds-2 font-primary", className)}>
      <span className="text-base font-medium text-text-primary">Product image</span>

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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-ds-sm border-2 border-dashed px-ds-4 py-ds-5 text-center transition-colors duration-fast",
          "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
          dragOver
            ? "border-text-secondary bg-text-secondary/10"
            : "border-border-muted bg-surface-base hover:border-text-secondary/50 hover:bg-surface-raised"
        )}
      >
        <input
          ref={inputRef}
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => setFile(pickImageFile(e.target.files))}
        />

        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-36 w-auto max-w-full rounded-ds-sm object-contain"
            />
            <p className="mt-ds-3 text-base text-text-disabled">
              {file?.name} — drop or click to replace
            </p>
          </>
        ) : (
          <>
            <span
              className={cn(
                "mb-ds-3 flex h-14 w-14 items-center justify-center rounded-full",
                dragOver ? "bg-text-secondary text-surface-base" : "bg-surface-raised text-text-secondary"
              )}
            >
              {dragOver ? (
                <Upload className="h-7 w-7" strokeWidth={2} />
              ) : (
                <ImagePlus className="h-7 w-7" strokeWidth={2} />
              )}
            </span>
            <p className="text-lg font-medium text-text-primary">
              Drag & drop an image here
            </p>
            <p className="mt-ds-2 text-base text-text-disabled">
              or click to browse · PNG, JPG, WebP
            </p>
          </>
        )}
      </div>

      {file && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="self-start text-base text-text-secondary hover:underline"
        >
          Remove image
        </button>
      )}

      <p className="text-base text-text-disabled">
        Stored in MongoDB GridFS when you save the product.
      </p>
    </div>
  );
}
