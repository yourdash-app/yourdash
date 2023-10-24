/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "web-client/src/helpers/clippy";
import styles from "./FilesListView.module.scss";

const FilesListView: React.FC<{ files: { type: "file" | "directory", name: string }[] }> = ( { files } ) => {
  return <section className={ styles.view }>
    { files.map( ( file, i ) => {
      const isOdd = i % 2 === 1;
      
      console.log( isOdd );
      
      return <div
        key={ file.name }
        className={ clippy( styles.file, isOdd && styles.odd ) }
      >
        <span>{ file.name }</span>
      </div>;
    } ) }
  </section>;
};

export default FilesListView;
