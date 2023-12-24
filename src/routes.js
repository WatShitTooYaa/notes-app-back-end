let notes = require('./notes')
const {getHandler, postHandler, putHandler, deleteHandler} = require('./handler')



const routes = [
    {
        method  : 'POST',
        path    : '/notes',
        handler : (request, h) => {
            const response = postHandler(request, h)
            return response
        }
    },
    {
        method  : 'GET',
        path    : '/notes/{id?}',
        handler : (request, h) => {
            const response = getHandler(request, h, notes)

            return response
        }
    },
    {
        method  : 'PUT',
        path    : '/notes/{id?}',
        handler : (request, h) => {
            const response = putHandler(request, h)
            return response
        }
    },
    {
        method  : 'DELETE',
        path    : '/notes/{id?}',
        handler : (request, h) => {
            const response = deleteHandler(request, h)
            return response
        }
    },
    {
        method  : '*',
        path    : '/{any*}',
        handler : (request, h) => {
            const message = h.response('Not Found').code(404)
            return message
        }
    }
]

module.exports = routes