import { prisma } from "../service/prisma"

export const createUserSession = (userId: string) => {
    const newSession = prisma.userSession.create({
        data:{
            userId
        }
    })
    return newSession
}

export const getUserSessionBySessionId = (sessionId: string) => {
    const session = prisma.userSession.findUnique({
        where:{
            sessionId
        }
    })

    return session
}