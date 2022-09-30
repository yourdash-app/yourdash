/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import NavigationBar from "../../components/home/NavBar";

export default function ProjectsPage() {
  let projects = [
    {
      name: "ShellUtils",
      icon: require("./../../assets/Projects/ShellUtils/icon.svg").default.src,
      background: require("./../../assets/Projects/ShellUtils/background.svg").default.src
    }
  ] as {
    name: string,
    icon: string,
    background: string,
    url: string
  }[]
  return <>
    <NavigationBar />
    <main>
      <h1>DevDash Projects</h1>
      <section>
        {projects.map(project => {
          return <div>
            <img src={project.icon} alt="" />
            <h2>{project.name}</h2>
          </div>
        })}
      </section>
    </main>
  </>
}