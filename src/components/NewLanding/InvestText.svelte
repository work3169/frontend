<script lang="ts">
    export let imageUrl: string = "/path/to/your/image.jpg"; // URL изображения
  </script>
  
  <style>
    .section {

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 40px 20px;
      max-width: 1200px;
      margin: 60px;
      background-color: #f9f9f9;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      gap: 20px;
    }
  
    .text-content {
      flex: 1;
      max-width: 600px;
    }
  
    .title {
      font-size: 2rem;
      font-weight: bold;
      color: #4e8d8d;
      margin-bottom: 20px;
    }
  
    .paragraph {
      font-size: 1.1rem;
      color: #2c3e50;
      line-height: 1.6;
      margin-bottom: 15px;
    }
  
    .image-container {
      flex: 1;
      max-width: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .image-container img {
      width: 100%;
      max-width: 400px;
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
  
  <div class="section">
    <div class="text-content">
      <h1 class="title">Инвестиции в логистику</h1>
      <p class="paragraph">
        Логистика — это основа мировой экономики. Развитие складских систем, внедрение цифровых технологий и улучшение транспортной инфраструктуры позволяют компаниям оптимизировать затраты и повысить эффективность.
      </p>
      <p class="paragraph">
        С ростом спроса на экологичные технологии инвестиции в электрический транспорт и снижение углеродного следа становятся приоритетом. Поддержка этих направлений помогает сохранить природу и улучшить качество жизни.
      </p>
      <p class="paragraph">
        Выбирая логистику как сферу для инвестиций, вы вкладываете в будущее глобальной экономики.
      </p>
    </div>
  
    <div class="image-container">
      <img src="landingImages\LogiPhoto1.jpg" alt="Логистика" />
    </div>
  </div>
  