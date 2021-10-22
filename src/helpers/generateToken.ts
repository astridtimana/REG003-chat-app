import jwt from 'jsonwebtoken';

export const generateToken = (uid: number) =>{

  return new Promise((resolve,reject)=>{

    const payload={uid}; // agregar más info de ser necesario
    const secret =process.env.JWT_KEY

    if (secret) {
      jwt.sign(payload, secret, {
        expiresIn:'1h'
      },(err, token)=>{
        if(err){
            console.log(err)
            reject('Could not generate JWT')
        } else{
            resolve(token)
        }
      })
    } else {
      throw new Error('There is no signature to token')
    }
  })
}
