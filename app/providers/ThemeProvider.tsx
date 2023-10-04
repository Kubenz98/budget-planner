"use client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "antd";

const { useToken } = theme;

export function EmotionProvider({ children }) {
  const { token } = useToken();
  token["gray-5"] = "#d9d9d9";
  return <ThemeProvider theme={token}>{children}</ThemeProvider>;
}
