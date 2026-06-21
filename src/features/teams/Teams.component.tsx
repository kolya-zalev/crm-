import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InviteUserDialog } from "./components/InviteUserDialog/InviteUserDialog.component";
import { TeamMembersTable } from "./components/TeamMembersTable/TeamMembersTable.component";
import { TeamsEmptyState } from "./components/TeamsEmptyState/TeamsEmptyState.component";
import type { TeamsComponentProps } from "./teams.types";

export const TeamsComponent = ({
  members,
  onInvite,
  onUpdateMember,
}: TeamsComponentProps) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <InviteUserDialog onInvite={onInvite} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <TeamsEmptyState />
          ) : (
            <TeamMembersTable
              members={members}
              onUpdateMember={onUpdateMember}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
