/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { IPhoto } from "../../../shared/types/photo";
import { IPhotoCategory } from "../../../shared/types/photoCategory";
import styles from "../../components/photoCategory/PhotoCategory.module.scss";
import PhotoGridRow from "./components/PhotoGridRow";
import splitItemsIntoRows from "./splitItemsIntoRows";

const PhotoGrid: React.FC<{ photos: IPhotoCategory["items"] }> = ({ photos }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    { items: (IPhoto & { displayWidth: number; displayHeight: number })[]; height: number }[]
  >([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 100);
    });

    setTimeout(() => {
      resizeObserver.observe(ref.current!);
    }, 2000);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
  }, [photos]);

  return (
    <div className={styles.content} ref={ref}>
      {rows.map((row, index) => {
        return <PhotoGridRow key={index} items={row.items} height={row.height} />;
      })}
    </div>
  );
};

export default PhotoGrid;
