
/**
 *@desc
 *@author liudejian
 *@date 2020-02-04 11:46
 **/
export enum BizCode {
    SUCCESS = 0,
    AUTH_FAIL = 1,
    FAIL = -1
}
/**
 *@desc
 *@author liudejian
 *@date 2020-01-27 21:58
 **/
export  enum HttpStatus {
    //Continue
    CONTINUE = 100,
//Switching Protocols
    SWITCHING_PROTOCOLS = 101,
//Processing
    PROCESSING = 102,
//Checkpoint
    CHECKPOINT = 103,
//OK
    OK = 200,
//Created
    CREATED = 201,
//Accepted
    ACCEPTED = 202,
//Non-Authoritative Information
    NON_AUTHORITATIVE_INFORMATION = 203,
//No Content
    NO_CONTENT = 204,
//Reset Content
    RESET_CONTENT = 205,
//Partial Content
    PARTIAL_CONTENT = 206,
//Multi-Status
    MULTI_STATUS = 207,
//Already Reported
    ALREADY_REPORTED = 208,
//IM Used
    IM_USED = 226,
//Multiple Choices
    MULTIPLE_CHOICES = 300,
//Moved Permanently
    MOVED_PERMANENTLY = 301,
//Found
    FOUND = 302,
//Moved Temporarily
    MOVED_TEMPORARILY = 302,
//See Other
    SEE_OTHER = 303,
//Not Modified
    NOT_MODIFIED = 304,
//Use Proxy
    USE_PROXY = 305,
//Temporary Redirect
    TEMPORARY_REDIRECT = 307,
//Permanent Redirect
    PERMANENT_REDIRECT = 308,
//Bad Request
    BAD_REQUEST = 400,
//Unauthorized
    UNAUTHORIZED = 401,
//Payment Required
    PAYMENT_REQUIRED = 402,
//Forbidden
    FORBIDDEN = 403,
//Not Found
    NOT_FOUND = 404,
//Method Not Allowed
    METHOD_NOT_ALLOWED = 405,
//Not Acceptable
    NOT_ACCEPTABLE = 406,
//Proxy Authentication Required
    PROXY_AUTHENTICATION_REQUIRED = 407,
//Request Timeout
    REQUEST_TIMEOUT = 408,
//Conflict
    CONFLICT = 409,
//Gone
    GONE = 410,
//Length Required
    LENGTH_REQUIRED = 411,
//Precondition Failed
    PRECONDITION_FAILED = 412,
//Payload Too Large
    PAYLOAD_TOO_LARGE = 413,
//Request Entity Too Large
    REQUEST_ENTITY_TOO_LARGE = 413,
//URI Too Long
    URI_TOO_LONG = 414,
//Request-URI Too Long
    REQUEST_URI_TOO_LONG = 414,
//Unsupported Media Type
    UNSUPPORTED_MEDIA_TYPE = 415,
//Requested range not satisfiable
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
//Expectation Failed
    EXPECTATION_FAILED = 417,
//I'm a teapot
    I_AM_A_TEAPOT = 418,
//Insufficient Space On Resource
    INSUFFICIENT_SPACE_ON_RESOURCE = 419,
//Method Failure
    METHOD_FAILURE = 420,
//Destination Locked
    DESTINATION_LOCKED = 421,
//Unprocessable Entity
    UNPROCESSABLE_ENTITY = 422,
//Locked
    LOCKED = 423,
//Failed Dependency
    FAILED_DEPENDENCY = 424,
//Too Early
    TOO_EARLY = 425,
//Upgrade Required
    UPGRADE_REQUIRED = 426,
//Precondition Required
    PRECONDITION_REQUIRED = 428,
//Too Many Requests
    TOO_MANY_REQUESTS = 429,
//Request Header Fields Too Large
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
//Unavailable For Legal Reasons
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
//Internal Server Error
    INTERNAL_SERVER_ERROR = 500,
//Not Implemented
    NOT_IMPLEMENTED = 501,
//Bad Gateway
    BAD_GATEWAY = 502,
//Service Unavailable
    SERVICE_UNAVAILABLE = 503,
//Gateway Timeout
    GATEWAY_TIMEOUT = 504,
//HTTP Version not supported
    HTTP_VERSION_NOT_SUPPORTED = 505,
//Variant Also Negotiates
    VARIANT_ALSO_NEGOTIATES = 506,
//Insufficient Storage
    INSUFFICIENT_STORAGE = 507,
//Loop Detected
    LOOP_DETECTED = 508,
//Bandwidth Limit Exceeded
    BANDWIDTH_LIMIT_EXCEEDED = 509,
//Not Extended
    NOT_EXTENDED = 510,
//Network Authentication Required
    NETWORK_AUTHENTICATION_REQUIRED = 511,
}

/**
 *@desc 参数类型
 *@author liudejian
 *@date 2020-02-04 11:46
 **/
export enum ParamType {
    HEADER="HEADER",
    PARAM="PARAM",
    BODY="BODY",
    CALLBACK="CALLBACK"
}

/**
 *@desc
 *@author liudejian
 *@date 2020-01-27 21:56
 **/
export enum RequestMethod {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE"
}

