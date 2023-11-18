import { fetchJson } from "@/app/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CategoryResponse, CategoryVariables } from "../types";

const useCategory = (
  setModalState: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      id?: number;
      color?: string;
    }>
  >,
) => {
  const mutation = useMutation<CategoryResponse, Error, CategoryVariables>(
    ({ category, color, id }) =>
      fetchJson("/api/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, color, id }),
      }),
  );

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);
  const [activeColor, setActiveColor] = useState<null | number>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      (val) => {
        if (val.category && val.color) setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  const addCategory = async (category: string, color: string, id: number) => {
    try {
      const response = await mutation.mutateAsync({ category, color, id });
      return response;
    } catch (err) {
      return JSON.parse(err.responseText);
    }
  };

  const handleCloseButton = () => {
    setModalState({ isOpen: false });
    setSubmittable(true);
    setActiveColor(null);
    setError("");
    form.setFieldValue("category", "");
    form.setFieldValue("color", "");
    form.setFieldValue("id", "");
  };

  const handleAddButton = async () => {
    setSubmittable(false);
    const { category, color, id } = form.getFieldsValue();
    const response = await addCategory(category, color, id);

    if (response.success) {
      handleCloseButton();
      error && setError("");
    } else if (!response.success && response.message === "Category exists") {
      setError(response.message);
    } else if (
      !response.success &&
      response.message === "Internal Server Error"
    ) {
      setError(response.message);
    }
  };

  return {
    addCategory,
    error,
    form,
    activeColor,
    setActiveColor,
    submittable,
    handleAdd: handleAddButton,
    handleClose: handleCloseButton,
  };
};

export default useCategory;
