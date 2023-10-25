"use client";
import styled from "@emotion/styled";
import { RQProvider } from "./providers/QueryClinetProvider";
import { EmotionProvider } from "./providers/ThemeProvider";
import StyledComponentsRegistry from "./lib/AntdRegistry";

const StyledBody = styled.body`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledBody>
        <RQProvider>
          <StyledComponentsRegistry>
            <EmotionProvider>{children}</EmotionProvider>
          </StyledComponentsRegistry>
        </RQProvider>
      </StyledBody>
    </html>
  );
}
