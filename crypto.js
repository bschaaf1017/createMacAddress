const { pbkdf2Sync } = require('crypto');

const generateMACaddress = (uniqueID) => {
    const key = pbkdf2Sync( uniqueID, 'salt', 100000, 6, 'sha512');
    return key.toString('hex')
}
const colonAdder = (generatedKey) => {
    let keyToArray = generatedKey.split('');
    let result = [];

    let count = 0;
    for (let i = 0; i < keyToArray.length; i++) {
        count++;
        if (count === 2 && i === keyToArray.length - 1) {
            result.push(keyToArray[i]);
        } else if (count === 2) {
            result.push(keyToArray[i], ':');
            count = 0;
        } else {
            result.push(keyToArray[i]);
        }
    }
    return result.join('');
}
let test = () => {
    console.log('Hashed iPad uniqueID: ',generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81'))
    console.log('key length is 12: ',generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81').length === 12)
    console.log('return hash in MAC format: ',colonAdder('bb08dd0b7447'))
    console.log('should be a string: ',typeof colonAdder(generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81')) === 'string')
}
test()