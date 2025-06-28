import { AcknowledgeResponse, EventMap } from "../types";

/**
 * A generic response wrapper used to standardize acknowledgements across socket events.
 *
 * Implements the `AcknowledgeResponse<T>` interface, and provides a consistent structure
 * containing a success or error message, error status, and data payload.
 *
 * This is useful for returning data from Socket.IO event handlers or service functions in a predictable format.
 *
 * @template T - The type of the `data` being returned in the response.
 *
 * @implements {AcknowledgeResponse<T>}
 *
 * @example
 * const response = new Response<UserType>(user, "Login successful");
 * socket.emit("user:login", payload, (res) => {
 *     if (!res.isError) console.log(res.data);
 * });
 */
export default class Response<T> implements AcknowledgeResponse<T> {
    isEmitRequired: boolean;
    eventName: keyof EventMap;
    message: string;
    isError: boolean;
    data: T;

    /**
     * Creates a new standardized response instance.
     *
     * @param {T} data - The data payload to be returned.
     * @param {string} [message=""] - Optional message describing the result.
     * @param {boolean} [isError=false] - Optional flag indicating if the response is an error.
     */
    constructor({
        data,
        message = "",
        isError = false,
        eventName = "",
    }: {
        data: T;
        message: string;
        isError?: boolean;
        eventName?: keyof EventMap;
    }) {
        this.message = message;
        this.isError = isError;
        this.data = data;
        this.isEmitRequired = !!eventName;
        this.eventName = eventName;
    }
}
