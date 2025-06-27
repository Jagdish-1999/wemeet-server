// import { AcknowledgeTypes } from "../types";

// export default class Response<T> implements AcknowledgeTypes<T> {
//     message: string;
//     isError: boolean;
//     data: T;

//     constructor(data: T, message: string = "", isError: boolean = false) {
//         this.message = message;
//         this.isError = isError;
//         this.data = data;
//     }
// }
import { AcknowledgeResponse } from "../types";

export default class Response<T> implements AcknowledgeResponse<T> {
    message: string;
    isError: boolean;
    data: T;

    constructor(data: T, message: string = "", isError: boolean = false) {
        this.message = message;
        this.isError = isError;
        this.data = data;
    }
}
