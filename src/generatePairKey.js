import { DilithiumKeyPair, DilithiumLevel } from '@asanrom/dilithium';
import { Buffer } from 'buffer';
import process from 'process';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { encrypt } from './crypto.js';

window.Buffer = Buffer;
window.process = process;

export function getPairKey() {
    const level = DilithiumLevel.get(5);
    const keyPair = DilithiumKeyPair.generate(level);
    const privateKey = keyPair.getPrivateKey().toBase64();
    const publicKey = keyPair.getPublicKey().toBase64();
    return { privateKey, publicKey };
  }


export async function exportKeysAsZip(passphrase) {
    const { privateKey, publicKey } = getPairKey();
  
    const zip = new JSZip();
    zip.file("private.key", encrypt(privateKey, passphrase));
    zip.file("public.pub", publicKey);
    zip.file("passphrase.txt", "Your passphrase: " + passphrase);
  
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "your-keys.zip");
  }