import { AppError } from "./app-error";

export class Unauthorized extends AppError {
    constructor(error?: any) {
        super(error);
        console.log("Unauthorized: ", error);
    }
}