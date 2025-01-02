/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import ISearchResult from "../../../../shared/types/search/result.js";

const SearchPageResults: FC<{ results: ISearchResult[] }> = ({ results }) => {
  return (
    <>
      {results.map((result) => {
        return <>{result.fileName}</>;
      })}
    </>
  );
};

export default SearchPageResults;
