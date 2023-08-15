import React from 'react';
import styled from 'styled-components';
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledSubMenuItem = styled.a`
  /* Add your desired styles for the sub-menu item */
  display: block;
  text-decoration: none;
  padding-left: 8px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-right: 8px;
  color: black;
  border-radius: 5px;
  min-width: 100px;
  /* Add hover styles */
  &:hover {
    background-color: lightgray;
  }
`;

const SubMenuItem = ({ label, link }) => {
  return (
    <StyledSubMenuItem href={link}>
      <FontAwesomeIcon icon={faSignIn}/>&nbsp;&nbsp;{label}
    </StyledSubMenuItem>
  );
};

export default SubMenuItem;
