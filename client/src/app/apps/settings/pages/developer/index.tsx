import React from 'react';
import SettingsPersonalServerAcceleratorSection from './sections/SettingsPersonalServerAcceleratorSection';

const SettingsPageDeveloper: React.FC = () => (
  <div className={'h-full overflow-auto'}>
    <h1
      className={'font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg'}
    >
      YourDash Settings | Developer
    </h1>
    <main className={'ml-auto mr-auto w-full max-w-5xl p-4'}>
      <SettingsPersonalServerAcceleratorSection/>
    </main>
  </div>
);

export default SettingsPageDeveloper;
