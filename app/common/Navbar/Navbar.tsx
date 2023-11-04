"use client";
import styled from "@emotion/styled";
import { Button, Tabs } from "antd";
import React from "react";
import { items } from "./items";
import { usePathname } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";
import useLogout from "@/app/hooks/useLogout";

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
  const pathname = usePathname();
  const { logout, openNotification, contextHolder } = useLogout();

  const logoutHandler = async () => {
    const success = await logout();
    if (!success) {
      openNotification("top");
    }
  };

  const operations = (
    <Button onClick={logoutHandler}>
      <LogoutOutlined />
      Logout
    </Button>
  );
  return (
    <NavStyled>
      {contextHolder}
      <TabsStyled
        tabBarExtraContent={operations}
        defaultActiveKey={pathname}
        items={items}
      />
    </NavStyled>
  );
}
