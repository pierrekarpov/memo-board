export interface Payload {
    path?: any;
    params?: any;
    data?: any;
}

export interface Action {
    type: string;
    metadata?: any;
    payload: Payload;
    response?: any;
}