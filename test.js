


const tools = require("./bitcoinjslib")
const MnemonicJS = require("./mnemonic")
var bip39lib = require("./vendor/bip39lib.js");

console.log(MnemonicJS);


let getSeedFromPassphrase = function(passphrase) {

    try {
        var buffer = getMnemonicJSSeed(passphrase);

        return {
            "seed": buffer,
            "type": "mnemonicJS"
        }

    } catch (e) {
        console.log("not old recovery phrase protocol");
        try {

            var buffer = getBip39Seed(passphrase);

            return {
                "seed": buffer,
                "type": "bip39"
            }

        } catch (e) {

            throw e;

        }

    }

};

function getMnemonicJSSeed(passphrase) {

    var words = passphrase.split(' ');

    if (words.length !== 12) {
        console.error("invalid length");
        throw "passphrase invalid length";

    }

    let m = new MnemonicJS(words);

    return m.toHex();


}

function getBip39Seed(passphrase) {
    try {
        var words = passphrase.split(' ');

        if (words.length !== 12) {
            globals.console.error("invalid length");
            throw "passphrase invalid length";

        }

        if (bip39lib.bip39.validateMnemonic(passphrase, bip39lib.bip39.wordlists.EN) === true) {

            var seed = bip39lib.bip39.mnemonicToSeed(passphrase);

            return seed;

        }
        throw "invalid bip39 seed";

    } catch (e) {

        throw e;

    }

}



var legacyMnemonic = 'sleep music stupid spend taught goodbye companion black mourn darkness struggle soar'; //legacy
 legacyMnemonic = 'pioneer acid organ walk panda female purity ecology gadget blind opinion range'; //bip39
 //legacyMnemonic = 'radar boy frost like base tobacco treat usage castle into brick word';
let seedArray =  getSeedFromPassphrase(legacyMnemonic);
let legacseed =  seedArray.seed ;


console.log(seedArray);

var seed = legacseed;
var seedHex = tools.buffer(seed, "hex");
let master = tools.bitcoin.HDNode.fromSeedBuffer(seedHex);

var keyPair = master.derivePath("m/0'/0/0");

var address = keyPair.getAddress();


console.log(address);







