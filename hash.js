function encryptionMap() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var shuffledCharacters = "ShZOle48RI6mviafk12VYtbGExA0BwzUCWcMy7ouJFPTnN9Qg5dpXs3jrHDLqK";
    const encryptionMap = new Map();
    const decryptionMap = new Map();

    for (i in characters) {
        encryptionMap.set(characters[i], shuffledCharacters[i])
        decryptionMap.set(shuffledCharacters[i], characters[i])
    }
    return { encryptionMap, decryptionMap }
}

function encrypt(message, Map) {
    let encryptedText = ""
    for (i of message) {
        let char = Map.get(i)
        encryptedText += char
    }
    return encryptedText
}

function decrypt(message, Map) {
    let decryptedText = ""
    for (i of message) {
        let char = Map.get(i)
        decryptedText += char
    }
    return decryptedText
}

let tekst = "Enkriptimi"
let Mapa = encryptionMap()
let encMap = Mapa.encryptionMap
let decMap = Mapa.decryptionMap
let encrypted = encrypt(tekst, encMap)
let decrypted = decrypt(encrypted, decMap)
console.log(encMap);
console.log("Teksti i enkriptuar: " + encrypted);
console.log("Teksti i dikriptuar: " + decrypted);