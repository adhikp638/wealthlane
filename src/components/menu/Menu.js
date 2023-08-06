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

  background-color: rgba(245, 245, 250);

  min-height: ${({ fromBurger }) => (fromBurger ? '100px' : '')};

  height: 25%;
  border-radius: 5px;
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
