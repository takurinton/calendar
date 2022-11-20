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
  color: ${({ selected, theme }) =>
    selected ? theme.palette.white : theme.palette.black};
  border: none;
  border-radius: ${({ theme, isBetween }) =>
    isBetween ? theme.radius : "50%"};
  height: ${({ theme }) => theme.spacing * 5}px;
  width: ${({ theme }) => theme.spacing * 5}px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : theme.palette.primary.highlight};
    transition: 0.3s;
  }
`;
