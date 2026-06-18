import { SavedView } from "../../../../SavedView/savedViews.types";

export type LeadsTableViewsSelectProps = {
  allViews: SavedView[];
  activeViewId: string | null;
  onApplyView: (id: string) => void;
};
