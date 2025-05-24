import { DilithiumKeyPair, DilithiumLevel, DilithiumPrivateKey, DilithiumSignature } from '@asanrom/dilithium';
import { Buffer } from 'buffer';
import process from 'process';
import { decrypt } from './crypto.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

window.Buffer = Buffer;
window.process = process;

$('#sign').click(async () => {
    const docFile = document.getElementById('documentFile').files[0];
    const keyFile = document.getElementById('privateKeyFile').files[0];
    const passphrase = document.getElementById('inputPassword5').value;

    if (!docFile || !keyFile || !passphrase) {
        alert("Lengkapi semua input terlebih dahulu.");
        return;
    }

    try {
        const [docArrayBuffer, keyArrayBuffer] = await Promise.all([
            docFile.arrayBuffer(),
            keyFile.text()
        ]);

        const doc = new Uint8Array(docArrayBuffer);
        const key = decrypt(keyArrayBuffer, passphrase);

        const level = DilithiumLevel.get(5);
        const privateKey = DilithiumPrivateKey.fromBase64(key, level);

        const signature = DilithiumSignature.generate(doc, privateKey).toBase64();

        saveAs(new Blob([signature]), "signature.sig");

        alert("Tanda tangan berhasil dibuat.");        
    } catch (err) {
        console.error("Gagal menandatangani:", err);
        alert("Terjadi kesalahan saat proses tanda tangan.");
    }
});
