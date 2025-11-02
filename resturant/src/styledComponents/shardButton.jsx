import styled from "styled-components";



export const BasicButton = styled.button`
  background-color:${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:  ${({ hoverColor, color }) => hoverColor || darken(color || "#d08700")};
    transform: scale(1.05);
  }
`;
function darken(hex) {
  if (!hex) return "#b96f00";
  let c = hex.substring(1); // remove #
  const num = parseInt(c, 16);
  const r = Math.max(0, (num >> 16) - 30);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 30);
  const b = Math.max(0, (num & 0x0000ff) - 30);
  return `rgb(${r}, ${g}, ${b})`;
}






