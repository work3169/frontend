<script lang="ts">
    import { onMount } from "svelte";

    interface Review {
        text: string;
        author: string;
    }

    const reviews: Review[] = [
        { text: "Прекрасная компания, всё четко и прозрачно!", author: "Иван И." },
        { text: "Мои инвестиции окупились уже через год.", author: "Екатерина П." },
        { text: "Отличный сервис, приятно работать!", author: "Михаил С." },
        { text: "Надежность, которой можно доверять!", author: "Ольга Л." },
        { text: "Прекрасная поддержка, всегда помогают.", author: "Дмитрий К." },
        { text: "Рекомендую всем, кто хочет приумножить капитал.", author: "Анна Е." },
        { text: "Динамичный рост портфеля, спасибо команде!", author: "Павел В." },
        { text: "Быстрая помощь в любых вопросах.", author: "Анастасия Т." },
        { text: "Просто и удобно, рекомендую новичкам.", author: "Игорь Р." },
        { text: "Высокая надежность, проверено годами.", author: "Светлана Н." },
        { text: "Профессиональная команда, спасибо за помощь!", author: "Александр Л." },
        { text: "Удобный интерфейс и прозрачные условия.", author: "Марина К." },
        { text: "Инвестирую с удовольствием, доход стабильно растет.", author: "Владимир П." },
        { text: "Работать с вами — одно удовольствие!", author: "Юлия Б." },
        { text: "Прогнозы и стратегии работают отлично.", author: "Олег С." },
        { text: "Доверяю только вам, продолжаем сотрудничество!", author: "Евгений З." },
        { text: "Сервис на высшем уровне, благодарю за помощь!", author: "Ксения Ф." },
        { text: "Отличное приложение для инвестиций.", author: "Максим Г." },
        { text: "Всё максимально прозрачно и понятно.", author: "Елена Д." },
        { text: "Долго искал надежного партнера. Нашел вас!", author: "Андрей Ч." },
        { text: "Стабильный доход без сюрпризов.", author: "Виктория Н." },
        { text: "Очень рекомендую, удобно даже для новичков.", author: "Ирина А." },
        { text: "Инвестировал и не пожалел.", author: "Денис Л." },
        { text: "Отличный сервис для профессионалов.", author: "Георгий П." },
        { text: "Мои ожидания полностью оправдались.", author: "Татьяна К." },
        { text: "Команда знает своё дело, спасибо!", author: "Роман М." },
        { text: "Всё на высшем уровне.", author: "Оксана Е." },
        { text: "Я очень доволен вашим сервисом.", author: "Артем С." },
        { text: "Спасибо за прозрачность и поддержку.", author: "Людмила В." },
    ];

    interface VisibleReview extends Review {
        id: number;
        top: string;
        left: string;
    }

    let visibleReviews: VisibleReview[] = [];

    onMount(() => {
        const interval = setInterval(() => {
            addRandomReview();
        }, 700);

        return () => clearInterval(interval);
    });

    function addRandomReview() {
        const section = document.querySelector(".review-section") as HTMLElement;
        if (!section) return;

        const sectionHeight = section.offsetHeight;
        const sectionWidth = section.offsetWidth;

        const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
        visibleReviews = [
            ...visibleReviews,
            {
                id: Math.random(),
                top: `${Math.random() * (sectionHeight - 100) + 50}px`, // Ограничиваем координаты по высоте
                left: `${Math.random() * (sectionWidth - 100) + 50}px`, // Ограничиваем координаты по ширине
                text: randomReview.text,
                author: randomReview.author,
            },
        ];
    }
</script>

<style>
    .review-section {
        position: relative;
        height: 400px; /* Уменьшаем высоту секции */
        width: 100%; /* Можно задать фиксированную ширину */
        
        margin: 50px auto; /* Центрируем секцию */
        overflow: hidden;
        
        
        
    }

    .review-card {
        position: absolute;
        width: 200px; /* Уменьшаем размер карточек */
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        opacity: 0;
        animation: fadeInOut 20s linear forwards;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .review-card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    .review-text {
        font-size: 0.9rem;
        color: #333;
        margin-bottom: 10px;
    }

    .review-author {
        font-size: 0.8rem;
        font-weight: bold;
        color: #555;
    }

    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.9);
        }
    }
</style>

<section class="review-section relative">
    <!-- Титульный текст -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <h1 class="text-4xl font-bold text-center text-black">
            Отзывы наших клиентов
        </h1>
    </div>

    <!-- Карточки отзывов -->
    {#each visibleReviews as { id, text, author, top, left }}
        <div
            class="review-card"
            style="top: {top}; left: {left};"
        >
            <div class="review-text">{text}</div>
            <div class="review-author">— {author}</div>
        </div>
    {/each}
</section>

