// UserFormStyled.js
import styled from "styled-components";

export const FormWrapper = styled.div`
  /* max-width: 600px; */
  width: 50%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);

  @media(max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
      display: flex;
  flex-direction: column;
    width: 100%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

export const StyledInput = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;
  width:100%;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.buttonBg};
    box-shadow: 0 0 5px ${(props) => props.theme.buttonBg};
  }
`;

export const StyledSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// export const StyledButton = styled.BasicButton`
//   padding: 0.7rem 1.5rem;
//   border-radius: 8px;
//   border: none;
//   background-color: ${(props) => props.theme.buttonBg};
//   color: ${(props) => props.theme.buttonText};
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     opacity: 0.9;
//   }
// `;
