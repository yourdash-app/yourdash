/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";

export default function useQueryParams() {
  const [query, setQuery] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search));
  }, [window.location.search]);

  return query;
}
