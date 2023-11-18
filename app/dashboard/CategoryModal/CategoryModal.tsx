import { Button, Form, Input, Modal, Select } from "antd";
import { colors } from "./options";
import ColorPicker from "./ColorPicker/ColorPicker";
import {
  ColorItemStyled,
  ErrorMsgStyled,
  IdItem,
  NameItemStyled,
} from "./styled";
import { CategoryModalProps } from "./types";
import useCategory from "./hooks/useCategory";
import useCategoryQuery from "../Table/hooks/useCategoryQuery";
import { useEffect } from "react";

export default function CategoryModal({
  modalState,
  setModalState,
  date,
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

  const { query } = useCategoryQuery(
    date.startOf("month").format("YYYY-MM-DD"),
    date.endOf("month").format("YYYY-MM-DD"),
  );

  const addCategory = async () => {
    await handleAdd();
    query.refetch();
  };

  useEffect(() => {
    if (!activeColor) {
      colors.forEach((color) => {
        if (color.value === modalState.color) {
          form.setFieldValue("color", modalState.color);
          form.setFieldValue("category", modalState.name);
          form.setFieldValue("id", modalState.id);
          setActiveColor(color.id);
        }
      });
    }
  }, [activeColor, form, modalState, setActiveColor]);

  const title = modalState.name ? "Edit category" : "Add a new category";

  return (
    <Modal
      title={title}
      open={modalState.isOpen}
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
          initialValue={modalState.name}
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
        <IdItem name="id">
          <Input type="hidden" />
        </IdItem>
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
