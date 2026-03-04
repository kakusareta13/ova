// Конфигурация игры
const CONFIG = {
    canvas: null,
    ctx: null,
    width: window.innerWidth,
    height: window.innerHeight,
    
    // Цвета в пиксельном стиле
    colors: {
        black: '#000000',
        white: '#ffffff',
        red: '#ff4444',
        darkRed: '#880000',
        pink: '#ff69b4',
        lightPink: '#ffb6c1',
        purple: '#aa00aa'
    },
    
    // Размер пикселя
    pixelSize: 4,
    
    // Настройки дерева
    tree: {
        startX: 0, // будет установлено позже
        startY: 0, // будет установлено позже
        trunkWidth: 20,
        trunkHeight: 60,
        heartSize: 8
    },
    
    // Сообщения
    messages: [
        { id: 'message1', text: 'ТЫ МОЯ ВСЕЛЕННАЯ', delay: 2000 },
        { id: 'message2', text: 'LOVE YOU 3000', delay: 3000 },
        { id: 'message3', text: 'ТЫ ЛУЧШАЯ', delay: 4000 },
        { id: 'message4', text: 'МОЁ СЕРДЦЕ', delay: 5000 },
        { id: 'message5', text: '💗 4EVER 💗', delay: 6000 }
    ]
};

// Функция для обновления размеров
function updateConfigSize() {
    CONFIG.width = window.innerWidth;
    CONFIG.height = window.innerHeight;
    CONFIG.tree.startX = Math.floor(CONFIG.width / 2);
    CONFIG.tree.startY = Math.floor(CONFIG.height - 100);
}