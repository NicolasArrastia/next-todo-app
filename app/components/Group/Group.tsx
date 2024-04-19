"use client";
import { useState } from "react";
import SVGIcon from "../SVGIcon";
import icons from "@/public/icons";
import {
  ColorsEnum,
  CustomColors,
  LocalStorageEnum,
  NEW_TODO,
} from "@/app/constants";
import { GroupType, TodoType } from "@/app/types";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import TodoComponent from "./TodoComponent";
import Modal from "../Modal";
import UpdateGroup from "../Modals/UpdateGroup";
import { useModalContext } from "@/app/contexts/useModalContext";
import Delete from "../Modals/Delete";

const CLOSED_CLASSES = "h-0";
const OPEN_CLASSES = "h-fit";

const ACTION_CLASSES = "w-fit p-2 rounded-full shadow-lg";
const ACTION_ICONS_CLASSES = "bg-neutral-900 dark:bg-neutral-100";

const Group = ({
  category,
  index: groupIndex,
}: {
  category: GroupType;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { showModal } = useModalContext();

  const {
    settings: { color },
    createTodo,
    deleteGroup,
  } = useGlobalContext();

  const handleCreateTodo = () => {
    createTodo(groupIndex, NEW_TODO);
  };

  const handleEditGroup = () => {
    showModal({
      modal: (
        <UpdateGroup groupIndex={groupIndex} initialName={category.title} />
      ),
    });
  };

  const handleDeleteGroup = () => {
    showModal({
      modal: (
        <Delete
          elementName="Group"
          handleAccept={() => deleteGroup(groupIndex)}
        />
      ),
    });
  };

  const handleOpenGroup = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      setIsOpen((prev) => !prev);
    }
  };

  const { base: bgColor, hover: hoverColor } =
    CustomColors[color as ColorsEnum];

  const actions = [
    {
      src: icons.AddIcon.src,
      classes: `${ACTION_CLASSES} ${bgColor} ${hoverColor}`,
      onClick: handleCreateTodo,
    },
    {
      src: icons.EditIcon.src,
      classes: `${ACTION_CLASSES} ${bgColor} ${hoverColor}`,
      onClick: handleEditGroup,
    },
    {
      src: icons.DeleteIcon.src,
      classes: `${ACTION_CLASSES} ${bgColor} ${hoverColor}`,
      onClick: handleDeleteGroup,
    },
  ];

  const categoryTotal = category.todoList.length;
  const categoryCompletedAmount = category.todoList.reduce((prev, acc) => {
    return acc.isChecked ? ++prev : prev;
  }, 0);

  return (
    <>
      <div
        onClick={handleOpenGroup}
        className={`group flex items-center relative cursor-pointer justify-start rounded-md
        ${bgColor} ${hoverColor}
         px-2 py-2 mt-4`}
      >
        <SVGIcon
          src={icons.ExpandMoreIcon.src}
          size={"25px"}
          className="bg-neutral-900 dark:bg-neutral-100"
        />
        <span className="text-sm mx-1">
          {categoryCompletedAmount}/{categoryTotal}
        </span>
        <h3 className="text-lg">{category.title} </h3>

        <div className="hidden group-hover:flex gap-2 px-4 absolute top-0 -translate-y-1/2 right-0 all-child:shadow-lg">
          {actions.map(({ src, classes, onClick }) => (
            <div key={src} onClick={onClick} className={classes}>
              <SVGIcon
                src={src}
                size={"20px"}
                className={ACTION_ICONS_CLASSES}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`transition duration-150 overflow-hidden mt-2
origin-top
${!isOpen ? "scale-y-0 h-0" : "scale-y-100 h-fit"}`}
      >
        {category.todoList.length ? (
          <>
            {category.todoList.map((todo: TodoType, todoIndex: number) => {
              return (
                <TodoComponent
                  key={todo.name}
                  todo={todo}
                  todoIndex={todoIndex}
                  groupIndex={groupIndex}
                />
              );
            })}
          </>
        ) : (
          <span className="text-center block italic text text-neutral-500">
            No Todos here
          </span>
        )}
      </div>
    </>
  );
};

export default Group;