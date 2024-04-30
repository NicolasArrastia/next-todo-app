import { useState } from "react";
import Modal from "../../Modal";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useModalContext } from "@/app/contexts/useModalContext";
import Input from "../../Input";

type Props = {
  groupIndex: number;
};

const UpdateGroup = ({ groupIndex }: Props) => {
  const { createTodo } = useGlobalContext();
  const { hideModal } = useModalContext();
  const [newTodoName, setNewTodoName] = useState("");

  const handleCreateTodo = () => {
    if (newTodoName.length) {
      createTodo(groupIndex, { name: newTodoName });
      hideModal();
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  return (
    <Modal title="Create New Todo" handleAccept={handleCreateTodo}>
      <div className="flex flex-col">
        <div className="grid">
          <Input
            label={"Todo Name"}
            placeholder="New Todo Name"
            onChange={handleChangeName}
            value={newTodoName}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateGroup;
