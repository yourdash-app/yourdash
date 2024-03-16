/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import IGridItem, { MAX_HEIGHT } from "../../../shared/grid";

export function calculateAspectRatio(dimensions: { width: number; height: number }) {
  return dimensions.width / dimensions.height;
}

function calculateRowHeight(items: IGridItem[], containerWidth: number, containerHeight: number, isLast: boolean) {
  const sumOfItemsRatio = items
    .map((item) => calculateAspectRatio(item.dimensions))
    .reduce((sum, itemRatio) => sum + itemRatio);

  let rowHeight = Math.min(containerWidth / sumOfItemsRatio, MAX_HEIGHT);

  if (items.length === 1 && items[0].dimensions.width > containerWidth) {
    rowHeight = Math.min(containerWidth / calculateAspectRatio(items[0].dimensions), MAX_HEIGHT);
  }

  if (isLast) {
    rowHeight = Math.min(containerHeight + 20, rowHeight);
  }

  return rowHeight;
}

function calculateRowWidth(items: IGridItem[], containerHeight: number) {
  return items
    .map((item) => containerHeight * calculateAspectRatio(item.dimensions))
    .reduce((sum, itemWidth) => sum + itemWidth);
}

export default function splitItemsIntoRows(items: IGridItem[], containerWidth: number, baseRowHeight: number) {
  const rows: { items: (IGridItem & { displayWidth: number; displayHeight: number })[]; height: number }[] = [];
  let currentRowNumber = 0;
  let currentRowItem = 0;

  while (currentRowItem < items.length) {
    const rowItems = [];

    do {
      // @ts-ignore
      rowItems.push(items[currentRowItem++]);
    } while (
      currentRowItem < items.length &&
      calculateRowWidth([...rowItems, items[currentRowItem]], baseRowHeight) <= containerWidth
    );

    const rowHeight = calculateRowHeight(rowItems, containerWidth, baseRowHeight, items.length === currentRowItem);

    rows[currentRowNumber] = {
      items: rowItems.map((item) => ({
        ...item,
        displayWidth: rowHeight * calculateAspectRatio(item.dimensions),
        displayHeight: rowHeight,
      })),
      height: rowHeight,
    };

    currentRowNumber += 1;
  }

  return rows;
}
