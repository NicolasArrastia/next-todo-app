import React from "react";
import Modal from "../../Modal";
import { useModalContext } from "@/app/contexts/useModalContext";

type Props = {
  elementName: string;
  handleAccept: () => void;
};

const Delete = ({ elementName, handleAccept }: Props) => {
  const { hideModal } = useModalContext();
  return (
    <Modal
      title="Confirm Delete"
      handleAccept={() => {
        handleAccept();
        hideModal();
      }}
    >
      Are you sure you want to delete this {elementName}?
    </Modal>
  );
};

export default Delete;
