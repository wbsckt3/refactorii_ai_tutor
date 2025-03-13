let exercises = [];
let currentExerciseIndex = 0;

async function loadExercises() {
   try {
      const response = await fetch("exercises.json");
      exercises = await response.json();
      loadExercise(0);
   } catch (error) {
      console.error("Error cargando ejercicios:", error);
   }
}

function loadExercise(index) {
    if (index >= 0 && index < exercises.length) {
       currentExerciseIndex = index;
       const exercise = exercises[index];

       // Actualizar título y descripción del ejercicio
       // Actualizar título y descripción del ejercicio 
       document.getElementById("h5_title").innerText = exercise.title;
       document.getElementById("challenge").innerText = exercise.description;
       document.getElementById("code-editor").value = exercise.codeKoToRefactor;

       // Variables adicionales para mensajes
       window.modal_click_message = exercise.modalClickMessage;
       window.error_message = exercise.errorMessage;
       window.success_message = exercise.successMessage;

       // Pasamos codeOkForExpect a token_functions.js
       getAIExpect(exercise.codeOkForExpect);
    }
}
