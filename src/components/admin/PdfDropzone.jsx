import { useCallback, useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

function pickPdfFile(files) {
  const file = files?.[0];
  if (!file || file.type !== "application/pdf") return null;
  return file;
}

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PdfDropzone({ file, onFileChange, className }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

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
    const picked = pickPdfFile(e.dataTransfer.files);
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
      <span className="text-base font-medium text-text-primary">Catalogue PDF</span>

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
          id="pdfFile"
          name="pdfFile"
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => setFile(pickPdfFile(e.target.files))}
        />

        {file ? (
          <>
            <span className="mb-ds-3 flex h-14 w-14 items-center justify-center rounded-full bg-surface-raised text-text-secondary">
              <FileText className="h-7 w-7" strokeWidth={2} />
            </span>
            <p className="text-lg font-medium text-text-primary">{file.name}</p>
            <p className="mt-ds-2 text-base text-text-disabled">
              {formatFileSize(file.size)} — drop or click to replace
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
                <FileText className="h-7 w-7" strokeWidth={2} />
              )}
            </span>
            <p className="text-lg font-medium text-text-primary">Drag & drop a PDF here</p>
            <p className="mt-ds-2 text-base text-text-disabled">
              or click to browse · PDF only · max 20 MB
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
          Clear selection
        </button>
      )}

      <p className="text-base text-text-disabled">
        Uploaded PDFs are stored securely and linked from the site navigation.
      </p>
    </div>
  );
}
