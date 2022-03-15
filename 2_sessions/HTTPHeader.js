"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPHeader = void 0;
const headerkey = 'x-access-token';
class HTTPHeader {
    static getToken(request) {
        return request.headers[headerkey];
    }
}
exports.HTTPHeader = HTTPHeader;
