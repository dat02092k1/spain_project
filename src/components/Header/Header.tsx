import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';

function Header() {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
    },
   
  ];

  
  return (
    <header style={{ background: '#333', color: '#fff', padding: '1rem' }}>
    <h1>How can i meet you, Nano ? </h1>

    <Dropdown menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
    <div className='absolute w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] right-3 top-3 cursor-pointer opacity-50'>
            <img src="https://static2.vieon.vn/voting/static/media/user.5ff4e35663aa679785c5.png" alt="" /> 
    </div>
    </a>
  </Dropdown>
  </header>
  )
}

export default Header