import { createFlag } from '@vercel/flag';

const showPromotion = createFlag('showPromotion', false);
const geolocation = createFlag('geolocation', false);
const notification = createFlag('notification', false);
const darkMode = createFlag('darkMode', false);
const edition = createFlag('edition', false);
const tagFilterSection = createFlag('tagFilterSection', false);

export { showPromotion, geolocation, notification, darkMode, edition, tagFilterSection };
