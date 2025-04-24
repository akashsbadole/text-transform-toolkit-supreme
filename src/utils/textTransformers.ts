// Base64
export const base64Encode = (text: string): string => btoa(text);
export const base64Decode = (text: string): string => atob(text);

// Binary
export const textToBinary = (text: string): string => {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
};

export const binaryToText = (binary: string): string => {
  return binary.split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
};

// CSV to JSON
export const csvToJson = (csv: string): string => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j]?.trim();
    }
    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
};

// Caesar Cipher
export const caesarCipher = (text: string, shift: number): string => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) { // Uppercase
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if (code >= 97 && code <= 122) { // Lowercase
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return char;
  }).join('');
};

// HTML Formatter
export const formatHtml = (html: string): string => {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  html.split(/>\s*</).forEach(element => {
    if (element.match(/^\/\w/)) {
      indent--;
    }
    formatted += tab.repeat(indent) + '<' + element + '>\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
      indent++;
    }
  });

  return formatted.substring(1, formatted.length - 1);
};

// Hex to Text
export const hexToText = (hex: string): string => {
  return hex.split(' ')
    .map(h => String.fromCharCode(parseInt(h, 16)))
    .join('');
};

export const textToHex = (text: string): string => {
  return text.split('')
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
};

// JSON Formatter
export const formatJson = (json: string): string => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return 'Invalid JSON';
  }
};

// MD5 Hash
export const generateMD5 = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('MD5', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Morse Code
const morseCode: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', ' ': ' '
};

const reverseMorseCode: { [key: string]: string } = Object.entries(morseCode)
  .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

export const textToMorse = (text: string): string => {
  return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
};

export const morseToText = (morse: string): string => {
  return morse.split(' ').map(code => reverseMorseCode[code] || code).join('');
};

// Number Sorter
export const sortNumbers = (numbers: string): string => {
  return numbers.split(/[\s,]+/)
    .map(n => parseFloat(n))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b)
    .join(', ');
};

// ROT13
export const rot13 = (text: string): string => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) { // Uppercase
      return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    } else if (code >= 97 && code <= 122) { // Lowercase
      return String.fromCharCode(((code - 97 + 13) % 26) + 97);
    }
    return char;
  }).join('');
};

// Regex Tester
export const testRegex = (text: string, pattern: string): string => {
  try {
    const regex = new RegExp(pattern);
    const matches = text.match(regex);
    return matches ? matches.join('\n') : 'No matches found';
  } catch (error) {
    return 'Invalid regex pattern';
  }
};

// Slugify
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// URL Encode/Decode
export const urlEncode = (text: string): string => encodeURIComponent(text);
export const urlDecode = (text: string): string => decodeURIComponent(text);

// UTF-8
export const utf8Encode = (text: string): string => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return code < 128 ? char : `\\u${code.toString(16).padStart(4, '0')}`;
  }).join('');
};

export const utf8Decode = (text: string): string => {
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => 
    String.fromCharCode(parseInt(hex, 16))
  );
};

// UTM Builder
export const buildUTM = (params: {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}): string => {
  const { url, source, medium, campaign, term, content } = params;
  const utmParams = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    ...(term && { utm_term: term }),
    ...(content && { utm_content: content })
  });
  return `${url}${url.includes('?') ? '&' : '?'}${utmParams.toString()}`;
};

// XML Formatter
export const formatXml = (xml: string): string => {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  xml.split(/>\s*</).forEach(element => {
    if (element.match(/^\/\w/)) {
      indent--;
    }
    formatted += tab.repeat(indent) + '<' + element + '>\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
      indent++;
    }
  });

  return formatted.substring(1, formatted.length - 1);
}; 