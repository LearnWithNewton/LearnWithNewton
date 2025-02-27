function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(this.getAttribute('href')).classList.add('active');
        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
    });
});



let fontSize = 16;
const minFontSize = 14;
const maxFontSize = 20;

document.getElementById('font-size-increase').addEventListener('click', function() {
    if (fontSize < maxFontSize) {
        fontSize++;
        document.body.style.fontSize = fontSize + 'px';
    }
});

document.getElementById('font-size-decrease').addEventListener('click', function() {
    if (fontSize > minFontSize) {
        fontSize--;
        document.body.style.fontSize = fontSize + 'px';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const now = new Date();

        const optionsIST = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: 'short', year: 'numeric' };
        document.getElementById('time-ist').innerText = now.toLocaleString('en-US', optionsIST);

        const optionsUK = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: 'short', year: 'numeric' };
        document.getElementById('time-uk').innerText = now.toLocaleString('en-US', optionsUK);

        const optionsAUS = { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: 'short', year: 'numeric' };
        document.getElementById('time-aus').innerText = now.toLocaleString('en-US', optionsAUS);
    }

    // Initialize the time display
    updateTime();
    setInterval(updateTime, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('qr-input').addEventListener('input', generateQRCode);

    // Generate QR code on page load
    const initialQrInput = "https://github.com/LearnWithNewton/LearnWithNewton";
    document.getElementById('qr-input').value = initialQrInput;
    generateQRCode();
});

function generateQRCode() {
	const qrInput = document.getElementById('qr-input').value;
	const qrResult = document.getElementById('qr-result');
	qrResult.innerHTML = '';
	new QRCode(qrResult, {
		text: qrInput,
		width: 256,
		height: 256,
	});
}

// document.getElementById('qr-file-input').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const img = new Image();
//             img.onload = function() {
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext('2d');
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 context.drawImage(img, 0, 0, img.width, img.height);
//                 const imageData = context.getImageData(0, 0, img.width, img.height);
//                 const code = jsQR(imageData.data, imageData.width, imageData.height);
//                 if (code) {
//                     document.getElementById('qr-decoded-result').innerText = `Decoded Text: ${code.data}`;
//                 } else {
//                     document.getElementById('qr-decoded-result').innerText = 'No QR code found.';
//                 }
//             };
//             img.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });

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

function copyBase64ToClipboard() {
    const result = document.getElementById('base64-result').innerText;
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            document.getElementById('base64-message').innerText = 'Copied!';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        document.getElementById('base64-message').innerText = 'Nothing to copy!';
    }
}

// function copyToClipboard() {
//     const result = document.getElementById('base64-result').innerText;
//     if (result) {
//         navigator.clipboard.writeText(result).then(() => {
//             document.getElementById('copy-message').innerText = 'Copied!';
//         }).catch(err => {
//             console.error('Failed to copy: ', err);
//         });
//     } else {
//         document.getElementById('copy-message').innerText = 'Nothing to copy!';
//     }
// }

function copyXMLToClipboard() {
    const result = document.getElementById('json-xml-result').innerText;
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            document.getElementById('xml-message').innerText = 'Copied!';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        document.getElementById('xml-message').innerText = 'Nothing to copy!';
    }
}

function copyJSONToClipboard() {
    const result = document.getElementById('xml-json-result').innerText;
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            document.getElementById('json-message').innerText = 'Copied!';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        document.getElementById('json-message').innerText = 'Nothing to copy!';
    }
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

// XML to JSON Conversion
function convertXMLToJSON() {
    const xmlInput = document.getElementById('xml-input').value;
    let xmlDoc;
    try {
        xmlDoc = new DOMParser().parseFromString(xmlInput, 'text/xml');
    } catch (e) {
        document.getElementById('xml-json-result').innerText = 'Invalid XML';
        return;
    }

    const json = xmlToJson(xmlDoc);
    document.getElementById('xml-json-result').innerText = JSON.stringify(json, null, 2);
}

function xmlToJson(xml) {
    let obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                let attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
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

function copyDecodedJWTtext() {
    const result = document.getElementById('jwt-result').innerText;
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            document.getElementById('jwt-message').innerText = 'Copied!';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        document.getElementById('jwt-message').innerText = 'Nothing to copy!';
    }
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
    if (hashResult) {
        navigator.clipboard.writeText(hashResult).then(() => {
            document.getElementById('hash-copy-message').innerText = 'Copied!';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        document.getElementById('hash-copy-message').innerText = 'Nothing to copy!';
    }
}

// SSH Key Pair Generator
function generateSSHKeyPair() {
    const algorithm = document.getElementById('ssh-algorithm').value;
    const bitSize = parseInt(document.getElementById('ssh-bit-size').value);
    const keyPair = generateKeyPair(algorithm, bitSize);

    document.getElementById('ssh-public-key-result').innerText = keyPair.publicKey;
    document.getElementById('ssh-private-key-result').innerText = keyPair.privateKey;

    // Show the copy and download buttons
    document.querySelectorAll('#ssh-key-generator .d-flex button').forEach(button => {
        button.style.display = 'inline-block';
    });
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
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            alert('Copied!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        alert('Nothing to copy!');
    }
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

document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (body.classList.contains('day-mode')) {
        body.classList.remove('day-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.add('day-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

