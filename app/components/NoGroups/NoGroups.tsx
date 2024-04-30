"use client";

import {
  ColorsEnum,
  CustomColors,
  LocalStorageEnum,
  NEW_GROUP,
} from "@/app/constants";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

const NoGroups = () => {
  const {
    groups,
    setGroups,
    settings: { color },
  } = useGlobalContext();

  const borderColor = CustomColors[color as ColorsEnum].border;
  const textColor = CustomColors[color as ColorsEnum].text;
  const lightBgColor = CustomColors[color as ColorsEnum].light;

  const handleAddNewGroup = () => {
    setGroups((prev) => [...prev, NEW_GROUP]);
  };

  return (
    <div className="flex flex-col items-center pt-40">
      <span className="text-neutral-500">No Groups at the moment</span>
      <span
        onClick={handleAddNewGroup}
        className={`cursor-pointer italic ${lightBgColor} ${textColor} font-semibold border-b-2 ${borderColor} border-dotted`}
      >
        Create Group
      </span>
    </div>
  );
};

export default NoGroups;
