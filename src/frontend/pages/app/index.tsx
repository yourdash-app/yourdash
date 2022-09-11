/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.
 *   Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React, { useEffect } from "react";
import { useRouter } from "next/router";
export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/app/home");
  }); 
  return <></>;
}
