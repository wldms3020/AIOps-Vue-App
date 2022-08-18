import cookies from 'vue-cookies';

// cookies save
function setCookie(key, value) {
    if (!cookies.isKey(key)) {
        cookies.set(key, value);
    }
};

// load cookies
function getCookie(key) {
    if (cookies.isKey(key)) {
        cookies.get(key);
        return cookies.get(key);
    }
};

// delete cookies
function deleteCookie(key) {
    if (cookies.isKey(key)) {
        cookies.remove(key);
    }
};

export {
    setCookie,
    getCookie,
    deleteCookie,
};