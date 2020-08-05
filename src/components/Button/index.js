import styled from "styled-components";

const Button = styled.button`
  color: var(--white);
  border: 1px solid;
  background: var(--background);
  border-color: #c00000;
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

export default Button;
