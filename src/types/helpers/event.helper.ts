import { EventMap } from "../types";

export interface EventCallback<P, R> {
    (payload: P, callback: AcknowledgeCallback<R>): void | Promise<void>;
}

export interface AcknowledgeCallback<T> {
    (response: AcknowledgeResponse<T>): void | Promise<void>;
}

export interface AcknowledgeResponse<T> {
    isError: boolean;
    message: string;
    data: T;
}

export interface GatewayHandler<E extends keyof EventMap> {
    (payload: Parameters<EventMap[E]>[0]):
        | Parameters<Parameters<EventMap[E]>[1]>[0]
        | Promise<Parameters<Parameters<EventMap[E]>[1]>[0]>;
    eventName: E;
}

export type ServiceHandler<T extends keyof EventMap> = EventMap[T] extends (
    payload: infer P,
    callback: (res: AcknowledgeResponse<infer R>) => any
) => any
    ? (payload: P) => R | Promise<R>
    : never;
