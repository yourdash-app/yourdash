/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import EndpointResponseCoreLoginNotice from "@yourdash/shared/endpoints/core/login/notice";
import Box from "@yourdash/uikit/components/box/box";
import Button from "@yourdash/uikit/components/button/button";
import Card from "@yourdash/uikit/components/card/card";
import Heading from "@yourdash/uikit/components/heading/heading";
import Redirect from "@yourdash/uikit/components/redirect/redirect";
import Subtext from "@yourdash/uikit/components/subtext/subtext";
import Text from "@yourdash/uikit/components/text/text";
import useResource from "../../lib/useResource";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  const notice = useResource(() => csi.getJson<EndpointResponseCoreLoginNotice>("/core/login/notice"));

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
