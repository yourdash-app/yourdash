import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';

import clippy from '../helpers/clippy';

import Panel, {PanelPosition} from './Panel/Panel';

const Layout: React.FC = () => {
  const [panelLayout, setPanelLayout] = useState<PanelPosition>(
    PanelPosition.left
  );

  if (new URLSearchParams(window.location.search).has('standalone')) {
    return <Outlet/>;
  }

  return (
    <div
      style={{
        ...(
          (panelLayout === PanelPosition.left || panelLayout === PanelPosition.right)
            ? {
              gridTemplateColumns:
                panelLayout === PanelPosition.left ? 'auto 1fr' : '1fr auto'
            }
            : {
              gridTemplateRows:
                panelLayout === PanelPosition.top ? 'auto 1fr' : '1fr auto'
            }
        )
      }}
      className={'grid h-screen'}
    >
      <Panel
        setSide={val => setPanelLayout(val)}
        side={panelLayout}
      />
      <main className={clippy(
        'min-h-full overflow-hidden overflow-y-auto w-full flex flex-col animate__animated animate__slow animate__fadeIn'
      )}
      >
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
