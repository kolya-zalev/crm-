"use client";
import { TeamTableSkeletonComponent } from "./TeamTableSkeleton.component";
import { TeamTableSkeletonProps } from "./TeamTableSkeleton.types";
export const TeamTableSkeletonContainer = ({
  rowCount = 4,
  columnsCount = 5,
}: TeamTableSkeletonProps) => {
  const rowItems = Array.from({ length: rowCount });
  const cellItems = Array.from({ length: columnsCount });

  return (
    <TeamTableSkeletonComponent rowItems={rowItems} cellItems={cellItems} />
  );
};
