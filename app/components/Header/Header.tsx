"use client";
import {
  CustomColors,
  COLOR_OPTIONS,
  ColorsEnum,
  LocalStorageEnum,
  MOCK_TODO,
} from "@/app/constants";
import useDarkMode from "@/app/hooks/useDarkMode";
import React, { useState } from "react";
import SVGIcon from "../SVGIcon";
import icons from "@/public/icons";
import {
  DEFAULT_SETTINGS,
  ThemeEnum,
  useGlobalContext,
} from "@/app/contexts/useGlobalContext";
import Button from "../Button";

type SettingsProps = {
  isOpen: boolean;
};

const CLOSED_CLASSES = "h-0";
const OPEN_CLASSES = "z-10 p-2 h-fit mt-2";

const Settings = ({ isOpen }: SettingsProps) => {
  const {
    settings: { color },
    setSettings,
    setGroups,
  } = useGlobalContext();
  const bgColor = CustomColors[color as ColorsEnum].base;

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleResetTodo = () => {
    setGroups(MOCK_TODO);
  };

  return (
    <div
      className={`w-full grid gap-2 rounded-md overflow-auto bg-neutral-200 dark:bg-neutral-900 col-span-3 ${
        isOpen ? OPEN_CLASSES : CLOSED_CLASSES
      }`}
    >
      <h2 className="font-semibold">Change Color</h2>
      <div className="flex gap-2 flex-nowrap overflow-x-auto">
        {COLOR_OPTIONS.map((c: ColorsEnum) => {
          const baseColor = CustomColors[c].base;
          const isCurrentColorClasses = color === c && "border-slate-400";

          const handleChangeColor = () => {
            setSettings((prev) => ({ ...prev, color: c }));
          };

          return (
            <div
              onClick={handleChangeColor}
              key={c}
              className={`${baseColor} cursor-pointer w-10 aspect-[4/3] border-4 ${isCurrentColorClasses} shadow-md rounded-md`}
            />
          );
        })}
      </div>
      <h2 className="font-semibold">Dev Tools</h2>
      <div className="flex justify-between">
        <Button type="primary" onClick={handleResetSettings}>
          Reset Settings
        </Button>
        <Button type="primary" onClick={handleResetTodo}>
          Reset Todo
        </Button>
      </div>
    </div>
  );
};

const Header = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-neutral-50 dark:bg-neutral-800 top-0 sticky flex flex-col p-2 rounded-md shadow-lg mb-4 h-fit">
      <div className="flex">
        <div
          className="cursor-pointer self-center w-fit mr-auto"
          onClick={() =>
            setDarkMode(darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK)
          }
        >
          <SVGIcon
            src={darkMode ? icons.DarkModeIcon.src : icons.LightModeIcon.src}
            size={"25px"}
            className="bg-amber-500 dark:bg-slate-500"
          />
        </div>
        <h1 className="text-2xl text-center font-bold text-nowrap">
          Todo App 📝
        </h1>
        <div
          className="cursor-pointer self-center ml-auto"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <SVGIcon
            src={icons.SettingsIcon.src}
            size={"25px"}
            className="bg-neutral-900 dark:bg-neutral-100"
          />
        </div>
      </div>
      <Settings isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
