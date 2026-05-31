import { useCallback, useEffect, useMemo, useState } from 'react';

export const THEME_STORAGE_KEY = 'portfolio-theme-preference';
export const THEME_PREFERENCE_EVENT = 'portfolio-theme-preference-change';

const VALID_PREFERENCES = new Set(['system', 'light', 'dark']);
const QUERY = '(prefers-color-scheme: light)';

function getStoredPreference() {
  if (typeof window === 'undefined') return 'system';

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (VALID_PREFERENCES.has(stored)) return stored;
    if (stored !== null) window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    return 'system';
  }

  return 'system';
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark';

  return window.matchMedia?.(QUERY).matches ? 'light' : 'dark';
}

function resolveTheme(preference, systemTheme) {
  return preference === 'system' ? systemTheme : preference;
}

function getNextPreferenceFromEvent(event) {
  const nextPreference = event?.detail?.preference;

  return VALID_PREFERENCES.has(nextPreference) ? nextPreference : getStoredPreference();
}

export function useThemePreference() {
  const [preference, setPreferenceState] = useState(getStoredPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = useMemo(
    () => resolveTheme(preference, systemTheme),
    [preference, systemTheme],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
  }, [preference, resolvedTheme]);

  useEffect(() => {
    const query = window.matchMedia?.(QUERY);
    if (!query) return undefined;

    const onChange = (event) => {
      setSystemTheme(event.matches ? 'light' : 'dark');
    };

    if (query.addEventListener) {
      query.addEventListener('change', onChange);
    } else {
      query.addListener?.(onChange);
    }

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener('change', onChange);
      } else {
        query.removeListener?.(onChange);
      }
    };
  }, []);

  useEffect(() => {
    const onPreferenceEvent = (event) => {
      setPreferenceState(getNextPreferenceFromEvent(event));
    };

    const onStorage = (event) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      setPreferenceState(getStoredPreference());
    };

    window.addEventListener(THEME_PREFERENCE_EVENT, onPreferenceEvent);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(THEME_PREFERENCE_EVENT, onPreferenceEvent);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setPreference = useCallback((nextPreference) => {
    if (!VALID_PREFERENCES.has(nextPreference)) return;

    setPreferenceState(nextPreference);

    try {
      if (nextPreference === 'system') {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
      }
    } catch {
      // The visible theme should still update if storage is unavailable.
    }

    window.dispatchEvent(
      new CustomEvent(THEME_PREFERENCE_EVENT, {
        detail: {
          preference: nextPreference,
        },
      }),
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  return {
    preference,
    resolvedTheme,
    setPreference,
    toggleTheme,
  };
}