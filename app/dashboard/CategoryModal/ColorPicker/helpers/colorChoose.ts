import { FormInstance } from "antd";
import { Dispatch, SetStateAction } from "react";

export const colorChoose = (
  color: string,
  id: number,
  form: FormInstance,
  setActiveColor: Dispatch<SetStateAction<number>>,
) => {
  form.setFieldValue("color", color);
  setActiveColor(id);
};
