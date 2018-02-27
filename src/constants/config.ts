const API_URL = 'https://monero.gives/api';
export const CONFIG = {
    coins: ['AEON', 'ETN', 'SUMO', 'XMR'],
    networkStats: {
        range: 1000 * 60 * 60 * 48
    },
    poolStats: {
        range: 1000 * 60 * 60 * 48
    },
    client: {
        ports: API_URL + '/pool/ports'
    },
    admin: {
        auth: API_URL + '/authenticate',
        ports: API_URL + '/admin/ports',
        settings: API_URL + '/admin/config',
        workers: API_URL + '/admin/userList',
        modules: {
            pool: ['pool', 'pps', 'pplns', 'solo'],
            payout: ['payout'],
            server: ['daemon', 'wallet', 'rpc', 'api'],
            email: ['general', 'email']
        }
    },
    exchange: 'https://monero.gives/exchange/'
}