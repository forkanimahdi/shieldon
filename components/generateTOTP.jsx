// components/generateTOTP.js
import base32 from "hi-base32";
import jsSHA from "jssha";

function leftPad(str, len, pad = "0") {
    return (Array(len).join(pad) + str).slice(-len);
}

export function GenerateTOTP(secret) {
    const key = base32.decode.asBytes(secret.replace(/=+$/, ""));
    const timeStep = Math.floor(Date.now() / 1000 / 30);
    let tempTime = timeStep;

    const timeBuffer = new Array(8).fill(0);
    for (let i = 7; i >= 0; i--) {
        timeBuffer[i] = tempTime & 0xff;
        tempTime >>= 8;
    }

    const shaObj = new jsSHA("SHA-1", "UINT8ARRAY");
    shaObj.setHMACKey(new Uint8Array(key), "UINT8ARRAY");
    shaObj.update(new Uint8Array(timeBuffer));
    const hmac = shaObj.getHMAC("UINT8ARRAY");

    const offset = hmac[hmac.length - 1] & 0x0f;
    const code =
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);

    return leftPad((code % 1000000).toString(), 6);
}
