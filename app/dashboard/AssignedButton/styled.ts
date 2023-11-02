import styled from "@emotion/styled";
import { Typography } from "antd";

const { Text } = Typography;

export const TextStyled = styled(Text)`
  &.ant-typography {
    background-color: ${(props) => props.theme["volcano-5"]};
    color: white;
    font-size: 14px;
    padding: 0.25rem 1rem;
    border-radius: 1.5rem;
  }
`;
