/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import useResource from "@yourdash/csi/useResource.ts";
import UKButton from "@yourdash/uikit/components/button/UKButton.js";
import UKCard from "@yourdash/uikit/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/components/heading/UKHeading.js";
import UKRedirect from "@yourdash/uikit/components/redirect/UKRedirect.js";
import UKSubtext from "@yourdash/uikit/components/subtext/UKSubtext.js";
import UKText from "@yourdash/uikit/components/text/UKText.js";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  const notice = useResource(() => coreCSI.getJson("/core/login/notice", "/core/login/notice"));

  return (
    <div className={styles.page}>
      {notice ? (
        <UKCard
          containerClassName={styles.notice}
          headerClassName={styles.noticeHeader}
          actions={
            <>
              <UKButton
                onClick={() => {
                  navigate("/app");
                }}
                text={"Continue"}
              />
            </>
          }
          header={
            <>
              <UKHeading
                className={styles.heading}
                level={1}
                text={"Notice"}
              />
              <UKSubtext text={"authored: " + new Date(notice?.timestamp || 0).toLocaleDateString()} />
            </>
          }
        >
          <UKText
            className={styles.message}
            text={notice?.message || "No message..."}
          />
          <UKSubtext
            className={styles.author}
            text={`- ${notice?.author || "Unknown author"}`}
          />
        </UKCard>
      ) : (
        // @ts-ignore
        <>{notice?.display === false && <UKRedirect to="/app" />}</>
      )}
    </div>
  );
};

export default LoginSuccessPage;
