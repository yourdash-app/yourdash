import React, { useEffect, useState } from "react";
import getJson from "helpers/fetch";
import clippy from "helpers/clippy";

const DashApplication: React.FC = () => {
  const [userFullName, setUserFullName] = useState({ first: "", last: "" });

  useEffect(() => {
    getJson(`/panel/user/name`, (res) => {
      setUserFullName(res);
    });
  }, []);

  if (userFullName.first === "" && userFullName.last === "") return <></>;

  return (
    <div
      style={{
        backgroundImage: `url(${localStorage.getItem(
          "current_server"
        )}/login/background)`,
      }}
      className={`flex items-center justify-center flex-col h-full w-full bg-center bg-cover gap-4`}
    >
      <span
        className={clippy(
          `
          font-black
          text-container-fg
          2xl:text-8xl
          xl:text-7xl
          lg:text-6xl
          md:text-5xl
          sm:text-4xl
          text-3xl
          translate-all
          animate__animated
          animate__fadeInUp
          [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))]
          backdrop-blur-md
          bg-container-bg
          bg-opacity-75
          p-6
          pl-8
          pr-8
          rounded-3xl
          `
        )}
      >
        Hiya, {userFullName.first} {userFullName.last}
      </span>
      <section
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-[90%] max-w-[100rem] gap-2 animate__animated animate__fadeInUp`}
      >
        <section
          className={`h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl`}
        ></section>
        <section
          className={`h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl`}
        ></section>
        <section
          className={`h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl`}
        ></section>
      </section>
    </div>
  );
};

export default DashApplication;
