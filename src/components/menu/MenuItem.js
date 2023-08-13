import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SubMenuItem from './SubMenuItem';


const MenuItemContainer = styled.div`
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: ${({ fromBurger }) => (fromBurger ? '' : 'lightgray')};

  }

`;

const MenuItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: ${({ fromBurger }) => (fromBurger ? '10px' : '-5px')};

  padding-right: 20px; /* Add right padding */

  font-size: 18px;
 // width: fit-content;
  // border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    margin-top: ${({ isOpen }) => (isOpen ? '10px' : '8px')};
    //margin-right: 3px;
    top: 0;
    right: 0;
    transform: translateY(-10%) rotate(${({ isOpen }) => (isOpen ? '315deg' : '135deg')});
    width: 7px;
    height: 7px;
    border-style: solid;
    border-width: 1px 1px 0 0;
    border-color: black;
    transition: 0.3s ease-in-out;
  }

`;

const MenuItemTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: right;
  
`;

const StyledIcon = styled.div`
  transition: transform 0.3s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  right:0;
`;

const SubMenu = styled.div`
  position: ${({ fromBurger }) => (fromBurger ? 'relative' : 'absolute')};
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  overflow: hidden;
  top: ${({ fromBurger }) => (fromBurger ? '' : '35px')};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Include opacity in the transition */
  width: fit-content;
  white-space: nowrap;
  // background-color: rgba(245, 245, 240);
  background-color: rgba(245, 245, 250);
  //margin-left: -10px;
  border-radius: 5px;
  padding-right: ${({ fromBurger }) => (fromBurger ? '' : '15px')};
  padding-left: ${({ fromBurger }) => (fromBurger ? '' : '15px')};
  font-size: 16px;


`;


const MenuItem = ({ label, subMenuItems, fromBurger}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItemRef = useRef(null);

  const toggleSubMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOutsideClick = (event) => {
    if (!menuItemRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <MenuItemContainer fromBurger={fromBurger}>
      <MenuItemWrapper  ref={menuItemRef}  onClick={toggleSubMenu} isOpen={isOpen} fromBurger={fromBurger}>
          <MenuItemTextWrapper  isOpen={isOpen}>
            <span>{label}</span>
          </MenuItemTextWrapper>
          <SubMenu isOpen={isOpen} fromBurger={fromBurger}>
            {subMenuItems.map((item, index) => (
              <SubMenuItem key={index} label={item.label} link={item.link} />
            ))}
          </SubMenu>
      </MenuItemWrapper>
    </MenuItemContainer>
  );
};

export default MenuItem;
