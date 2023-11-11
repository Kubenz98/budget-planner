import { InputStyled, TableStyled, TagStyled } from "./styled";
import { useGetCategories } from "./hooks/useCategory";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { Form } from "antd";
import Column from "antd/es/table/Column";

interface TableProps {
  date: Dayjs;
}

export default function BudgetTable({ date }: TableProps) {
  const { getMonthlyData, mutation } = useGetCategories();
  const [form] = Form.useForm();

  useEffect(() => {
    const firstDayOfMonth = date.startOf("month").format("YYYY-MM-DD");
    const lastDayOfMonth = date.endOf("month").format("YYYY-MM-DD");
    getMonthlyData(firstDayOfMonth, lastDayOfMonth);
  }, [getMonthlyData, date]);

  const submitForm = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <Form name="budgetForm" form={form}>
      <Form.List name="categories" initialValue={mutation.data}>
        {() => {
          return (
            <TableStyled
              loading={mutation.isLoading}
              dataSource={mutation.data}
              rowKey="id"
              pagination={false}
            >
              <Column
                dataIndex="name"
                title="Category"
                render={(_, { name, color }, index) => {
                  return (
                    <Form.Item name={[index, "category"]}>
                      <TagStyled color={color}>{name}</TagStyled>
                    </Form.Item>
                  );
                }}
              />
              <Column
                dataIndex="amount"
                title="Assigned"
                render={(value, { name, amount, id }, index) => {
                  return (
                    <Form.Item name={[name, "amount"]} initialValue={amount}>
                      <InputStyled type="number" onBlur={submitForm} />
                    </Form.Item>
                  );
                }}
              />
              <Column dataIndex="left" title="Left" />
            </TableStyled>
          );
        }}
      </Form.List>
    </Form>
  );
}
