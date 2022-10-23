import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  border: 1px solid ${({ theme }) => theme.palette.gray.light};
  width: fit-content;
`;
