import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

export interface CategoryModalProps {
  modalState: { isOpen: boolean; id?: number; color?: string; name?: string };
  setModalState: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      id?: number;
      color?: string;
    }>
  >;
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
