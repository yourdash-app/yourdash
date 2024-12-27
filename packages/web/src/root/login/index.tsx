/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.ts";
import useResource from "@yourdash/csi/useResource.ts";
import UKFlex from "@yourdash/uikit/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/components/heading/UKHeading.js";
import UKSpinner from "@yourdash/uikit/components/spinner/UKSpinner.js";
import IndexCardsPage from "./index.cards.tsx";
import styles from "./index.module.scss";
import React, { FC, Suspense } from "react";

const LoginIndexPage: FC = () => {
  const instanceMetadata = useResource(() => coreCSI.getJson("/login/instance/metadata", "/login/instance/metadata"));

  const SelectedLayout: FC = () => {
    switch (instanceMetadata?.loginLayout) {
      case LoginLayout.MODAL:
        return <>MODAL layout</>;
      case LoginLayout.CARDS:
        return <IndexCardsPage metadata={instanceMetadata} />;
      case LoginLayout.SIDEBAR:
        return <>SIDEBAR layout</>;
      default:
        return (
          <UKFlex
            centerHorizontally
            centerVertically
            padding
            direction={"column"}
          >
            <UKHeading text={"Awaiting instance response..."} />
          </UKFlex>
        );
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <div className={styles.spinner}>
            <UKSpinner />
          </div>
        }
      >
        <SelectedLayout />
      </Suspense>
    </>
  );
};

export default LoginIndexPage;
