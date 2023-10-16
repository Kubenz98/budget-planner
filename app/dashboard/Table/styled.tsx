import styled from "@emotion/styled";
import { Input, Table, Tag } from "antd";

export const TableStyled = styled(Table)`
  margin-top: 1rem;
  .ant-table-thead th.ant-table-cell {
    background-color: ${(props) => props.theme["geekblue-1"]};
  }
`;

export const TagStyled = styled(Tag)`
  padding: 0.1rem 0.5rem;
  font-weight: 600;
`;
export const InputStyled = styled(Input)`
  max-width: 6rem;
`;
