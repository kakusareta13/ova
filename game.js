// Основной класс игры
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.tree = null;
        this.messageManager = new MessageManager();
        this.animationFrame = null;
        this.gameStarted = false;
        
        // Настройка canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Настройка кнопки перезапуска
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());
        
        // Запуск игры
        this.start();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        updateConfigSize();
        
        if (this.tree) {
            this.tree.startX = CONFIG.tree.startX;
            this.tree.startY = CONFIG.tree.startY;
        }
    }
    
    start() {
        if (this.gameStarted) return;
        this.gameStarted = true;
        
        // Создаем дерево
        this.tree = new PixelTree(CONFIG.tree.startX, CONFIG.tree.startY);
        
        // Запускаем анимацию
        this.animate();
        
        // Запускаем появление сообщений
        this.startMessages();
    }
    
    startMessages() {
        CONFIG.messages.forEach(msg => {
            setTimeout(() => {
                this.messageManager.showNextMessage();
            }, msg.delay);
        });
    }
    
    animate() {
        // Очистка canvas
        this.ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);
        
        // Черный фон
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
        
        // Добавляем пиксельные помехи (эффект ретро)
        this.addPixelNoise();
        
        // Обновляем и рисуем дерево
        if (this.tree) {
            this.tree.grow();
            this.tree.draw(this.ctx);
        }
        
        // Продолжаем анимацию
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    // Добавление пиксельного шума для ретро-эффекта
    addPixelNoise() {
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            for (let i = 0; i < 10; i++) {
                this.ctx.fillRect(
                    Math.random() * CONFIG.width,
                    Math.random() * CONFIG.height,
                    2,
                    2
                );
            }
        }
    }
    
    restart() {
        // Останавливаем текущую анимацию
        cancelAnimationFrame(this.animationFrame);
        
        // Скрываем все сообщения
        this.messageManager.hideAllMessages();
        
        // Сбрасываем игру
        this.gameStarted = false;
        
        // Очищаем canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
        
        // Запускаем заново с небольшой задержкой
        setTimeout(() => {
            this.start();
        }, 500);
    }
}

// Создание экземпляра игры при загрузке страницы
window.addEventListener('load', () => {
    new Game();
});