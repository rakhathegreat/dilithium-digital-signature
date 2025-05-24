import { exportKeysAsZip } from "./generatePairKey.js";

$('#generate').click(() => {
    const passphrase = $('#inputPassword5').val(); 
    console.log(passphrase);
    exportKeysAsZip(passphrase);
});
