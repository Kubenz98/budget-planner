import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

type CategoryModalProps = {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export default function CategoryModal({
  modalState,
  setModalState,
}: CategoryModalProps) {
  const handleOk = () => {
    setModalState(false);
  };

  const handleCancel = () => {
    setModalState(false);
  };

  return (
    <Modal
      title="Add a new category"
      open={modalState}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
