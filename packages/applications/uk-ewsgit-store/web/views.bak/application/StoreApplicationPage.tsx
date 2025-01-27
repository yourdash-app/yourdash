/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import clippy from "@yourdash/shared/web/helpers/clippy";
import useYourDashLib from "@yourdash/shared/web/helpers/ydsh";
import Button from "@yourdash/chiplet/components/button/Button";
import Card from "@yourdash/chiplet/components/card/Card";
import Carousel from "@yourdash/chiplet/components/carousel/Carousel";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton";
import Spinner from "@yourdash/chiplet/components/spinner/Spinner";
import Image from "@yourdash/uikit/src/components/image/image";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type IYourDashStoreApplication } from "@yourdash/shared/apps/store/storeApplication";
import coreCSI from "@yourdash/csi/coreCSI";
import StoreHeader from "../../component/storeHeader/StoreHeader";
import StoreApplicationDefaultHeaderBackground from "./assets/default_background.svg";
import InstallationPopup from "./components/InstallationPopup";
import { requestApplication } from "./helpers/requestApplicationData";
import styles from "./StoreApplicationPage.module.scss";

const StoreApplicationPage: React.FC = () => {
  const trans = useTranslate("store");
  const ydsh = useYourDashLib();
  const navigate = useNavigate();
  const { id: applicationId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appData, setAppData] = useState<IYourDashStoreApplication>();
  const [showInstallationConfirmation, setShowInstallationConfirmation] = useState<boolean>(false);

  useEffect(() => {
    setShowInstallationConfirmation(false);
    setIsLoading(true);
    requestApplication(applicationId || "dash", (data) => setAppData(data), setIsLoading, navigate);
  }, [applicationId, navigate]);

  if (!applicationId) {
    navigate("/app/a/uk-ewsgit-store");
    return null;
  }

  return (
    <div className={"h-full relative"}>
      {showInstallationConfirmation && (
        <InstallationPopup
          applicationData={appData}
          onClose={() => setShowInstallationConfirmation(false)}
          onConfirm={() => {
            coreCSI.postJson(`/app/store/application/install/${appData?.name}`, {}, (resp) => {
              if (resp.success) {
                requestApplication(applicationId, setAppData, setIsLoading, navigate);
                ydsh.toast.success("Installed Application", `Installed "${appData?.name}" successfully`);
              }

              // @ts-ignore
              window.__yourdashCorePanelReload();
            });
            setShowInstallationConfirmation(false);
          }}
        />
      )}
      {isLoading ? (
        <div className={clippy("w-full h-full flex items-center justify-center", styles.main)}>
          <Spinner />
          {/* TODO: add a back button */}
        </div>
      ) : (
        appData && (
          <div className={styles.main}>
            <StoreHeader showBackButton={2} />
            <header className={"flex flex-col w-full bg-container-bg rounded-container-rounding overflow-hidden"}>
              <div
                style={{
                  backgroundImage: `url(${StoreApplicationDefaultHeaderBackground})`,
                }}
                className="sm:h-64 h-32 transition-all bg-cover bg-center flex select-none items-center justify-center flex-row gap-3 animate__animated animate__fadeIn"
              >
                <Image
                  className={"aspect-square drop-shadow-lg sm:w-24 w-0 transition-all"}
                  src={toAuthImgUrl(appData.icon)}
                  accessibleLabel={"Application icon"}
                />
                <Heading className={"drop-shadow-lg"}>{appData.displayName}</Heading>
              </div>
              <section
                className={
                  "flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto animate__animated animate__fadeIn animate__250ms"
                }
              >
                <Image
                  className={"w-24 aspect-square select-none"}
                  src={toAuthImgUrl(appData.icon)}
                  accessibleLabel={"Application icon"}
                />
                <Heading
                  level={2}
                  className={"mr-auto"}
                >
                  {appData.displayName}
                </Heading>
                <div className={"flex gap-2"}>
                  {appData.installed && (
                    <MajorButton
                      onClick={() => {
                        navigate(`/app/a/${appData.name}`);
                      }}
                    >
                      {trans("OPEN_APPLICATION")}
                    </MajorButton>
                  )}
                  <Button
                    onClick={() => {
                      if (appData.installed) {
                        coreCSI.postJson(`/app/store/application/uninstall/${appData.name}`, {}, (resp) => {
                          if (resp.success) {
                            requestApplication(applicationId, setAppData, setIsLoading, navigate);
                            ydsh.toast.success("Uninstalled Application", `Uninstalled "${appData.name}" successfully`);
                          }

                          // @ts-ignore
                          window.__yourdashCorePanelReload();
                        });
                      } else {
                        setShowInstallationConfirmation(true);
                      }
                    }}
                  >
                    {appData.installed ? trans("UNINSTALL") : trans("INSTALL")}
                  </Button>
                </div>
              </section>
            </header>
            <div className={styles.contentContainer}>
              <section className={clippy(styles.contentSection, "max-w-3xl w-full")}>
                <Card
                  showBorder
                  className={"col-span-2"}
                >
                  <Heading level={3}>{trans("DESCRIPTION_SECTION")}</Heading>
                  {appData.description}
                </Card>
                <Card
                  showBorder
                  className={"flex flex-col items-start col-span-2 child:w-full"}
                >
                  <Heading level={3}>{trans("ABOUT_SECTION")}</Heading>
                  <div>{`Category: ${appData.category}`}</div>
                  <div>{`ID: ${appData.name}`}</div>
                  <div>{`Requires Backend: ${appData.requiresBackend}`}</div>
                  <br />
                  <div>{"Created as part of the YourDash Project"}</div>
                </Card>
              </section>
              <section className={clippy(styles.contentSection, "max-w-lg w-full")}>
                <Card
                  showBorder
                  onClick={() => {
                    window.open(`https://github.com/yourdash/yourdash/tree/main/packages/applications/${appData.name}`);
                  }}
                  className={"flex gap-1 items-center"}
                >
                  <Icon
                    className={"h-5"}
                    icon={UKIcons.Link}
                  />
                  <span>{"View Source"}</span>
                </Card>
                <section className={"w-full"}>
                  <Heading level={3}>{trans("AUTHORS_SECTION")}</Heading>
                  <Carousel>
                    {appData.authors?.map((author) => (
                      <Card
                        key={author.avatarUrl}
                        className={"flex !flex-col gap-2"}
                        showBorder
                        onClick={() => {
                          window.location.href = author.site;
                        }}
                      >
                        <img
                          className={"h-24 aspect-square rounded-container-rounding"}
                          src={author.avatarUrl}
                          alt={author.avatarUrl}
                        />
                        <div className={"flex items-center justify-between gap-2 flex-col w-full"}>
                          <span>{author.displayName}</span>
                          {author.role && (
                            <div
                              className={
                                "bg-container-secondary-bg text-container-secondary-fg w-[calc(100%+1rem)] -mb-2 text-center rounded-b-container-secondary-rounding rounded-t-sm p-1"
                              }
                            >
                              {author["role"]}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </Carousel>
                </section>
              </section>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StoreApplicationPage;
