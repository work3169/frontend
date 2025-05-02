<script lang="ts">
    import { onMount } from "svelte";

    interface Review {
        text: string;
        author: string;
    }

    const reviews: Review[] = [
  // Russian (RU)
  { text: "Прекрасная компания, всё чётко и прозрачно!", author: "Иван Иванов" },
  { text: "Прекрасная поддержка, всегда помогают.", author: "Дмитрий Ковалёв" },
  { text: "Инвестирую с удовольствием, доход стабильно растёт.", author: "Владимир Петров" },
  { text: "Сервис на высшем уровне, благодарю за помощь!", author: "Ксения Фролова" },
  { text: "Просто и удобно, рекомендую новичкам.", author: "Игорь Романов" },
  { text: "Мои ожидания полностью оправдались.", author: "Татьяна Карпова" },
  { text: "Спасибо за прозрачность и поддержку.", author: "Людмила Васильева" },

  // English (EN)
  { text: "My investments paid off in just a year.", author: "Catherine Parker" },
  { text: "I recommend this service to everyone who wants to grow their capital.", author: "Anna Evans" },
  { text: "High reliability—proven over the years.", author: "Steven Nelson" },
  { text: "It's a pleasure working with you!", author: "Julia Baker" },
  { text: "Great investment app.", author: "Max Green" },
  { text: "Highly recommended, convenient even for beginners.", author: "Irene Adams" },
  { text: "The team knows their stuff—thank you!", author: "Roman Mitchell" },

  // German (DE)
  { text: "Ausgezeichneter Service, es ist angenehm, mit euch zu arbeiten!", author: "Michael Schuster" },
  { text: "Dynamisches Portfoliowachstum – danke an das Team!", author: "Paul Vogel" },
  { text: "Professionelles Team, danke für die Hilfe!", author: "Alexander Lehmann" },
  { text: "Prognosen und Strategien funktionieren ausgezeichnet.", author: "Oleg Schröder" },
  { text: "Alles ist absolut transparent und verständlich.", author: "Elena Dietrich" },
  { text: "Ich habe investiert und es nicht bereut.", author: "Dennis Lindner" },
  { text: "Alles auf höchstem Niveau.", author: "Oxana Engel" },

  // French (FR)
  { text: "Fiabilité à laquelle on peut se fier !", author: "Olivia Laurent" },
  { text: "Aide rapide pour toutes les questions.", author: "Anastasie Tessier" },
  { text: "Interface conviviale et conditions transparentes.", author: "Marine Keller" },
  { text: "Je ne fais confiance qu'à vous, continuons notre collaboration !", author: "Eugène Zola" },
  { text: "J'ai cherché longtemps un partenaire fiable. Je vous ai trouvé !", author: "André Chevalier" },
  { text: "Excellent service pour les professionnels.", author: "Georges Proust" },
  { text: "Je suis très satisfait de votre service.", author: "Artem Savard" }
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
        animation: popIn 20s linear forwards;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transform: scale(0); /* Начинаем с масштаба 0 */
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

    @keyframes popIn {
        0% {
            opacity: 0;
            transform: scale(1); /* Начинаем с масштаба 0 */
        }
        2% {
            opacity: 1;
            transform: scale(1.1); /* Увеличиваем до 110% */
        }
        3% {
            transform: scale(1); /* Возвращаем к 100% */
        }
        90% {
            opacity: 1;
            transform: scale(1); /* Остаемся на 100% */
        }
        100% {
            opacity: 0;
            transform: scale(0); /* Исчезаем */
        }
    }
</style>

<section class="review-section relative">
    <!-- Титульный текст -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <h1 class="text-4xl font-bold text-center text-black">
            <!-- Отзывы наших клиентов -->
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