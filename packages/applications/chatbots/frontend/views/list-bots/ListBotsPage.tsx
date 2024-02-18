/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import { Card, NavBar } from "@yourdash/web-client/src/ui/index";
import { useEffect, useState } from "react";
import styles from "./ListBotsPage.module.scss";
import { useNavigate, NavigateFunction } from "react-router";

function notAuthorized(navigate: NavigateFunction) {
  navigate("/app/a/chatbots/authorize/discord");
}

const ListBotsPage: React.FC = () => {
  const navigate = useNavigate();
  const [bots, setBots] = useState<ChatbotsBot[]>([]);

  useEffect(() => {
    // PERFORM DISCORD AUTH CHECKS

    csi.getJson(
      "/app/chatbots/authorize/check/discord",
      (resp) => {
        if (!resp.authorized) return notAuthorized(navigate);

        // SUCCESSFULLY AUTHORIZED
      },
      () => {
        notAuthorized(navigate);
      },
    );
  }, []);

  return (
    <>
      <NavBar title={"View Your Bots"} iconUrl={"/assets/productLogos/yourdash.svg"} showUserProfileDropdown></NavBar>
      <section className={styles.grid}>
        <Card showBorder>DiscyBot</Card>
      </section>
    </>
  );
};

export default ListBotsPage;
