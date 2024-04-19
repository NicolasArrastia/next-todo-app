import { useCallback, useEffect, useState } from "react";
import { ThemeEnum, useGlobalContext } from "../contexts/useGlobalContext";

const CLASS_NAME = "dark";

const useDarkMode = () => {
  const {
    settings: { theme },
    setSettings,
  } = useGlobalContext();

  const handleUpdateTheme = useCallback(
    (newTheme: ThemeEnum) => {
      setSettings((prev) => ({ ...prev, theme: newTheme }));
    },
    [setSettings]
  );

  useEffect(() => {
    const bodyClass = window.document.body.classList;

    if (theme === ThemeEnum.DARK) {
      handleUpdateTheme(ThemeEnum.DARK);
      bodyClass.add(CLASS_NAME);
    } else {
      handleUpdateTheme(ThemeEnum.LIGHT);
      bodyClass.remove(CLASS_NAME);
    }
  }, [handleUpdateTheme, setSettings, theme]);

  return { darkMode: theme === ThemeEnum.DARK, setDarkMode: handleUpdateTheme };
};

export default useDarkMode;
