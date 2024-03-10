// calculateWER.ts
const calculateWER = (reference: string, transcribed: string): number => {
    const refWords = reference.split(/\s+/);
    const transcribedWords = transcribed.split(/\s+/);
    const totalWords = refWords.length;
    
    let substitutions = 0;
    let deletions = 0;
    let insertions = 0;
  
    for (let i = 0; i < totalWords; i++) {
      if (refWords[i] !== transcribedWords[i]) {
        if (i + 1 < totalWords && refWords[i] === transcribedWords[i + 1]) {
          insertions++;
        } else if (i + 1 < totalWords && refWords[i + 1] === transcribedWords[i]) {
          deletions++;
        } else {
          substitutions++;
        }
      }
    }
  
    return ((substitutions + deletions + insertions) / totalWords) * 100;
  };
  
  export default calculateWER;
  