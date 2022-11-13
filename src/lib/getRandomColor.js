const letters = '0123456789ABCDEF';

// generate random color
// maxDarkness - the lower, the darker colors can be (max = 0)
// maxBrightness - the higher, the brighter colors can be (max = 15)
export function getRandomColor(bit=6, maxDarkness, maxBrightness) {
    maxBrightness = 15 - maxBrightness;
    let color = '#';
    for (var i = 0; i < bit; i++) {
        color += letters[Math.floor(Math.random() * (16 - maxDarkness - maxBrightness)) + maxDarkness];
    }
    return color;
}