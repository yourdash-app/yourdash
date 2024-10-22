/**
 * This file is auto-generated by backend/src/core.ts during vite server startup don't edit this file for any reason
*/
type OpenApiApplicationRouteData = {"/user-full-name":{
    parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
    };
    /** @description Get user full name */
    get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get user full name */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        first: string;
                        last: string;
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
pathParams: {}},"/widget/pages":{
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
                        pageCount: number;
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
pathParams: {}},"/widgets/:page":{
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
                        widgets: {
                            position: {
                                x: number;
                                y: number;
                            };
                            size: {
                                width: number;
                                height: number;
                            };
                            widgetType: string;
                            allowedSize: {
                                default: {
                                    width: number;
                                    height: number;
                                };
                                min: {
                                    width: number;
                                    height: number;
                                };
                                max: {
                                    width: number;
                                    height: number;
                                };
                            };
                            data?: unknown;
                        }[];
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
pathParams: {"page": string}},"/api-version":{
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
                        version: number;
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
      