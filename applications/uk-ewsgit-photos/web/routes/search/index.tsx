/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import TextInput from "@yourdash/uikit/components/textInput/textInput.js";
import useResource from "@yourdash/csi/useResource";
import React, { FC } from "react";
import EndpointMediaSearch from "../../../shared/types/endpoints/media/search.js";
import AlbumMediaGrid from "../../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../../components/SubAlbums/SubAlbums";
import SearchPageResults from "./components/results.js";
import styles from "./index.module.scss";

const SearchIndexPage: FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const searchResults = useResource(() => coreCSI.getJson<EndpointMediaSearch>(`/app/photos/media/search/`), [query]);

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
      <SubAlbums
        scrollerClassName={styles.subAlbums}
        path={"/photos"}
      />
      <AlbumMediaGrid
        scrollerClassName={styles.subAlbums}
        path={"/photos"}
      />
    </div>
  );
};

export default SearchIndexPage;
