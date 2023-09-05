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
import useTranslate from "web-client/src/helpers/i10n";
import styles from "./BrowserLayout.module.scss";
import { IconButton } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IBrowserLayout {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const BrowserLayout: React.FC<IBrowserLayout> = ( {
  username,
  fullName
} ) => {
  const navigate = useNavigate();
  const trans = useTranslate( "dash" );
  return (
    <div
      className={
        "flex items-center justify-center flex-col h-full w-full bg-center bg-cover gap-4"
      }
    >
      <IconButton
        className={"fixed top-4 right-4"}
        icon={YourDashIcon.Gear}
        onClick={() => {
          navigate( "/app/a/settings/personalization/dashboard" );
        }}
      />
      <div
        className={
          "font-black text-container-fg 2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl translate-all animate__animated animate__fadeInUp [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))] backdrop-blur-md bg-container-bg bg-opacity-75 p-4 pl-6 pr-6 rounded-3xl"
        }
      >
        {trans( "LOCALIZED_GREETING", [fullName.first, fullName.last] )}
      </div>
      <section
        className={styles.content}
      >
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"
          }
        />
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-64"
          }
        />
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"
          }
        />
      </section>
    </div>
  );
};

export default BrowserLayout;
