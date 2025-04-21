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

const bigTextMap: { [key: string]: string } = {
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘',
  'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
  'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢',
  'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
  'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬',
  'Z': '𝗭',
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲',
  'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
  'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼',
  'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
  'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆',
  'z': '𝘇'
};

const discordFontMap: { [key: string]: string } = {
  'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾',
  'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃',
  'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈',
  'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍',
  'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒',
  'z': '𝗓'
};

const facebookFontMap: { [key: string]: string } = {
  'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆',
  'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
  'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐',
  'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
  'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚',
  'z': '𝒛'
};

const instagramFontMap: { [key: string]: string } = {
  'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮',
  'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳',
  'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸',
  'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽',
  'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂',
  'z': '𝔃'
};

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
      // First remove duplicate lines
      const lines = text.split('\n');
      const uniqueLines = [...new Set(lines)];
      
      // Then remove duplicate words within each line
      const processedLines = uniqueLines.map(line => {
        const words = line.split(/\s+/);
        const uniqueWords = [...new Set(words)];
        return uniqueWords.join(' ');
      });
      
      return processedLines.join('\n');
    case 'remove-linebreaks':
      return text.replace(/[\r\n]+/g, ' ');
    case 'remove-formatting':
      return text.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
    case 'bold':
      return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
          return String.fromCodePoint(char.charCodeAt(0) + 120205);
        } else if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(char.charCodeAt(0) + 120211);
        }
        return char;
      }).join('');
    case 'italic':
      return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
          return String.fromCodePoint(char.charCodeAt(0) + 120263);
        } else if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(char.charCodeAt(0) + 120269);
        }
        return char;
      }).join('');
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
        if (code >= 65 && code <= 90) {
          return String.fromCodePoint(9398 + (code - 65));
        }
        return char;
      }).join('');
    case 'unicode':
      return text.split('').map(char => `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
    case 'base64-encode':
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch (e) {
        return 'Error: Could not encode to Base64';
      }
    case 'base64-decode':
      try {
        return decodeURIComponent(escape(atob(text)));
      } catch (e) {
        return 'Error: Invalid Base64 input';
      }
    case 'url-encode':
      try {
        return encodeURIComponent(text);
      } catch (e) {
        return 'Error: Could not URL encode text';
      }
    case 'url-decode':
      try {
        return decodeURIComponent(text);
      } catch (e) {
        return 'Error: Invalid URL-encoded input';
      }
    case 'json-stringify':
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch (e) {
        return 'Error: Invalid JSON input';
      }
    case 'binary':
      return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    case 'superscript':
      return text.split('').map(char => superscriptMap[char.toLowerCase()] || char).join('');
    case 'subscript':
      return text.split('').map(char => subscriptMap[char.toLowerCase()] || char).join('');
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
    case 'big-text':
      return text.split('').map(char => bigTextMap[char] || char).join('');
    case 'cursed':
      return text.split('').map(char => {
        const cursedChars = [...zalgoCharacters.above, ...zalgoCharacters.middle, ...zalgoCharacters.below];
        return char + cursedChars[Math.floor(Math.random() * cursedChars.length)];
      }).join('');
    case 'discord':
      return text.toLowerCase().split('').map(char => discordFontMap[char] || char).join('');
    case 'facebook':
      return text.toLowerCase().split('').map(char => facebookFontMap[char] || char).join('');
    case 'instagram':
      return text.toLowerCase().split('').map(char => instagramFontMap[char] || char).join('');
    case 'invisible':
      return text.split('').map(() => '&#8203;').join('');
    case 'plain':
      return text.replace(/[^\x00-\x7F]/g, '');
    case 'remove-chars':
      return text.replace(/[^a-zA-Z0-9\s]/g, '');
    case 'apa':
      return text.split('\n').map(line => {
        if (!line.trim()) return '';
        return line.trim()
          .replace(/^/g, '    ')  // Add indentation
          .replace(/(?:^|\s)([A-Za-z])/g, (match, letter) => match.toUpperCase()); // Capitalize first letter of words
      }).join('\n');
    case 'phonetic':
      return text.toLowerCase().split('').map(char => {
        const phonetic: { [key: string]: string } = {
          'a': 'ay', 'b': 'bee', 'c': 'see', 'd': 'dee', 'e': 'ee',
          'f': 'ef', 'g': 'jee', 'h': 'aitch', 'i': 'eye', 'j': 'jay',
          'k': 'kay', 'l': 'el', 'm': 'em', 'n': 'en', 'o': 'oh',
          'p': 'pee', 'q': 'queue', 'r': 'ar', 's': 'ess', 't': 'tee',
          'u': 'you', 'v': 'vee', 'w': 'double-you', 'x': 'ex',
          'y': 'why', 'z': 'zee'
        };
        return phonetic[char] || char;
      }).join(' ');
    case 'pig-latin':
      return text.toLowerCase()
        .split(' ')
        .map(word => {
          if (!word) return word;
          const vowels = ['a', 'e', 'i', 'o', 'u'];
          if (vowels.includes(word[0])) {
            return word + 'way';
          }
          const firstVowelIndex = word.split('').findIndex(char => vowels.includes(char));
          if (firstVowelIndex === -1) return word + 'ay';
          return word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
        })
        .join(' ');
    default:
      return text;
  }
};
