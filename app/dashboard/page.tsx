"use client";
import { redirect } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import type { DatePickerProps } from "antd";
import { Typography, DatePicker } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const TextStyled = styled(Text)`
  background-color: ${(props) => props.theme["volcano-5"]};
  color: white;
  font-size: 14px;
  padding: 0.25rem 1rem;
  border-radius: 1.5rem;
`;
const TitleStyled = styled(Title)`
  font-size: 20px;
  color: ${(props) => props.theme["colorText"]};
`;
const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => props.theme["gray-5"]};
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
const LeftOutlinedStyled = styled(LeftOutlined)`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme["gray-6"]};
`;
const RightOutlinedStyled = styled(RightOutlined)`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme["gray-6"]};
`;

const monthFormat = "MMMM YYYY";

export default function BudgetPage() {
  const { user, userIsLoading } = useUser();
  const [month, setMonth] = useState(dayjs());

  const monthChange: DatePickerProps["onChange"] = (date) => {
    setMonth(date);
  };

  const monthHandle = (action: string) => {
    action === "increase"
      ? setMonth((prevState) => prevState.add(1, "month"))
      : setMonth((prevState) => prevState.subtract(1, "month"));
  };

  if (!user && !userIsLoading) {
    redirect("/");
  }

  return (
    <>
      <DivStyled>
        <TitleStyled>Budget</TitleStyled>
        <TextStyled>1520 to be assigned</TextStyled>
      </DivStyled>
      <DateContainer>
        <DatePicker
          value={month}
          onChange={monthChange}
          picker="month"
          format={monthFormat}
        />
        <div>
          <LeftOutlinedStyled onClick={() => monthHandle("decrease")} />
          <RightOutlinedStyled onClick={() => monthHandle("increase")} />
        </div>
      </DateContainer>
    </>
  );
}
