"use client";
import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

type ModalComponentType = React.ReactNode;

type ContextProps = {
  showModal: ({ modal }: { modal: ModalComponentType }) => void;
  hideModal: () => void;
  isModalVisible: boolean;
};

const ModalContext = createContext<ContextProps>({
  showModal: () => {},
  hideModal: () => {},
  isModalVisible: false,
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalComponent, setModalComponent] =
    useState<ModalComponentType | null>(null);

  const hideModal = () => {
    setModalComponent(null);
    setIsModalVisible(false);
  };

  const showModal = ({ modal }: { modal: ModalComponentType }) => {
    setModalComponent(modal);
    setIsModalVisible(true);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isModalVisible }}>
      <>{children}</>
      <>{isModalVisible && modalComponent}</>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
