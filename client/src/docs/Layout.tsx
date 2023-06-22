import React from 'react';
import {SideBar} from '../ui';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from '../components/Header';

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className={'grid grid-rows-[auto,1fr] h-full w-full'}>
      <Header/>
      <main className={'grid grid-cols-[auto,1fr] h-full w-full'}>
        <SideBar
          expandedByDefault
          title={'YourDash Docs'}
          items={[
            {
              icon: 'home-16',
              label: 'Overview',
              onClick() {
                navigate('/docs/');
              }
            },
            {
              icon: 'info-16',
              label: 'Get Started',
              onClick() {
                navigate('/docs/get-started');
              }
            },
            {
              icon: 'accessibility-16',
              label: 'Translation',
              onClick() {
                navigate('/docs/translation');
              }
            }
          ]}
        />
        <Outlet/>
      </main>
    </main>
  );
};

export default DocsLayout;
