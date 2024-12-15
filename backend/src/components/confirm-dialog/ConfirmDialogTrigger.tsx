import { useDialogContext } from "../../contexts/DialogContext";

const ConfirmDialogTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { openModal } = useDialogContext();

  return (
    <div className={className} onClick={openModal}>
      {children}
    </div>
  );
};

export default ConfirmDialogTrigger;
