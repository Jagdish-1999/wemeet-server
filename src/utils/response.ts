export default class Response<D> {
    message: string;
    data: D;

    constructor({ data, message = "" }: { data: D; message: string }) {
        this.message = message;
        this.data = data;
    }
}
