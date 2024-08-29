export default function globalErrorHandler(err, req, res, next) {
    if(err || res.statusCode >= 400 || res.statusCode < 200) {
        res.status(500).json({
            status: res.statusCode,
            error: err.message
        })
    }

    next();
}
