import { Dispatch, SetStateAction } from "react";

export interface CategoryModalProps {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
}
