import { Spinner } from "@/components/ui/spinner";
import { RoleCard } from "./components/RoleCard";
import { RolesStatus, type RolesComponentProps } from "./Roles.types";

export const RolesComponent = ({ status, cards }: RolesComponentProps) => (
  <div className="flex flex-col gap-6">
    <div>
      <h1 className="text-2xl font-semibold">Roles</h1>
    </div>

    {status === RolesStatus.Loading && (
      <div className="flex justify-center py-10">
        <Spinner className="size-6" />
      </div>
    )}

    {status === RolesStatus.Error && (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Failed to load roles
      </p>
    )}

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <RoleCard key={card.role} card={card} />
      ))}
    </div>
  </div>
);
