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

import React, { useState } from "react";
import { Card, Icon } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const PhotoDay: React.FC<{
  photoCategory: {
    date: string,
    photos: string[]
  }
}> = ({ photoCategory }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(true);

  return (
    <div key={photoCategory.date} className={"flex flex-col gap-1"}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type={"button"}
        className={"text-left border-b-[1px] border-b-container-border pt-2.5 pb-0.5 pl-2 ml-2.5 mr-2.5 flex justify-between text-xl !bg-transparent"}
      >
        <h3>
          {photoCategory.date}
        </h3>
        <Icon
          icon={isOpen ? YourDashIcon.ChevronDown : YourDashIcon.ChevronUp}
          className={"h-5"}
          color={"rgb(var(--button-fg))"}
        />
      </button>
      {
        isOpen && (
          <Card>
            {
              photoCategory.photos.map(photo => <img src={photo} key={photo} alt={""} />)
            }
          </Card>
        )
      }
    </div>
  );
};

export default PhotoDay;
