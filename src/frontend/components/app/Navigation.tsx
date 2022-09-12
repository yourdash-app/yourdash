/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import { useRouter } from 'next/router';
import React, { ReactChild, useEffect, useState } from 'react';
import * as localforage from 'localforage';
import CommandPallet from './CommandPallet';
import createUuid from '../../lib/libUuid';
import { IconTypings } from '../../lib/materialIconTypings';
import setTheme from '../../lib/setTheme';

export default function Navigation(props: { pageId: string }) {
  const [githubUserData, setGithubUserData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false as boolean);
  const [notifications, setNotifications] = useState(
    [] as {
      title: string;
      urgency: 1 | 2 | 3;
      content: string;
      id: string;
    }[]
  );
  const [loginState, setLoginState] = useState(
    {} as { isNavigationDisabled: boolean; shouldRemindToLogin: boolean }
  );
  const [themeState, setThemeState] = useState(
    'system' as 'light' | 'dark' | 'system'
  );
  const [alignedToRight, setAlignedToRight] = useState(false as boolean);
  const [navigationButtonTagState, setNavigationButtonTagState] = useState({
    topOffset: 0,
    text: 'Text Error (If you see this please report it!)',
    hidden: true
  });
  const router = useRouter();

  function notificationListener(e: CustomEvent) {
    localforage.getItem('DEVDASH_notifications', (notifications) => {
      if (notifications === null)
        return localforage.setItem('DEVDASH_notifications', [e.detail]);
      localforage.setItem('DEVDASH_notifications', [e.detail, notifications]);
    });
    setNotifications([e.detail, ...notifications]);
  }

  useEffect(() => {
    setThemeState(
      localStorage.getItem('themeMode') as 'light' | 'dark' | 'system'
    );
    // @ts-ignore
    window.addEventListener('DEVDASH_push_notification', notificationListener);
    localforage.getItem('githubUser').then((data) => {
      if (data) {
        setGithubUserData(data as any);
        setLoginState({
          shouldRemindToLogin: false,
          isNavigationDisabled: false
        });
      } else {
        setLoginState({
          shouldRemindToLogin: true,
          isNavigationDisabled: true
        });
      }
    });
    localforage.getItem('settings').then((res: any) => {
      if (res === undefined) return;
      if (
        res?.collapseNavigationBar !== null &&
        res?.collapseNavigationBar !== undefined
      ) {
        setIsExpanded(!res?.collapseNavigationBar);
      } else {
        setIsExpanded(true);
      }
      if (res?.isNavigationBarRightAligned) {
        setAlignedToRight(true);
      } else {
        setAlignedToRight(false);
      }
    });

    return () => {
      // @ts-ignore
      window.removeEventListener(
        'DEVDASH_push_notification',
        notificationListener
      );
    };
  }, []);

  return (
    <>
      <CommandPallet />
      <NavigationButtonTag
        topOffset={navigationButtonTagState.topOffset}
        text={navigationButtonTagState.text}
        isRightAligned={alignedToRight}
        isExpanded={isExpanded}
        isHidden={navigationButtonTagState.hidden}
      />
      <div
        className={`${
          isExpanded ? 'w-[5rem]' : 'w-[3.5rem]'
        } h-screen bg-content-normal shadow-xl grid grid-rows-[auto,1fr,auto]`}>
        <NavigationUser
          isRightAligned={alignedToRight}
          userData={githubUserData}
          expanded={isExpanded}
        />
        <ScrollableButtonSegment
          buttons={
            <>
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={!loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Login`}
                activePage={'login'}
                currentPageId={props.pageId}
                onClick={() => {
                  router.push('/auth/login');
                }}
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
                icon='login'
              />
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Home`}
                activePage={'home'}
                currentPageId={props.pageId}
                onClick={() => {
                  router.push('/app/home');
                }}
                icon='home'
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
              />
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Code Editor`}
                currentPageId={props.pageId}
                activePage={'code-editor'}
                onClick={() => {
                  router.push('/app/code-editor');
                }}
                icon='code'
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
              />
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Manage server`}
                currentPageId={props.pageId}
                activePage={'manage-server'}
                onClick={() => {
                  router.push('/app/manage-server');
                }}
                icon='build'
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
              />
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Git`}
                currentPageId={props.pageId}
                activePage={'git'}
                onClick={() => {
                  router.push('/app/git');
                }}
                icon='wysiwyg'
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
              />
              <NavigationButton
                isRightAligned={alignedToRight}
                isDisabled={loginState.isNavigationDisabled}
                expanded={isExpanded}
                hoverTag={`Todo`}
                currentPageId={props.pageId}
                activePage={'todo-list'}
                onClick={() => {
                  router.push('/app/todo-list');
                }}
                icon='pending_actions'
                onMouseEnter={(text: string, topOffset: number) => {
                  setNavigationButtonTagState({
                    text: text,
                    topOffset: topOffset,
                    hidden: false
                  });
                }}
                onMouseLeave={() => {
                  setNavigationButtonTagState({
                    topOffset: navigationButtonTagState.topOffset,
                    text: navigationButtonTagState.text,
                    hidden: true
                  });
                }}
              />
            </>
          }
        />
        <div className={`w-full shadow-inner pt-2`}>
          {loginState.shouldRemindToLogin ? (
            <Notification
              id={createUuid()}
              expanded={isExpanded}
              title={`Login?`}
              content={`login to your github account to begin editing.`}
              inputs={[
                {
                  type: 'button',
                  label: 'Login',
                  onClick: () => {
                    router.push('/auth/login');
                  }
                },
                {
                  type: 'button',
                  label: 'Remind me later',
                  onClick: () => {
                    setLoginState({
                      ...loginState,
                      shouldRemindToLogin: false
                    });
                  }
                }
              ]}
              notifications={[]}
              noClose={true}
              setNotifications={() => {}}
              urgencyLevel={1}
            />
          ) : null}
          {notifications.map((notification, ind) => {
            return (
              <Notification
                key={ind}
                expanded={isExpanded}
                title={notification.title}
                notifications={notifications}
                setNotifications={(notifications) => {
                  setNotifications(notifications);
                }}
                id={notification.id}
                content={notification.content}
                urgencyLevel={notification.urgency}
              />
            );
          })}
          <NavigationButton
            isRightAligned={alignedToRight}
            isDisabled={loginState.isNavigationDisabled}
            expanded={isExpanded}
            hoverTag={`Toggle Color Theme ${
              themeState === 'light'
                ? '(Light Mode)'
                : themeState === 'dark'
                ? '(Dark Mode)'
                : '(System)'
            }`}
            currentPageId={props.pageId}
            activePage={''}
            icon={
              themeState === 'light'
                ? 'light_mode'
                : themeState === 'dark'
                ? 'dark_mode'
                : 'brightness_auto'
            }
            onClick={() => {
              if (themeState === 'dark') {
                setThemeState('light');
                localStorage.setItem('themeMode', 'light');
                setTheme();
              }
              if (themeState === 'light') {
                setThemeState('system');
                localStorage.setItem('themeMode', 'system');
                setTheme();
              }
              if (themeState === 'system') {
                setThemeState('dark');
                localStorage.setItem('themeMode', 'dark');
                setTheme();
              }
            }}
            onMouseEnter={(text: string, topOffset: number) => {
              setNavigationButtonTagState({
                text: text,
                topOffset: topOffset,
                hidden: false
              });
            }}
            onMouseLeave={() => {
              setNavigationButtonTagState({
                topOffset: navigationButtonTagState.topOffset,
                text: navigationButtonTagState.text,
                hidden: true
              });
            }}
          />
          <NavigationButton
            isRightAligned={alignedToRight}
            isDisabled={false}
            expanded={isExpanded}
            hoverTag={isExpanded ? 'Collapse Navigation' : 'Expand Navigation'}
            currentPageId={props.pageId}
            activePage={'toggle'}
            icon='switch_right'
            onClick={() => {
              setIsExpanded(!isExpanded);
              localforage.getItem('settings').then((data: any) => {
                // check if data contains collapseNavigationBar
                if (
                  data?.collapseNavigationBar !== null &&
                  data?.collapseNavigationBar !== undefined
                ) {
                  // if it does, update it
                  data.collapseNavigationBar = !data.collapseNavigationBar;
                  localforage.setItem('settings', data);
                } else {
                  // if it doesn't, create it
                  localforage.setItem('settings', {
                    collapseNavigationBar: !isExpanded
                  });
                }
              });
            }}
            onMouseEnter={(text: string, topOffset: number) => {
              setNavigationButtonTagState({
                text: text,
                topOffset: topOffset,
                hidden: false
              });
            }}
            onMouseLeave={() => {
              setNavigationButtonTagState({
                topOffset: navigationButtonTagState.topOffset,
                text: navigationButtonTagState.text,
                hidden: true
              });
            }}
          />
          <NavigationButton
            isRightAligned={alignedToRight}
            isDisabled={loginState.isNavigationDisabled}
            expanded={isExpanded}
            hoverTag={`Settings`}
            currentPageId={props.pageId}
            activePage={'settings'}
            icon='settings'
            onClick={() => {
              router.push('/app/settings');
            }}
            onMouseEnter={(text: string, topOffset: number) => {
              setNavigationButtonTagState({
                text: text,
                topOffset: topOffset,
                hidden: false
              });
            }}
            onMouseLeave={() => {
              setNavigationButtonTagState({
                topOffset: navigationButtonTagState.topOffset,
                text: navigationButtonTagState.text,
                hidden: true
              });
            }}
          />
          <NavigationNotificationButton
            isRightAligned={alignedToRight}
            notificationsCount={notifications.length}
            expanded={isExpanded}
            onClick={() => {
              router.push('/app/notifications');
            }}
          />
        </div>
      </div>
    </>
  );
}

function ScrollableButtonSegment(props: { buttons: ReactChild }) {
  return <div className='overflow-y-auto max-h-full'>{props.buttons}</div>;
}

function NavigationButtonTag(props: {
  isRightAligned: boolean;
  isExpanded: boolean;
  topOffset: number;
  text: string;
  isHidden: boolean;
}) {
  return (
    <div
      style={{
        top: props.topOffset + 2 + 'px',
        transform: props.isHidden ? 'scale(0)' : 'scale(1)',
        ...(props.isRightAligned
          ? ''
          : { left: props.isExpanded ? '5.5rem' : '4rem' }),
        ...(props.isRightAligned
          ? { right: props.isExpanded ? '5.5rem' : '4rem' }
          : ''),
        transformOrigin: props.isRightAligned ? 'right' : 'left'
      }}
      className={
        'bg-content-normal rounded-lg text-text-primary transition-all shadow-lg absolute p-2 top-0 z-50'
      }>
      {props.text}
    </div>
  );
}

function NavigationButton(props: {
  icon: IconTypings;
  hoverTag: string;
  onClick?: () => void;
  activePage?: string;
  currentPageId?: string;
  href?: string;
  expanded: boolean;
  isDisabled: boolean;
  isRightAligned: boolean;
  onMouseEnter: (text: string, topOffset: number) => void;
  onMouseLeave: () => void;
}) {
  let isActive = props.activePage === props.currentPageId;
  return (
    <div
      onMouseEnter={(e) =>
        props.onMouseEnter(props.hoverTag, e.currentTarget.offsetTop)
      }
      onMouseLeave={props.onMouseLeave}
      className={`relative group select-none ${
        props.isDisabled ? 'pointer-events-none hidden' : null
      } cursor-pointer ${
        props.expanded ? 'ml-2 mr-2 mb-1' : 'ml-1 mr-1 mb-1'
      } flex`}
      onClick={props.onClick}>
      <span
        className={`${
          props.expanded ? 'w-16 p-2 pt-1 pb-1' : 'w-12 p-1'
        } rounded-lg hover:bg-content-light active:bg-content-dark flex items-center justify-center content-center transition-colors material-icons-round ${
          !isActive ? 'text-text-inverted-secondary' : 'text-text-secondary'
        } text-3xl hover:text-text-secondary active:text-text-primary`}>
        {props.icon}
      </span>
    </div>
  );
}

function NavigationUser(props: {
  userData: any;
  expanded: boolean;
  isRightAligned: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className={`bg-none relative group select-none cursor-pointer ${
        props.expanded ? 'pl-2' : 'pl-1'
      } mb-2 flex`}>
      <div
        className={`${
          props.isRightAligned
            ? 'right-full origin-right border-l-2 rounded-bl-xl'
            : 'left-full origin-left border-r-2 rounded-br-xl'
        } absolute z-50 group-hover:shadow-2xl opacity-0 group-hover:opacity-100 group-hover:w-80 group-hover:pointer-events-auto overflow-hidden w-48 pointer-events-none transition-all bg-content-normal border-b-2 border-0 border-content-light`}>
        <div
          className={`h-24 cursor-auto p-2 duration-75 grid grid-cols-[auto,1fr] gap-1`}>
          <img
            className={`aspect-square rounded-lg h-20`}
            src={
              props.userData?.avatar_url
                ? props.userData.avatar_url + '&s=80'
                : require('./../../assets/default_user_profile.svg').default.src
            }
            alt=''
          />
          <div
            className={`flex items-center justify-center flex-col text-left`}>
            <h1 className={`text-2xl text-text-primary w-auto`}>
              {props.userData?.name ? props.userData.name : 'Please Login'}
            </h1>
            <h2 className={`text-2xl text-text-secondary w-auto`}>
              {props.userData?.login
                ? '@' + props.userData.login
                : 'to view your profile'}
            </h2>
          </div>
        </div>
        <section
          className={
            'grid grid-cols-2 w-full child:w-full child:rounded-md child:bg-content-normal hover:child:bg-content-light active:child:bg-content-dark child:transition-all child:shadow-md gap-2 child:p-2 p-2 text-text-primary text-xl'
          }>
          <div>Stars</div>
          <div>Followers</div>
          <div>Repo Stars</div>
          <div>Repo Forks</div>
        </section>
        {props.userData?.name ? (
          <div className={'flex w-full p-2 pt-0'}>
            <button
              className={
                'flex items-center transition-colors shadow-md justify-center bg-content-normal hover:bg-content-light active:bg-content-dark w-full h-full p-1 rounded-lg text-text-primary'
              }
              onClick={() => {
                localforage.removeItem('githubUser');
                localforage.removeItem('githubToken');
                router.push('/');
              }}>
              <span className={'material-icons-round'}>logout</span>Logout
            </button>
          </div>
        ) : null}
      </div>
      <div
        className={`w-full aspect-square overflow-hidden ${
          props.expanded ? 'mr-2 mt-2' : 'mr-1 mt-1'
        }`}>
        <img
          className={`w-full aspect-square rounded-lg`}
          src={
            props.userData?.avatar_url
              ? props.userData.avatar_url + (props.expanded ? '&s=64' : '&s=40')
              : require('./../../assets/default_user_profile.svg').default.src
          }
          alt=''
        />
      </div>
    </div>
  );
}

// FIXME: when notification is closed it is not removed from the localforage and the notifications page is not updated to show the current notification change
function Notification(props: {
  title: string;
  content: string;
  urgencyLevel: 1 | 2 | 3;
  expanded: boolean;
  inputs?: {
    type: 'button';
    label: string;
    onClick: () => void;
  }[];
  notifications: any[];
  noClose?: boolean;
  setNotifications: (setValue: any[]) => void;
  id: string;
}) {
  return (
    <div
      className={`w-max max-w-7xl h-max max-h-4xl select-none ${
        props.urgencyLevel === 3
          ? 'bg-red-400'
          : props.urgencyLevel === 2
          ? 'bg-amber-400'
          : 'bg-blue-400'
      } fixed ${
        props.expanded ? 'left-24' : 'left-16'
      } bottom-4 rounded-lg transition-all overflow-hidden shadow-2xl z-50`}>
      <div
        className={`bg-content-normal ml-2 w-auto h-full text-lg text-text-primary`}>
        <div className='flex items-center'>
          <h2 className={`text-2xl pl-4 pr-4 pt-2 pb-2`}>{props.title}</h2>
          {!props.noClose ? (
            <span
              className={
                'material-icons-round text-white ml-auto mr-3 p-1 hover:bg-content-light active:bg-content-dark cursor-pointer rounded-md transition-colors'
              }
              onClick={() => {
                props.setNotifications([
                  props.notifications.filter((value) => {
                    return value.id !== props.id;
                  })
                ]);
              }}>
              close
            </span>
          ) : null}
        </div>
        <p className={`text-text-secondary pl-4 pr-4 pb-2`}>{props.content}</p>
        {props.inputs ? (
          <div
            className={`w-full flex child:w-full relative before:bg-content-light before:h-0.5 before:left-0 before:top-0 before:w-full pt-0.5 before:absolute`}>
            {props.inputs.map((input, index) => {
              if (input.type === 'button') {
                return (
                  <div
                    key={index}
                    onClick={input.onClick}
                    className={`bg-content-normal hover:shadow-md hover:bg-content-light active:bg-content-dark active:shadow-inner transition-all m-1 rounded-lg h-10 flex items-center justify-center ml-0.5 mr-0.5 first:ml-1 last:mr-1 cursor-pointer`}>
                    {input.label}
                  </div>
                );
              }
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function NavigationNotificationButton(props: {
  expanded: boolean;
  onClick: () => void;
  notificationsCount: number;
  isRightAligned: boolean;
}) {
  return (
    <div
      onClick={props.onClick}
      className={`bg-none relative group select-none cursor-pointer ${
        props.expanded ? 'ml-2 mr-2' : 'ml-1 mr-1'
      } flex flex-col items-center justify-center group`}>
      <div
        className={`${
          props.isRightAligned
            ? 'right-full origin-right mr-3'
            : 'left-full origin-left ml-3'
        } absolute top-1/2 pointer-events-none -translate-y-1/2 opacity-0 bg-content-normal group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all w-max p-1 pl-2 pr-2 rounded-lg text-text-primary group-hover:shadow-lg z-[50]`}>
        Notifications
      </div>
      <span
        className={`${
          props.expanded ? 'w-16 p-2' : 'w-10 p-1'
        } rounded-lg aspect-square group-hover:bg-content-light group-active:bg-content-dark flex items-center justify-center transition-all material-icons-round text-text-inverted-secondary text-3xl group-hover:text-text-secondary group-active:text-text-primary ${
          props.notificationsCount < 1 ? 'mb-2' : null
        }`}>
        feedback
      </span>
      <NotificationCounter
        count={props.notificationsCount}
        expanded={props.expanded}
      />
    </div>
  );
}

function NotificationCounter(props: { count: number; expanded: boolean }) {
  return (
    <p
      className={`text-text-primary bg-red-400 rounded-lg w-full flex items-center justify-center transition-all ${
        props.count > 0 ? 'scale-100 mb-2 mt-1 h-6' : 'scale-0 h-0'
      }`}>
      {props.expanded
        ? props.count < 1000
          ? props.count
          : '+999'
        : props.count < 100
        ? props.count
        : '+99'}
    </p>
  );
}
