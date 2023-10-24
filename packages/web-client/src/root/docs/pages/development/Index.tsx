/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router";
import ComingSoon from "../../../../ComingSoon";
import { Card } from "../../../../ui/index";

const FAQPage: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <div className={ "text-center" }>
      TODO: modify contents and remove coming soon
      <h3>What is YourDash?</h3>
      <p>
        YourDash is a personal cloud environment for project management, file sharing, and more
        <br />
        Some of the features of YourDash are:
        <br />
        File management and sharing,
        <br />
        Project management,
        <br />
        Version controlled file backup and sync,
        <br />
        personal cloud code editors,
        <br />
        fully customizable using plugins
      </p>
      <h3>Is YourDash free?</h3>
      <p>
        Yes! YourDash is free to use for everyone.
        See [installation instructions](#/docs/get-started)
        <br />
        YourDash is free and open-source which means anyone can contribute to improve it's features and overall security.
      </p>
      
      <section>
        <h2>UI Libraries</h2>
        <p>YourDash uses two main UI Libraries</p>
        
        <Card
          showBorder
          onClick={ () => {
            navigate( "/docs/development/chiplet" );
          } }
        >
          <span>Chiplet</span>
          <p>(current UI Library)</p>
          <p>Based on React.JS</p>
        </Card>
        <Card
          showBorder
          onClick={ () => {
            navigate( "/docs/development/chiplet" );
          } }
        >
          <span>UIKit</span>
          <p>(experimental UI Library)</p>
          <p>Based on Vanilla Typescript</p>
        </Card>
      </section>
    </div>
  );
};

export default FAQPage;
