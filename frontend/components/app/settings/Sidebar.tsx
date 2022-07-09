import React from "react";
import { useRouter } from "next/router";

export default function Sidebar(props: {page: string}) {
  return (
    <div
      className={`h-screen w-max bg-content-normal shadow-inner p-5 flex items-center flex-col`}>
      <h1
        className={`text-text-primary font-bold text-4xl pr-5 pl-5 pt-4 pb-12`}>
        Settings
      </h1>
      <SidebarButton
        title={"Overview"}
        currentTarget={props.page}
        activeTarget={"overview"}
        link={"/app/settings/overview"}
      />
      <SidebarButton
        title={"Test"}
        currentTarget={props.page}
        activeTarget={"test"}
        link={"/app/settings/test"}
      />
    </div>
  );
}

function SidebarButton(props: { title: string; link: string; currentTarget: string; activeTarget: string }) {
  const router = useRouter();
  return (
    <button
    className={`w-full mb-2 ${props.currentTarget !== props.activeTarget ? "bg-content-normal": "bg-content-light"} hover:bg-content-light active:bg-content-dark p-2 pr-3 pl-3 rounded-lg transition-all font-semibold tracking-wider text-text-secondary active:shadow-inner hover:shadow-lg brightness-105`}
      onClick={() => {
        router.push(props.link);
      }}>
      <p>{props.title}</p>
    </button>
  );
}
