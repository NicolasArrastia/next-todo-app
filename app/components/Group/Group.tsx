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
import CreateTodo from "../Modals/CreateTodo";

const ACTION_CLASSES = "w-fit p-2 rounded-full shadow-lg";
const ACTION_ICONS_CLASSES = "bg-neutral-900 dark:bg-neutral-100";

const Group = ({
  group,
  groupIndex,
}: {
  group: GroupType;
  groupIndex: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { showModal } = useModalContext();

  const {
    settings: { color },
    createTodo,
    deleteGroup,
  } = useGlobalContext();

  const handleCreateTodo = () => {
    showModal({
      modal: <CreateTodo groupIndex={groupIndex} />,
    });
  };

  const handleEditGroup = () => {
    showModal({
      modal: <UpdateGroup groupIndex={groupIndex} initialName={group.title} />,
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

  const categoryTotal = group.todoList.length;
  const categoryCompletedAmount = group.todoList.reduce((prev, acc) => {
    return acc.isChecked ? ++prev : prev;
  }, 0);

  return (
    <>
      <div onClick={handleOpenGroup}>
        <div
          className={`group flex items-center relative cursor-pointer justify-start rounded-md
          ${bgColor} ${hoverColor}
           px-2 py-2 mt-4`}
        >
          <SVGIcon
            src={icons.ExpandMoreIcon.src}
            size={"25px"}
            className={`bg-neutral-900 dark:bg-neutral-100 transition duration-150 ${
              isOpen ? "rotate-0" : "-rotate-180"
            }`}
          />
          <span className="text-sm mx-1">
            {categoryCompletedAmount}/{categoryTotal}
          </span>
          <h3 className="text-lg">{group.title} </h3>
          <div className="hidden group-hover:flex gap-2 px-4 absolute top-0 -translate-y-1/2 right-0 all-child:shadow-lg">
            {actions.map(({ src, classes, onClick }) => (
              <div
                key={src}
                onClick={(event) => {
                  event.stopPropagation();
                  onClick();
                }}
                className={classes}
              >
                <SVGIcon
                  src={src}
                  size={"20px"}
                  className={ACTION_ICONS_CLASSES}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`
          transition duration-150 overflow-hidden mt-2
          origin-top
          ${!isOpen ? "scale-y-0 h-0" : "scale-y-100 h-fit"}`}
      >
        {group.todoList.length ? (
          <>
            {group.todoList.map((todo: TodoType, todoIndex: number) => {
              return (
                <TodoComponent
                  key={`${todo.name}-${todoIndex}`}
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
