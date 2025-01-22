<script setup>
  defineProps(["ntareaspendientes", "totalTareas"]);
  const emit = defineEmits(["borradoTodasLasTareas"]);
</script>

<template>
  <!-- contenedor principal del resumen -->
  <div class="resumen-container">
    <!-- estadisticas de tareas -->
    <div class="stats">
      <!-- numero de tareas pendientes -->
      <span class="pending">{{ ntareaspendientes }}</span> tareas pendientes 
      <span class="divider">de un total de</span>
      <!-- total de tareas -->
      <span class="total">{{ totalTareas }}</span>
    </div>
    <!-- boton para borrar todas las tareas -->
    <button @click="emit('borradoTodasLasTareas')" class="delete-all">
      <span class="icon">x</span>Borrar todas las tareas
    </button>
  </div>
</template>

<style scoped>
.resumen-container {
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 15px auto;
    color: white;
    max-width: 1000px;
    border-top: 1px solid #3a3a3a;
    border-bottom: 1px solid #3a3a3a;
}


.stats {
    font-size: 16px;
}

.pending {
    color: #4ecdc4;
    font-size: 20px;
    font-weight: bold;
}

.total {
    color: #ff4444;
    font-size: 20px;
    font-weight: bold;
}

.divider {
    margin: 0 8px;
    opacity: 0.7;
}

.delete-all {
    background: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.delete-all:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.icon {
    font-size: 18px;
    font-weight: bold;
}

@media (max-width: 768px) {
    .resumen-container {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .stats {
        margin-bottom: 10px;
    }
}
</style>