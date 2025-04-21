import { useEffect, useState } from 'react';
import { saveToSession, getFromSession, clearSession, SessionData } from '../utils/sessionStorage';

export const useSessionStorage = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    // Load session data on component mount
    const data = getFromSession();
    if (data) {
      setSessionData(data);
    }
  }, []);

  const saveSession = (data: SessionData) => {
    saveToSession(data);
    setSessionData(data);
  };

  const clearSessionData = () => {
    clearSession();
    setSessionData(null);
  };

  return {
    sessionData,
    saveSession,
    clearSessionData,
  };
}; 