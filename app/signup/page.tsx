"use client";
import styled from "@emotion/styled";
import { Button, Form, Input, Typography } from "antd";

interface FormValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export default function Signup() {
  const { Title } = Typography;

  const onFinish = async (values: FormValues) => {
    const { email, password, passwordRepeat } = values;
    console.log(email, password, passwordRepeat);
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
          label="Password Repeat"
          name="passwordRepeat"
          rules={[
            {
              required: true,
              message: "Please repeat your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign up
          </Button>
        </Form.Item>
      </FormStyled>
    </>
  );
}
