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
import createResource from "../../lib/createResource";
import styles from "./index.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router";

const LoginSuccessPage: FC = () => {
  const navigate = useNavigate();
  const notice = createResource(() => csi.getJson<EndpointResponseCoreLoginNotice>("/core/login/notice"));

  return (
    <div className={styles.page}>
      {notice ? (
        <Card extraClass={styles.notice}>
          <Box extraClass={styles.header}>
            <Heading
              extraClass={styles.heading}
              level={1}
              text={"Notice"}
            />
            <Subtext text={"authored: " + new Date(notice?.timestamp || 0).toLocaleDateString()} />
          </Box>
          <Text
            extraClass={styles.message}
            text={notice?.message || "No message..."}
          />
          <Subtext
            extraClass={styles.author}
            text={`- ${notice?.author || "Unknown author"}`}
          />
          <Box extraClass={styles.footer}>
            <Button
              onClick={() => {
                navigate("/app");
              }}
              text={"Continue"}
            />
          </Box>
        </Card>
      ) : (
        // @ts-ignore
        <>{notice?.display === false && <Redirect to="/app" />}</>
      )}
    </div>
  );
};

export default LoginSuccessPage;
