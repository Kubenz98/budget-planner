import styled from "@emotion/styled";
import { Form, Typography } from "antd";

const { Paragraph, Title } = Typography;

export const FormStyled = styled(Form)`
  margin: 0 auto;
  max-width: 400px;
`;
export const ItemStyled = styled(Form.Item)`
  a {
    text-decoration: underline;
  }
  text-align: center;
`;

export const PStyled = styled(Paragraph)`
  &.ant-typography-danger {
    text-align: center;
  }
`;

export const TitleStyled = styled(Title)`
  &.ant-typography {
    margin: 5rem 0;
    text-align: center;
  }
`;
