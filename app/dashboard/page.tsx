"use client";
import { redirect } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import type { DatePickerProps } from "antd";
import { Typography, DatePicker } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";

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

const DatePickerStyled = styled(DatePicker)`
  margin-top: 1rem;
`;

const monthFormat = "MMMM YYYY";

export default function BudgetPage() {
  const { user, userIsLoading } = useUser();

  const monthChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
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
      <DatePickerStyled
        defaultValue={dayjs()}
        onChange={monthChange}
        picker="month"
        format={monthFormat}
      />
    </>
  );
}
