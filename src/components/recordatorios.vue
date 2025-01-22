<script setup>
import { computed } from 'vue';
import Tarea from './Tarea.vue';
import Cabecera from './Cabecera.vue';
import ResumenTareas from './ResumenTareas.vue';
import Pie from './Pie.vue';
import { useCollection, useFirestore } from 'vuefire';
import { collection, addDoc, doc, deleteDoc,updateDoc, Timestamp, where, orderBy, query  } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// iniciamos la conexion con firebase
const db = useFirestore();
const auth = getAuth();
const user = auth.currentUser;

// variable que coge si es admin del localstorage
const isAdmin = localStorage.getItem('isAdmin') === 'true';

// si es admin ve todas las tareas, si no solo las suyas
let listaRecordatorios;
if (isAdmin) {
    listaRecordatorios = useCollection(query(collection(db, 'recordatorios'), orderBy('fechaCreacion')));
} else {
    listaRecordatorios = useCollection(query(collection(db, 'recordatorios'), where("idUsuario", "==", user.uid), orderBy('fechaCreacion')));
}

// funcion para crear una nota nueva
function altaNuevaNota(texto) {
  if (user) {
    let nuevoRecordatorio = {
      nombre: texto,
      fechaCreacion: Timestamp.now(),
      acabada: false,
      prioridad: "Alta",
      idUsuario: user.uid
    };

    // metemos la nota en firebase
    addDoc(collection(db, "recordatorios"), nuevoRecordatorio).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((e) => {
      console.error("Error: ", e);
    });

  } else {
    console.error("El usuario no se ha registrado."); 
  }
}

// funcion para borrar una tarea
function borrarTarea(pos) {
  const tarea = listaRecordatorios.value[pos];
  const tareaRef = doc(db, "recordatorios", tarea.id); 
  deleteDoc(tareaRef)
    .then(() => {
      console.log("Tarea eliminada correctamente");
    })
    .catch((e) => {
      console.error("Error: ", e);
    });
}

// funcion para cambiar la prioridad de una tarea
function actualizarPrioridad(id, nuevaPrioridad) {
  const tareaRef = doc(db, "recordatorios", id);
  
  updateDoc(tareaRef, { prioridad: nuevaPrioridad })
    .then(() => console.log("Prioridad actualizada correctamente"))
    .catch((error) => console.error("Error al actualizar prioridad:", error));
}

// calculamos cuantas tareas quedan por hacer
const ntareaspendientes = computed(() => {
  return listaRecordatorios.value.filter((i) => !i.acabada).length;
});

// calculamos el total de tareas
const totalTareas = computed(() => {
  return listaRecordatorios.value.length;
});

// funcion para borrar todas las tareas de golpe
function borrarTodasLasTareas() {
  listaRecordatorios.value.forEach((tarea) => {
    const tareaRef = doc(db, "recordatorios", tarea.id);
    deleteDoc(tareaRef)
      .then(() => {
        console.log("Tarea eliminada correctamente");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
}

// funcion para marcar una tarea como acabada o no
function acabadaTarea(id, acabada) {
  const tareaRef = doc(db, "recordatorios", id);
  updateDoc(tareaRef, { acabada: acabada })
    .then(() => console.log("Estado actualizado correctamente"))
    .catch((error) => console.error("Error al actualizar estado:", error));
}
</script>

<template>
  <!-- cabecera con el input para meter tareas nuevas -->
  <Cabecera @altaRecordatorio="altaNuevaNota" />
  <!-- resumen de cuantas tareas hay y boton para borrarlas todas -->
  <ResumenTareas :ntareaspendientes="ntareaspendientes" :totalTareas="totalTareas" @borradoTodasLasTareas="borrarTodasLasTareas"/>
  <div>
    <!-- aqui van todas las tareas -->
    <Tarea 
      v-for="(tarea, indice) in listaRecordatorios" 
      :titulo="tarea.nombre"
      :prioridad="tarea.prioridad"
      :tiempo="tarea.fechaCreacion"
      :acabada="tarea.acabada"
      @borrado="borrarTarea(indice)"
      @actualizarPrioridad="(nuevaPrioridad) => actualizarPrioridad(tarea.id, nuevaPrioridad)"
      @actualizarAcabada="(acabada) => acabadaTarea(tarea.id, acabada)"
    />
  </div>
  <!-- footer de la app -->
  <Pie></Pie>
</template>

<style scoped></style>