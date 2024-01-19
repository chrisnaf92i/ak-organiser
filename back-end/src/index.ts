import express from "express"
import { Server } from "socket.io"
import userRoutes from "./router/user.routes"
import documentRoutes from "./router/document.routes"
import taskRouter from "./router/task.routes"

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())


app.use("/auth", userRoutes)
app.use("/document", documentRoutes)
app.use("/task", taskRouter)

const server = app.listen(PORT, () => console.log(`Lancement du server sur le port ${PORT}`))

export const io = new Server(server)

io.on("connect", (socket) => {
    console.log("Un utilisateur viens de se connecter")

    socket.on("disconnect", () => {
        console.log("Un utilisateur viens de se déconnecter")
    })
})