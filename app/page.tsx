"use client";
import { Button, Form, FormInstance, Input } from "antd";
import { useRouter } from "next/navigation";
import useSignIn from "@/app/hooks/useSignIn";
import { Typography } from "antd";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const { Paragraph, Title } = Typography;

const FormStyled = styled(Form)`
  margin: 0 auto;
  max-width: 400px;
`;
const ItemStyled = styled(Form.Item)`
  a {
    text-decoration: underline;
  }
  text-align: center;
`;

const PStyled = styled(Paragraph)`
  &.ant-typography-danger {
    text-align: center;
  }
`;

const TitleStyled = styled(Title)`
  &.ant-typography {
    margin: 5rem 0;
    text-align: center;
  }
`;

export default function Page() {
  const router = useRouter();
  const { signIn, isLoading, isError } = useSignIn();
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
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    );
  };

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;
    const valid = await signIn(email, password);
    if (valid) router.push("/dashboard");
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
          <SubmitButton form={form} />
        </Form.Item>
      </FormStyled>
    </>
  );
}
