import express from "express"
import { Server } from "socket.io"

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

const server = app.listen(PORT, () => console.log(`Lancement du server sur le port ${PORT}`))

const io = new Server(server)

io.on("connect", (socket) => {
    console.log("Un utilisateur viens de se connecter")

    socket.on("disconnect", () => {
        console.log("Un utilisateur viens de se déconnecter")
    })  
})