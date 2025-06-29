import { ClientToServerCallback } from "../../utils/callbacks";
import { ClientToServerEventMap } from "../types/event.map";

export type ServiceHandler<E extends keyof ClientToServerEventMap> = (
    payload: ClientToServerEventMap[E] extends ClientToServerCallback<
        infer P,
        any
    >
        ? P
        : never
    // payload: Parameters<ClientToServerEventMap[E]>[0]
) => ClientToServerEventMap[E] extends ClientToServerCallback<any, infer D>
    ? Promise<D>
    : never;
