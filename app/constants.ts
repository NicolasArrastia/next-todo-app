import { GroupType } from "./types";

export enum ColorsEnum {
  RED = "red",
  ORANGE = "orange",
  AMBER = "amber",
  EMERALD = "emerald",
  BLUE = "blue",
  PURPLE = "purple",
  PINK = "pink",
}

export const COLOR_OPTIONS = [
  ColorsEnum.RED,
  ColorsEnum.ORANGE,
  ColorsEnum.AMBER,
  ColorsEnum.EMERALD,
  ColorsEnum.BLUE,
  ColorsEnum.PURPLE,
  ColorsEnum.PINK,
];

export const CustomColors: {
  [key in ColorsEnum]: {
    text: string;
    border: string;
    light: string;
    base: string;
    hover: string;
    accent: string;
  };
} = {
  [ColorsEnum.RED]: {
    text: "text-red-700 dark:text-red-500",
    border: "border-red-700 dark:border-red-500",
    light: "bg-red-100 dark:bg-red-900",
    base: "bg-red-500 dark:bg-red-600",
    hover: "hover:bg-red-700",
    accent: "accent-red-600",
  },
  [ColorsEnum.ORANGE]: {
    text: "text-orange-700 dark:text-orange-500",
    border: "border-orange-700 dark:border-orange-500",
    light: "bg-orange-100 dark:bg-orange-900",
    base: "bg-orange-500 dark:bg-orange-600",
    hover: "hover:bg-orange-700",
    accent: "accent-orange-600",
  },
  [ColorsEnum.AMBER]: {
    text: "text-amber-700 dark:text-amber-500",
    border: "border-amber-700 dark:border-amber-500",
    light: "bg-amber-100 dark:bg-amber-900",
    base: "bg-amber-500 dark:bg-amber-600",
    hover: "hover:bg-amber-700",
    accent: "accent-amber-600",
  },
  [ColorsEnum.EMERALD]: {
    text: "text-emerald-700 dark:text-emerald-500",
    border: "border-emerald-700 dark:border-emerald-500",
    light: "bg-emerald-100 dark:bg-emerald-900",
    base: "bg-emerald-500 dark:bg-emerald-600",
    hover: "hover:bg-emerald-700",
    accent: "accent-emerald-600",
  },
  [ColorsEnum.BLUE]: {
    text: "text-blue-700 dark:text-blue-500",
    border: "border-blue-700 dark:border-blue-500",
    light: "bg-blue-100 dark:bg-blue-900",
    base: "bg-blue-500 dark:bg-blue-600",
    hover: "hover:bg-blue-700",
    accent: "accent-blue-600",
  },
  [ColorsEnum.PURPLE]: {
    text: "text-purple-700 dark:text-purple-500",
    border: "border-purple-700 dark:border-purple-500",
    light: "bg-purple-100 dark:bg-purple-900",
    base: "bg-purple-500 dark:bg-purple-600",
    hover: "hover:bg-purple-700",
    accent: "accent-purple-600",
  },
  [ColorsEnum.PINK]: {
    text: "text-pink-700 dark:text-pink-500",
    border: "border-pink-700 dark:border-pink-500",
    light: "bg-pink-100 dark:bg-pink-900",
    base: "bg-pink-500 dark:bg-pink-600",
    hover: "hover:bg-pink-700",
    accent: "accent-pink-600",
  },
};

export enum LocalStorageEnum {
  SETTINGS = "settings",
  GROUPS = "groups",
}

export const MOCK_TODO: GroupType[] = [
  {
    title: "💼 Work",
    todoList: [{ name: "Complete portfolio", isChecked: false }],
  },
  {
    title: "📚 Study",
    todoList: [
      { name: "Study Node.js", isChecked: false },
      { name: "Make Notion for study", isChecked: false },
      { name: "Share Trello with classmates", isChecked: false },
    ],
  },
];

export const NEW_GROUP = { title: "📝 New Group", todoList: [] };
export const NEW_TODO = {
  name: "New Todo Item",
  isChecked: false,
};
