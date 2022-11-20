import styled from "styled-components";

export const DayContainer = styled.button<{
  selected: boolean;
  isBetween: boolean;
}>`
  background-color: ${({ selected, isBetween, theme }) => {
    if (selected) {
      return theme.palette.primary.main;
    } else if (isBetween) {
      return theme.palette.primary.light;
    }
    return "transparent";
  }};
  border: none;
  border-radius: 50%;
  height: ${({ theme }) => theme.spacing * 4}px;
  width: ${({ theme }) => theme.spacing * 4}px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : theme.palette.primary.highlight};
    transition: 0.3s;
  }
`;
