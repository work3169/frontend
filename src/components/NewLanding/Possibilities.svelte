<script lang="ts">
    import { onMount } from "svelte";

    let statsVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        statsVisible = true;
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.querySelector(".investment-section");
        if (section) observer.observe(section);
    });

    const stats = [
        { label: "Инвесторов", value: 15000, suffix: "+" },
        { label: "Управляемых активов", value: 120, suffix: " млн $" },
        { label: "Годовая доходность", value: 18, suffix: "%" },
        { label: "Проектов", value: 350, suffix: "+" }
    ];
</script>

<style>
    .investment-section {
        background-color: #fff5e6;
        padding: 50px 20px;
        text-align: center;
        overflow: hidden;
        position: relative;
    }

    .investment-header {
        margin-bottom: 30px;
    }

    .investment-header h2 {
        font-size: 2.5rem;
        margin: 0;
        color: #ff8c00;
    }

    .investment-header p {
        font-size: 1.2rem;
        color: #555;
    }

    .stats-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 40px;
        margin-top: 40px;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        transition: transform 0.3s ease;
    }

    .stat-item:hover {
        transform: scale(1.1);
    }

    .stat-item .value {
        font-size: 3rem;
        color: #ff8c00;
        animation: fadeIn 1s ease-out;
    }

    .stat-item .label {
        font-size: 1rem;
        margin-top: 10px;
        color: #555;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .investment-header h2 {
            font-size: 2rem;
        }

        .stats-container {
            gap: 20px;
        }

        .stat-item .value {
            font-size: 2.5rem;
        }
    }
</style>

<section class="investment-section">
    <div class="investment-header">
        <h2>Откройте мир инвестиций</h2>
        <p>Присоединяйтесь к тысячам успешных инвесторов и увеличивайте свои активы.</p>
    </div>

    <div class="stats-container">
        {#each stats as { label, value, suffix }, i}
            <div class="stat-item">
                <div class="value">
                    {#if statsVisible}
                        {value}{suffix}
                    {/if}
                </div>
                <div class="label">{label}</div>
            </div>
        {/each}
    </div>
</section>
