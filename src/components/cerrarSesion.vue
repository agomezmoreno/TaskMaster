<script setup>
// importamos las funciones necesarias para cerrar sesión y manejar la autenticación
import { signOut } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';

// creamos el router para navegar entre páginas
const router = useRouter();
// obtenemos la instancia de autenticación de Firebase
const auth = useFirebaseAuth();
// nos da info del usuario actual
const user = useCurrentUser();

// función para cerrar la sesión del usuario
// cuando se cierra sesión, volvemos a la página principal
// y eliminamos de localStorage la variable isAdmin
function CerrarSesion() {
    signOut(auth).then(() => {
        router.push('/');
        localStorage.removeItem('isAdmin');
        console.log("Sesión cerrada");
    }).catch((e) => console.log('error: ' + e));
}
</script>

<template>
    <!-- solo mostramos esto si hay un usuario logueado -->
    <div v-if="user" class="user-container">
        <!-- muestra el nombre del usuario o su email si no tiene nombre -->
        <p class="welcome-text">Hola {{ user.displayName || user.email }}</p>
        <!-- boton que ejecuta la función de cerrar sesión -->
        <button @click="CerrarSesion" class="btn btn-logout">Cerrar Sesión</button>
    </div>
</template>

<style scoped>
.user-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.welcome-text {
    color: white;
    font-weight: 600;
    margin: 0;
}

.btn-logout {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #ff4444;
    color: white;
}

.btn-logout:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.btn-logout:active {
    transform: translateY(0);
}

@media (max-width: 768px) {
    .user-container {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>