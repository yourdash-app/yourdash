/*
 * Copyright © 2023 @Ewsgit and YourDash contributors.
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

import { useNavigate } from "react-router";
import csi from "../../../../helpers/csi";
import styles from "./Widget.module.scss";
import { memo, useEffect, useState } from "react";

const InstanceLogoWidget: React.FC = () => {
  const navigate = useNavigate();
  const [icons, setIcons] = useState<{ small: string, medium: string, large: string }>( { small: "", medium: "", large: "" } )
  
  useEffect( () => {
    csi.getJson( "/core/panel/logo", ( data ) => {
      setIcons( data )
    } )
  }, [] )
  
  return <img
    src={ `${csi.getInstanceUrl()}${icons.large}` }
    alt={ "Instance logo" }
    draggable={ false }
    className={ styles.icon }
    onClick={ () => {
      navigate( "/app/a/dash" );
    } }
  />;
};

export default memo( InstanceLogoWidget );