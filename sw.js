import { difficultyFlags } from "./js/DifficultySettings.js";
import { scenarios } from "./js/scenario.js";

const CACHE_NAME = "clockpocalypse-v1.011";

const CORE_ASSETS = [
    "./",
    "./index.html",
    "./Style.css",
    "./manifest.json",
    "./js/Main.js",
    "./js/GameManager.js",
    "./js/Events.js",
    "./js/UIManager.js",
    "./js/SoundManager.js",
    "./js/sound_effects.js",
    "./js/TimerSettings.js",
    "./js/DifficultySettings.js",
    "./js/scenario.js",
    "./js/ProgressTracker.js",

    //
    "./Sound_Effects/CompleteV2.wav",
    "./Sound_Effects/FailV2.wav",
    "./Sound_Effects/SkipV2.wav",
    "./Sound_Effects/VictoryV2.wav",

    // Flags + sirens, pulled from existing data
    ...difficultyFlags.flatMap(f => [f.image, f.siren]),

    // Per-scenario event sounds, pulled from existing data
    ...Object.values(scenarios).flatMap(scenario =>
        scenario.events
            .map(event => event.sound)
            .filter(sound => sound && sound !== "Nothing")
    )
];


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => 
            Promise.all(
                CORE_ASSETS.map((url) =>
                    cache.add(url).catch((err) =>
                        console.warn("Failed to cache:", url, err)
                    )
                )
            )
        )
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request).then((response) => {
                    // Only cache successful, same-origin responses
                    if (
                        response.ok &&
                        response.status === 200 &&
                        event.request.url.startsWith(self.location.origin)
                    ) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) =>
                            cache.put(event.request, clone)
                        );
                    }
                    return response;
                })
            );
        })
    );
});


