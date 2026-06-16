import { IconType } from "react-icons";
import {
  MdAccessibilityNew,
  MdClose,
  MdOutlineEmojiPeople,
  MdWineBar,
} from "react-icons/md";

export type StatCardConfig = {
  title: string;
  key: string;
  icon: IconType;
  color: string;
};

export const StatCards: StatCardConfig[] = [
  {
    title: "Total Leads",
    key: "total",
    icon: MdOutlineEmojiPeople,
    color: "text-blue-600",
  },
  {
    title: "New",
    key: "new",
    icon: MdAccessibilityNew,
    color: "text-green-600",
  },
  {
    title: "Won",
    key: "won",
    icon: MdWineBar,
    color: "text-amber-600",
  },
  {
    title: "Lost",
    key: "lost",
    icon: MdClose,
    color: "text-red-600",
  },
];