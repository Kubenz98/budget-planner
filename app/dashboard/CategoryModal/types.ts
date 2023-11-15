import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

export interface CategoryModalProps {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  date: Dayjs;
}

export interface CategoryVariables {
  category: string;
  color: string;
}

export interface CategoryResponse {
  message: string;
  success: boolean;
}
