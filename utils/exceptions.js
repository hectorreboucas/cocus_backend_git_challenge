class CommonError extends Error {
    status;
    Message;
}

class NotFoundError extends CommonError {
    status = 404;
    Message = "Not found error"
}

class NotAcceptedError extends CommonError {
    status = 406;
    Message = "Not accepted error"
}

class InternalServerError extends CommonError {
    status = 500;
    Message = "Internal server error"
}

const errorDic = { 404: new NotFoundError(), 406: new NotAcceptedError() };

function getErrorByCode(code) {
    return code in errorDic ? errorDic[code] : new InternalServerError();
}

exports.CommonError = CommonError;
exports.NotFoundError = NotFoundError;
exports.NotAcceptedError = NotAcceptedError;
exports.InternalServerError = InternalServerError;
exports.getErrorByCode = getErrorByCode;