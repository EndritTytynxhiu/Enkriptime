const { createHash } = require('crypto');

let password = "Test123"
let { salt, hash } = createSaltedHash(password);
console.log("Salt: " + salt, " Hash: " + hash);
let verify = verifySaltedHash(password, salt, hash)
console.log(verify);
console.log(generateSalt());

//Krijojme nje salt hashe
function createSaltedHash(password) {
    const salt = generateSalt();
    console.log(salt);
    // const hash = sha256(password + salt);
    const hash = simpleHash(password + salt);
    return {
        salt,
        hash
    };
}

//Verifikojme kete saltHash
function verifySaltedHash(password, salt, hash) {
    const newHash = simpleHash(password + salt);
    return newHash === hash;
}

// Gjenereojme saltin
function generateSalt() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let salt = '';
    for (let i = 0; i < 16; i++) {
        salt += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    console.log(salt);
    return salt;
}

// Metode e avancuar per heshimin e nje teksti
function sha256(str) {
    return createHash('sha256').update(str).digest("base64")
}
//Metode e theshte e heshimit te tekstit
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert ne 32 bit integer
    }
    return hash.toString(16);
}