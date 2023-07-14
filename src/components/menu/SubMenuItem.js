import React from 'react';
import styled from 'styled-components';

const StyledSubMenuItem = styled.a`
  /* Add your desired styles for the sub-menu item */
  display: block;
  text-decoration: none;
  color: white;
  padding-left: 8px;
  padding-top: 10px;
`;

const SubMenuItem = ({ label, link }) => {
  return (
    <StyledSubMenuItem href={link}>
      {label}
    </StyledSubMenuItem>
  );
};

export default SubMenuItem;
