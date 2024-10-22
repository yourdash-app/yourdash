/**
 * This file is auto-generated by backend/src/coreRequest.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {"/core/panel/position":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Sample description */
    post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                    };
                };
            };
            /** @description Request error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        error: string;
                    };
                };
            };
        };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {}},"/developer/install-all-applications":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {}},"/cat/:categoryid":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        displayName: string;
                        id: string;
                        icon?: string;
                        description?: string;
                        settings: Record<string, never>;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {"categoryid": string}},"/setting/:category/:setting":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        type: "string" | "int" | "float" | "directory" | "file" | "fileOfType" | "color" | "date" | "time" | "boolean" | "selection" | "multipleSelection";
                        value?: unknown;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {"category": string,"setting": string}},"/current/wallpaper":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Sample description */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sample description */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dimensions: {
                            width: number;
                            height: number;
                        };
                        thumbnail: string;
                    };
                };
            };
        };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
pathParams: {}},};
      type openapi = OpenApiApplicationRouteData;
      export default openapi;
      