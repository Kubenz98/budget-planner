import { Button, Form, Input, Modal, Select } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { colors } from "./options";

type CategoryModalProps = {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export default function CategoryModal({
  modalState,
  setModalState,
}: CategoryModalProps) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(true);

  const handleAdd = () => {
    setSubmittable(false);
    const { category, color } = form.getFieldsValue();
    console.log(category, color);
  };

  const handleClose = () => {
    setModalState(false);
    setSubmittable(true);
    form.setFieldValue("category", "");
    form.setFieldValue("color", "");
  };

  return (
    <Modal
      title="Add a new category"
      open={modalState}
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
        <Form.Item
          label="Name"
          name="category"
          rules={[
            {
              required: true,
              message: "Please enter a category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a color" options={colors} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
