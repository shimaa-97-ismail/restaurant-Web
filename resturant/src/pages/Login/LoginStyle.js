// LoginStyles.js
import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 50%;
  margin: 5rem auto 0;
  padding-top: 5rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  transition: all 0.3s ease;
  min-height: 100vh;

 @media (max-width: 992px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 85%;
    padding-top: 4rem;
  }

  @media (max-width: 576px) {
    width: 95%;
    padding-top: 3rem;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

export const StyledForm = styled.form`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 2.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.card};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
   font-size: 1rem;

  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primary};
  }

  @media (max-width: 576px) {
    padding: 0.6rem 0.9rem;
    font-size: 0.9rem;
  }

`;

export const ErrorMsg = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-left: 0.3rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;

   @media (max-width: 576px) {
    justify-content: center;
  }
`;
