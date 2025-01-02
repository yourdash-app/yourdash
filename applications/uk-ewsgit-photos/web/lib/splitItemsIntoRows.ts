/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { MAX_HEIGHT } from "../../shared/grid";
import { MediaAlbumLargeGridItem } from "../../shared/types/endpoints/media/album/large-grid";
import { PHOTOS_MEDIA_TYPE } from "../../shared/types/mediaType";

export function calculateAspectRatio(dimensions: { width: number; height: number }) {
  return dimensions.width / dimensions.height;
}

function calculateRowHeight(
  items: MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video>[],
  containerWidth: number,
  containerHeight: number,
  isLast: boolean,
) {
  const sumOfItemsRatio = items
    .map((item) => calculateAspectRatio({ width: item.metadata.width, height: item.metadata.height }))
    .reduce((sum, itemRatio) => sum + itemRatio);

  let rowHeight = Math.min(containerWidth / sumOfItemsRatio, MAX_HEIGHT);

  if (items.length === 1 && items[0].metadata.width > containerWidth) {
    rowHeight = Math.min(
      containerWidth / calculateAspectRatio({ width: items[0].metadata.width, height: items[0].metadata.height }),
      MAX_HEIGHT,
    );
  }

  if (isLast) {
    rowHeight = Math.min(containerHeight + 20, rowHeight);
  }

  return rowHeight;
}

function calculateRowWidth(items: MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video>[], containerHeight: number) {
  return items
    .map((item) => containerHeight * calculateAspectRatio({ width: item.metadata.width, height: item.metadata.height }))
    .reduce((sum, itemWidth) => sum + itemWidth);
}

export default function splitItemsIntoRows(
  items: MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video>[],
  containerWidth: number,
  baseRowHeight: number,
) {
  const rows: {
    height: number;
    items: (MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video> & { displayWidth: number })[];
  }[] = [];
  let currentRowNumber = 0;
  let currentRowItem = 0;

  while (currentRowItem < items.length) {
    const rowItems = [];

    do {
      // @ts-ignore
      rowItems.push(items[currentRowItem++]);
    } while (currentRowItem < items.length && calculateRowWidth([...rowItems, items[currentRowItem]], baseRowHeight) <= containerWidth);

    const rowHeight = calculateRowHeight(rowItems, containerWidth, baseRowHeight, items.length === currentRowItem);

    rows[currentRowNumber] = {
      // @ts-ignore
      items: rowItems.map((item) => ({
        ...item,
        displayWidth: rowHeight * calculateAspectRatio({ width: item.metadata.width, height: item.metadata.height }),
      })),
      height: rowHeight,
    };

    currentRowNumber += 1;
  }

  return rows;
}
