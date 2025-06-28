import { Socket } from "socket.io";
import {
    AcknowledgeResponse,
    Chat,
    EventMap,
    GatewayHandler,
    ServiceHandler,
} from "../types";

export type TypedSocket = Socket<EventMap>;

/**
 * Wraps a gateway event handler to be used with a socket listener.
 *
 * This function takes a typed socket instance and a gateway handler (associated with a specific event)
 * and returns a function compatible with Socket.IO's `socket.on()` signature.
 * It ensures that payload and callback types are correctly inferred from the `EventMap` for the given event.
 *
 * @template E - A key of the `EventMap`, representing the specific event name.
 * @param {TypedSocket} socket - The typed socket instance through which events are received.
 * @param {GatewayHandler<E>} handler - The typed handler function corresponding to the event `E`.
 *
 * @returns {(payload: Parameters<EventMap[E]>[0], callback: Parameters<EventMap[E]>[1]) => Promise<void>}
 * A function that receives the payload and acknowledgement callback, executes the handler,
 * and sends the response via the callback.
 *
 * @example
 * socket.on("user:list", eventHandler(socket, userListHandler));
 */
const eventHandler =
    <E extends keyof EventMap>(
        socket: TypedSocket,
        handler: GatewayHandler<E>
    ): ((
        payload: Parameters<EventMap[E]>[0],
        callback: Parameters<EventMap[E]>[1]
    ) => void | Promise<void>) =>
    async (
        payload: Parameters<EventMap[E]>[0],
        callback: Parameters<EventMap[E]>[1]
    ): Promise<void> => {
        console.log(
            `%c[Event]: %c${handler._eventName}`,
            "color:green;font-weight:bold;",
            "color:gold;font-weight:bold;"
        );

        const data = await handler(payload);

        if (data.isEmitRequired && data.eventName && data.data) {
            type DataType = Parameters<EventMap[typeof data.eventName]>[0];
            const rData = data.data as DataType;

            socket.broadcast.emit(
                data.eventName as keyof EventMap,
                rData,
                (res: any) => console.log("Response from client: ", res)
            );
        }

        (callback as (arg: typeof data) => void | Promise<void>)(data);
    };
// const eventHandler =
//     <E extends keyof EventMap>(
//         socket: TypedSocket,
//         handler: GatewayHandler<E>
//     ): ((
//         payload: Parameters<EventMap[E]>[0],
//         callback: Parameters<EventMap[E]>[1]
//     ) => void | Promise<void>) =>
//     async (
//         payload: Parameters<EventMap[E]>[0],
//         callback: Parameters<EventMap[E]>[1]
//     ): Promise<void> => {
//         console.log(
//             `%c[Event]: %c${handler._eventName}`,
//             "color:green;font-weight:bold;",
//             "color:gold;font-weight:bold;"
//         );

//         const data = await handler(payload);

//         (callback as (arg: typeof data) => void | Promise<void>)(data);
//     };

/**
 * Factory function to create a gateway handler with an attached `_eventName` property.
 *
 * This ensures strong typing between the event name (`_eventName`) and the handler function
 * based on the `EventMap` definition. The returned function is cast to `GatewayHandler<E>`
 * and includes an `_eventName` field that can be used during dynamic event registration.
 *
 * @template E - A specific key from the `EventMap` representing the event name.
 *
 * @param {E} _eventName - The event name this handler is associated with.
 * @param {(payload: Parameters<EventMap[E]>[0]) => ReturnType<GatewayHandler<E>>} handler
 * A strongly typed handler function that processes the event payload and returns a response.
 *
 * @returns {GatewayHandler<E>} - The handler function with `_eventName` attached for later registration.
 *
 * @example
 * const userLoginHandler = createGatewayHandler("user:login", async (payload) => {
 *     // handle login logic
 *     const userData = await loginService(payload);
 *     return new Response(userData, "Login successful.");
 * });
 *
 * socket.on(userLoginHandler._eventName, eventHandler(socket, userLoginHandler));
 */
const createGatewayHandler = <E extends keyof EventMap>(
    _eventName: E,
    handler: (
        payload: Parameters<EventMap[E]>[0]
    ) => ReturnType<GatewayHandler<E>>
): GatewayHandler<E> => {
    const func = handler as GatewayHandler<E>;
    func._eventName = _eventName;
    return func;
};

/**
 * Creates a typed service handler for a specific event defined in the `EventMap`.
 *
 * Although the `_eventName` parameter is not used internally, it serves as an important type anchor
 * to bind the provided handler to a specific event key, ensuring proper payload and return type inference.
 *
 * This utility is useful for writing decoupled, type-safe service logic that can be reused
 * in gateway (Socket.IO) handlers or other layers of the application.
 *
 * @template E - A key from the `EventMap` representing the specific event.
 *
 * @param {E} _eventName - The event name this service is logically associated with. (Used for type binding only.)
 * @param {ServiceHandler<E>} handler - A function that handles the service logic for the given event,
 * taking the appropriate payload and returning the expected response type.
 *
 * @returns {ServiceHandler<E>} - The same handler, correctly typed for the event.
 *
 * @example
 * const loginService = createServiceHandler("user:login", async (payload) => {
 *     const user = await db.findUser(payload.id);
 *     return user as User;
 * });
 */
const createServiceHandler = <E extends keyof EventMap>(
    _eventName: E /** Not in use, pass it for identification only! */,
    handler: ServiceHandler<E>
): ServiceHandler<E> => {
    return handler;
};

export { eventHandler, createGatewayHandler, createServiceHandler };
