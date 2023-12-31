import { InputStyled, TableStyled, TagStyled } from "./styled";
import { Dayjs } from "dayjs";
import { Form } from "antd";
import Column from "antd/es/table/Column";
import useCategoryQuery from "./hooks/useCategoryQuery";
import { useEffect } from "react";

interface TableProps {
  date: Dayjs;
  setModalState: ({
    isOpen,
    id,
    color,
    name,
  }: {
    isOpen: boolean;
    id: number;
    color: string;
    name: string;
  }) => void;
}

export default function BudgetTable({ date, setModalState }: TableProps) {
  const { data, isLoading, query } = useCategoryQuery(
    date.startOf("month").format("YYYY-MM-DD"),
    date.endOf("month").format("YYYY-MM-DD"),
  );
  const [form] = Form.useForm();
  const submitForm = () => {
    console.log(form.getFieldsValue());
  };

  useEffect(() => {
    (async () => {
      const response = await query.refetch();
      form.setFieldsValue({ categories: response.data });
    })();
    // eslint-disable-next-line
  }, [date, query.refetch, form.setFieldsValue]);

  const changeCategoryName = (id: number, color: string, name: string) => {
    setModalState({ isOpen: true, id, color, name });
  };

  return (
    <Form name="budgetForm" form={form}>
      <Form.List name="categories" initialValue={data}>
        {() => {
          return (
            <TableStyled
              loading={isLoading}
              dataSource={data}
              rowKey="id"
              pagination={false}
            >
              <Column
                dataIndex="name"
                title="Category"
                render={(_, { name, color, id }, index) => {
                  return (
                    <Form.Item name={[index, "id"]} initialValue={id}>
                      <TagStyled
                        color={color}
                        onClick={() => changeCategoryName(id, color, name)}
                      >
                        {name}
                      </TagStyled>
                    </Form.Item>
                  );
                }}
              />
              <Column
                dataIndex="amount"
                title="Assigned"
                render={(value, { name, amount, id }, index) => {
                  return (
                    <Form.Item name={[index, "amount"]} initialValue={amount}>
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
