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

import React, { useContext, useState } from "react";
import IconButton from "../iconButton/IconButton";
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext";
import { YourDashIcon } from "../icon/iconDictionary";

export interface IDropdownIconButton {
  items: {
    name: string;
    shortcut?: string;
    onClick: () => void;
  }[];
  className?: string;
  icon: YourDashIcon;
}

const DropdownIconButton: React.FC<IDropdownIconButton> = ( { items, className, icon } ) => {
  const rootContainerContext = useContext( RightClickMenuContext );
  
  const [dropdownShown, setDropdownShown] = useState( false );
  
  return (
    <IconButton
      icon={icon}
      className={className}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        
        const clientRect = e.currentTarget.getBoundingClientRect();
        
        if ( dropdownShown ) {
          rootContainerContext( 0, 0, clientRect.width, clientRect.height, false, [] );
          
          setDropdownShown( false );
          return;
        }
        
        rootContainerContext(
          clientRect.left,
          clientRect.bottom,
          clientRect.width,
          clientRect.height,
          true,
          items.map( item => {
            return {
              name: item.name,
              onClick: () => {
                item.onClick();
              },
              shortcut: item.shortcut
            };
          } )
        );
        
        setDropdownShown( true );
        
        const listener = ( ev: MouseEvent ) => {
          ev.preventDefault();
          
          rootContainerContext( 0, 0, clientRect.width, clientRect.height, false, [] );
          
          setDropdownShown( false );
          
          window.removeEventListener( "click", listener );
          window.removeEventListener( "contextmenu", listener );
        };
        
        window.addEventListener( "click", listener );
        window.addEventListener( "contextmenu", listener );
      }}
    />
  );
};

export default DropdownIconButton;
