/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import useResource from "@yourdash/csi/useResource";
import React, { FC } from "react";
import EndpointMediaSearch from "../../../shared/types/endpoints/media/search.js";
import Albums from "./components/albums.js";
import SearchPageResults from "./components/results.js";
import styles from "./index.module.scss";

const SearchIndexPage: FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const searchResults = useResource(() => csi.getJson<EndpointMediaSearch>(`/app::photos/media/search/`), [query]);

  return (
    <div className={styles.page}>
      <TextInput
        className={styles.searchBar}
        accessibleName={"Search Media"}
        onChange={(val) => {
          setQuery(val);
        }}
        placeholder={"Search Media..."}
        icon={UKIcon.Search}
      />
      {searchResults && <SearchPageResults results={searchResults} />}
      <Albums />
    </div>
  );
};

export default SearchIndexPage;
