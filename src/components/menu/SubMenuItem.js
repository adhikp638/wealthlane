import React from 'react';
import styled from 'styled-components';

const StyledSubMenuItem = styled.a`
  /* Add your desired styles for the sub-menu item */
  display: block;
  text-decoration: none;
  padding-left: 8px;
  margin-top: 15px;
  color: black;

  /* Add hover styles */
  &:hover {
    background-color: lightgray;
  }
`;

const SubMenuItem = ({ label, link }) => {
  return (
    <StyledSubMenuItem href={link}>
      {label}
    </StyledSubMenuItem>
  );
};

export default SubMenuItem;
