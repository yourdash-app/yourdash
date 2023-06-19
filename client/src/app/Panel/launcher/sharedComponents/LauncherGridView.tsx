import React from 'react';

import csi from 'helpers/csi';

import {useNavigate} from 'react-router-dom';

import clippy from '../../../../helpers/clippy';
import {RightClickMenu} from '../../../../ui';
import Panel, {YourDashLauncherApplication} from '../../Panel';


export interface ILauncherGridView {
  applications: YourDashLauncherApplication[],
  setVisible: (value: boolean) => void,
  searchValue: string,
}

const LauncherGridView: React.FC<ILauncherGridView> = ({
  applications,
  setVisible,
  searchValue
}) => {
  const navigate = useNavigate();
  return (
    <section
      className={clippy(
        `
            bg-container-bg
            grid
            grid-cols-4
            items-center
            justify-center
            gap-2
            pl-2
            pr-2
            child:rounded-button-rounding
            child:bg-button-bg
            child-hover:bg-button-hover-bg
            child-active:bg-button-active-bg
            child:text-button-fg
            child-hover:text-button-hover-fg
            child-active:text-button-active-fg
            child:flex
            child:items-center
            child:justify-center
            child:flex-col
            child:cursor-pointer
            child:select-none
            child:transition-[var(--transition)]
            child-active:transition-[var(--transition)]
            child-hover:transition-[var(--transition-fast)]
            child:aspect-square
          `
      )}
    >
      {applications.length !== 0
        ? (
          applications.map(app => {
            if (searchValue !== '') {
              if (
                !app.description.includes(searchValue) &&
                !app.name.includes(searchValue)
              ) {
                return null;
              }
            }

            return (
              <button
                type={'button'}
                key={app.name}
                onClick={() => {
                  setVisible(false);
                  navigate(`/app/a/${ app.name }`);
                }}
                className={'group'}
              >
                <RightClickMenu
                  className={'w-full h-full flex flex-col items-center justify-center'}
                  key={app.name}
                  items={[
                    {
                      name: 'Pin to Panel',
                      onClick() {
                        csi.postJson(
                          '/core/panel/quick-shortcuts/create',
                          {
                            displayName: app.displayName,
                            name: app.name
                          },
                          () => {
                            setTimeout(() => {
                              // @ts-ignore
                              // eslint-disable-next-line no-use-before-define
                              Panel.reload();
                            }, 100);
                          }
                        );
                      },
                      shortcut: 'ctrl+p'
                    },
                    {
                      name: 'Open in new tab',
                      onClick() {
                        window.open(`${ window.location.origin }#/app/a/${ app.name }`, '_blank');
                      },
                      shortcut: 'ctrl+p'
                    }
                  ]}
                >
                  <img src={app.icon} alt={''} className={'w-[98px] aspect-square shadow-md rounded-3xl group-active:shadow-inner mb-1'}/>
                  <span>{app.displayName}</span>
                </RightClickMenu>
              </button>
            );
          })
        )
        : (
          <div
            className={'col-span-4 bg-container-bg h-24 flex items-center justify-center'}
          >
            <span className={'!text-container-fg !border-none'}>
              You have no applications?
            </span>
          </div>
        )}
    </section>
  );
};

export default LauncherGridView;
