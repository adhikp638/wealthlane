import React from 'react';
import menuData from './menuData';
import MenuItem from './MenuItem';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  top: ${({ fromBurger }) => (fromBurger ? '18px' : '')};
  gap: 10px;
  flex-direction: ${({ fromBurger }) => (fromBurger ? 'column' : 'row')};
  justify-content: ${({ fromBurger }) => (fromBurger? '' : 'space-between')};
  // background-color: white;


  min-height: ${({ fromBurger }) => (fromBurger ? '100px' : '')};
`;

const Menu = ({ fromBurger }) => {
  return (
    <MenuWrapper fromBurger={fromBurger}>
      {menuData.map((item, index) => (
        <MenuItem key={index} label={item.menuItem} subMenuItems={item.subMenuItems} fromBurger={fromBurger}/>
      ))}
    </MenuWrapper>
  );
};

export default Menu;
