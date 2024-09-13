import { createContext } from "react";

const pathContext = createContext({ path: undefined as string | undefined, setPath: (newPath: string) => string });

export default pathContext;
