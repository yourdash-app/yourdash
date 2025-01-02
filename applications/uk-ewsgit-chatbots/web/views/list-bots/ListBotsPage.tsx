/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import Card from "@yourdash/chiplet/components/card/Card";
import DropdownButton from "@yourdash/chiplet/components/dropdownButton/DropdownButton";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import NavBar from "@yourdash/chiplet/components/navBar/NavBar";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
import React, { useEffect, useState } from "react";
import styles from "./ListBotsPage.module.scss";
import { useNavigate } from "react-router";

const ListBotsPage: React.FC = () => {
  const navigate = useNavigate();
  // const [visibleBots, setVisibleBots] = useState<unknown[]>([]);
  // const [bots, setBots] = useState<unknown[]>([]);
  // const [searchValue, setSearchValue] = useState<string>("");
  // const [teams, setTeams] = useState<string[]>([]);
  // const [currentTeam, setCurrentTeam] = useState<string>(teams[0]);
  //
  // useEffect(() => {
  //   coreCSI.getTeams().then((ts) => {
  //     console.log(ts.map((t) => t.teamName));
  //     setTeams(ts.map((t) => t.teamName));
  //     setCurrentTeam(ts.map((t) => t.teamName)[0]);
  //   });
  // }, []);
  //
  // useEffect(() => {
  //   if (searchValue === "") {
  //     setVisibleBots(visibleBots);
  //   } else {
  //     // @ts-ignore
  //     setVisibleBots(visibleBots.filter((bot) => bot.displayName.toLowerCase().includes(searchValue.toLowerCase())));
  //   }
  // }, [searchValue, bots]);
  //
  // useEffect(() => {
  //   coreCSI.syncGetJson(
  //     `/app/chatbots/team/`,
  //     {},
  //     (b: unknown[]) => {
  //       b.map((botId) => {
  //         coreCSI.syncGetJson(
  //           `/app/chatbots/team/${currentTeam}/list/${botId}`,
  //           (bot) => {
  //             setBots([...bots, bot]);
  //           },
  //           () => {
  //             console.log("failed to fetch data for bot: " + botId);
  //             setBots([...bots]);
  //           },
  //         );
  //       });
  //       setBots(b);
  //     },
  //     () => {
  //       setBots([]);
  //     },
  //   );
  // }, [currentTeam]);

  return (
    <>
      <NavBar
        title={"Chatbots"}
        subtitle={"Bots"}
        iconUrl={"/assets/productLogos/yourdash.svg"}
        showUserProfileDropdown
        extras={
          <>
            {/* <DropdownButton */}
            {/*   items={teams.map((team) => { */}
            {/*     return { */}
            {/*       label: team, */}
            {/*       onClick() { */}
            {/*         setCurrentTeam(team); */}
            {/*       }, */}
            {/*     }; */}
            {/*   })} */}
            {/* > */}
            {/*   Select Team */}
            {/* </DropdownButton> */}
            {/* <TextInput */}
            {/*   accessibleName={"Search Bots"} */}
            {/*   icon={UKIcons.Search} */}
            {/*   placeholder={"Search"} */}
            {/*   onChange={(value) => { */}
            {/*     setSearchValue(value); */}
            {/*   }} */}
            {/* /> */}
            <IconButton
              icon={UKIcons.Plus}
              onClick={() => {
                navigate("/app/a/uk-ewsgit-chatbots/create-bot");
              }}
            />
          </>
        }
      />
      <section className={styles.grid}>
        {/* {visibleBots.map((bot) => { */}
        {/*   return <div>Hello World</div>; */}
        {/*   // return ( */}
        {/*   //   <Card key={bot.userName} onClick={() => navigate(`/bots/${bot.userName}`)} showBorder> */}
        {/*   //     <Heading level={3}>{bot.displayName}</Heading> */}
        {/*   //     <p>{bot.userName}</p> */}
        {/*   //   </Card> */}
        {/*   // ); */}
        {/* })} */}
      </section>
    </>
  );
};

export default ListBotsPage;
