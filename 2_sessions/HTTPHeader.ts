const headerkey:string = 'x-access-token';

class HTTPHeader{
     public static getToken(request:any):string{
        return request.headers[headerkey];
     }
}
export {HTTPHeader}