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
  TextStyled,
  DateContainer,
  LeftOutlinedStyled,
  RightOutlinedStyled,
  TableStyled,
} from "./styled";
import CategoryModal from "./CategoryModal/CategoryModal";
import { columns, data } from "./DUMMY_DATA";

const monthFormat = "MMMM YYYY";

export default function BudgetPage() {
  const { user, userIsLoading } = useUser();
  const [month, setMonth] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
      <TableStyled columns={columns} dataSource={data} />
      <ButtonStyled type="dashed" onClick={showModal}>
        + New Category
      </ButtonStyled>
      <CategoryModal modalState={isModalOpen} setModalState={setIsModalOpen} />
    </>
  );
}
