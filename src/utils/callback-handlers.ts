import { EventMap, GatewayHandler, ServiceHandler } from "../types";

/**
 *
 * @param func
 * @returns function
 */
const eventHandler =
    <E extends keyof EventMap>(handler: GatewayHandler<E>) =>
    async (
        payload: Parameters<EventMap[E]>[0],
        callback: Parameters<EventMap[E]>[1]
    ): Promise<void> => {
        console.log(
            `%c[Event]: %c${handler.eventName}`,
            "color:green;font-weight:bold;",
            "color:gold;font-weight:bold;"
        );

        const data = await handler(payload);
        (callback as (arg: typeof data) => void | Promise<void>)(data);
    };

const createGatewayHandler = <E extends keyof EventMap>(
    eventName: E,
    handler: (
        payload: Parameters<EventMap[E]>[0]
    ) =>
        | Parameters<Parameters<EventMap[E]>[1]>[0]
        | Promise<Parameters<Parameters<EventMap[E]>[1]>[0]>
) => {
    const func = handler as GatewayHandler<E>;
    func.eventName = eventName;
    return func;
};

const createServiceHandler = <E extends keyof EventMap>(
    _eventName: E /** Not in use, pass it for identification only! */,
    handler: ServiceHandler<E>
) => {
    return handler;
};

export { eventHandler, createGatewayHandler, createServiceHandler };
