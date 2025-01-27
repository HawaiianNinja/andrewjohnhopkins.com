const getRandomDuration = () => {
    // Generate a random number between 5 and 10
    const min = 5;
    const max = 15;

    return Math.floor(Math.random() * (max - min) + min) + 's';
};

export const initializeFlickerAnimations = () => {
    const root = document.documentElement;

    // Set random durations for each flicker animation
    root.style.setProperty('--flicker-duration-1', getRandomDuration());
    root.style.setProperty('--flicker-duration-2', getRandomDuration());
    root.style.setProperty('--flicker-duration-3', getRandomDuration());
    root.style.setProperty('--flicker-duration-4', getRandomDuration());
}; 