const FLICKER_DURATION_MIN = 5;
const FLICKER_DURATION_MAX = 15;
let currentDurations: { [key: string]: string } = {};

const getRandomDuration = () => {
    return Math.floor(Math.random() * (FLICKER_DURATION_MAX - FLICKER_DURATION_MIN) + FLICKER_DURATION_MIN) + 's';
};

export const initializeFlickerAnimations = () => {
    // Only update if durations haven't been set or if they're different
    const newDurations = {
        '--flicker-duration-1': getRandomDuration(),
        '--flicker-duration-2': getRandomDuration(),
        '--flicker-duration-3': getRandomDuration(),
        '--flicker-duration-4': getRandomDuration()
    };

    // Check if we need to update
    const needsUpdate = Object.entries(newDurations).some(
        ([key, value]) => currentDurations[key] !== value
    );

    if (needsUpdate) {
        const root = document.documentElement;
        // Batch the style updates in a single frame
        requestAnimationFrame(() => {
            Object.entries(newDurations).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        });
        currentDurations = newDurations;
    }
}; 