importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/nav.html', revision: '1'},
    {url: '/manifest.json', revision: '1'},
    {url: '/match.html', revision: '1'},
    {url: '/team.html', revision: '1'},
    {url: '/fav.html', revision: '1'},
    {url: '/pages/home.html', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/nav.js', revision: '1'},
    {url: '/js/api.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/icon.png', revision: '1'},
]);

workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'dicoding'
    })
);

self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/";

    if (event.request.url.indexOf(base_url) > -1) {

        const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
        event.respondWith(staleWhileRevalidate.handle({event}));


    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});


self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Notifikasi dicoding';
    }
    var options = {
        body: 'This notification was generated from a push!',
        icon: '/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dataOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});