let notes = require('./notes.js')
const {generateUniqueId} = require('./id')
const {getFormattedTimestamp} = require('./timestamp')

const postHandler = (request, h) => {
    const {title, tags, body} = request.payload || {}

            if ( !title || !tags || !body ){
                const response = h.response(`{
                    "status": "error",
                    "message": "Catatan gagal untuk ditambahkan"
                }`)
                .type('application/json')
                .code(500)
                return response
            }

            const id = generateUniqueId()
            const timestamp = getFormattedTimestamp();

            const createdNote = {
                id : id,
                title : title,
                createdAt : timestamp,
                updatedAt : timestamp,
                tags : tags,
                body : body
            }

            if(notes == []) {
                notes = [createdNote]
            }
            else {
                notes = [...notes, createdNote]
            }

            console.log(notes)
            const response =
            h.response(
                {
                    "status" : "success",
                    "message" : "Catatan berhasil ditambahkan",
                    "data": {
                        "noteId": id
                    }
                }
                )
                .type('application/json')
                .code(201)
                    
            return response
}

const getHandler = (request, h) => {
    let indexNotes = []
    const { id } = request.params
    const note = notes.filter((n) => n.id === id)[0];

    if (!id){
        const message =     {
            "status": "success",
            "data": {
              "notes": notes
            }
          }

          return message
    }
    if(note !== undefined){
        const getNotes = {
            status: "success",
            data: {
                note
            }
        }
    
        const response = h.response(getNotes)
                        .type('application/json')
                        .code(200)
    
        return response
    }

    const message =     
    {
        "status": "fail",
        "message": "Catatan tidak ditemukan"
    }
    const response = h.response(message)
                .type('application/json')
                // .code(404)

    return response
    // if (id){

    // }
    // else {
    //     // console.log(`id tidak ada`)
    //     indexNotes = [...notes]
    // }
    
}

const putHandler = (request, h) => {
    const { id } = request.params
    const { title, tags, body } = request.payload;

    let indexNotes = notes
    let x = 0

    if(!id){
        return `no id`
    }

    if(!title || !tags || !body){
        return `must contain title, tags, and body`
    }

    const timestamp = getFormattedTimestamp();

    for(let i in indexNotes){
        if(id === indexNotes[i].id){
            let editNotes = indexNotes[i]
            editNotes.title = title
            editNotes.tags  = tags
            editNotes.updatedAt = timestamp;
            editNotes.body = body
            indexNotes[i] = editNotes
            x++
        }
    }

    if (x == 0){
        const message =
        {
            "status": "fail",
            "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
        }
        const response = h.response(message)
                            .type('application/json')
                            .code(404)
        return response
    }

    notes = indexNotes

    const message =     
    {
        "status": "success",
        "message": "Catatan berhasil diperbaharui"
    }

    const response = h.response(message)
                        .type('application/json')
                        .code(200)
    
    return response
}

const deleteHandler = (request, h) => {
    const {id} = request.params
    let x = 0;
    if(!id){
        return h.response('must contain id').code(404)
    }

    for(let i in notes){
        if(id === notes[i].id){
            notes.splice(i, 1)
            x++
        }
    }

    if(x == 0){
        const message =
        {
            "status": "fail",
            "message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
        }
        
        const response = h.response(message).code(404)

        return response
    }

    const message =
    {
        "status": "success",
        "message": "Catatan berhasil dihapus"
    }

    const response = h.response(message).code(200)

    return response
}


module.exports = {getHandler, postHandler, putHandler, deleteHandler}