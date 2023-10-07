import { FormInstance, Form, Button } from "antd";
import { useState, useEffect } from "react";

const SubmitButton = ({
  form,
  isLoading,
}: {
  form: FormInstance;
  isLoading: boolean;
}) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values, form]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable || isLoading}
      block
    >
      {isLoading ? "Signing up..." : "Sign up"}
    </Button>
  );
};

export default SubmitButton;
