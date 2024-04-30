"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { GroupType, TodoType } from "../types";
import {
  ColorsEnum,
  LocalStorageEnum,
  MOCK_TODO,
  NEW_TODO,
} from "../constants";

const isBrowser = typeof window !== "undefined";

const getLocalStorageSettings = () => {
  const prefersDarkMode =
    isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const settings = isBrowser && localStorage.getItem(LocalStorageEnum.SETTINGS);
  return settings
    ? JSON.parse(settings)
    : { ...DEFAULT_SETTINGS, theme: prefersDarkMode ? "dark" : "light" };
};

const getLocalStorageGroups = () => {
  const groups = isBrowser && localStorage.getItem(LocalStorageEnum.GROUPS);
  return groups ? JSON.parse(groups) : MOCK_TODO;
};

type SettingsType = { color: ColorsEnum; theme: ThemeEnum };

interface ContextProps {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
  groups: GroupType[];
  setGroups: Dispatch<SetStateAction<GroupType[]>>;
  deleteTodo: (groupIndex: number, todoIndex: number) => void;
  updateTodo: (
    groupIndex: number,
    todoIndex: number,
    updatedTodo: Partial<TodoType>
  ) => void;
  createTodo: (groupIndex: number, todo: TodoType) => void;
  deleteGroup: (groupIndex: number) => void;
  updateGroup: (groupIndex: number, updatedGroup: Partial<GroupType>) => void;
}

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

const GlobalContext = createContext<ContextProps>({
  settings: { color: ColorsEnum.EMERALD, theme: ThemeEnum.LIGHT },
  setSettings: () => {},
  groups: [],
  setGroups: () => [],
  deleteTodo: () => {},
  updateTodo: () => {},
  createTodo: () => {},
  deleteGroup: () => {},
  updateGroup: () => {},
});

export const DEFAULT_SETTINGS = {
  color: ColorsEnum.EMERALD,
  theme: ThemeEnum.LIGHT,
};

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SettingsType>(
    getLocalStorageSettings
  );
  const [groups, setGroups] = useState<GroupType[]>(getLocalStorageGroups);

  const deleteTodo = (groupIndex: number, todoIndex: number) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].todoList.splice(todoIndex, 1);
    setGroups(updatedGroups);
  };

  const updateTodo = (
    groupIndex: number,
    todoIndex: number,
    updatedTodo: Partial<TodoType>
  ) => {
    const updatedGroups: GroupType[] = groups.map((group, gIndex) =>
      groupIndex === gIndex
        ? {
            ...group,
            todoList: group.todoList.map((todo, tIndex) =>
              todoIndex === tIndex ? { ...todo, ...updatedTodo } : todo
            ),
          }
        : group
    );

    setGroups(updatedGroups);
  };

  const updateGroup = (
    groupIndex: number,
    updatedGroup: Partial<GroupType>
  ) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      ...updatedGroup,
    };

    setGroups(updatedGroups);
  };

  const createTodo = (groupIndex: number, todo: TodoType) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].todoList = [
      ...updatedGroups[groupIndex].todoList,
      todo,
    ];

    setGroups(updatedGroups);
  };

  const deleteGroup = (groupIndex: number) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(groupIndex, 1);
    setGroups(updatedGroups);
  };

  const updateCustomColor = (color: ColorsEnum) => {
    setSettings((prev) => ({ ...prev, color }));
  };

  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem(LocalStorageEnum.GROUPS, JSON.stringify(groups));
    localStorage.setItem(LocalStorageEnum.SETTINGS, JSON.stringify(settings));
  }, [groups, settings, setSettings, setGroups]);

  return (
    <GlobalContext.Provider
      value={{
        settings,
        setSettings,
        groups,
        setGroups,
        deleteTodo,
        updateTodo,
        createTodo,
        deleteGroup,
        updateGroup,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
