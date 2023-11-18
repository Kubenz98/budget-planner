import styled from "@emotion/styled";
import { Form } from "antd";

export const NameItemStyled = styled(Form.Item)`
  &.ant-form-item {
    margin-top: 2rem;
  }
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
export const IdItem = styled(Form.Item)`
  display: none;
`;

export const ErrorMsgStyled = styled.p`
  text-align: center;
  color: ${(props) => props.theme["red-5"]};
`;
