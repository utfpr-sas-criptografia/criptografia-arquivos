/**
 * Esta função gera uma chave AES de 32 bytes.
 */
const makeClientKey = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function CryptoJSAESEncrypt(login, pass) {

    var salt = CryptoJS.lib.WordArray.random(256);
    var iv = CryptoJS.lib.WordArray.random(16);

    var key = CryptoJS.PBKDF2(window.clientkey, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

    var encryptedLogin = CryptoJS.AES.encrypt(login, key, { iv: iv });
    var encryptedPass = CryptoJS.AES.encrypt(pass, key, { iv: iv });

    var data = {
        login: CryptoJS.enc.Base64.stringify(encryptedLogin.ciphertext),
        pass: CryptoJS.enc.Base64.stringify(encryptedPass.ciphertext),
        salt: CryptoJS.enc.Hex.stringify(salt),
        iv: CryptoJS.enc.Hex.stringify(iv)
    }

    return JSON.stringify(data);
}

/**
 * Está função criptografa a chave AES gerada pelo cliente com a chave
 * pública do servidor. Esta função é utiizada para enviar a chave AES
 * para o servidor toder descriptografar os dados.
 */
const encryptPublicKey = function (data) {
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(window.publickey)
    var encryptedData = encrypt.encrypt(data)
    return encryptedData
}

const encryptAESClient = function (data) {
    return CryptoJS.AES.encrypt(data, window.clientkey, { iv: window.iv })
}

/**
 * Está função é responsável por obter a chave pública do servidor.
 * Recebe como parametro uma callback, que enviará a chave AES que
 * está sendo usado pelo clientepara o servidor.
 */
const getPublicKey = function (callback) {
    fetch(`http://www.projetoseguranca.com.br/keyencodeserver`) // <---- mudar
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    publickey = data.chave // <---- mudar para data.chave
                    vi = data.vi
                    console.log('Request succeeded to public key')
                    callback()
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

/**
 * Esta função envia para o servidor a chave AES que o cliente esta
 * usando para criptografar os dados. A chave AES é criptografada com
 * a chave pública no servidor, e assim, enviada para o mesmo.
 */
const sendAESKey = function () {
    clientkey = makeClientKey()
    const encKey = encryptPublicKey(clientkey)
    const encryptedWord = CryptoJS.enc.Utf8.parse(encKey);
    //console.log("palavra  : ",encryptedWord);
    const encrypted = CryptoJS.enc.Base64.stringify(encryptedWord);
    const hashKey = CryptoJS.SHA256(encrypted).toString()
    fetch('http://www.projetoseguranca.com.br/keyencodecliente', { // <---- mudar
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `clientkey=${encrypted}&hashkey=${hashKey}`
    })
        .then(`{}`)
        .then(function (data) {
            window.clientkey = clientkey
            window.publickey = publickey
            window.vi = vi
            console.log('Request succeeded to client key');
            console.log('Cliente key AES: ', window.clientkey)
            console.log('Public key RSA: ', window.publickey)
            console.log('Vetor do AES: ', window.vi)
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}