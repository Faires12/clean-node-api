export interface HttpRequest {
    body?: any
    params?: any
    headers?: any
}

export interface HttpResponse {
    statusCode: number
    body: any
}