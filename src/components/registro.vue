<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const auth = useFirebaseAuth();

// variables para guardar los datos del form
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

// funcion para registrar al usuario nuevo
function Registrarse() {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // si el email es admin@admin.com le damos permisos especiales
            const isAdmin = userCredential.user.email === "admin@admin.com";
            localStorage.setItem('isAdmin', isAdmin);
            router.push('/recordatorios');
            console.log("Registro correcto");
        })
        .catch((e) => {
            // si hay error lo mostramos
            error.value = 'Error en el registro: ' + e.message;
            console.log('Failed register', e);
        });
}
</script>

<template>
    <!-- contenedor principal del registro -->
    <div class="registro-container">
        <!-- formulario para meter los datos -->
        <div class="form-container">
            <h2>Registro</h2>
            <!-- inputs para email y passwords -->
            <input type="email" v-model="email" placeholder="Email" class="input-field"/>
            <input type="password" v-model="password" placeholder="Contraseña" class="input-field"/>
            <input type="password" v-model="confirmPassword" placeholder="Confirmar Contraseña" class="input-field"/>
            
            <!-- mensaje de error si algo sale mal -->
            <p v-if="error" class="error-message">{{ error }}</p>
            <!-- boton para registrarse -->
            <button @click="Registrarse" class="btn btn-login">Registrarse</button>
        </div>
    </div>
</template>

<style scoped>
.registro-container {
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

.btn-login {
    background: white;
    color: black;
}

.btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.error-message {
    color: #ff6b6b;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

@media (max-width: 768px) {
    .registro-container {
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