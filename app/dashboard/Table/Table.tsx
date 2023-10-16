import { ColumnsType } from "antd/es/table";
import { InputStyled, TableStyled, TagStyled } from "./styled";
import { data } from "../DUMMY_DATA";

interface DataType {
  key: string;
  assigned: number;
  left: number;
  tag: string;
  color: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tags",
    dataIndex: "tag",
    render: (_, { tag, color }) => {
      return <TagStyled color={color}>{tag}</TagStyled>;
    },
  },
  {
    title: "Assigned",
    dataIndex: "assigned",
    render: (value, record, index) => (
      <InputStyled defaultValue={value} type="number" />
    ),
  },
  {
    title: "Left",
    dataIndex: "left",
  },
];

export default function BudgetTable() {
  return <TableStyled columns={columns} dataSource={data} rowKey={"id"} />;
}
