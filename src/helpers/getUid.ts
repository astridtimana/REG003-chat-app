import jwt from 'jsonwebtoken'

export const getUid = (token='') => {

    try {
        if(process.env.JWT_KEY){
            //@ts-ignore
            const {uid} = jwt.verify(token, process.env.JWT_KEY)
            return uid
        } else{return false}
        
    } catch (error) {
        console.log(error)
    }
}