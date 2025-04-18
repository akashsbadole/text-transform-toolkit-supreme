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
        .map(char => char === ' ' ? ' ' : `𝐀`.charCodeAt(0) + (char.charCodeAt(0) - 'A'.charCodeAt(0)))
        .map(code => String.fromCharCode(code))
        .join('');
    case 'italic':
      return text
        .split('')
        .map(char => char === ' ' ? ' ' : `𝘈`.charCodeAt(0) + (char.charCodeAt(0) - 'A'.charCodeAt(0)))
        .map(code => String.fromCharCode(code))
        .join('');
    case 'strikethrough':
      return text.split('').map(char => char + '\u0336').join('');
    case 'underline':
      return text.split('').map(char => char + '\u0332').join('');
    default:
      return text;
  }
};
