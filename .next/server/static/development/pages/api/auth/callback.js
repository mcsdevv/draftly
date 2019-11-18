module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/_util/cookie/options.js":
/*!*******************************************!*\
  !*** ./pages/api/_util/cookie/options.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (httpOnly = false, sameSite = false) => {
  return {
    httpOnly,
    path: '/',
    secure: "development" === 'production',
    maxAge: 60 * 60 * 24,
    sameSite
  };
};

/***/ }),

/***/ "./pages/api/_util/token/encryption.js":
/*!*********************************************!*\
  !*** ./pages/api/_util/token/encryption.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const crypto = __webpack_require__(/*! crypto */ "crypto");

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY;

const encrypt = plainText => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const cipherText = cipher.update(plainText);
  const encrypted = Buffer.concat([cipherText, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = plainText => {
  const textParts = plainText.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  const decipherText = decipher.update(encryptedText);
  const decrypted = Buffer.concat([decipherText, decipher.final()]);
  return decrypted.toString();
};

module.exports = {
  decrypt,
  encrypt
};

/***/ }),

/***/ "./pages/api/auth/callback/index.js":
/*!******************************************!*\
  !*** ./pages/api/auth/callback/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const request = __webpack_require__(/*! request-promise */ "request-promise");

const cookie = __webpack_require__(/*! cookie */ "cookie");

const cookieOptions = __webpack_require__(/*! ../../_util/cookie/options */ "./pages/api/_util/cookie/options.js");

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const {
  encrypt
} = __webpack_require__(/*! ../../_util/token/encryption */ "./pages/api/_util/token/encryption.js");

module.exports = async (req, res) => {
  //  confirm state match to mitigate CSRF
  if (req.query.state === req.cookies.state) {
    // prepare options for token exchange
    const options = {
      method: 'POST',
      url: `https://${"dev-5583qz-0.eu.auth0.com"}/oauth/token`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'authorization_code',
        client_id: "N06oXkk7fJACJBYOYgX78BhJhO6KBTfn",
        client_secret: "qZclfSyhmffPTuH8dAmx4BMRw3GUq7RWJQSkuCgBZin6eOJguSkp0kwzzQ7CL2Zq",
        code: req.query.code,
        redirect_uri: `${"http://localhost:3000"}/api/auth/callback/`
      },
      json: true
    }; // send request for token exchange

    const auth = await request(options); // check no error on token exchange

    if (!auth.error) {
      res.setHeader('Location', '/'); //  confirm nonce match to mitigate token replay attack

      if (req.cookies.nonce === jwt.decode(auth.id_token).nonce) {
        // encrypt access token
        const accessEncrypted = encrypt(auth.access_token); // add id_token (browser) and access_token (httpOnly + encrypted) as cookies

        res.setHeader('Set-Cookie', [cookie.serialize('id_token', String(auth.id_token), cookieOptions(false, true)), cookie.serialize('access_token', String(accessEncrypted), cookieOptions(true, true))]); // send response

        res.status(302).end();
      } else {
        // advise token replay attack possible if nonce's do not match
        res.send('Nonce mismatch, potential token replay attack underway.');
      }
    }
  } else {
    // advise CSRF attack likely if states do not match
    res.send('State mismatch, CSRF attack likely.');
  }
};

/***/ }),

/***/ 4:
/*!************************************************!*\
  !*** multi ./pages/api/auth/callback/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mcs/Development/projects/sandbox/tweet-review/pages/api/auth/callback/index.js */"./pages/api/auth/callback/index.js");


/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=callback.js.map