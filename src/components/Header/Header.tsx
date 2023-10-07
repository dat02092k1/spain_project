import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { useStoreActions } from '../../store/hook';
import { useNavigate } from 'react-router-dom';

function Header() {
  const removeState = useStoreActions((actions) => actions.removeState);
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    removeState();
    navigate('/signin');
  };
  
  const items: MenuProps['items'] = [
    {
      label: 'Logout',
      key: '1',
    },
   
  ];

  return (
    <header className='bg-[#333] text-[#fff] p-[1rem] flex justify-between'>
    <h1>Nano ? </h1>

    <Dropdown menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
    <div className=' w-[28px] h-[28px]  right-3 top-3 cursor-pointer '>
            <img src="https://static2.vieon.vn/voting/static/media/user.5ff4e35663aa679785c5.png" alt="" /> 
    </div>
    </a>
  </Dropdown>
  </header>
  )
}

export default Header