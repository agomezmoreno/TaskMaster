<script setup>
</script>

<template>
  <!-- contenedor principal de la landing -->
  <div class="landing">
    <!-- seccion del hero con la presentacion -->
    <section class="hero">
      <!-- contenido principal -->
      <div class="hero-content">
        <h1>TaskMaster</h1>
        <p>Organiza tu vida, simplifica tus tareas</p>
        <!-- boton para comenzar que te lleva a los recordatorios -->
        <router-link to="/recordatorios" class="cta-button">Comenzar</router-link>
      </div>
      <!-- forma decorativa del hero -->
      <div class="hero-shape"></div>
    </section>

    <!-- seccion de caracteristicas principales -->
    <section class="features">
      <!-- tarjetas con las caracteristicas -->
      <div class="feature-card">
        <div class="feature-icon">📝</div>
        <h3>Gestión Simple</h3>
        <p>Organiza tus tareas de manera intuitiva</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Prioridades</h3>
        <p>Establece niveles de importancia</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⏰</div>
        <h3>Recordatorios</h3>
        <p>Nunca olvides una tarea importante</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
    min-height: 100vh;
    background: #2a2a2a;
    color: white;
}

.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.hero-content {
    text-align: center;
    animation: fadeIn 0.5s ease forwards;
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

.hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #4ecdc4;
}

.hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: white;
}

.cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    text-decoration: none;
    color: white;
    background: #4ecdc4;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.cta-button:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;
    background: #1f1f1f;
}

.feature-card {
    background: #2a2a2a;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero p {
        font-size: 1.2rem;
    }
    
    .features {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
    }
}
</style>