
export const transformText = (text: string, type: string): string => {
  switch (type) {
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'title':
      return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    case 'alternating':
      return text
        .split('')
        .map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
        .join('');
    case 'remove-whitespace':
      return text.replace(/\s+/g, ' ').trim();
    case 'remove-duplicates':
      return [...new Set(text.split('\n'))].join('\n');
    case 'remove-linebreaks':
      return text.replace(/[\r\n]+/g, ' ');
    case 'remove-formatting':
      return text.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
    case 'bold':
      return text
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          const code = char.toUpperCase().charCodeAt(0);
          if (code < 65 || code > 90) return char;
          return String.fromCharCode(119808 + (code - 65));
        })
        .join('');
    case 'italic':
      return text
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          const code = char.toUpperCase().charCodeAt(0);
          if (code < 65 || code > 90) return char;
          return String.fromCharCode(119860 + (code - 65));
        })
        .join('');
    case 'strikethrough':
      return text.split('').map(char => char + '\u0336').join('');
    case 'underline':
      return text.split('').map(char => char + '\u0332').join('');
    case 'reverse':
      return text.split('').reverse().join('');
    case 'mirror':
      return text.split('').map(char => {
        const mirrorChars: { [key: string]: string } = {
          'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'e': 'ɘ', 'f': 'ʇ',
          'g': 'ǫ', 'h': 'ʜ', 'j': 'ᒑ', 'k': 'ʞ', 'm': 'ɯ',
          'n': 'ᴎ', 'p': 'q', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ',
          'y': 'ʎ', 'z': 'ƹ'
        };
        return mirrorChars[char.toLowerCase()] || char;
      }).reverse().join('');
    case 'bubble':
      return text.split('').map(char => {
        const code = char.toUpperCase().charCodeAt(0);
        if (code < 65 || code > 90) return char;
        return String.fromCharCode(9398 + (code - 65));
      }).join('');
    case 'unicode':
      return text.split('').map(char => `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
    case 'base64-encode':
      return btoa(text);
    case 'base64-decode':
      try {
        return atob(text);
      } catch {
        return 'Invalid Base64 input';
      }
    case 'url-encode':
      return encodeURIComponent(text);
    case 'url-decode':
      try {
        return decodeURIComponent(text);
      } catch {
        return 'Invalid URL-encoded input';
      }
    case 'json-stringify':
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        return 'Invalid JSON input';
      }
    case 'binary':
      return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    default:
      return text;
  }
};

