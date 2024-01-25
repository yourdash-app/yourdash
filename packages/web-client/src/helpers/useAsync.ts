/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useAsync<T, A extends any[]>( func: ( ...args: A ) => Promise<T>, args: A ) {
  const [ value, setValue ] = useState<T | undefined>( undefined );

  useEffect( () => {
    func( ...args )
      .then( setValue )
      .catch( console.error );
  }, [] )

  return value
}
