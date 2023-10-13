import styled from "@emotion/styled";
import { Button, Typography, Table, Tag } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const TextStyled = styled(Text)`
  background-color: ${(props) => props.theme["volcano-5"]};
  color: white;
  font-size: 14px;
  padding: 0.25rem 1rem;
  border-radius: 1.5rem;
`;
export const TitleStyled = styled(Title)`
  font-size: 20px;
  color: ${(props) => props.theme["colorText"]};
`;
export const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => props.theme["gray-5"]};
`;
export const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
export const LeftOutlinedStyled = styled(LeftOutlined)`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme["gray-6"]};
  border-radius: 0.3rem;
`;
export const RightOutlinedStyled = styled(RightOutlined)`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme["gray-6"]};
  border-radius: 0.3rem;
`;
export const ButtonStyled = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;
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
