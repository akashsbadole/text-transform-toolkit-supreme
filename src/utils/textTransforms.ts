
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
    default:
      return text;
  }
};
