export class EmailAlreadyInUse extends Error {
    constructor() {
        super('The email is already being useds')
    }
}