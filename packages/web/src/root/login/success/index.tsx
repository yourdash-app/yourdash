/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import EndpointResponseCoreLoginNotice from "@yourdash/shared/endpoints/core/login/notice.ts";
import Button from "@yourdash/uikit/src/components/button/button.tsx";
import Card from "@yourdash/uikit/src/components/card/card.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";
import Redirect from "@yourdash/uikit/src/components/redirect/redirect.tsx";
import Subtext from "@yourdash/uikit/src/components/subtext/subtext.tsx";
import Text from "@yourdash/uikit/src/components/text/text.tsx";
import useResource from "@yourdash/csi/useResource.ts";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  const notice = useResource(() => coreCSI.getJson<EndpointResponseCoreLoginNotice>("/core/login/notice"));

  return (
    <div className={styles.page}>
      {notice ? (
        <Card
          containerClassName={styles.notice}
          headerClassName={styles.noticeHeader}
          actions={
            <>
              <Button
                onClick={() => {
                  navigate("/app");
                }}
                text={"Continue"}
              />
            </>
          }
          header={
            <>
              <Heading
                className={styles.heading}
                level={1}
                text={"Notice"}
              />
              <Subtext text={"authored: " + new Date(notice?.timestamp || 0).toLocaleDateString()} />
            </>
          }
        >
          <Text
            className={styles.message}
            text={notice?.message || "No message..."}
          />
          <Subtext
            className={styles.author}
            text={`- ${notice?.author || "Unknown author"}`}
          />
        </Card>
      ) : (
        // @ts-ignore
        <>{notice?.display === false && <Redirect to="/app" />}</>
      )}
    </div>
  );
};

export default LoginSuccessPage;
