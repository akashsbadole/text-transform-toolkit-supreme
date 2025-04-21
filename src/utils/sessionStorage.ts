export interface SessionData {
  text: string;
  lastTransform?: string;
  stats: {
    characters: number;
    words: number;
    lines: number;
    sentences: number;
  };
}

const SESSION_KEY = 'text-transform-session';

export const saveToSession = (data: SessionData) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to session storage:', error);
  }
};

export const getFromSession = (): SessionData | null => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to read from session storage:', error);
    return null;
  }
};

export const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session storage:', error);
  }
}; 