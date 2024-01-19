import { prisma } from "../service/prisma"

export const createUser = async (
    firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    hashedPassword: string,
) => {
    const newUser = await prisma.user.create({
        data:{
            firstName,
            lastName,
            nickname,
            email,
            password: hashedPassword,
        }
    })
    return newUser
}


export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user) {
        throw new Error("there is no user matching email")
    } else {
        return user
    }

}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where:{
            id
        }
    }) 

    if(!user) {
        throw new Error("there is no user matching id")
    } else {
        return user
    }    
}