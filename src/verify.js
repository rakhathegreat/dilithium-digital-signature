import { DilithiumSignature, DilithiumLevel, DilithiumPublicKey } from "@asanrom/dilithium";
import { Buffer } from "buffer";
import process from "process";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

window.Buffer = Buffer;
window.process = process;   

$('#verify').click(async () => {
    const docFile = document.getElementById('documentFile').files[0];
    const keyFile = document.getElementById('publicKeyFile').files[0];
    const sigFile = document.getElementById('signatureFile').files[0];

    if (!docFile || !keyFile || !sigFile) {
        const toastEl = document.getElementById('myToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
        return;
    }

    try {
        const [docArrayBuffer, keyArrayBuffer, sigArrayBuffer] = await Promise.all([
            docFile.arrayBuffer(),
            keyFile.text(),
            sigFile.text()
        ]);

        const doc = new Uint8Array(docArrayBuffer);
        const level = DilithiumLevel.get(5);
        const publicKey = DilithiumPublicKey.fromBase64(keyArrayBuffer, level);
        const signature = DilithiumSignature.fromBase64(sigArrayBuffer, level);

        const valid = signature.verify(doc, publicKey);

        if (valid) {
            const toastEl = document.getElementById('successToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }

    } catch (error) {
        console.error(error);
    }
});
