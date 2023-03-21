// Gjenerojme nje numer random te thjeshte
function randomPrime(min, max) {
    // Shikojme nese nje numer eshte i thjeste
    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // Vazhdojme te gjenerojme numra derisa ta gjejme nje te thjeshte
    while (true) {
        const p = Math.floor(Math.random() * (max - min + 1) + min);
        if (isPrime(p)) return p;
    }
}

// Kalkulojme PMPn
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// Llogaritni inversin modular të një moduli m duke përdorur algoritin e zgjeruar Euklidian
function modInv(a, m) {
    for (let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

// Gjenerejme Publik key edhe privateKey
function generateKeyPair(bitLength, message) {
    // const min = message;
    const min = 2 ** (bitLength - 1);
    const max = 2 ** bitLength - 1;
    console.log(min, max);
    let p = randomPrime(min, max);
    console.log("P: " + p);
    let q = randomPrime(min, max);
    console.log("Q: " + q);
    const n = p * q;
    console.log("N: " + n);
    const phi = (p - 1) * (q - 1);
    console.log("Phi :" + phi);
    let e = 13 // a common choice for the public exponent
    while (gcd(e, phi) !== 1) {
        e++;
    }
    console.log("E :" + e);
    let d = modInv(e, phi);
    console.log("D: " + d);
    console.log({ publicKey: [n, e], privateKey: [n, d] });
    return { publicKey: [n, e], privateKey: [n, d] };
}

// Enkriptojme tekstin me publikKey
function encrypt(message, publicKey) {
    const [n, e] = publicKey;
    return modPow2(message, e, n);
}

// Dekriptojme tekstin me privateKey
function decrypt(ciphertext, privateKey) {
    const [n, d] = privateKey;
    return modPow2(ciphertext, d, n);
}


function modPow2(a, b, m) {
    let result = 1;
    while (b > 0) {
        if (b & 1) {
            result = (result * a) % m;
        }
        a = (a * a) % m;
        b >>= 1;
    }
    return result;
}

// Perdorimi


const message = 13578;
const keyPair = generateKeyPair(8, message);
console.log(keyPair.publicKey, keyPair.privateKey);
const ciphertext = encrypt(message, keyPair.publicKey);
const plaintext = decrypt(ciphertext, keyPair.privateKey);
console.log(`Message: ${message}`);
console.log(`Ciphertext: ${ciphertext}`);
console.log(`Plaintext: ${plaintext}`);