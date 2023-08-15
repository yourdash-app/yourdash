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
import { Icon, MajorButton } from "../../../ui";
import PhotoDay from "./components/photoDay";
import useTranslate from "../backend/src/helpers/l10n";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";

const PhotosApplication: React.FC = () => {
  const trans = useTranslate( "photos" );
  const [photoCategories, setPhotoCategories] = useState<{
    photos: ""[],
    date: string
  }[]>( [] );
  
  useEffect( () => {
    setPhotoCategories( [] );
  }, [] );
  
  return (
    <div className={"grid grid-rows-[auto,1fr] h-full"}>
      <div className={"pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg"}>
        <h2>
          {trans( "APPLICATION_NAME" )}
        </h2>
      </div>
      <main className={"p-2 flex flex-col h-full"}>
        {
          photoCategories.length !== 0
            ? photoCategories.map( photoCategory => <PhotoDay key={photoCategory.date} photoCategory={photoCategory}/> )
            : (
              <main className={"min-h-full w-full flex items-center justify-center flex-col gap-2"}>
                <span className={"font-semibold text-3xl tracking-wide"}>
                  {
                    trans( "NO_PHOTOS_MESSAGE" )
                  }
                </span>
                <MajorButton className={"flex items-center justify-center gap-2"}>
                  <Icon className={"h-6"} icon={YourDashIcon.Upload16}/>
                  <span className={"flex-nowrap whitespace-nowrap flex items-center justify-center"}>
                    {
                      trans( "NO_PHOTOS_UPLOAD_PROMPT" )
                    }
                  </span>
                </MajorButton>
              </main>
            )
        }
      </main>
    </div>
  );
};

export default PhotosApplication;
