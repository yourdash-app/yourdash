/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import NavigationBar from "../../components/home/NavBar";

export default function ProjectsPage() {
  let projects = [{
    name: "ShellUtils",
    icon: require("./../../assets/Projects/ShellUtils/icon.svg").default.src,
    background: require("./../../assets/Projects/ShellUtils/background.svg").default.src,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi excepturi impedit incidunt iste nam nobis nulla provident quam quibusdam repellendus?"
  }] as {
    name: string,
    icon: string,
    background: string,
    description: string
  }[];
  return <main className={"bg-bg-light-secondary dark:bg-bg-dark-secondary min-h-screen h-full"}>
    <NavigationBar />
    <h1 className={"text-6xl text-center w-full pt-16 pb-16 select-none bg-content-normal text-text-primary"}>DevDash Projects</h1>
    <section className={"grid grid-cols-3 p-4 gap-4"}>
      {projects.map(project => {
        return <section className={"relative w-full h-full pt-12"}>
          <img src={project.icon} alt=""
               className={"aspect-square h-24 rounded-full absolute left-4 top-0"} />
          {/*<img src={project.background} alt="" className={"h-full w-full absolute top-0 left-0"} />*/}
          <div className={"bg-content-normal rounded-2xl grid grid-cols-[7.5rem,1fr] grid-rows-[3.5rem,1fr]"}>
            <div></div>
            <h1>{project.name}</h1>
            <p className={"col-span-2"}>{project.description}</p>
          </div>
        </section>;
      })}
    </section>
  </main>;
}