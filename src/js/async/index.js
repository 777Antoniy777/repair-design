// polyfills
import "picturefill";
import "mdn-polyfills/Node.prototype.append";
import "mdn-polyfills/Element.prototype.closest";
import "mdn-polyfills/Array.prototype.forEach";
import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/Array.from";
import "mdn-polyfills/Array.prototype.find";
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();
