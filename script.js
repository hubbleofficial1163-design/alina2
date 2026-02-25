// script.js
document.addEventListener('DOMContentLoaded', function() {
    const tickerElement = document.getElementById('tickerText');
    const container = document.querySelector('.ticker-container');
    
    // Текст бегущей строки с разделителем
    const baseText = 'приглашение на свадьбу • ';
    
    // Функция для обновления бегущей строки
    function updateTicker() {
        if (!container || !tickerElement) return;
        
        const containerWidth = container.offsetWidth;
        
        // Создаем временный элемент для измерения ширины текста
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontSize = window.getComputedStyle(tickerElement).fontSize;
        temp.style.fontFamily = window.getComputedStyle(tickerElement).fontFamily;
        temp.style.letterSpacing = window.getComputedStyle(tickerElement).letterSpacing;
        temp.style.fontWeight = window.getComputedStyle(tickerElement).fontWeight;
        temp.textContent = baseText;
        document.body.appendChild(temp);
        
        const textWidth = temp.offsetWidth;
        document.body.removeChild(temp);
        
        // Рассчитываем сколько раз нужно повторить текст
        // Нужно минимум 2 полных повтора для плавной анимации
        const repeatsNeeded = Math.max(3, Math.ceil((containerWidth * 2) / textWidth) + 1);
        
        // Создаем финальный текст
        let fullText = '';
        for (let i = 0; i < repeatsNeeded; i++) {
            fullText += baseText;
        }
        
        tickerElement.textContent = fullText;
    }
    
    // Добавляем ключевые кадры если их нет
    if (!document.querySelector('#ticker-styles')) {
        const style = document.createElement('style');
        style.id = 'ticker-styles';
        style.textContent = `
            @keyframes ticker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Инициализация
    updateTicker();
    
    // Обновляем при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateTicker, 100);
    });
    
    // Обновляем при повороте экрана
    window.addEventListener('orientationchange', function() {
        setTimeout(updateTicker, 150);
    });
    
    // Проверяем видимость имен на разных экранах (для отладки, можно удалить)
    console.log('Hero секция загружена. Проверьте отображение имен на вашем устройстве.');
});

// Таймер обратного отсчета до свадьбы
function weddingTimer() {
    // Установите дату свадьбы (год, месяц-1, день, часы, минуты)
    const weddingDate = new Date(2026, 6, 2, 15, 0); // 2 июля 2026, 15:00
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            // Если дата уже прошла
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Расчет дней, часов, минут и секунд
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Обновление DOM с добавлением ведущего нуля
        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Обновляем каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Запускаем таймер после загрузки страницы
document.addEventListener('DOMContentLoaded', weddingTimer);