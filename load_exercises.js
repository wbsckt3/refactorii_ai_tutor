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

       //document.getElementById("exercise-title").innerText = exercise.title;
       document.getElementById("code-editor").value = exercise.codeKoToRefactor;

       // Pasamos codeOkForExpect a token_functions.js
       getAIExpect(exercise.codeOkForExpect);
    }
}
