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
      className={`flex items-center justify-center flex-col h-full w-full bg-center bg-cover`}
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
          drop-shadow-2xl
          backdrop-blur-sm
          p-4
          pl-6
          pr-6
          rounded-3xl
          `
        )}
      >
        Hiya, {userFullName.first} {userFullName.last}
      </span>
      <section></section>
    </div>
  );
};

export default DashApplication;
