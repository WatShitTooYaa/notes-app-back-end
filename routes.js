const routes = [
    {
        method  : 'GET',
        path    : '/',
        handler : (request, h) => {
            return `Hello World!!`
        }
    },
    // {
    //     method  : 'GET',
    //     path    : '/profile/{username?}',
    //     handler : (request, h) => {
    //         let {username = 'stranger'} = request.params
    //         if(username === ''){
    //             username = 'strang'
    //         }
    //         return `Hello ${username}!!`
    //     }
    // },
    {
        method  : 'GET',
        path    : '/profile/{username?}',
        handler : (request, h) => {
            let {username = 'stranger'} = request.params

            let {lang} = request.query
            
            if(username === ''){
                username = 'strang'
            }

            if(lang === 'id'){
                return `Haii ${username}`
            }
            return `Hello ${username}!!`
        }
    },
    {
        method  : 'POST',
        path    : '/user',
        handler : (request, h) => {
            const {user} = request.payload
            return `Hello ${user}!!`
        }
    },
    {
        method  : '*',
        path    : '/{any*}',
        handler : (request, h) => {
            const response = h.response('not found')
            .code(404)
            .type('text/plain')
            .header('X-Custom', 'some-value')
            return response
        },
    }
]

module.exports = routes