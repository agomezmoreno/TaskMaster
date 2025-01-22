<script setup></script>
<template>
    <footer class="footer">
        <p class="author">Desarrollado por Álvaro Gómez Moreno</p>
        <p class="github">Código disponible en <a href="https://github.com/agomezmoreno/Recordatorios" target="_blank">Github</a></p>
    </footer>
</template>

<style scoped>
.footer {
    padding: 20px;
    text-align: center;
    color: white;
    margin-top: 20px;
}

.author {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: white;
    font-weight: bold;
}

.github {
    color: #888;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.github a {
    color: #4ecdc4;
    text-decoration: none;
}

.github:hover {
    opacity: 0.9;
}

@media (max-width: 768px) {
    .footer {
        padding: 15px;
        margin-top: 15px;
    }
    
    .author {
        font-size: 1rem;
    }
}
</style>