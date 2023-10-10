import { FormInstance } from "antd";
import { Dispatch, SetStateAction } from "react";

type NewType = FormInstance;

export interface PickerProps {
  form: NewType;
  activeColor: number;
  setActiveColor: Dispatch<SetStateAction<number>>;
}

export interface ListItemProps {
  color: string;
  isActive: () => boolean;
}
