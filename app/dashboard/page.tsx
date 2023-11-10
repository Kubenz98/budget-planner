"use client";
import { redirect } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { ButtonStyled, TitleStyled } from "./styled";
import {
  DivStyled,
  DateContainer,
  LeftOutlinedStyled,
  RightOutlinedStyled,
} from "./styled";
import CategoryModal from "./CategoryModal/CategoryModal";
import BudgetTable from "./Table/Table";
import AssignedButton from "./AssignedButton/AssignedButton";

const monthFormat = "MMMM YYYY";

export default function BudgetPage() {
  const { user, userIsLoading } = useUser();
  const [date, setDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const monthChange: DatePickerProps["onChange"] = (date) => {
    setDate(date);
  };

  const monthHandle = (action: string) => {
    action === "increase"
      ? setDate((prevState) => prevState.add(1, "month"))
      : setDate((prevState) => prevState.subtract(1, "month"));
  };

  if (!user && !userIsLoading) {
    redirect("/");
  }
  return (
    <>
      <DivStyled>
        <TitleStyled>Budget</TitleStyled>
        <AssignedButton />
      </DivStyled>
      <DateContainer>
        <DatePicker
          value={date}
          onChange={monthChange}
          picker="month"
          format={monthFormat}
        />
        <div>
          <LeftOutlinedStyled onClick={() => monthHandle("decrease")} />
          <RightOutlinedStyled onClick={() => monthHandle("increase")} />
        </div>
      </DateContainer>
      <BudgetTable date={date} />
      <ButtonStyled type="dashed" onClick={showModal}>
        + New Category
      </ButtonStyled>
      <CategoryModal
        modalState={isModalOpen}
        setModalState={setIsModalOpen}
        date={date}
        setDate={setDate}
      />
    </>
  );
}
