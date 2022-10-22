import styled from "styled-components";

export const DayContainer = styled.button<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : "transparent"};
  border: none;
  border-radius: 50%;
  height: ${({ theme }) => theme.spacing * 4}px;
  width: ${({ theme }) => theme.spacing * 4}px;
  cursor: pointer;
`;
