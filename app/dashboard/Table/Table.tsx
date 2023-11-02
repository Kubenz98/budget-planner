import { ColumnsType } from "antd/es/table";
import { InputStyled, TableStyled, TagStyled } from "./styled";
import { useGetCategories } from "./hooks/useCategory";

interface DataType {
  key: string;
  assigned: number;
  left: number;
  name: string;
  color: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tags",
    dataIndex: "tag",
    render: (_, { name, color }) => {
      return <TagStyled color={color}>{name}</TagStyled>;
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
  const { getCategories } = useGetCategories();
  let data = [];
  if (!getCategories.isLoading && getCategories.data) {
    data = getCategories.data.categories.data.attributes.results;
  }

  return (
    <TableStyled
      loading={getCategories.isLoading}
      columns={columns}
      dataSource={data}
      rowKey={"id"}
    />
  );
}
