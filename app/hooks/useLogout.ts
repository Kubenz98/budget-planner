import { notification } from "antd";
import { fetchJson } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationPlacement } from "antd/es/notification/interface";

const useLogout = () => {
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

  const logout = async () => {
    const { success } = await fetchJson("/api/logout");
    if (success) {
      queryClient.setQueryData(["user"], null);
      return true;
    } else return false;
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Error!`,
      description:
        "An error occurred while logging out. Please try again later.",
      placement,
    });
  };

  return { logout, openNotification, contextHolder };
};

export default useLogout;
