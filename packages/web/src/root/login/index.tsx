/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import { LoginLayout } from "@yourdash/shared/core/login/loginLayout.ts";
import Spinner from "@yourdash/uikit/components/spinner/spinner.tsx";
import useResource from "@yourdash/csi/useResource.ts";
import IndexCardsPage from "./index.cards.tsx";
import styles from "./index.module.scss";
import { FC, Suspense } from "react";

const LoginIndexPage: FC = () => {
  const instanceMetadata = useResource(() =>
    coreCSI.getJson<{ title: string; message?: string; loginLayout: LoginLayout }>("/login/instance/metadata"),
  );

  return (
    <Suspense
      fallback={
        <div className={styles.spinner}>
          <Spinner />
        </div>
      }
    >
      {instanceMetadata?.loginLayout === LoginLayout.MODAL && <>MODAL layout</>}
      {instanceMetadata?.loginLayout === LoginLayout.CARDS && <IndexCardsPage metadata={instanceMetadata} />}
      {instanceMetadata?.loginLayout === LoginLayout.SIDEBAR && <>SIDEBAR layout</>}
    </Suspense>
  );
};

export default LoginIndexPage;
