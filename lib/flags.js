import { flag } from 'flags/next';

export const showPromotionFlag = flag({
  key: 'showPromotion',
  decide() {
    return false;
  },
});

export const geolocationFlag = flag({
  key: 'geolocation',
  decide() {
    return false;
  },
});

export const notificationFlag = flag({
  key: 'notification',
  decide() {
    return false;
  },
});

export const darkModeFlag = flag({
  key: 'darkMode',
  decide() {
    return false;
  },
});

export const editionFlag = flag({
  key: 'edition',
  decide() {
    return false;
  },
});

export const tagFilterSectionFlag = flag({
  key: 'tagFilterSection',
  decide() {
    return false;
  },
});

