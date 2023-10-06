import styled from "@emotion/styled";
import { Typography } from "antd";

const { Text } = Typography;

export const TextStyled = styled(Text)`
  color: ${(props) => props.theme["magenta"]};
  font-size: 24px;
`;
