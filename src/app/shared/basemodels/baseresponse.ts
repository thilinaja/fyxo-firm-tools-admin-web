export interface BaseResponseModel<T> {
    data:T;
    code:ResponseCode;
}
export interface ResponseCode{
    Message:string;
    Status:number;
}
