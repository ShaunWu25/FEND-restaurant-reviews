const cacheAssets = [
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '//normalize-css.googlecode.com/svn/trunk/normalize.css',
    '//unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

// Install event
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open('v1').then(function(cache){
			return cache.addAll(cacheFiles)
		})
	);
});

// Fetch event
self.addEventListener('fetch', function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response){
				console.log('Found ', e.request, 'in cache');
				return response;
			}
			else{
				console.log('Could not find ', e.request, ' in cache, FETCHING.');
				return fetch(e.request)
				.then(function(response){
					const clonedResponde = responde.clone();
					caches.open('v1').then(function(cachee){
						cache.put(e.request, response);
					})
					return response;
				})
				.catch(function(err){
					console.error(err);
				})
			}
		})
	);
});


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('Registration worked!');
	})
	.catch(function() {
		console.log('Registration failed!');
	});
}