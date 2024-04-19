"use client";

import React from "react";
import { useGlobalContext } from "../contexts/useGlobalContext";
import { ColorsEnum, CustomColors, NEW_GROUP } from "../constants";
import SVGIcon from "../components/SVGIcon";
import icons from "@/public/icons";
import Group from "../components/Group";
import NoCategories from "../components/NoGroups";

const Content = () => {
  const {
    groups,
    setGroups,
    settings: { color },
  } = useGlobalContext();

  const bgColor = CustomColors[color as ColorsEnum].base;

  const handleAddNewGroup = () => {
    if (typeof window !== "undefined") {
      setGroups((prev) => [...prev, NEW_GROUP]);
    }
  };

  return (
    <>
      {!!groups.length && (
        <button
          onClick={handleAddNewGroup}
          className={`flex items-center bottom-6 ${bgColor} rounded-md w-fit h-fit p-1`}
        >
          <SVGIcon
            src={icons.AddIcon.src}
            size="20px"
            className="bg-neutral-900 dark:bg-neutral-100"
          />
          Add Group
        </button>
      )}
      {groups.length ? (
        <>
          {groups.map((category, index) => {
            return (
              <Group key={category.title} category={category} index={index} />
            );
          })}
        </>
      ) : (
        <NoCategories />
      )}
    </>
  );
};

export default Content;
