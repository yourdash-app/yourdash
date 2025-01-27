/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useResource from "@yourdash/csi/useResource";
import UK from "@yourdash/uikit";
import { TextInput } from "@yourdash/uikit/src/components/index";
import React, { FC } from "react";
import AlbumMediaGrid from "../../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../../components/SubAlbums/SubAlbums";
import { acsi } from "../../meta.yourdash.ts";
import SearchPageResults from "./components/results.js";
import styles from "./index.module.scss";

const SearchIndexPage: FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const searchResults = useResource(() => acsi.getJson(`/media/search/:query`, `/media/search/${query}`), [query]);

  return (
    <div className={styles.page}>
      <TextInput
        className={styles.searchBar}
        accessibleName={"Search Media"}
        getValue={setQuery}
        placeholder={"Search Media..."}
        icon={UKIcons.Search}
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
