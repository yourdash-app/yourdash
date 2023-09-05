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

import React from "react";
import { SideBar } from "../../../ui";
import { useNavigate } from "react-router-dom";
import GlobalDbApplication from "../global_db/globalDbApplication";
import YourDevHome from "./YourDevHome";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const YourDevApplication: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState<"home" | "global_db" | "user_db">( "home" );
  
  return (
    <main className={"h-full grid grid-cols-[auto,1fr]"}>
      <SideBar
        title={"YourDash Demo Application"}
        items={[
          {
            label: "Home",
            icon: YourDashIcon.Home,
            onClick: () => {
              setPage( "home" );
            }
          },
          {
            label: "Global DB",
            icon: YourDashIcon.Database,
            onClick: () => {
              setPage( "global_db" );
            }
          },
          {
            label: "User DB",
            icon: YourDashIcon.Person,
            onClick: () => {
              setPage( "user_db" );
            }
          }
        ]}
      />
      {page === "home" && <YourDevHome/>}
      {page === "global_db" && <GlobalDbApplication/>}
      {page === "user_db" && null}
    
    </main>
  );
};

export default YourDevApplication;
