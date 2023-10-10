import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { colors } from "./options";
import ColorPicker from "./ColorPicker/ColorPicker";
import { ColorItemStyled, NameItemStyled } from "./styled";
import { CategoryModalProps } from "./types";

export default function CategoryModal({
  modalState,
  setModalState,
}: CategoryModalProps) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [activeColor, setActiveColor] = useState<null | number>(null);

  const handleAdd = () => {
    setSubmittable(false);
    const { category, color } = form.getFieldsValue();
    console.log(category, color);
  };

  const handleClose = () => {
    if (submittable) {
      setModalState(false);
      setSubmittable(true);
      setActiveColor(null);
      form.setFieldValue("category", "");
      form.setFieldValue("color", "");
    }
  };

  const values = Form.useWatch([], form);
  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      (val) => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

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
          onClick={handleAdd}
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
      </Form>
    </Modal>
  );
}
