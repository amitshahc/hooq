
export class AppError {
    constructor(public error?: any) {
        //alert("AppError Occured");
        console.log("AppError: ",  error);
    }
}