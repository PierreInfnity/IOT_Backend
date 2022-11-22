const bcrypt = require('bcrypt-nodejs');


export function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
}

export function checkPassword(password: string, passwordHash: string) {
    const match = bcrypt.compareSync(password, passwordHash);
    return match
}