// Класс для создания пиксельного дерева в форме сердца
class PixelTree {
    constructor(startX, startY) {
        this.startX = Math.floor(startX);
        this.startY = Math.floor(startY);
        this.branches = [];
        this.leaves = [];
        this.hearts = [];
        this.fallingHearts = [];
        this.growth = 0;
        this.maxGrowth = 1;
        this.heartPattern = [];
        
        // Цвета для пиксельного стиля
        this.colors = {
            trunk: '#8B4513',
            branch: '#A0522D',
            leaf1: '#00aa00',
            leaf2: '#00ff00',
            heart1: '#ff4444',
            heart2: '#ff8888',
            heart3: '#ff69b4'
        };
        
        this.createHeartPattern();
        this.createFallingHearts();
    }
    
    // Создание паттерна сердца из пикселей
    createHeartPattern() {
        // Матрица для сердца (17x15)
        this.heartPattern = [
            [0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0],
            [0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
        ];
    }
    
    // Создание падающих сердечек
    createFallingHearts() {
        setInterval(() => {
            if (this.growth > 0.5) {
                this.fallingHearts.push(new FallingHeart());
            }
        }, 500);
    }
    
    // Рост дерева
    grow() {
        if (this.growth < this.maxGrowth) {
            this.growth += 0.005;
        }
        
        // Обновление падающих сердечек
        this.fallingHearts.forEach(heart => heart.update());
        this.fallingHearts = this.fallingHearts.filter(heart => !heart.isOffScreen());
    }
    
    // Отрисовка пиксельного дерева
    draw(ctx) {
        // Рисуем ствол (пиксельный)
        this.drawTrunk(ctx);
        
        // Рисуем ветки
        this.drawBranches(ctx);
        
        // Рисуем сердце из листьев
        this.drawHeartLeaves(ctx);
        
        // Рисуем падающие сердечки
        this.fallingHearts.forEach(heart => heart.draw(ctx));
    }
    
    drawTrunk(ctx) {
        const trunkWidth = 30;
        const trunkHeight = 80 * this.growth;
        
        ctx.fillStyle = this.colors.trunk;
        ctx.shadowColor = '#5d3a1a';
        ctx.shadowBlur = 10;
        
        // Пиксельный ствол
        for (let i = 0; i < trunkHeight; i += 4) {
            for (let j = -trunkWidth/2; j < trunkWidth/2; j += 4) {
                if (i < trunkHeight * 0.7 || Math.random() > 0.3) {
                    ctx.fillRect(
                        this.startX + j,
                        this.startY - i,
                        3,
                        3
                    );
                }
            }
        }
    }
    
    drawBranches(ctx) {
        if (this.growth < 0.3) return;
        
        ctx.fillStyle = this.colors.branch;
        ctx.shadowColor = '#5d3a1a';
        
        // Пиксельные ветки
        const branchCount = 8;
        for (let i = 0; i < branchCount; i++) {
            const angle = (i / branchCount) * Math.PI * 2;
            const length = 80 * this.growth;
            
            for (let step = 0; step < length; step += 4) {
                const x = this.startX + Math.cos(angle) * step;
                const y = this.startY - 50 - Math.sin(angle) * step * 0.5;
                
                if (Math.random() > 0.3) {
                    ctx.fillRect(x, y, 3, 3);
                }
            }
        }
    }
    
    drawHeartLeaves(ctx) {
        if (this.growth < 0.6) return;
        
        const heartScale = this.growth - 0.5;
        const startX = this.startX - 60;
        const startY = this.startY - 150;
        
        // Рисуем сердце из пиксельных листьев
        for (let row = 0; row < this.heartPattern.length; row++) {
            for (let col = 0; col < this.heartPattern[row].length; col++) {
                if (this.heartPattern[row][col] && Math.random() > 0.2) {
                    const x = startX + col * 8;
                    const y = startY + row * 8;
                    
                    // Чередуем цвета для эффекта градиента
                    const colorIndex = (row + col) % 3;
                    let color;
                    if (colorIndex === 0) color = this.colors.heart1;
                    else if (colorIndex === 1) color = this.colors.heart2;
                    else color = this.colors.heart3;
                    
                    ctx.fillStyle = color;
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 15;
                    ctx.fillRect(x, y, 6, 6);
                }
            }
        }
    }
}