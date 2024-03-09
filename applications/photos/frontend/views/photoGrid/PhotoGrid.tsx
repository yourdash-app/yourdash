/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React, { useEffect, useState } from "react";
import { IPhoto } from "../../../shared/types/photo";
import styles from "../../components/photoCategory/PhotoCategory.module.scss";
import PhotoGridRow from "./components/PhotoGridRow";
import splitItemsIntoRows from "./splitItemsIntoRows";

const PhotoGrid: React.FC<{ gridPhotoPaths: string[] }> = ({ gridPhotoPaths }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    { items: (IPhoto & { displayWidth: number; displayHeight: number })[]; height: number }[]
  >([]);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 25);
    });

    resizeObserver.observe(ref.current!, { box: "border-box" });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    Promise.all(
      gridPhotoPaths.map((p) => {
        return new Promise((resolve, reject) => {
          csi.getJson(
            `/app/photos/grid-photo/${p}`,
            (photo: IPhoto) => {
              if (photo) {
                resolve(photo);
              } else {
                reject();
              }
            },
            (error) => {
              console.log(error);
            },
          );
        });
      }),
    ).then((photosResult: any) => {
      setPhotos(photosResult);
      setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
    });
  }, [gridPhotoPaths]);

  return (
    <div className={styles.content} ref={ref}>
      {rows.map((row) => {
        return <PhotoGridRow key={row.items[0].imageUrl} items={row.items} height={row.height} />;
      })}
    </div>
  );
};

export default PhotoGrid;
