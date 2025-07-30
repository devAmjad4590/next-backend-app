export class UserExistsError extends Error{
    constructor(email: String){
        super(`The email ${email} already exists!`)
        this.name = `UserExistsError`
    }
}

export class UserNotFoundError extends Error{
    constructor(){
        super('User was not found!')
        this.name = 'UserNotFoundError'
    }
}