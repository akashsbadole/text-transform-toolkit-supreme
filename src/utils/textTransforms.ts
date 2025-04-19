
export const transformText = (text: string, type: string): string => {
  // Define character maps and helper variables first
  const zalgoCharacters = {
    above: ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f',
            '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
            '\u0351', '\u0307', '\u0308', '\u030a', '\u0342'],
    middle: ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358',
             '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
             '\u0335', '\u0336', '\u034f', '\u035c', '\u035d'],
    below: ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c',
            '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
            '\u0325', '\u0326', '\u0329', '\u032a', '\u032b'],
  };

  const superscriptMap: { [key: string]: string } = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
    'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 
    'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
    'p': 'ᵖ', 'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
    'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ',
    'z': 'ᶻ',
  };

  const subscriptMap: { [key: string]: string } = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
    'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
    'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
    'v': 'ᵥ', 'x': 'ₓ',
  };

  const wideMap: { [key: string]: string } = {
    'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ',
    'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ',
    'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ',
    'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ',
    'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ',
    'z': 'ｚ',
    'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ',
    'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ',
    'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ',
    'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ',
    'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ',
    'Z': 'Ｚ',
    '0': '０', '1': '１', '2': '２', '3': '３', '4': '４',
    '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
    ' ': '　', '!': '！', '?': '？', '.': '．', ',': '，',
  };

  const smallMap: { [key: string]: string } = {
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
    'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
    'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
    'p': 'ᵖ', 'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
    'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ',
    'z': 'ᶻ',
  };

  const upsideDownMap: { [key: string]: string } = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ',
    'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
    'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o',
    'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
    'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ',
    'z': 'z',
    'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ',
    'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ',
    'K': 'K', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O',
    'P': 'Ԁ', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': '⊥',
    'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': 'Y',
    'Z': 'Z',
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ',
    '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
    '.': '˙', ',': '\'', '?': '¿', '!': '¡', '\'': ',',
    '"': '„', '(': ')', ')': '(', '[': ']', ']': '[',
    '<': '>', '>': '<', '_': '‾', ';': '؛', ':': ':',
    '/': '\\', '\\': '/', '&': '⅋',
  };

  // Now handle the switch cases
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
    case 'superscript':
      return text.toLowerCase().split('').map(char => superscriptMap[char] || char).join('');
    case 'subscript':
      return text.toLowerCase().split('').map(char => subscriptMap[char] || char).join('');
    case 'wide':
      return text.split('').map(char => wideMap[char] || char).join('');
    case 'small':
      return text.toLowerCase().split('').map(char => smallMap[char] || char).join('');
    case 'stacked':
      return text.split('').join('\n');
    case 'slash':
      return text.split('').join('/');
    case 'zalgo':
      return text.split('').map(char => {
        let result = char;
        // Add some random zalgo characters above
        for (let i = 0; i < 3; i++) {
          result += zalgoCharacters.above[Math.floor(Math.random() * zalgoCharacters.above.length)];
        }
        // Add some random zalgo characters below
        for (let i = 0; i < 3; i++) {
          result += zalgoCharacters.below[Math.floor(Math.random() * zalgoCharacters.below.length)];
        }
        return result;
      }).join('');
    case 'upsidedown':
      return text.split('').map(char => upsideDownMap[char.toLowerCase()] || char)
        .reverse().join('');
    default:
      return text;
  }
};
