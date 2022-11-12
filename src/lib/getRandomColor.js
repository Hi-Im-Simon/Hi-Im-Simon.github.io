const letters = '0123456789ABCDEF';

export function getRandomColor(bit=6) {
    let color = '#';
    for (var i = 0; i < bit; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}