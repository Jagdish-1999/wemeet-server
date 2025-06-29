import { Socket } from "socket.io";

import {
    ClientToServerEventMap,
    ServerToClientEventMap,
} from "../types/types/event.map";
import type Response from "./response";

export type TypedSocket = Socket<
    ClientToServerEventMap,
    ServerToClientEventMap
>;

export type ClientToServerCallback<P, R> = (
    payload: P,
    cb: (res: Response<R>) => void,
    socket: TypedSocket
) => void;

export type ServerToClientCallback<P, R> = (
    payload: Response<P>,
    cb: (res: R) => void
) => void;
