"use client";
import { useRoles } from "./hooks/useRoles";
import { RolesComponent } from "./Roles.component";
import { RolesStatus } from "./Roles.types";
import { buildRoleCards } from "./utils/buildRoleCards";
import { getRolesStatus } from "./utils/getRolesStatus";

export const RolesContainer = () => {
  const { roles, isLoading, isError } = useRoles();
  const status = getRolesStatus({ isLoading, isError });
  const cards = status === RolesStatus.Ready ? buildRoleCards(roles) : [];

  return <RolesComponent status={status} cards={cards} />;
};
