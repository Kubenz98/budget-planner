import useUser from "@/app/hooks/useUser";
import { TextStyled } from "./styled";

const AssignedButton = () => {
  const { user, userIsLoading } = useUser();
  if (user && !userIsLoading) {
    return <TextStyled>{user.wallet} to be assigned</TextStyled>;
  } else return;
};

export default AssignedButton;
