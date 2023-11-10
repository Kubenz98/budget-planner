import { ColumnsType } from "antd/es/table";
import { InputStyled, TableStyled, TagStyled } from "./styled";
import { useGetCategories } from "./hooks/useCategory";
import { Dayjs } from "dayjs";
import { useEffect } from "react";

interface DataType {
  key: string;
  assigned: number;
  left: number;
  name: string;
  color: string;
}

interface TableProps {
  date: Dayjs;
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
    dataIndex: "amount",
    render: (value) => <InputStyled defaultValue={value} type="number" />,
  },
  {
    title: "Left",
    dataIndex: "left",
  },
];

export default function BudgetTable({ date }: TableProps) {
  const { getMonthlyData, mutation } = useGetCategories();

  useEffect(() => {
    const firstDayOfMonth = date.startOf("month").format("YYYY-MM-DD");
    const lastDayOfMonth = date.endOf("month").format("YYYY-MM-DD");
    getMonthlyData(firstDayOfMonth, lastDayOfMonth);
  }, [getMonthlyData, date]);

  return (
    <TableStyled
      loading={mutation.isLoading}
      columns={columns}
      dataSource={mutation.data}
      rowKey={"id"}
    />
  );
}
