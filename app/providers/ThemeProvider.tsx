"use client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "antd";

const { useToken } = theme;

export function EmotionProvider({ children }) {
  const { token } = useToken();
  return <ThemeProvider theme={token}>{children}</ThemeProvider>;
}
