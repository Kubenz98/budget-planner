"use client";
import styled from "@emotion/styled";
import { Button, Form, FormInstance, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSignUp from "./hooks/useSignUp";

interface FormValues {
  email: string;
  newPassword: string;
  passwordRepeat: string;
  username: string;
}

const { Paragraph } = Typography;

const PStyled = styled(Paragraph)`
  &.ant-typography-danger {
    text-align: center;
  }
`;

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading, hookError } = useSignUp();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = useState(false);

    const values = Form.useWatch([], form);

    useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
    }, [values]);
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

  const onFinish = async (values: FormValues) => {
    const { email, newPassword, username } = values;
    const validSignUp = await signUp(username, email, newPassword);
    if (validSignUp) router.push("/dashboard");
  };

  const FormStyled = styled(Form)`
    margin: 0 auto;
    max-width: 400px;
  `;

  const TitleStyled = styled(Title)`
    &.ant-typography {
      margin: 5rem 0;
      text-align: center;
    }
  `;

  return (
    <>
      <TitleStyled>Create an account</TitleStyled>
      <FormStyled
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            () => ({
              validator(_, value) {
                if (value && value.length > 5) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password must have at least 6 characters!")
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="pwd" />
        </Form.Item>
        <Form.Item
          label="Password Repeat"
          name="passwordRepeat"
          rules={[
            {
              required: true,
              message: "Please repeat your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {hookError && (
          <Form.Item>
            <PStyled type="danger">Something went wrong!</PStyled>
          </Form.Item>
        )}
        <Form.Item>
          <SubmitButton form={form} />
        </Form.Item>
      </FormStyled>
    </>
  );
}
