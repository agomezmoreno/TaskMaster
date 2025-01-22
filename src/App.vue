<script setup>
import { useRouter } from 'vue-router';
import { getCurrentUser, useCurrentUser } from 'vuefire';
import CerrarSesion from './components/cerrarSesion.vue';

const router = useRouter();
const user = useCurrentUser();

// comprueba si el usuario puede ver la pagina
// si no esta logueado lo mandamos para el login
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { path: '/login' }
    }
  }
  return true;
});
</script>

<template>
  <!-- barra de navegacion -->
  <nav class="navbar">
    <div class="nav-blur"></div>
    <div class="nav-container">
      <!-- logo de la app que te lleva al inicio -->
      <router-link to="/" class="nav-logo">
        <span class="logo-text">TaskMaster</span>
      </router-link>
      <!-- links para navegar por la app -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/recordatorios" class="nav-link">Recordatorios</router-link>
        <!-- si no hay usuario mostramos botones de login y registro -->
        <template v-if="!user">
          <div class="auth-buttons">
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/registro" class="nav-link">Registro</router-link>
          </div>
        </template>
        <!-- si hay usuario mostramos el boton de cerrar sesion -->
        <CerrarSesion v-else />
      </div>
    </div>
  </nav>
  <!-- aqui va el contenido principal de la app -->
  <div class="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #2a2a2a;
  border-bottom: 1px solid #3a3a3a;
}

.main-content {
  margin-top: 80px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  text-decoration: none;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  background: #3a3a3a;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #4ecdc4;
  transform: translateY(-2px);
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: center;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
}
</style>