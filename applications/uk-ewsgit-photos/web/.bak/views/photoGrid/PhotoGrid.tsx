/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import { chunk } from "@yourdash/shared/web/helpers/array";
import Spinner from "@yourdash/chiplet/components/spinner/Spinner";
import React, { useEffect, useState } from "react";
import IGridItem from "../../../shared/grid";
import IMedia from "../../../shared/media";
import { IPhotoAlbum } from "../../../shared/photoAlbum";
import GridItemRow from "./components/photoGridRow/GridItemRow";
import styles from "./PhotoGrid.module.scss";
import splitItemsIntoRows from "../../../lib/splitItemsIntoRows";

let currentGridItems: IGridItem[] = [];

const PhotoGrid: React.FC<{ gridItems: IPhotoAlbum["items"] }> = ({ gridItems }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<{ items: (IGridItem & { displayWidth: number; displayHeight: number })[]; height: number }[]>([]);
  const [notLoaded, setNotLoaded] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(currentGridItems, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 100);
    });

    resizeObserver.observe(ref.current!, { box: "border-box" });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    Promise.all(
      chunk(gridItems.photos || [], 16).map((gridItem) => {
        return new Promise((resolve, reject) => {
          coreCSI.syncGetJson(
            `/app/photos/grid-photos/16/${gridItem.join(";.;")}`,
            (resPhotos: IMedia[]) => {
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
    ).then((photosMediaResult: IGridItem[][]) => {
      Promise.all(
        chunk(gridItems.videos || [], 16).map((gridItem) => {
          return new Promise((resolve, reject) => {
            coreCSI.syncGetJson(
              `/app/photos/grid-videos/16/${gridItem.join(";.;")}`,
              (resVideos: IMedia[]) => {
                if (resVideos) {
                  resolve(resVideos);
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
      ).then((videosMediaResult: IGridItem[][]) => {
        currentGridItems = [...videosMediaResult.flat(), ...photosMediaResult.flat()];
        setNotLoaded(false);
        setRows(splitItemsIntoRows(currentGridItems, ref.current?.getBoundingClientRect().width || 512, 256));
      });
    });
  }, [gridItems]);

  return (
    <div
      className={styles.content}
      ref={ref}
    >
      {rows.length === 0 && notLoaded ? (
        <div className={"flex w-full h-64 items-center justify-center"}>
          <Spinner />
        </div>
      ) : (
        rows.map((row) => {
          console.log(row);
          return (
            <GridItemRow
              key={row.items[0]?.path}
              items={row.items}
              height={row.height}
            />
          );
        })
      )}
    </div>
  );
};

export default PhotoGrid;
