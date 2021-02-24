var CACHE = "network-or-cache";

self.addEventListener("install", function (event) {
  console.log("The service worker is being installed.");

  event.waitUntil(precache());
});

self.addEventListener("fetch", function (evt) {
  console.log("The service worker is serving the asset.");
  evt.respondWith(
    fromNetwork(evt.request, 400).catch(function () {
      return fromCache(evt.request);
    })
  );
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(["./", "./page/1", "./page/2"]);
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject("no-match");
    });
  });
}
