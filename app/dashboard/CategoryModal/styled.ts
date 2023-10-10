import styled from "@emotion/styled";
import { Form } from "antd";

export const NameItemStyled = styled(Form.Item)`
  margin-top: 2rem;
`;
export const ColorItemStyled = styled(Form.Item)`
  margin-bottom: 0;
  .ant-col.ant-form-item-label label {
    display: block;
  }
  .ant-col.ant-form-item-control {
    display: none;
  }
`;
