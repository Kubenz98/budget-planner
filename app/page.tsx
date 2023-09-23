"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useSignIn from "@/app/hooks/useSignIn";
import { Typography } from "antd";

interface FormValues {
  email: string;
  password: string;
}

const { Paragraph } = Typography;

export default function Page() {
  const router = useRouter();
  const { signIn, isLoading, isError } = useSignIn();

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;
    const valid = await signIn(email, password);
    if (valid) router.push("/dashboard");
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{
        maxWidth: 400,
      }}
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
          <Paragraph type="danger" style={{ textAlign: "center" }}>
            Wrong credentials!
          </Paragraph>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isLoading} block>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </Form.Item>
    </Form>
  );
}
