<script setup>
import { ref } from 'vue';

const emit = defineEmits(["altaRecordatorio"]);
const textoNuevaNota = ref("");
const notas = ref([]);

function altaNuevaNota() {
    emit("altaRecordatorio", textoNuevaNota.value);
    notas.value.push(textoNuevaNota.value);
    textoNuevaNota.value = "";
}

</script>

<template>
    <div class="header">
        <h1 class="title">Proyecto Vue.js - Álvaro Gómez Moreno</h1>
        <div class="input-container">
            <input type="text" v-model="textoNuevaNota" placeholder="Añade una nueva nota..." @keyup.enter="altaNuevaNota()" class="task-input" >
            <span class="input-border"></span>
        </div>
    </div>
</template>

<style scoped>
.header {
    padding: 20px;
    text-align: center; 
    border-radius: 8px;
    margin: 100px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 30px;
    color: white;
    text-align: left; 
    width: 100%; 
    max-width: 1000px; 
}

.input-container {
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: center;
}
    
.task-input {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    border: 1px solid #4a4a4a;
    border-radius: 4px;
    background: white;
    color: black;
    transition: all 0.3s ease;
}

.task-input::placeholder {
    color: #888;
}

.task-input:focus {
    outline: none;
    border-color: #4ecdc4;
}

@media (max-width: 768px) {
    .header {
        padding: 15px;
    }

    .title {
        font-size: 1.5rem;
    }

    .task-input {
        padding: 10px 15px;
    }
}
</style>

