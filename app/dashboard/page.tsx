"use client";
import { redirect } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { TitleStyled } from "./styled";
import {
  DivStyled,
  TextStyled,
  DateContainer,
  LeftOutlinedStyled,
  RightOutlinedStyled,
} from "./styled";

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
