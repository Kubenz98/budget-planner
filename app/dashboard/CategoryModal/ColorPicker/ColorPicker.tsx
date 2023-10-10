import { Tooltip } from "antd";
import { colors } from "../options";
import { PickerProps } from "./types";
import { ListStyled, ListItemStyled } from "./styled";
import { checkIsActive } from "./helpers/checkActiveColor";
import { colorChoose } from "./helpers/colorChoose";

export default function ColorPicker({
  form,
  activeColor,
  setActiveColor,
}: PickerProps) {
  return (
    <ListStyled>
      {colors.map((item) => (
        <Tooltip placement="top" title={item.label} key={item.label}>
          <ListItemStyled
            key={item.id}
            color={item.value}
            onClick={() =>
              colorChoose(item.value, item.id, form, setActiveColor)
            }
            isActive={() => checkIsActive(item.id, activeColor)}
          />
        </Tooltip>
      ))}
    </ListStyled>
  );
}
