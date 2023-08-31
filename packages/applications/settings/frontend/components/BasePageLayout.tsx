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
import { IconButton } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IBasePageLayout {
  children: React.ReactNode,
  title: string,
  noBack?: boolean
}

const BasePageLayout: React.FC<IBasePageLayout> = ( {
  children,
  title,
  noBack
} ) => {
  const navigate = useNavigate();
  
  return (
    <main className={"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4"}>
      <section className={"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4 animate__animated animate__fadeIn" +
                          " animate__duration_250ms"}>
        {
          !noBack && (
            <IconButton
              onClick={() => {
                navigate( ".." );
              }}
              icon={YourDashIcon.ChevronLeft16}
            />
          )
        }
        <h1 className={"font-bold text-container-fg text-4xl w-full text-left"}>{title}</h1>
      </section>
      <div className={"grid grid-cols-1 w-full xl:grid-cols-2 gap-2 animate__animated animate__fadeIn animate__100ms"}>
        {children}
      </div>
    </main>
  );
};

export default BasePageLayout;
