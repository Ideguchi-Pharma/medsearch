// ひらがなをカタカナに変換する関数
export function convertHiraganaToKatakana(text: string): string {
    if (!text) return '';
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 0x3041 && code <= 0x3096) {
        return String.fromCharCode(code + 0x60); 
      }
      return char;
    }).join('');
  }