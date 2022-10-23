import styled from "styled-components";
import { Flex } from "ingred-ui";

export const Container = styled(Flex)`
  padding: ${({ theme }) => theme.spacing}px;
  border: none;
  width: fit-content;
`;

export const DatePickerContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: ${({ theme }) => theme.spacing}px;
`;

export const DayStyle = styled.span`
  padding: ${({ theme }) => theme.spacing / 2}px
    ${({ theme }) => theme.spacing}px;
  text-align: center;
`;
