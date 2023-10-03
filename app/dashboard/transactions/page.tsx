"use client";

import React from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";

const { Text } = Typography;

const TextStyled = styled(Text)`
  color: ${(props) => props.theme["magenta"]};
  font-size: 24px;
`;

export default function TransactionsPage() {
  return <TextStyled>Transactions</TextStyled>;
}
