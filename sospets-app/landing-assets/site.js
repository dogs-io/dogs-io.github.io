const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-nav');
const menuBackdrop = document.querySelector('.menu-backdrop');
const themeControl = document.querySelector('.theme-control');
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = 'sos-landing-theme';
const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

const readSavedTheme = () => {
  try {
    const value = localStorage.getItem(themeStorageKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  if (themeColor) {
    themeColor.setAttribute('content', theme === 'dark' ? '#0b1411' : '#087a58');
  }
};

let themePreference = readSavedTheme() || 'auto';

const updateThemeControl = () => {
  if (!themeControl) return;
  themeControl.dataset.themePreference = themePreference;
  const labelKey = `label${themePreference[0].toUpperCase()}${themePreference.slice(1)}`;
  const label = themeControl.dataset[labelKey];
  if (label) {
    themeControl.setAttribute('aria-label', label);
    themeControl.setAttribute('title', label);
  }
};

const applyThemePreference = () => {
  applyTheme(themePreference === 'auto' ? (colorScheme.matches ? 'dark' : 'light') : themePreference);
  updateThemeControl();
};

if (themeControl) {
  applyThemePreference();
  themeControl.addEventListener('click', () => {
    const preferences = ['auto', 'light', 'dark'];
    themePreference = preferences[(preferences.indexOf(themePreference) + 1) % preferences.length];
    try {
      if (themePreference === 'auto') {
        localStorage.removeItem(themeStorageKey);
      } else {
        localStorage.setItem(themeStorageKey, themePreference);
      }
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
    applyThemePreference();
  });
}

colorScheme.addEventListener?.('change', (event) => {
  if (themePreference === 'auto') {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

if (menuButton && menu) {
  const updateMenuLabel = (open) => {
    const label = open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel;
    if (label) {
      menuButton.setAttribute('aria-label', label);
      menuButton.setAttribute('title', label);
    }
  };
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    updateMenuLabel(open);
    menu.classList.toggle('is-open', open);
    menuBackdrop?.classList.toggle('is-visible', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(open);
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenuOpen(false);
    }
  });
  menuBackdrop?.addEventListener('click', () => setMenuOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener?.('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });
}
