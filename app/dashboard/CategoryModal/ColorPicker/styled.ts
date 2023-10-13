import styled from "@emotion/styled";
import { ListItemProps } from "./types";

export const ListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  row-gap: 1rem;
  padding: 0;
  margin-bottom: 4rem;
  list-style: none;
`;

export const ListItemStyled = styled.li<ListItemProps>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme[props.color + "3"]};
  border: ${(props) => {
    if (props.isActive()) {
      return `2px solid ${props.theme["gray-8"]}`;
    } else return "2px solid transparent";
  }};
  cursor: pointer;
  transition: border 0.15s;
`;
