import { EventMap, Payload, TypedResponse } from "../types";
import type Response from "../../utils/response";

export type EventCallback = <E extends keyof EventMap = keyof EventMap>(
    payload?: Payload[E],
    callback?: Callback
) => void | Promise<void>;

export type Callback = <T extends keyof EventMap>(
    response: TypedResponse[T]
) => void | Promise<void>;

export interface CallbackResponse<T> {
    eventName?: keyof EventMap | null;
    isError: boolean;
    message: string;
    data: T;
}

export interface GatewayHandler<E extends keyof EventMap = keyof EventMap> {
    _eventName: E;
    (payload: Payload[E] | {}):
        | Response<TypedResponse[E] | null>
        | Promise<Response<TypedResponse[E] | null>>;
}

export type ServiceHandler<E extends keyof EventMap> = (
    payload: Payload[E]
) => null | TypedResponse[E] | Promise<TypedResponse[E] | null>;
