import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArchiveComponentProps } from "./Archive.types";
import { ArchiveTable } from "./components/ArchiveTable/ArchiveTable.component";

export const ArchiveComponent = ({
  lostLeads,
  onReopen,
}: ArchiveComponentProps) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-center text-2xl font-bold">Archive</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Lost Leads ({lostLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lostLeads.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No lost leads found
            </p>
          ) : (
            <ArchiveTable lostLeads={lostLeads} onReopen={onReopen} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
