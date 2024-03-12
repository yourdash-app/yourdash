/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import { chunk } from "@yourdash/shared/web/helpers/array";
import Spinner from "@yourdash/uikit/depChiplet/components/spinner/Spinner";
import React, { useEffect, useState } from "react";
import IGridPhoto from "../../../shared/gridPhoto";
import { IPhoto } from "../../../shared/photo";
import PhotoGridRow from "./components/photoGridRow/PhotoGridRow";
import styles from "./PhotoGrid.module.scss";
import splitItemsIntoRows from "./splitItemsIntoRows";

let photos: IGridPhoto[] = [];

const PhotoGrid: React.FC<{ gridPhotoPaths: string[] }> = ({ gridPhotoPaths }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    { items: (IGridPhoto & { displayWidth: number; displayHeight: number })[]; height: number }[]
  >([]);
  const [notLoaded, setNotLoaded] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 100);
    });

    resizeObserver.observe(ref.current!, { box: "border-box" });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    Promise.all(
      chunk(gridPhotoPaths, 16).map((pc) => {
        return new Promise((resolve, reject) => {
          csi.getJson(
            `/app/photos/grid-photos/16/${pc.join(";.;")}`,
            (resPhotos: IPhoto[]) => {
              if (resPhotos) {
                resolve(resPhotos);
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
      // @ts-ignore
    ).then((photosResult: IGridPhoto[][]) => {
      photos = photosResult.flat();
      setNotLoaded(false);
      setRows(splitItemsIntoRows(photos, ref.current?.getBoundingClientRect().width || 512, 256));
    });
  }, [gridPhotoPaths]);

  return (
    <div className={styles.content} ref={ref}>
      {rows.length === 0 && notLoaded ? (
        <div className={"flex w-full h-64 items-center justify-center"}>
          <Spinner />
        </div>
      ) : (
        rows.map((row) => {
          return <PhotoGridRow key={row.items[0].imageUrl} items={row.items} height={row.height} />;
        })
      )}
    </div>
  );
};

export default PhotoGrid;
