/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/apps/facebookLogin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/apps/facebookLogin.js":
/*!*****************************************!*\
  !*** ./assets/js/apps/facebookLogin.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_facebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/facebook */ \"./assets/js/utils/facebook.js\");\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth */ \"./assets/js/services/auth.js\");\n\n\n\nfunction fbAsyncInit() {\n  FB.init({\n    appId: '2704628223158103',\n    cookie: true,\n    xfbml: true,\n    version: 'v8.0'\n  });\n  FB.AppEvents.logPageView();\n}\n\nfunction checkLoginState() {\n  Object(_utils_facebook__WEBPACK_IMPORTED_MODULE_0__[\"getLoginStatus\"])().then(_utils_facebook__WEBPACK_IMPORTED_MODULE_0__[\"getUserNameEmail\"]).then(syncInfo);\n}\n\nfunction syncInfo(response) {\n  const {\n    email,\n    id,\n    name\n  } = response;\n  return _services_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"].login(email, id).then(_services_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sync(name, email, id)).then(loginResponse => {\n    console.log('uuid user', loginResponse);\n  });\n}\n\nwindow.fbAsyncInit = fbAsyncInit;\nwindow.checkLoginState = checkLoginState;\n\n(function (d, s, id) {\n  var js,\n      fjs = d.getElementsByTagName(s)[0];\n\n  if (d.getElementById(id)) {\n    return;\n  }\n\n  js = d.createElement(s);\n  js.id = id;\n  js.src = \"https://connect.facebook.net/en_US/sdk.js\";\n  fjs.parentNode.insertBefore(js, fjs);\n})(document, 'script', 'facebook-jssdk');\n\n//# sourceURL=webpack:///./assets/js/apps/facebookLogin.js?");

/***/ }),

/***/ "./assets/js/services/auth.js":
/*!************************************!*\
  !*** ./assets/js/services/auth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fetchUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchUtil */ \"./assets/js/services/fetchUtil.js\");\n\nconst service = {\n  login(email, password) {\n    return Object(_fetchUtil__WEBPACK_IMPORTED_MODULE_0__[\"post\"])('/api/auth/login', {\n      email,\n      password\n    }).then(response => response.json());\n  },\n\n  register(firstName, lastName, email, phone, password) {\n    const payload = {\n      firstName,\n      lastName,\n      email,\n      phone,\n      password\n    };\n    return Object(_fetchUtil__WEBPACK_IMPORTED_MODULE_0__[\"post\"])('/api/auth/register', payload).then(response => response.json());\n  },\n\n  sync(name, email, id) {\n    return loginResponse => {\n      if (loginResponse.success) {\n        return loginResponse;\n      }\n\n      const [firstName, lastName] = name.split(' ');\n      return this.register(firstName, lastName, email, null, id);\n    };\n  }\n\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (service);\n\n//# sourceURL=webpack:///./assets/js/services/auth.js?");

/***/ }),

/***/ "./assets/js/services/fetchUtil.js":
/*!*****************************************!*\
  !*** ./assets/js/services/fetchUtil.js ***!
  \*****************************************/
/*! exports provided: post, get, put */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"post\", function() { return post; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"put\", function() { return put; });\nconst post = (url, data = {}) => fetch(url, {\n  method: 'POST',\n  cache: 'no-cache',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(data)\n});\n\nconst get = url => fetch(url, {\n  method: 'GET',\n  headers: {\n    'Content-Type': 'application/json'\n  }\n});\n\nconst put = (url, data = {}) => fetch(url, {\n  method: 'PUT',\n  cache: 'no-cache',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(data)\n});\n\n\n\n//# sourceURL=webpack:///./assets/js/services/fetchUtil.js?");

/***/ }),

/***/ "./assets/js/utils/facebook.js":
/*!*************************************!*\
  !*** ./assets/js/utils/facebook.js ***!
  \*************************************/
/*! exports provided: getLoginStatus, getUserNameEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLoginStatus\", function() { return getLoginStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserNameEmail\", function() { return getUserNameEmail; });\nconst StatusTypes = {\n  CONNECTED: 'connected'\n};\n\nfunction getLoginStatus() {\n  return new Promise((resolve, reject) => {\n    FB.getLoginStatus(response => {\n      if (response.status === StatusTypes.CONNECTED) {\n        resolve(response.authResponse.accessToken);\n      } else {\n        reject(response);\n      }\n    });\n  });\n}\n\nfunction getUserNameEmail() {\n  return new Promise(resolve => {\n    FB.api('/me', 'GET', {\n      fields: 'id,name,email'\n    }, response => {\n      resolve(response);\n    });\n  });\n}\n\n\n\n//# sourceURL=webpack:///./assets/js/utils/facebook.js?");

/***/ })

/******/ });