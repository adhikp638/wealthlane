import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SubMenuItem from './SubMenuItem';

const MenuItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  margin-left: 20px;
  margin-right: 10px;
  padding-right: 20px;
  font-size: 16px;


  &::after {
    content: '';
    position: absolute;
    margin-top: 8px;
    margin-right: 5px;
    top: 0;
    right: 0;
    transform: translateY(-10%) rotate(${({ isOpen }) => (isOpen ? '315deg' : '135deg')});
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 1px 1px 0 0;
    border-color: white;
    //transform-origin: ${({ isOpen }) => (isOpen ? 'center bottom' : 'center center')};
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
  top: ${({ fromBurger }) => (fromBurger ? '' : '25px')};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Include opacity in the transition */
  margin-left: 10px;
  width: fit-content;
  white-space: nowrap;
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
    <MenuItemWrapper  ref={menuItemRef}  onClick={toggleSubMenu} isOpen={isOpen}>
        <MenuItemTextWrapper  isOpen={isOpen}>
          <span>{label}</span>
        </MenuItemTextWrapper>
        <SubMenu isOpen={isOpen} fromBurger={fromBurger}>
          {subMenuItems.map((item, index) => (
            <SubMenuItem key={index} label={item.label} link={item.link} />
          ))}
        </SubMenu>
    </MenuItemWrapper>
  );
};

export default MenuItem;
