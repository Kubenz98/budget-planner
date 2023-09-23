"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useSignIn from "@/app/hooks/useSignIn";
import { Typography } from "antd";

interface FormValues {
  email: string;
  password: string;
}

const { Text } = Typography;

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
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
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
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {isError && <Text type="danger">Wrong credentials!</Text>}
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </Form.Item>
    </Form>
  );
}
