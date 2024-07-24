import { DYNAMIC_PUBLIC_URL } from "core";

// Unregister old service workers for standalone
export const unsubscribeOldSW = () =>
 {if ('serviceWorker' in navigator) {

	const AmISoloQueen = DYNAMIC_PUBLIC_URL === window.location.origin;

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      // Unregister old service worker
      if (registration.active && registration.active.scriptURL.includes('sw.js')) {
        registration.unregister().then((success) => {
          if (success) {
            console.log('Old service worker unregistered successfully.');
						// clear cache only if we are in standalone
						if (AmISoloQueen) {
							clearAllCaches()
						}
          } else {
            console.log('Failed to unregister old service worker.');
          }
        });
      }
    });
  });
}}

const clearAllCaches = async () => {
  // Get the names of Workbox's default caches
  const cacheNames = await caches.keys();

  // Iterate through all cache names and delete them
  await Promise.all(
    cacheNames.map((cacheName) => {
      return caches.delete(cacheName);
    })
  );

  console.log('All caches cleared.');
};