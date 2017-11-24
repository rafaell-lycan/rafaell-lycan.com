import './web-font-loader';
import { checkExternalLinks, startProgressBar } from './helpers';

window.addEventListener('load', () => {
  checkExternalLinks(document);
  startProgressBar(document);
}, false);