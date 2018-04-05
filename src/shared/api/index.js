/**
 * export SERVER_ROOT 服务器URI
 */
export let SERVER_ROOT
if ('development' ===process.env.NODE_ENV) {
    SERVER_ROOT = 'http://127.0.0.1:8000'
} else if ('production' ===process.env.NODE_ENV) {
    SERVER_ROOT = 'http://cono.yinweiqi.com'
}

