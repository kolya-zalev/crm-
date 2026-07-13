import { Button } from "@/components/ui/button";

export const LeadsImportEmptyStateComponent = ({
  onChooseFile,
}: {
  onChooseFile: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border-2 border-dashed p-8 text-center">
      <Button
        type="button"
        onClick={onChooseFile}
        className="cursor-pointer rounded-xl bg-blue-500 text-white"
      >
        Choose CSV
      </Button>
    </div>
  );
};
