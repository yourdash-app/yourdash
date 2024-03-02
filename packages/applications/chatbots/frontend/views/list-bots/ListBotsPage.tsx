/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import {
  Card,
  DropdownButton,
  Heading,
  IconButton,
  NavBar,
  TextInput,
  YourDashIcon,
} from "@yourdash/web-client/src/ui/index";
import { useEffect, useState } from "react";
import { IChatbotsBot } from "../../../shared/bot";
import styles from "./ListBotsPage.module.scss";
import { useNavigate } from "react-router";

const ListBotsPage: React.FC = () => {
  const navigate = useNavigate();
  const [visibleBots, setVisibleBots] = useState<IChatbotsBot[]>([]);
  const [bots, setBots] = useState<IChatbotsBot[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [teams, setTeams] = useState<string[]>([]);
  const [currentTeam, setCurrentTeam] = useState<string>(teams[0]);

  useEffect(() => {
    if (searchValue === "") {
      setVisibleBots(visibleBots);
    } else {
      setVisibleBots(visibleBots.filter((bot) => bot.displayName.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue, bots]);

  useEffect(() => {
    csi.getJson(
      `/app/chatbots/team/${currentTeam}/list-bots`,
      (b: IChatbotsBot[]) => {
        b.map((botId) => {
          csi.getJson(
            `/app/chatbots/team/${currentTeam}/list/${botId}`,
            (bot) => {
              setBots([...bots, bot]);
            },
            () => {
              console.log("failed to fetch data for bot: " + botId);
              setBots([...bots]);
            },
          );
        });
        setBots(b);
      },
      () => {
        setBots([]);
      },
    );
  }, [currentTeam]);

  return (
    <>
      <NavBar
        title={"Chatbots"}
        subtitle={"Bots"}
        iconUrl={"/assets/productLogos/yourdash.svg"}
        showUserProfileDropdown
        extras={
          <>
            <DropdownButton
              items={teams.map((team) => {
                return {
                  label: team,
                  onClick() {
                    setCurrentTeam(team);
                  },
                };
              })}
            >
              Select Team
            </DropdownButton>
            <TextInput
              accessibleName={"Search Bots"}
              icon={YourDashIcon.Search}
              placeholder={"Search"}
              onChange={(value) => {
                setSearchValue(value);
              }}
            />
            <IconButton
              icon={YourDashIcon.Plus}
              onClick={() => {
                navigate("/app/a/chatbots/create-bot");
              }}
            />
          </>
        }
      ></NavBar>
      <section className={styles.grid}>
        {visibleBots.map((bot) => {
          return (
            <Card key={bot.userName} onClick={() => navigate(`/bots/${bot.userName}`)} showBorder>
              <Heading level={3}>{bot.displayName}</Heading>
              <p>{bot.userName}</p>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default ListBotsPage;
