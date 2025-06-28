import { Socket } from "socket.io";
import {
    EventMap,
    GatewayHandler,
    Payload,
    TypedResponse,
    ServiceHandler,
    EventCallback,
} from "../types";

import type Response from "./response";

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
    ): EventCallback =>
    async (payload, callback) => {
        console.log(
            `%c[Event]: %c${handler._eventName}`,
            "color:green;font-weight:bold;",
            "color:gold;font-weight:bold;"
        );

        type HandlerEvent = typeof handler._eventName;

        const data = await handler(payload || ({} as Payload[HandlerEvent]));
        if (data.eventName) {
            socket.broadcast.emit<typeof data.eventName>(
                data.eventName,
                data as any,
                (res) =>
                    console.log("[Event] from client: ", data.eventName, res)
            );
        }

        if (callback) callback<HandlerEvent>(data);
    };

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
        payload: Payload[E]
    ) =>
        | Response<TypedResponse[E] | null>
        | Promise<Response<TypedResponse[E] | null>>
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
    handler: (
        payload: Payload[E]
    ) => null | TypedResponse[E] | Promise<TypedResponse[E] | null>
): ServiceHandler<E> => handler as ServiceHandler<E>;

export { eventHandler, createGatewayHandler, createServiceHandler };
