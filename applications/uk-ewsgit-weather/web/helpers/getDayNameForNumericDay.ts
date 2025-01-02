/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

const numericDayName = ["DAY_SUNDAY", "DAY_MONDAY", "DAY_TUESDAY", "DAY_WEDNESDAY", "DAY_THURSDAY", "DAY_FRIDAY", "DAY_SATURDAY"];

export default function getDayNameForNumericDay(numericDay: number) {
  return numericDayName[numericDay];
}
