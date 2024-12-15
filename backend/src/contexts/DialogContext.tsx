import React from "react";

type DialogContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const DialogContext = React.createContext<DialogContext | undefined>(undefined);

export const DialogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const value: DialogContext = {
    isModalOpen,
    closeModal() {
      setIsModalOpen(false);
    },
    openModal() {
      setIsModalOpen(true);
    },
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

export default DialogContext;

export const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  return context as DialogContext;
};
