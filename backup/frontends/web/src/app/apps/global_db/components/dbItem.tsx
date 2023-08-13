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
import { TextBox, IconButton, TextInput } from "../../../../ui";
import { YourDashIcon } from "../../../../ui/components/icon/iconDictionary";

export interface IdbItem {
  item: {
    key: string,
    content: string
  },
  setItemData: ( key: string, content: string ) => void,
  removeKey: ( key: string ) => void
}

const DbItem: React.FC<IdbItem> = ( {
  item,
  setItemData,
  removeKey
} ) => {
  const [active, setActive] = useState<boolean>( false );
  const [key, setKey] = useState<string>( "" );
  const [content, setContent] = useState<string>( "" );
  
  useEffect( () => {
    setKey( item.key );
    setContent( item.content );
  }, [item] );
  
  return (
    <div className={"bg-container-bg text-container-fg flex gap-4 p-2 rounded-xl"}>
      <div className={"flex flex-col gap-2"}>
        <IconButton
          icon={active ? YourDashIcon.ChevronUp16 : YourDashIcon.ChevronDown16}
          onClick={() => setActive( !active )}
          className={"flex-shrink-0"}
        />
        {
          active && (
            <IconButton
              icon={YourDashIcon.Check16}
              onClick={() => {
                if ( key === "" || content === "" ) {
                  return;
                }
                       
                try {
                  JSON.parse( content );
                } catch ( _err ) {
                  return;
                }
                       
                if ( key !== item.key ) {
                  removeKey( item.key );
                }
                       
                setItemData( key, content );
              }}
              className={"flex-shrink-0"}
            />
          )
        }
      </div>
      {active
        ? (
          <TextInput
            onBlur={e => {
              setKey( e.currentTarget.value );
            }}
            onChange={( value: string ) => {
              setKey( value );
            }}
            defaultValue={key}
            className={"mt-auto mb-auto flex-shrink-0"}
          />
        )
        : <span className={"mt-auto mb-auto"}>{key}</span>
      }
      {
        active && (
          <TextBox
            className={"flex flex-shrink"}
            defaultValue={content}
            onChange={e => {
              setContent( e.currentTarget.value );
            }}
          />
        )
      }
    </div>
  );
};

export default DbItem;
