import React from 'react';

import {Card} from '../../../ui';
import csi from '../../../helpers/csi';
import Panel from '../../Panel/Panel';

import SettingsSectionPanelPosition from './sections/SettingsSectionPanelPosition';

const SettingsApplication: React.FC = () => (
  <div className={'h-full overflow-auto'}>
    <h1
      className={'font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg'}
    >
      YourDash Settings | Panel
    </h1>
    <main className={'ml-auto mr-auto w-full max-w-5xl'}>
      <SettingsSectionPanelPosition/>
      <section className={'p-4'}>
        {/* TODO: improve the design of the position button icons */}
        <h2
          className={'text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4'}
        >
          Panel Launcher
        </h2>
        <div
          className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32'}
        >
          <Card
            className={'flex flex-col transition-[var(--transition)] h-full'}
            onClick={() => {
              csi.postJson(
                '/app/settings/core/panel/quick-shortcuts',
                {launcher: 0},
                () => {
                  // @ts-ignore
                  Panel.reload();
                }
              );
            }}
          >
            <img
              src={'/assets/productLogos/yourdash.svg'}
              alt={''}
              className={'p-4 h-full'}
              draggable={false}
            />
            <span className={'text-xl'}>Pop out</span>
          </Card>
          <Card
            className={'flex flex-col transition-[var(--transition)] h-full'}
            onClick={() => {
              csi.postJson(
                '/app/settings/core/panel/quick-shortcuts',
                {launcher: 1},
                () => {
                  // @ts-ignoret
                  Panel.reload();
                }
              );
            }}
          >
            <img
              src={'/assets/productLogos/yourdash.svg'}
              alt={''}
              className={'p-4 h-full'}
              draggable={false}
            />
            <span className={'text-xl'}>Slide out</span>
          </Card>
        </div>
      </section>
      <section className={'p-4'}>
        {/* TODO: add launcher icons ( slide out, pop out ) */}
        <h2
          className={'text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4'}
        >
          Panel Quick Shortcuts
        </h2>
        <div
          className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32'}
        >
          <Card>a</Card>
          <Card>a</Card>
          <Card>a</Card>
          <Card>a</Card>
        </div>
      </section>
    </main>
  </div>
);

export default SettingsApplication;
