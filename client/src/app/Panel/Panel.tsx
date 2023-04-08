import React, { useEffect, useState } from "react";
import {
  Icon,
  IconButton,
  RightClickMenu,
  Row,
  TextInput,
} from "../../ui/index";
import getJson, { deleteJson, postJson } from "../../helpers/fetch";
import clippy from "../../helpers/clippy";
import { useBeforeUnload } from "react-router-dom";

export interface IPanel {
  side: PanelPosition;
  setSide: (side: PanelPosition) => void;
}

export enum PanelPosition {
  left,
  top,
  right,
  bottom,
}

const Panel: React.FC<IPanel> = ({ side, setSide }) => {
  const [num, setNum] = useState(0);

  //  @ts-ignore
  Panel.reload = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    getJson(`/panel/position`, (res) => {
      setSide(res.position);
    });
  }, [num]);

  return (
    <div
      style={{
        ...(side === PanelPosition.top || side === PanelPosition.bottom
          ? {
              flexDirection: "row",
              width: "100%",
            }
          : {
              flexDirection: "column",
              height: "100%",
            }),
        ...(side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)",
        }),
        ...(side === PanelPosition.right && {
          borderLeft: "1",
          gridRowEnd: -1,
          gridColumnStart: 2,
        }),
        ...(side === PanelPosition.top && {
          borderBottom: "0.1rem solid var(--application-panel-border)",
        }),
        ...(side === PanelPosition.bottom && {
          borderTop: "0.1rem solid var(--application-panel-border)",
          gridColumnEnd: -1,
          gridRowStart: 2,
        }),
      }}
      className={`bg-container-bg flex p-2 gap-1 relative justify-center items-center`}
    >
      {/* invisible component which checks that the user is authorized on the first load of the panel*/}
      <PanelAuthorizer />
      <PanelInstanceIcon />
      <PanelApplicationLauncher side={side} type={"popOut"} />
      {/* separator */}
      <div
        className={clippy(
          `
          rounded-full
          bg-[var(--application-panel-border)]
          `,
          side === PanelPosition.top || side === PanelPosition.bottom
            ? "h-full w-0.5 ml-1 mr-1"
            : "w-full h-0.5 mt-1 mb-1"
        )}
      ></div>
      <PanelQuickShortcuts num={num} />
      <section
        className={clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? "mt-auto w-full"
            : "ml-auto h-full",
          `justify-center items-center flex flex-col`
        )}
      >
        {/* TODO: add buttons here maybe? */}
        {/*<IconButton icon={"gear-16"} />*/}
      </section>
    </div>
  );
};

export default Panel;

interface PanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

const PanelQuickShortcuts: React.FC<{ num: number }> = ({ num }) => {
  const [quickShortcuts, setQuickShortcuts] = useState<PanelQuickShortcut[]>(
    []
  );

  useEffect(() => {
    getJson(`/panel/quick-shortcuts`, (resp) => setQuickShortcuts(resp));
  }, [num]);

  return (
    <>
      {quickShortcuts.map((shortcut, ind) => {
        return (
          <RightClickMenu
            key={shortcut.url}
            items={[
              {
                name: "Unpin from panel",
                onClick() {
                  deleteJson(`/panel/quick-shortcut/${ind}`, () => {
                    // @ts-ignore
                    Panel.reload();
                  });
                },
              },
            ]}
          >
            <button
              className={`w-full aspect-square relative group flex items-center justify-center mr-1 cursor-pointer outline-0`}
              onClick={(e) => {
                e.currentTarget.blur();
                window.location.href = shortcut.url;
              }}
            >
              <img
                src={shortcut.icon}
                alt=""
                className={`w-[2rem] group-hover:scale-110 group-focus-within:scale-110 group-active:scale-95 transition-[var(--transition)]`}
              />
              <span
                className={clippy(
                  `
                absolute
                z-50
                left-full
                ml-4
                top-1/2
                -translate-y-1/2
                pl-2
                pr-2
                pt-0.5
                pb-0.5
                bg-container-bg
                rounded-lg
                pointer-events-none
                group-hover:opacity-100
                opacity-0
                transition-[var(--transition)]
                shadow-lg
                `
                )}
              >
                {shortcut.displayName}
              </span>
            </button>
          </RightClickMenu>
        );
      })}
    </>
  );
};

const PanelInstanceIcon: React.FC = () => {
  const [instanceUrl, setInstanceUrl] = useState<string | null>(null);

  useEffect(() => {
    setInstanceUrl(localStorage.getItem("current_server"));
  }, []);

  if (!instanceUrl) return <div></div>;

  return (
    <img
      src={`${instanceUrl}/panel/logo/small`}
      onClick={() => (window.location.href = `#/app/a/dash`)}
      alt={``}
      className={`cursor-pointer select-none`}
    />
  );
};

const PanelAuthorizer: React.FC = () => {
  useEffect(() => {
    if (!localStorage.getItem("current_server")) {
      window.location.href = "#/login";
    } else {
      getJson(
        `/login/is-authenticated`,
        () => {},
        () => {
          window.location.href = "#/login";
        }
      );
    }
  }, []);

  return <></>;
};

const PanelApplicationLauncher: React.FC<{
  side: PanelPosition;
  type: "slideOut" | "popOut";
}> = ({ side, type }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div
      className={clippy(
        side === PanelPosition.left || side === PanelPosition.right
          ? "w-full"
          : "h-full",
        `relative z-50`
      )}
    >
      <IconButton
        icon={"three-bars-16"}
        onClick={() => setIsVisible(!isVisible)}
      />
      {type === "slideOut" ? (
        <PanelApplicationLauncherSlideOut
          side={side}
          visible={isVisible}
          setVisible={(val) => setIsVisible(val)}
        />
      ) : (
        <PanelApplicationLauncherPopOut
          side={side}
          visible={isVisible}
          setVisible={(val) => setIsVisible(val)}
        />
      )}
    </div>
  );
};

const PanelApplicationLauncherSlideOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: (value: boolean) => void;
}> = ({ side, visible }) => {
  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>({ first: "", last: "" });

  useEffect(() => {
    getJson(`/panel/user/name`, (res) => {
      setUserFullName(res);
    });
  }, []);

  return (
    <section
      className={clippy(
        side === PanelPosition.left
          ? "left-full top-0 ml-2"
          : side === PanelPosition.right
          ? "right-full top-0 mr-2"
          : side === PanelPosition.top
          ? "top-full left-0 mt-2"
          : /* must be bottom*/ "bottom-full left-0 mb-2",
        visible ? "flex" : "hidden",
        `absolute w-96 bg-container-bg h-screen`
      )}
      style={{
        ...(side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)",
        }),
        ...(side === PanelPosition.right && {
          borderRight: "0.1rem solid var(--application-panel-border)",
        }),
        ...(side === PanelPosition.top && {
          borderRight: "0.1rem solid var(--application-panel-border)",
        }),
        ...(side === PanelPosition.bottom && {
          borderRight: "0.1rem solid var(--application-panel-border)",
        }),
      }}
    >
      <h1>Launcher SlideOut</h1>
    </section>
  );
};

export interface YourDashLauncherApplication {
  name: string;
  displayName: string;
  icon: string;
  description: string;
}
const PanelApplicationLauncherPopOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: (value: boolean) => void;
}> = ({ side, visible, setVisible }) => {
  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>({ first: "", last: "" });

  const [applications, setApplications] = useState<
    YourDashLauncherApplication[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getJson(`/panel/user/name`, (res) => {
      setUserFullName(res);
    });

    getJson(`/panel/launcher/applications`, (res) => {
      setApplications(res);
    });
  }, []);

  return (
    <>
      <div
        className={clippy(
          side === PanelPosition.left
            ? "left-full top-2 ml-3.5"
            : side === PanelPosition.right
            ? "right-full top-2 mr-3.5"
            : side === PanelPosition.top
            ? "top-full left-2 mt-3.5"
            : /* must be bottom*/ "bottom-full left-2 mb-3.5",
          `
          h-4
          aspect-square
          bg-container-bg
          [border:solid_0.1rem_var(--application-panel-border)]
          absolute
          rotate-45
          animate__animated
          animate__faster
          opacity-0
        `,
          side === PanelPosition.top &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.bottom &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.left &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.right &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none")
        )}
      />
      <section
        className={clippy(
          side === PanelPosition.left
            ? "left-full top-0 ml-4"
            : side === PanelPosition.right
            ? "right-full top-0 mr-4"
            : side === PanelPosition.top
            ? "top-full left-0 mt-4"
            : /* must be bottom*/ "bottom-full left-0 mb-4",
          `
        absolute
        bg-[rgb(var(--container-bg))]
        w-[36rem]
        max-h-[60rem]
        p-2
        rounded-xl
        [border:solid_0.1rem_var(--application-panel-border)]
        animate__animated
        animate__faster
        opacity-0
        flex
        flex-col
        gap-2
        `,
          side === PanelPosition.top &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.bottom &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.left &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none"),
          side === PanelPosition.right &&
            (visible
              ? "animate__fadeIn"
              : "animate__fadeOut select-none pointer-events-none")
        )}
      >
        <section className={`flex items-center justify-center relative group`}>
          <span className={`text-2xl mr-auto`}>Hiya, {userFullName.first}</span>
          <TextInput
            className={`w-[2.25rem] h-[2.25rem] focus-within:w-64 transition-all`}
            onChange={(val) => {
              setSearchValue(val);
            }}
          />
          <div
            className={`absolute right-0 top-0 h-[2.25rem] w-[2.25rem] p-[0.35rem] group-focus-within:opacity-0 pointer-events-none transition-all [border:0.125rem_solid_#00000000]`}
          >
            <Icon name={"search-16"} color={`rgb(var(--container-fg))`} />
          </div>
        </section>
        <section
          className={clippy(
            `
            grid
            grid-cols-4
            gap-2
            child:rounded-xl
            child:bg-button-bg
            child-hover:bg-button-hover-bg
            child-active:bg-button-active-bg
            child:text-button-fg
            child-hover:text-button-hover-fg
            child-active:text-button-active-fg
            child:border-button-border
            child-hover:border-button-hover-border
            child-active:border-button-active-border
            child:border-2
            child:flex
            child:items-center
            child:justify-center
            child:flex-col
            child:p-2
            child:cursor-pointer
            child:select-none
            child:transition-[var(--transition)]
            child-active:transition-[var(--transition)]
            child-hover:transition-[var(--transition-fast)]
          `
          )}
        >
          {applications.length !== 0 ? (
            applications.map((app) => {
              if (searchValue !== "") {
                if (
                  !app.description.includes(searchValue) &&
                  !app.name.includes(searchValue)
                ) {
                  return <React.Fragment key={app.name}></React.Fragment>;
                }
              }

              return (
                <RightClickMenu
                  key={app.name}
                  items={[
                    {
                      name: "Pin to Panel",
                      onClick() {
                        postJson(
                          `/panel/quick-shortcuts/create`,
                          {
                            displayName: app.displayName,
                            icon: app.icon,
                            url: `#/app/a/${app.name}/`,
                          },
                          () => {
                            // @ts-ignore
                            Panel.reload();
                          }
                        );
                      },
                      shortcut: "ctrl+p",
                    },
                  ]}
                >
                  <button
                    key={app.name}
                    onClick={() => {
                      setVisible(false);
                      window.location.href = `#/app/a/${app.name}`;
                    }}
                  >
                    <img src={app.icon} alt={``} className={`p-2`} />
                    <span>{app.displayName}</span>
                  </button>
                </RightClickMenu>
              );
            })
          ) : (
            <div
              className={`col-span-4 bg-container-bg h-24 flex items-center justify-center`}
            >
              <span className={`!text-container-fg !border-none`}>
                You have no applications?
              </span>
            </div>
          )}
        </section>
        <section className={`flex items-center justify-center`}>
          <PanelApplicationLauncherPopOutDateAndTime />
          <Row className={`ml-auto`}>
            <IconButton
              icon={"person-16"}
              onClick={() => {
                setVisible(false);
                window.location.href = "#/app/a/profile";
              }}
            />
            <IconButton
              icon={"gear-16"}
              onClick={() => {
                setVisible(false);
                window.location.href = "#/app/a/settings";
              }}
            />
          </Row>
        </section>
      </section>
    </>
  );
};

const PanelApplicationLauncherPopOutDateAndTime: React.FC = () => {
  const [date, setDate] = useState(new Date());

  let interval: NodeJS.Timer;

  useEffect(() => {
    interval = setInterval(() => {
      setDate(new Date());
    }, 60000);
  }, []);

  useBeforeUnload(() => {
    clearInterval(interval);
  });

  return <span className={`pl-1`}>{date.toDateString()}</span>;
};
