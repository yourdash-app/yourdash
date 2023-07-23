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
import { Card, Icon, IconButton } from "../../../ui";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const YourDevHome: React.FC = () => (
  <div className={"grid grid-cols-2 h-full overflow-hidden gap-4 p-4 bg-bg"}>
    <section className={"flex flex-col gap-4"}>
      <Card className={"flex gap-2 flex-row items-center"} showBorder>
        <Icon className={"aspect-square h-12"} icon={YourDashIcon.YourDashLogo} useDefaultColor/>
        <h1 className={"text-3xl font-bold tracking-wide"}>{"YourDev / Home"}</h1>
        <div className={"ml-auto flex gap-2 items-center"}>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Plug16}/>
            <span>{"20"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Info16} color={"#32b3ff"}/>
            <span>{"200"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Alert16} color={"#eeff33"}/>
            <span>{"4"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.XCircle16} color={"#ff6633"}/>
            <span>{"1"}</span>
          </div>
        </div>
      </Card>
      <Card className={"h-full"} showBorder>
        Requests log
      </Card>
    </section>
    <section className={"flex flex-col gap-4"}>
      <Card className={"h-full"} showBorder>
        <h2 className={"font-semibold text-3xl tracking-wide"}>
          Console
        </h2>
      </Card>
    </section>
  </div>
);

export default YourDevHome;
