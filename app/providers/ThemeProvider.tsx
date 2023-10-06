"use client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "antd";

const { useToken } = theme;

export function EmotionProvider({ children }) {
  const { token } = useToken();
  token["gray-1"] = "#ffffff";
  token["gray-2"] = "#fafafa";
  token["gray-3"] = "#f5f5f5";
  token["gray-4"] = "#f0f0f0";
  token["gray-5"] = "#d9d9d9";
  token["gray-6"] = "#bfbfbf";
  token["gray-7"] = "#8c8c8c";
  token["gray-8"] = "#595959";
  token["gray-9"] = "#434343";
  token["gray-10"] = "#262626";
  token["gray-11"] = "#1f1f1f";
  token["gray-12"] = "#141414";
  token["gray-13"] = "#000000";
  return <ThemeProvider theme={token}>{children}</ThemeProvider>;
}
