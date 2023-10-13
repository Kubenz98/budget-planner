import { ColumnsType } from "antd/es/table";
import { TagStyled } from "./styled";

interface DataType {
  key: string;
  assigned: number;
  left: number;
  tag: string;
  color: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tag, color }) => {
      return <TagStyled color={color}>{tag}</TagStyled>;
    },
  },
  {
    title: "Assigned",
    dataIndex: "assigned",
    key: "assigned",
  },
  {
    title: "Left",
    dataIndex: "left",
    key: "left",
  },
];

export const data: DataType[] = [
  {
    key: "1",
    assigned: 500,
    left: 100,
    tag: "Category",
    color: "lime",
  },
  {
    key: "2",
    assigned: 600,
    left: 0,
    tag: "Home",
    color: "magenta",
  },
  {
    key: "3",
    assigned: 800,
    left: 200,
    tag: "Food",
    color: "green",
  },
];
