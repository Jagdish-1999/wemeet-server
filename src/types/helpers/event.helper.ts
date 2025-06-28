import { EventMap } from "../types";

export interface EventCallback<P, R> {
    (payload: P, callback: AcknowledgeCallback<R>): void | Promise<void>;
}

export interface AcknowledgeCallback<T> {
    (response: AcknowledgeResponse<T | null>): void | Promise<void>;
}

export interface AcknowledgeResponse<T> {
    isEmitRequired?: boolean;
    eventName?: keyof EventMap;
    isError: boolean;
    message: string;
    data: T;
}

export interface GatewayHandler<E extends keyof EventMap> {
    (payload: Parameters<EventMap[E]>[0]):
        | Parameters<Parameters<EventMap[E]>[1]>[0]
        | Promise<Parameters<Parameters<EventMap[E]>[1]>[0]>;
    _eventName: E;
}

export type ServiceHandler<T extends keyof EventMap> = EventMap[T] extends (
    payload: infer P,
    callback: (res: AcknowledgeResponse<infer R>) => any
) => any
    ? (payload: P) => null | R | Promise<R | null>
    : never;

export type EmitData<E extends keyof EventMap> = EventMap[E] extends (
    payload: infer P,
    callback: (res: AcknowledgeResponse<infer R>) => void | Promise<void>
) => any
    ? R
    : never;
