// Класс для управления пиксельными сообщениями
class MessageManager {
    constructor() {
        this.messages = CONFIG.messages;
        this.currentIndex = 0;
        this.messageElements = {};
        
        // Получаем все элементы сообщений
        this.messages.forEach(msg => {
            const element = document.getElementById(msg.id);
            if (element) {
                this.messageElements[msg.id] = element;
            }
        });
    }
    
    // Показать следующее сообщение
    showNextMessage() {
        if (this.currentIndex < this.messages.length) {
            const msg = this.messages[this.currentIndex];
            const element = this.messageElements[msg.id];
            
            if (element) {
                element.classList.add('visible');
                
                // Добавляем пиксельный звук (визуальный)
                this.createPixelNotification(element);
            }
            
            this.currentIndex++;
        } else {
            // Показываем кнопку перезапуска
            this.showRestartButton();
        }
    }
    
    // Создание пиксельного уведомления
    createPixelNotification(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const pixel = document.createElement('div');
                pixel.style.position = 'absolute';
                pixel.style.left = rect.left + Math.random() * rect.width + 'px';
                pixel.style.top = rect.top + Math.random() * rect.height + 'px';
                pixel.style.width = '4px';
                pixel.style.height = '4px';
                pixel.style.background = '#ff1493';
                pixel.style.zIndex = '25';
                pixel.style.pointerEvents = 'none';
                pixel.style.animation = 'pixelFade 1s forwards';
                document.querySelector('.game-container').appendChild(pixel);
                
                setTimeout(() => pixel.remove(), 1000);
            }, i * 100);
        }
    }
    
    // Показать кнопку перезапуска
    showRestartButton() {
        const btn = document.getElementById('restartBtn');
        if (btn) {
            btn.classList.add('visible');
        }
    }
    
    // Скрыть все сообщения
    hideAllMessages() {
        this.messages.forEach(msg => {
            const element = this.messageElements[msg.id];
            if (element) {
                element.classList.remove('visible');
            }
        });
        
        const btn = document.getElementById('restartBtn');
        if (btn) {
            btn.classList.remove('visible');
        }
        
        this.currentIndex = 0;
    }
}

// Добавляем стиль для анимации пикселей
const style = document.createElement('style');
style.textContent = `
    @keyframes pixelFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(2); }
    }
`;
document.head.appendChild(style);