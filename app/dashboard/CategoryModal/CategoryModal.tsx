import { Button, Form, Input, Modal, Select } from "antd";
import { colors } from "./options";
import ColorPicker from "./ColorPicker/ColorPicker";
import { ColorItemStyled, ErrorMsgStyled, NameItemStyled } from "./styled";
import { CategoryModalProps } from "./types";
import useCategory from "./hooks/useCategory";
import dayjs from "dayjs";

export default function CategoryModal({
  modalState,
  setModalState,
  date,
  setDate,
}: CategoryModalProps) {
  const {
    error,
    form,
    activeColor,
    setActiveColor,
    submittable,
    handleClose,
    handleAdd,
  } = useCategory(setModalState);

  const addCategory = async () => {
    await handleAdd();
    setDate(dayjs(date));
  };
  return (
    <Modal
      title="Add a new category"
      open={modalState}
      onCancel={handleClose}
      footer={[
        <Button key="1" onClick={handleClose}>
          Close
        </Button>,
        <Button
          key="2"
          type="primary"
          onClick={addCategory}
          disabled={!submittable}
        >
          Add
        </Button>,
      ]}
    >
      <Form name="CategoryForm" layout="vertical" form={form}>
        <NameItemStyled
          label="Name"
          name="category"
          rules={[
            {
              required: true,
              message: "Please enter a category name!",
            },
          ]}
        >
          <Input placeholder="Enter a category name" />
        </NameItemStyled>

        <ColorItemStyled
          label="Color"
          name="color"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={colors} />
        </ColorItemStyled>
        <ColorPicker
          form={form}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        {error && <ErrorMsgStyled>{error}</ErrorMsgStyled>}
      </Form>
    </Modal>
  );
}
