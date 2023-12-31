"use client";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useSignUp from "./hooks/useSignUp";
import { FormStyled, PStyled, TitleStyled } from "./styled";
import SubmitButton from "../hooks/SubmitButton";

interface FormValues {
  email: string;
  newPassword: string;
  username: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading, hookError } = useSignUp();
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    const { email, newPassword, username } = values;
    const validSignUp = await signUp(username, email, newPassword);
    if (validSignUp) router.push("/dashboard");
  };

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
                  new Error("The password must have at least 6 characters!"),
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
                  new Error("The new password that you entered do not match!"),
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
          <SubmitButton form={form} isLoading={isLoading} />
        </Form.Item>
      </FormStyled>
    </>
  );
}
