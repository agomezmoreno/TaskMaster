<script setup>
import { ref, computed } from 'vue';
const props = defineProps(["titulo", "prioridad", "tiempo", "acabada"]);
const emit = defineEmits(["borrado", "actualizarPrioridad", "actualizarAcabada"]);

// variables para controlar la tarea
const prioridad = ref(props.prioridad);
const estaAcabada = ref(props.acabada);

// calcula el tiempo que hace que se creo la tarea
const tiempoRelativo = computed(() => {
    // guardamos la fecha
    let fechaTarea = props.tiempo.toDate();
  
    // calculamos cuanto tiempo ha pasado
    const ahora = new Date();
    const segundos = Math.floor((ahora - fechaTarea) / 1000);

    // le damos formato
    if (segundos < 60) return `hace ${segundos} segundos`;
    if (segundos < 3600) return `hace ${Math.floor(segundos / 60)} minutos`;
    if (segundos < 86400) return `hace ${Math.floor(segundos / 3600)} horas`;
    return `hace ${Math.floor(segundos / 86400)} días`;
});

// para cambiar la prioridac cuando le das al boton
const cambiarPrioridad = (nuevaPrioridad) => {
    prioridad.value = nuevaPrioridad;
    emit("actualizarPrioridad", nuevaPrioridad); 
};

// para marcar cuando la tarea esta acabada
const acabarTarea = () => {
    estaAcabada.value = !estaAcabada.value;
    emit("actualizarAcabada", estaAcabada.value);
};
</script>

<template>
    <!-- esto es el contenedor de la tarea -->
    <div :class="{ 'tarea-acabada': estaAcabada }" class="tarea slide-in">
        <!-- titulo y checkbox -->
        <h1>
            <input 
                type="checkbox" 
                :checked="estaAcabada"
                @change="acabarTarea"
            > 
            <span :class="{ 'texto-tachado': estaAcabada }">{{ titulo }}</span>
        </h1>
        
        <!-- botones de priorida y demas -->
        <div class="botones-prioridad">
            <button @click="cambiarPrioridad('Alta')" :class="{ 'rojo': prioridad === 'Alta' }">Alta</button>
            <button @click="cambiarPrioridad('Media')" :class="{ 'naranja': prioridad === 'Media' }">Media</button>
            <button @click="cambiarPrioridad('Baja')" :class="{ 'verde': prioridad === 'Baja' }">Baja</button>

            <!-- tiempo y boton para borrar -->
            <span class="tiempo">Añadido {{ tiempoRelativo }}</span>
            <span class="right">
                <button class="borrar" @click="emit('borrado')">Eliminar</button>
            </span>
        </div>
    </div>
</template>

<style scoped>
.tarea {
    background: #2a2a2a;
    padding: 15px;
    margin: 0 auto;
    max-width: 1000px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    border-bottom: 1px solid #3a3a3a;
    animation: entradaTarea 0.5s ease;
}

@keyframes entradaTarea {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}


h1 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.texto-tachado {
    text-decoration: line-through;
    color: #4ecdc4;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.botones-prioridad {
    display: flex;
    align-items: center;
    gap: 10px;
}

button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.rojo { background: #ff4444; color: white; }
.naranja { background: #ffa000; color: white; }
.verde { background: #00c853; color: white; }

.tiempo {
    color: #888;
    margin-left: auto;
}

.borrar {
    background: #ff4444;
    color: white;
}

button:hover {
    opacity: 0.9;
}

@media (max-width: 768px) {
    .botones-prioridad {
        flex-wrap: wrap;
    }
    
    button {
        flex: 1;
        text-align: center;
    }
    
    h1 {
        font-size: 1.2rem;
    }
}
</style>
