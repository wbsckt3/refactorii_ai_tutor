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
       document.getElementById("h5_title").innerText = exercise.title;
       document.getElementById("challenge").innerText = exercise.description;
       document.getElementById("code-editor").value = exercise.codeKoToRefactor;

       // Pasamos codeOkForExpect a token_functions.js
       getAIExpect(exercise.codeOkForExpect);
    }
}
