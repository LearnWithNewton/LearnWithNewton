function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        showTab(this.getAttribute('href').substring(1));
    });
});

document.getElementById('qr-input').addEventListener('input', generateQRCode);

function generateQRCode() {
	const qrInput = document.getElementById('qr-input').value;
	const qrResult = document.getElementById('qr-result');
	qrResult.innerHTML = '';
	new QRCode(qrResult, {
		text: qrInput,
		width: 512,
		height: 512,
	});
}

// Base64 Encode/Decode
function base64Encode() {
    const input = document.getElementById('base64-input').value;
    const encoded = btoa(input);
    document.getElementById('base64-result').innerText = encoded;
}

function base64Decode() {
    const input = document.getElementById('base64-input').value;
    const decoded = atob(input);
    document.getElementById('base64-result').innerText = decoded;
}

function copyToClipboard() {
    const result = document.getElementById('base64-result').innerText;
    navigator.clipboard.writeText(result).then(() => {
        document.getElementById('copy-message').innerText = 'Copied to clipboard!';
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Markdown to PDF Conversion (using jsPDF, marked.js, and DOMPurify)
function convertMarkdownToPDF() {
    const markdownText = document.getElementById('markdown-input').value;
    const htmlText = marked(markdownText);
    const sanitizedHtml = DOMPurify.sanitize(htmlText);
    const pdf = new jspdf.jsPDF();
    pdf.html(sanitizedHtml, {
        callback: function (pdf) {
            pdf.save('document.pdf');
        },
        x: 10,
        y: 10
    });
}

// JSON to XML Conversion
function convertJSONToXML() {
    const jsonInput = document.getElementById('json-input').value;
    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonInput);
    } catch (e) {
        document.getElementById('json-xml-result').innerText = 'Invalid JSON';
        return;
    }

    const xml = jsonToXML(jsonObj);
    document.getElementById('json-xml-result').innerText = xml;
}

function jsonToXML(json) {
    let xml = '';
    for (let prop in json) {
        xml += `<${prop}>`;
        xml += (typeof json[prop] === 'object') ? jsonToXML(json[prop]) : json[prop];
        xml += `</${prop}>`;
    }
    return xml;
}

// JWT Decoder
function decodeJWT() {
    const jwtInput = document.getElementById('jwt-input').value;
    const parts = jwtInput.split('.');
    if (parts.length !== 3) {
        document.getElementById('jwt-result').innerText = 'Invalid JWT';
        return;
    }
    const payload = JSON.parse(atob(parts[1]));
    document.getElementById('jwt-result').innerText = JSON.stringify(payload, null, 2);
}

// JSON Structure Viewer
function viewJSONStructure() {
    const jsonInput = document.getElementById('json-viewer-input').value;
    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonInput);
    } catch (e) {
        document.getElementById('json-viewer-result').innerText = 'Invalid JSON';
        return;
    }

    const formattedJSON = syntaxHighlight(jsonObj);
    document.getElementById('json-viewer-result').innerHTML = formattedJSON;

    document.querySelectorAll('.json-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const target = this.nextElementSibling;
            if (target.style.display === 'none') {
                target.style.display = 'inline';
                this.innerText = '-';
            } else {
                target.style.display = 'none';
                this.innerText = '+';
            }
        });
    });
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
    }).replace(/(\{|\[|\]|\})/g, function (match) {
        return `<span class="json-toggle">-</span><span>${match}</span>`;
    });
}

// Color Picker
function copyColorCode(format) {
    const colorInput = document.getElementById('color-input').value;
    let colorCode;
    if (format === 'hex') {
        colorCode = colorInput;
    } else if (format === 'rgb') {
        const rgb = hexToRGB(colorInput);
        colorCode = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    navigator.clipboard.writeText(colorCode).then(() => {
        document.getElementById('color-result').innerText = `${format.toUpperCase()} code copied: ${colorCode}`;
    });
}

function hexToRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function convertRGBToHex() {
    const rgbInput = document.getElementById('rgb-input').value;
    const rgb = rgbInput.match(/\d+/g);
    if (rgb && rgb.length === 3) {
        const hex = `#${((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + (parseInt(rgb[2]))).toString(16).slice(1)}`;
        document.getElementById('rgb-to-hex-result').innerText = `HEX: ${hex}`;
    } else {
        document.getElementById('rgb-to-hex-result').innerText = 'Invalid RGB format';
    }
}

function convertHexToRGB() {
    const hexInput = document.getElementById('hex-input').value;
    const rgb = hexToRGB(hexInput);
    if (rgb) {
        document.getElementById('hex-to-rgb-result').innerText = `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else {
        document.getElementById('hex-to-rgb-result').innerText = 'Invalid HEX format';
    }
}

// Hash Generator
function generateHash() {
    const inputText = document.getElementById('hash-input').value;
    const algorithm = document.getElementById('hash-algorithm').value;
    let hash;

    switch (algorithm) {
        case 'MD5':
            hash = CryptoJS.MD5(inputText).toString();
            break;
        case 'SHA-1':
            hash = CryptoJS.SHA1(inputText).toString();
            break;
        case 'SHA-256':
            hash = CryptoJS.SHA256(inputText).toString();
            break;
        case 'SHA-512':
            hash = CryptoJS.SHA512(inputText).toString();
            break;
        default:
            hash = 'Unsupported algorithm';
    }

    document.getElementById('hash-result').innerText = hash;
}

function copyHashToClipboard() {
    const hashResult = document.getElementById('hash-result').innerText;
    navigator.clipboard.writeText(hashResult).then(() => {
        document.getElementById('hash-copy-message').innerText = 'Copied to clipboard!';
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// SSH Key Pair Generator
function generateSSHKeyPair() {
    const algorithm = document.getElementById('ssh-algorithm').value;
    const bitSize = parseInt(document.getElementById('ssh-bit-size').value);
    const keyPair = generateKeyPair(algorithm, bitSize);

    document.getElementById('ssh-public-key-result').innerText = keyPair.publicKey;
    document.getElementById('ssh-private-key-result').innerText = keyPair.privateKey;
}

function generateKeyPair(algorithm, bitSize) {
    let keyPair;
    switch (algorithm) {
        case 'RSA':
        case 'RSA-SSH2':
            keyPair = forge.pki.rsa.generateKeyPair({ bits: bitSize, e: 0x10001 });
            break;
        case 'DSA':
            keyPair = forge.pki.dsa.generateKeyPair({ bits: bitSize });
            break;
        case 'ECDSA':
            const ecdsa = forge.pki.ecdsa;
            const curve = bitSize === 256 ? 'secp256r1' : 'secp384r1';
            keyPair = ecdsa.generateKeyPair({ namedCurve: curve });
            break;
        case 'ED25519':
            keyPair = forge.pki.ed25519.generateKeyPair();
            break;
        default:
            throw new Error('Unsupported algorithm');
    }

    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);

    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
}

function copyToClipboard(elementId) {
    const result = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(result).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function downloadKey(elementId, filename) {
    const result = document.getElementById(elementId).innerText;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Automatically show the first tab
showTab('qr-code');

