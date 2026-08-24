// Инициализация иконок Feather
feather.replace();

// Функции для модального окна
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Закрытие модалки по клику на фон
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle');
    
    // Переключаем класс на body
    body.classList.toggle('dark-theme');
    
    // Меняем иконку
    if (body.classList.contains('dark-theme')) {
        icon.setAttribute('data-feather', 'moon');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.setAttribute('data-feather', 'sun');
        localStorage.setItem('theme', 'light');
    }
    
    // Обновляем Feather иконки
    feather.replace();
}

// При загрузке проверяем сохранённую тему
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.setAttribute('data-feather', 'moon');
        feather.replace();
    }
});

// Кнопка "Наверх" появляется при скролле
window.addEventListener('scroll', function() {
    const btn = document.getElementById('btnTop');
    if (window.scrollY > 400) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
});

// Анимация появления карточек товаров
const cards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Фильтр товаров по категориям
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.dataset.filter;

        productCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Слайдер
const sliderContainer = document.getElementById('sliderContainer');
const slides = sliderContainer.querySelectorAll('.slider-slide');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval;

// Создаём точки навигации
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

// Переход к слайду
function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
    resetAutoSlide();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Автопрокрутка
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Кнопки слайдера
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevSlide();
});

nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextSlide();
});

// Запускаем автопрокрутку
startAutoSlide();

// Останавливаем автопрокрутку при наведении на слайдер
const sliderWrapper = document.querySelector('.slider-wrapper');
sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});
sliderWrapper.addEventListener('mouseleave', () => {
    startAutoSlide();
});