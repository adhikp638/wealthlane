import React from 'react';
import menuData from './menuData';
import MenuItem from './MenuItem';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  top: ${({ fromBurger }) => (fromBurger ? '20px' : '')};
  gap: 10px;
  flex-direction: ${({ fromBurger }) => (fromBurger ? 'column' : 'row')};
  justify-content: ${({ fromBurger }) => (fromBurger? '' : 'space-between')};
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
