export const ErrorHandler = (res, status= 400, message= 'internal server error') => {
    return res.status(status).json({success:false, message:message})
}


export const MiddleHandler = (passFunc) => (req, res) => {
    return Promise.resolve(passFunc(req, res)).catch(err => {
        return ErrorHandler(res,  500, err.message);
    })
}