const { pbkdf2Sync, generateKeySync } = require('crypto');

const generateMACaddress = (uniqueID) => {
    //generate random key for use incase no {uniqueID} was passed
    const randomKey = generateKeySync('hmac', { length: 64 }).export().toString('hex');
    //check to see if there was a uniqueId passed, if not use randomKey
    let idString = !uniqueID ? randomKey : uniqueID
    // hash randomly generated key or uniqueID
    const generatedKey = pbkdf2Sync( idString, 'salt', 100000, 6, 'sha512').toString('hex');
    //return hash in MAC format
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
    let test = () => {''
    console.log('Hashed iPad uniqueID: ',generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81'))
    let passedString1 = generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81')
    let passedString2 = generateMACaddress('68864E4A-D09E-4D03-BCDF-7899BA502F81')
    console.log('When passed same uniqueID returns same MAC address: ', passedString1 === passedString2)
}
test()