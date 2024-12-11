/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import useResource from "@yourdash/csi/useResource.ts";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";
import { UKC } from "@yourdash/uikit";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  const notice = useResource(() => coreCSI.getJson("/core/login/notice", "/core/login/notice"));

  return (
    <div className={styles.page}>
      {notice ? (
        <UKC.Card
          containerClassName={styles.notice}
          headerClassName={styles.noticeHeader}
          actions={
            <>
              <UKC.Button
                onClick={() => {
                  navigate("/app");
                }}
                text={"Continue"}
              />
            </>
          }
          header={
            <>
              <UKC.Heading
                className={styles.heading}
                level={1}
                text={"Notice"}
              />
              <UKC.Subtext text={"authored: " + new Date(notice?.timestamp || 0).toLocaleDateString()} />
            </>
          }
        >
          <UKC.Text
            className={styles.message}
            text={notice?.message || "No message..."}
          />
          <UKC.Subtext
            className={styles.author}
            text={`- ${notice?.author || "Unknown author"}`}
          />
        </UKC.Card>
      ) : (
        // @ts-ignore
        <>{notice?.display === false && <UKC.Redirect to="/app" />}</>
      )}
    </div>
  );
};

export default LoginSuccessPage;
