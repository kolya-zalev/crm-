import { Button } from "@/components/ui/button";

export const LeadsImportEmptyStateComponent = ({
  onChooseFile,
}: {
  onChooseFile: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border-2 border-dashed p-8 text-center">
      <Button type="button" variant="outline" onClick={onChooseFile}>
        Choose CSV
      </Button>
    </div>
  );
};
