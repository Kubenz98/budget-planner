"use client";
import { Form, Input } from "antd";
import { redirect } from "next/navigation";
import useSignIn from "@/app/hooks/useSignIn";
import Link from "next/link";
import { TitleStyled, FormStyled, PStyled, ItemStyled } from "./styled";
import SubmitButton from "./hooks/SubmitButton";
import useUser from "./hooks/useUser";

interface FormValues {
  email: string;
  password: string;
}

export default function Page() {
  const { user, userIsLoading } = useUser();
  const { signIn, isLoading, isError } = useSignIn();
  const [form] = Form.useForm();

  if (user && !userIsLoading) {
    redirect("/dashboard");
  }

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;
    await signIn(email, password);
  };

  return (
    <>
      <TitleStyled>Budget Planner</TitleStyled>
      <FormStyled
        name="basic"
        layout="vertical"
        initialValues={{
          email: "budget@example.com",
          password: "Demo123",
        }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {isError && (
          <Form.Item>
            <PStyled type="danger">Wrong credentials!</PStyled>
          </Form.Item>
        )}
        <ItemStyled>
          <Link href="/signup">Click here to create new account!</Link>
        </ItemStyled>
        <Form.Item>
          <SubmitButton form={form} isLoading={isLoading} />
        </Form.Item>
      </FormStyled>
    </>
  );
}
