import { flag } from 'flags/next';

export const showPromotion = flag({
  key: 'showPromotion',
  decide() {
    return false;
  },
});

export const geolocation = flag({
  key: 'geolocation',
  decide() {
    return false;
  },
});

export const notification = flag({
  key: 'notification',
  decide() {
    return false;
  },
});

export const darkMode = flag({
  key: 'darkMode',
  decide() {
    return false;
  },
});

export const edition = flag({
  key: 'edition',
  decide() {
    return false;
  },
});

export const tagFilterSection = flag({
  key: 'tagFilterSection',
  decide() {
    return false;
  },
});
