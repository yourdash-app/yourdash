import { ZodType } from 'zod';
type TunnelResponseType = "text" | "json" | "uint8" | "bytes";
declare class Tunnel {
    baseUrl: string;
    constructor();
    __internal_connectTo(instanceUrl: string): this;
    get<S extends ZodType>(path: string, responseType: TunnelResponseType, responseSchema: S): Promise<{
        data: S["_output"];
        status: number;
        error: boolean;
        response: Response;
    }>;
    post<S extends ZodType>(path: string, body: object, responseType: TunnelResponseType, responseSchema: S): Promise<{
        data: S["_output"];
        status: number;
        error: boolean;
        response: Response;
    }>;
    put<S extends ZodType>(path: string, body: string, responseType: TunnelResponseType, responseSchema: S): Promise<{
        data: S["_output"];
        status: number;
        error: boolean;
        response: Response;
    }>;
    delete<S extends ZodType>(path: string, responseType: TunnelResponseType, responseSchema: S): Promise<{
        data: S["_output"];
        status: number;
        error: boolean;
        response: Response;
    }>;
}
declare const tun: Tunnel;
export default tun;
