/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect, useState } from "react";
import csi from "../../../helpers/csi";
import { Card, Carousel, IconButton } from "../../../ui";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const DashApplicationWelcome: React.FC = () => {
  const [userFullName, setUserFullName] = useState( {
    first: "",
    last: ""
  } );
  const [step, setStep] = useState( 0 );
  
  useEffect( () => {
    csi.getJson( "/core/panel/user-full-name", res => {
      setUserFullName( res );
    } );
  }, [] );
  
  if ( userFullName.first === "" && userFullName.last === "" ) {
    return null;
  }
  
  return (
    <div
      style={{
        backgroundImage: `url(${ localStorage.getItem( "current_server" ) }/core/login/background)`
      }}
      className={"flex items-center justify-center flex-col h-full w-full bg-center bg-cover relative"}
    >
      <Card className={"w-full max-w-[60rem] flex flex-col gap-6 pt-8 pb-8"}>
        <h1 className={"text-5xl font-semibold text-center"}>{`Welcome to YourDash, ${ csi.userDB.get( "user:full_name" ).first }`}</h1>
        <Carousel>
          <main className={"w-full flex items-center justify-center gap-4"}>
            <Card
              level={"secondary"}
              className={"h-64 aspect-square flex flex-col items-start justify-between"}
            >
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={YourDashIcon.LinkExternal16}/>
              </div>
            </Card>
            <Card
              level={"secondary"}
              className={"h-64 aspect-square flex flex-col items-start justify-between"}
            >
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={YourDashIcon.LinkExternal16}/>
              </div>
            </Card>
            <Card
              level={"tertiary"}
              className={"h-64 aspect-square flex flex-col items-start justify-between"}
            >
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={YourDashIcon.LinkExternal16}/>
              </div>
            </Card>
          </main>
          <main className={"w-full"}>
            <section>{"text"}</section>
            <section>{"text"}</section>
            <section>{"text"}</section>
          </main>
          <main className={"w-full"}>
            <section>{"text"}</section>
            <section>{"text"}</section>
            <section>{"text"}</section>
          </main>
        </Carousel>
      </Card>
    </div>
  );
};

export default DashApplicationWelcome;
