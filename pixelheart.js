// Класс для создания пиксельного сердца
class PixelHeart {
    constructor(x, y, size = 8, color = '#ff4444') {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.size = Math.floor(size / 4) * 4; // кратно размеру пикселя
        this.color = color;
        this.pixels = [];
        this.visible = true;
        this.createdAt = Date.now();
        this.pulsePhase = 0;
        
        this.createPixelPattern();
    }
    
    // Создание пиксельного паттерна сердца
    createPixelPattern() {
        const s = this.size / 4; // масштаб
        
        // Пиксельная сетка сердца (матрица 8x7)
        const pattern = [
            [0,1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col]) {
                    this.pixels.push({
                        x: this.x + col * s,
                        y: this.y + row * s,
                        size: s
                    });
                }
            }
        }
    }
    
    // Отрисовка сердца
    draw(ctx) {
        if (!this.visible) return;
        
        // Эффект пульсации
        this.pulsePhase += 0.1;
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        
        this.pixels.forEach(pixel => {
            ctx.fillRect(
                pixel.x, 
                pixel.y, 
                pixel.size * pulse, 
                pixel.size * pulse
            );
        });
    }
    
    // Обновление сердца (для анимации)
    update() {
        // Сердце живет 5 секунд, потом исчезает
        if (Date.now() - this.createdAt > 5000) {
            this.visible = false;
        }
    }
}

// Класс для падающих пиксельных сердечек
class FallingHeart {
    constructor() {
        this.x = Math.random() * CONFIG.width;
        this.y = -20;
        this.speed = 2 + Math.random() * 3;
        this.size = 4 + Math.floor(Math.random() * 4) * 2;
        this.color = `rgb(255, ${68 + Math.random() * 100}, ${68 + Math.random() * 100})`;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }
    
    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        
        // Рисуем простое пиксельное сердечко
        const s = this.size / 2;
        ctx.fillRect(-s, -s, s, s);
        ctx.fillRect(0, -s, s, s);
        ctx.fillRect(-s * 1.5, 0, s, s);
        ctx.fillRect(s * 0.5, 0, s, s);
        ctx.fillRect(-s, s, s, s);
        ctx.fillRect(0, s, s, s);
        
        ctx.restore();
    }
    
    isOffScreen() {
        return this.y > CONFIG.height + 50;
    }
}