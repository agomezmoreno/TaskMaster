<script setup>
import { GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const auth = useFirebaseAuth();
const googleAuthProvider = new GoogleAuthProvider();

// variables para guardar el email y la password
const email = ref('');
const password = ref('');

// funcion para iniciar sesion con email y pass
function IniciarSesionConUserYPass() {
    signInWithEmailAndPassword(auth, email.value, password.value).then(
        (userCredential)=> {
            // si el email es admin@admin.com le damos permisos de admin
            const isAdmin = userCredential.user.email === "admin@admin.com";
            localStorage.setItem('isAdmin', isAdmin);
            router.push('/recordatorios');
            console.log("Validacion correcta");
        }
    ).catch((e) => {
        console.log('Failed sign', e);
    });
}

// lo mismo pero con google
function IniciarSesionConGoogle() {
    signInWithPopup(auth, googleAuthProvider).then(
        (userCredential)=> {
            const isAdmin = userCredential.user.email === "admin@admin.com";
            localStorage.setItem('isAdmin', isAdmin);
            router.push('/recordatorios');
            console.log("Validacion correcta");
        }
    ).catch((e) => {
        console.log('Failed sign', e);
    });
}
</script>

<template>
    <!-- contenedor principal del login -->
    <div class="login-container">
        <!-- formulario pa meter email y pass -->
        <div class="form-container">
            <h2>Iniciar Sesión</h2>
            <input type="email" v-model="email" placeholder="Email" class="input-field"/>
            <input type="password" v-model="password" placeholder="Contraseña" class="input-field"/>
            <button @click="IniciarSesionConUserYPass" class="btn btn-login">Iniciar Sesión</button>
        </div>

        <!-- separador entre los dos metodos -->
        <div class="divider">o</div>
        <!-- boton para iniciar con google -->
        <button @click="IniciarSesionConGoogle" class="btn btn-google">Iniciar con Google</button>
    </div>
</template>


<style scoped>
.login-container {
    max-width: 400px;
    width: 90%;
    padding: 2rem;
    background: #2a2a2a;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

h2 {
    color: white;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.input-field {
    width: 100%;
    padding: 12px;
    background: #3a3a3a;
    border: 1px solid #4a4a4a;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
}

.input-field:focus {
    outline: none;
    border-color: #4ecdc4;
}

.btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.primary-btn {
    background: #4ecdc4;
    color: white;
}

.google-btn {
    background: #4285f4;
    color: white;
}

.btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.divider {
    text-align: center;
    color: #888;
    margin: 1rem 0;
    position: relative;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #4a4a4a;
}

.divider::before { left: 0; }
.divider::after { right: 0; }

@media (max-width: 768px) {
    .login-container {
        margin: 80px auto 0;
        padding: 1.5rem;
        width: 90%;
    }
    
    h2 {
        font-size: 1.25rem;
    }
    
    .btn {
        padding: 10px;
    }
}
</style>