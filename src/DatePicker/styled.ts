import styled from "styled-components";
import { Flex } from "ingred-ui";

export const Container = styled(Flex)`
  padding: ${({ theme }) => theme.spacing}px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.radius}px;
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
