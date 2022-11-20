import styled from "styled-components";
import { Flex } from "ingred-ui";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  border: 1px solid ${({ theme }) => theme.palette.gray.light};
  width: fit-content;
`;

export const DatePickerContainer = styled(Flex)`
  padding: ${({ theme }) => theme.spacing}px;
  border: none;
  width: fit-content;
`;

export const CalendarContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: ${({ theme }) => theme.spacing * 6}px;
`;

export const DayStyle = styled.span`
  padding: ${({ theme }) => theme.spacing / 2}px 0;
  text-align: center;
`;
