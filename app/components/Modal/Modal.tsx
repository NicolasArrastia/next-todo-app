"use client";
import Button, { ButtonVariantEnum } from "../Button/Button";
import { useModalContext } from "@/app/contexts/useModalContext";

type Props = {
  children: React.ReactNode;
  title: string;
  handleAccept?: () => void;
  handleCancel?: () => void;
};

const Modal = ({ children, title, handleAccept, handleCancel }: Props) => {
  const { hideModal, isModalVisible } = useModalContext();

  const buttons = [
    {
      label: "Cancel",
      onClick: () => {
        hideModal();
      },
      type: ButtonVariantEnum.SECONDARY,
    },
    {
      label: "Accept",
      onClick: handleAccept ?? (() => {}),
      type: ButtonVariantEnum.PRIMARY,
    },
  ];

  const handleClose = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };

  return (
    <dialog
      onClick={handleClose}
      className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/50 z-50"
    >
      <div
        className={`
        animate-popup
         p-1 grid items-start bg-neutral-100 dark:bg-neutral-800 overflow-hidden min-w-[290px] rounded-md`}
      >
        <header className="p-2">
          <h3 className="font-semibold text-lg text-center dark:text-neutral-100">
            {title}
          </h3>
        </header>

        <main className="h-full p-2 dark:text-neutral-100">{children}</main>

        <footer className="p-2 flex justify-center gap-4">
          {buttons.map(({ label, onClick, type }) => (
            <Button type={type} key={label} onClick={onClick}>
              {label}
            </Button>
          ))}
        </footer>
      </div>
    </dialog>
  );
};

export default Modal;
