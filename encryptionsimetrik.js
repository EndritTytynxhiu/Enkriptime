var teksti = "Enkriptim me qels simetrik";
var celsi = generateKey(16);
var tesktiIEnkriptum = encrypt(teksti, celsi);
var TekstiIDikriptum = decrypt(tesktiIEnkriptum, celsi);
console.log("Message: " + teksti);
console.log("Cilsi: " + celsi);
console.log("Teksti i enkriptum: " + tesktiIEnkriptum);
console.log("Teksti i dikriptum: " + TekstiIDikriptum);

//Gjenerojme nje cils 
function generateKey(length) {
    var key = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

//Enkriptojme
function encrypt(message, key) {
    var encryptedMessage = "";
    for (var i = 0; i < message.length; i++) {
        var messageChar = message.charCodeAt(i);
        var keyChar = key.charCodeAt(i % key.length);
        encryptedMessage += String.fromCharCode((messageChar + keyChar) % 256);
    }
    return btoa(encryptedMessage);
}
//Dekriptojme
function decrypt(encryptedMessage, key) {
    encryptedMessage = atob(encryptedMessage);
    var decryptedMessage = "";
    for (var i = 0; i < encryptedMessage.length; i++) {
        var encryptedChar = encryptedMessage.charCodeAt(i);
        var keyChar = key.charCodeAt(i % key.length);
        decryptedMessage += String.fromCharCode((encryptedChar - keyChar + 256) % 256);
    }
    return decryptedMessage;
}