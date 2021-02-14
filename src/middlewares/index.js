module.exports = {
    notFoundMiddleware : require('./not-found.middleware'),
    ErrorMiddleware:require('./error.middleware'),
    AuthMiddleware : require('./auth.middleware'),
    ParseIntMiddleware: require('./parse-int.middleware'),
    CacheTimeMiddleware: require('./cache.middleware')

}