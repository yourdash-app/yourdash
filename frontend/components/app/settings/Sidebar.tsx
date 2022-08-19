/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

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
        title={"Code Editor"}
        currentTarget={props.page}
        activeTarget={"code-editor"}
        link={"/app/settings/code-editor"}
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
