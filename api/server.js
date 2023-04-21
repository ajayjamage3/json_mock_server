// See https://github.com/typicode/json-server#module

const jsonServer = require('json-server')
// const cors = require("cors")
// server.use(cors())
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

const db = new LowSync(new JSONFileSync('file.json'), {})
db.read()
db.write()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
