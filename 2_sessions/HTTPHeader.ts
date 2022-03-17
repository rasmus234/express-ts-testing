const headerkey:string = 'set-cookie';

class HTTPHeader{
     public static getToken(request:any):string{
        return request.headers[headerkey];
     }
}
export {HTTPHeader}
