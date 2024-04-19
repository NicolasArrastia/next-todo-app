import { useState } from "react";
import Modal from "../../Modal";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useModalContext } from "@/app/contexts/useModalContext";
import Input from "../../Input";

type Props = {
  groupIndex: number;
  initialName: string;
};

const UpdateGroup = ({ groupIndex, initialName }: Props) => {
  const { updateGroup } = useGlobalContext();
  const { hideModal } = useModalContext();
  const [newGroupName, setNewGroupName] = useState(initialName);

  const handleUpdateGroupName = () => {
    if (newGroupName.length) {
      updateGroup(groupIndex, { title: newGroupName });
      hideModal();
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  };

  return (
    <Modal title="Update Group Title" handleAccept={handleUpdateGroupName}>
      <div className="flex flex-col">
        <div className="grid">
          <Input
            label={"Group Name"}
            onChange={handleChangeName}
            value={newGroupName}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateGroup;
