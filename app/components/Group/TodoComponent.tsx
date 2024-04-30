import icons from "@/public/icons";
import SVGIcon from "../SVGIcon";
import { ColorsEnum, CustomColors, LocalStorageEnum } from "@/app/constants";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { GroupType, TodoType } from "@/app/types";
import { useState } from "react";
import { useModalContext } from "@/app/contexts/useModalContext";
import UpdateTodo from "../Modals/UpdateTodo";
import Delete from "../Modals/Delete";

const TodoComponent = ({
  todo,
  groupIndex,
  todoIndex,
}: {
  todo: TodoType;
  groupIndex: number;
  todoIndex: number;
}) => {
  const {
    settings: { color },
    updateTodo,
    deleteTodo,
  } = useGlobalContext();
  const [isChecked, setIsChecked] = useState(todo.isChecked);
  const { showModal } = useModalContext();
  const accentColor = CustomColors[color as ColorsEnum].accent;

  const handleCheckTodo = () => {
    setIsChecked((prev) => !prev);
    updateTodo(groupIndex, todoIndex, { isChecked: !isChecked });
  };

  const handleDeleteTodo = () => {
    showModal({
      modal: (
        <Delete
          elementName="Todo"
          handleAccept={() => deleteTodo(groupIndex, todoIndex)}
        />
      ),
    });
  };

  const handleEditTodo = () => {
    showModal({
      modal: (
        <UpdateTodo
          groupIndex={groupIndex}
          todoIndex={todoIndex}
          initialName={todo.name}
        />
      ),
    });
  };

  return (
    <div
      key={todo.name}
      className="group flex items-center p-2 not-last:border-b-[1px]  dark:border-neutral-700"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckTodo}
        className={`size-4 mr-2 ${accentColor} cursor-pointer`}
      />
      <span
        className={`${isChecked && "line-through italic text-neutral-500"}`}
      >
        {todo.name}
      </span>
      <div className="ml-auto flex gap-2">
        <SVGIcon
          onClick={handleEditTodo}
          size="20px"
          src={icons.EditIcon.src}
          className="bg-neutral-400 dark:bg-neutral-300 cursor-pointer hidden group-hover:block"
        />
        <SVGIcon
          onClick={handleDeleteTodo}
          size="20px"
          src={icons.DeleteIcon.src}
          className="bg-red-400 cursor-pointer hidden group-hover:block"
        />
      </div>
    </div>
  );
};

export default TodoComponent;
