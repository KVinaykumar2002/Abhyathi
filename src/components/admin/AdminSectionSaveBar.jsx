import { Button } from "@/components/ui";

export default function AdminSectionSaveBar({
  onSave,
  isPending,
  statusMessage,
  label = "Save section",
}) {
  return (
    <div className="mt-ds-4 flex flex-col gap-ds-2 sm:flex-row sm:items-center sm:justify-between">
      {statusMessage && (
        <p className="text-base text-text-secondary" role="status">
          {statusMessage}
        </p>
      )}
      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={isPending}
        onClick={onSave}
        className="sm:ml-auto"
      >
        {isPending ? "Saving…" : label}
      </Button>
    </div>
  );
}
