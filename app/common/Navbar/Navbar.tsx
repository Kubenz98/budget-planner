"use client";
import styled from "@emotion/styled";
import { Tabs } from "antd";
import React from "react";
import { items } from "./items";

const NavStyled = styled.nav`
  padding: 0 16px;
`;
const TabsStyled = styled(Tabs)`
  .ant-tabs-ink-bar {
    color: ${(props) => props.theme["geekblue-5"]};
  }
  .ant-tabs-tab {
    padding: 0;
  }
  .ant-tabs-tab a {
    color: ${(props) => props.theme.colorText};
    padding: 12px 0;
  }
  .ant-tabs-tab-active a {
    color: ${(props) => props.theme["geekblue-5"]};
  }
`;

export default function Navbar() {
  return (
    <NavStyled>
      <TabsStyled items={items} />
    </NavStyled>
  );
}