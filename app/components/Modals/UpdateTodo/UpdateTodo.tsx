import { useState } from "react";
import Modal from "../../Modal";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useModalContext } from "@/app/contexts/useModalContext";
import Input from "../../Input";

type Props = {
  groupIndex: number;
  todoIndex: number;
  initialName: string;
};

const UpdateTodo = ({ groupIndex, todoIndex, initialName }: Props) => {
  const { updateTodo } = useGlobalContext();
  const { hideModal } = useModalContext();
  const [newTodoName, setNewTodoName] = useState(initialName);

  const handleUpdateGroupName = () => {
    if (newTodoName.length) {
      updateTodo(groupIndex, todoIndex, { name: newTodoName });
      hideModal();
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  return (
    <Modal title="Update Todo Name" handleAccept={handleUpdateGroupName}>
      <div className="flex flex-col">
        <div className="grid">
          <Input
            label={"Todo Name"}
            onChange={handleChangeName}
            value={newTodoName}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateTodo;
