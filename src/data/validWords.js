/**
 * Loads the English word list from dwyl/english-words (words_alpha.txt).
 * Returns a Set of lowercase words (3+ letters). Cached after first load.
 * @see https://github.com/dwyl/english-words
 */
const DICTIONARY_URL =
  'https://cdn.jsdelivr.net/gh/dwyl/english-words@master/words_alpha.txt';

let cachedWords = null;

/**
 * @returns {Promise<Set<string>>} Set of valid lowercase words (3+ letters)
 */
export async function loadValidWords() {
  if (cachedWords) return cachedWords;

  const res = await fetch(DICTIONARY_URL);
  if (!res.ok) throw new Error('Failed to load dictionary');
  const text = await res.text();

  const words = text
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 3); // change to 4 for future when grid better implemented

  cachedWords = new Set(words);
  return cachedWords;
}
