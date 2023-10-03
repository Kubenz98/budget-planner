"use client";
import { redirect } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import { Typography } from "antd";
import styled from "@emotion/styled";

const { Text } = Typography;

const TextStyled = styled(Text)`
  color: ${(props) => props.theme["magenta"]};
  font-size: 24px;
`;

export default function BudgetPage() {
  const { user, userIsLoading } = useUser();

  if (!user && !userIsLoading) {
    redirect("/");
  }
  if (user) return <TextStyled>Welcome {user.name}</TextStyled>;
}
