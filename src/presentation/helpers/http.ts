import { HttpResponse } from "../protocols"

export const ok = (message: any) : HttpResponse => {
    return {
        statusCode: 200,
        body: message
    }
}

export const noContent = () : HttpResponse => {
    return {
        statusCode: 204,
        body: {}
    }
}

export const badRequest = (error : Error) : HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}

export const unauthorized = (error : Error) : HttpResponse => {
    return {
        statusCode: 401,
        body: error
    }
}

export const forbiden = (error : Error) : HttpResponse => {
    return {
        statusCode: 403,
        body: error
    }
}

export const internalError = () : HttpResponse => {
    return {
        statusCode: 500,
        body: new Error('Internal Server Error')
    }
}