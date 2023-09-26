"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useSignIn from "@/app/hooks/useSignIn";
import { Typography } from "antd";
import styled from "@emotion/styled";

interface FormValues {
  email: string;
  password: string;
}

const { Paragraph, Title } = Typography;

export default function Page() {
  const router = useRouter();
  const { signIn, isLoading, isError } = useSignIn();

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;
    const valid = await signIn(email, password);
    if (valid) router.push("/dashboard");
  };

  const FormStyled = styled(Form)`
    margin: 0 auto;
    max-width: 400px;
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

  return (
    <main>
      <TitleStyled>Budget Planner</TitleStyled>
      <FormStyled
        name="basic"
        layout="vertical"
        initialValues={{
          email: "budget@example.com",
          password: "Demo123",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
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
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Form.Item>
      </FormStyled>
    </main>
  );
}
