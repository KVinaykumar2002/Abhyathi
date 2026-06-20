import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Trash2 } from "lucide-react";
import PdfDropzone from "@/components/admin/PdfDropzone";
import { uploadCataloguePdf, deleteCataloguePdf } from "@/api/cataloguePdf";
import { useAdminSiteContent } from "@/hooks/useSiteContent";
import { cataloguePdfHref } from "@/lib/cataloguePdfUrl";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

export default function AdminContentCatalogue() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminSiteContent();
  const [pdfFile, setPdfFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const cataloguePdf = data?.cataloguePdf;
  const hasUploadedPdf = Boolean(cataloguePdf?.fileId);

  async function refreshSiteContent(siteContent) {
    queryClient.setQueryData(["admin", "site-content"], siteContent);
    queryClient.setQueryData(["site-content"], siteContent);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin", "site-content"] }),
      queryClient.invalidateQueries({ queryKey: ["site-content"] }),
    ]);
  }

  async function handleUpload() {
    if (!pdfFile) {
      setStatus("Choose a PDF file first.");
      return;
    }

    setStatus("");
    setIsUploading(true);
    try {
      const { siteContent } = await uploadCataloguePdf(pdfFile);
      await refreshSiteContent(siteContent);
      setPdfFile(null);
      setStatus("Catalogue PDF uploaded.");
    } catch (err) {
      setStatus(err.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemove() {
    if (!hasUploadedPdf) return;
    if (!window.confirm("Remove the current catalogue PDF? Navbar and footer links will fall back to the default file.")) {
      return;
    }

    setStatus("");
    setIsRemoving(true);
    try {
      const { siteContent } = await deleteCataloguePdf();
      await refreshSiteContent(siteContent);
      setStatus("Catalogue PDF removed.");
    } catch (err) {
      setStatus(err.message || "Remove failed.");
    } finally {
      setIsRemoving(false);
    }
  }

  if (isLoading) return <p className="text-text-disabled">Loading…</p>;

  const publicHref = cataloguePdfHref(data);

  return (
    <div className="space-y-ds-5">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">Catalogue PDF</h2>
        <p className="mt-ds-2 text-lg text-text-disabled">
          Upload the packaging catalogue PDF. It will be linked from the site navbar and footer.
        </p>
      </div>

      {hasUploadedPdf && (
        <div className="rounded-ds-sm border border-border-muted bg-surface-raised p-ds-4">
          <p className="text-base font-medium text-text-primary">Current catalogue</p>
          <p className="mt-ds-1 text-lg text-text-primary">{cataloguePdf.originalName || "catalogue.pdf"}</p>
          {cataloguePdf.uploadedAt && (
            <p className="mt-ds-1 text-base text-text-disabled">
              Uploaded {formatDate(cataloguePdf.uploadedAt)}
            </p>
          )}
          <a
            href={publicHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-ds-3 inline-flex items-center gap-2 text-base font-medium text-text-secondary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            View public link
          </a>
        </div>
      )}

      <PdfDropzone file={pdfFile} onFileChange={setPdfFile} />

      <div className="flex flex-wrap items-center gap-ds-3">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!pdfFile || isUploading}
          className="min-h-[48px] rounded-ds-sm bg-text-secondary px-ds-4 py-ds-2 text-base font-medium text-surface-base transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading…" : hasUploadedPdf ? "Replace PDF" : "Upload PDF"}
        </button>

        {hasUploadedPdf && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-ds-sm border border-border-muted bg-surface-base px-ds-4 py-ds-2 text-base font-medium text-text-primary transition-colors hover:border-red-500/50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {isRemoving ? "Removing…" : "Remove PDF"}
          </button>
        )}
      </div>

      {status && (
        <p className="text-base text-text-disabled" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
