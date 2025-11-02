import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }
`;
