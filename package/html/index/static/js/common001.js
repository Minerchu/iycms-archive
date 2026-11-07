function isHasImg(pathImg) {
  if (!pathImg) return false;
  try {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open("Get", pathImg, false);
    xmlHttp.send();
    if (xmlHttp.status == 200) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
function getParams(name) {
  if (name === undefined) {
    let url = location.href;
    let regx = /([^&?=]+)=([^&?=]+)/g;
    let obj = {};
    url.replace(regx, (...args) => {
      if (obj[args[1]]) {
        obj[args[1]] = Array.isArray(obj[args[1]])
          ? obj[args[1]]
          : [obj[args[1]]];
        obj[args[1]].push(args[2]);
      } else {
        obj[args[1]] = args[2];
      }
    });

    return obj;
  }
  return new URLSearchParams(location.search).get(name);
}
function setParams(name, value, url = "") {
  const params = new URLSearchParams(location.search);
  if (value instanceof Array) {
    value.forEach(({ key, value }) => {
      params.set(key, value);
    });
  } else {
    params.set(name, value);
  }

  if (url) {
    location.href = url + "?" + params.toString();
  } else {
    location.search = params.toString();
  }
}
function removeParams(name) {
  const params = new URLSearchParams(location.search);
  params.delete(name);
  location.search = params.toString();
}