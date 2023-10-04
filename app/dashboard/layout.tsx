"use client";
import styled from "@emotion/styled";
import Navbar from "../common/Navbar/Navbar";

const MainStyled = styled.main`
  padding: 0.5rem;
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MainStyled>{children}</MainStyled>
    </>
  );
}
