/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.
 *   Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react";
import { useRouter } from "next/router";

export default function Git() {
  const router = useRouter();
  if (!router.query.path) {
    setTimeout(() => {
      router.push("/app/home");
    }, 2000);
    return <h1>Critical Route Error - recorrecting shortly...</h1>;
  }
  switch (router.query.path[1]) {
    case "u":
    case "user":
      // user
      return <h1>{router.query.path[2]}</h1>;
    case "feed":
      // logged in user's feed
      return <h1>Unsupported</h1>;
    case "favourites":
      // logged in user's favourites
      return <h1>Unsupported</h1>;
    default:
      return <div className={`w-full flex flex-col h-full bg-bg-dark-primary`}>
        <div className={`w-full h-64 flex items-center justify-center`}>
          <input className={`w-1/2 p-3 text-2xl text-center rounded-2xl`} placeholder={`Search Github`} type="text" />
        </div>
      </div>;
  }
}
