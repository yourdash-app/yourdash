/*
 * Copyright (c) 2022-2023 YourDash contributors.
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
import { Card, Icon } from "../../../../ui";
import Header from "../../../components/Header";
import { YourDashIcon } from "../../../../ui/components/icon/iconDictionary";

const HowToHelp: React.FC = () => (
  <main className={"w-full flex flex-col gap-4"}>
    <section className={"w-full bg-container-bg text-container-fg pb-32 pt-32 text-center"}>
      <h1 className={"text-7xl font-bold tracking-wide"}>{"Some ways you can help"}</h1>
    </section>
    <div className={"grid grid-cols-3 gap-2 pl-4 pr-4 max-w-[96rem] ml-auto mr-auto h-72"}>
      <Card onClick={() => 0}>
        <h2>
          {"Suggest new features"}
        </h2>
        <p>
          {"Add new features / improve existing ones"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
      <Card onClick={() => 0}>
        <h2>
          {"report bugs"}
        </h2>
        <p>
          {"Help improve reliability or fix something unexpected"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
      <Card onClick={() => 0}>
        <h2>
          {"Improve translations and documentation"}
        </h2>
        <p>
          {"Help make YourDash inclusive for all"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
    </div>
  </main>
);

export default HowToHelp;
