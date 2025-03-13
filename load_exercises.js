 let exercises = [];
        let currentExerciseIndex = 0;
        let editor;

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

                document.getElementById("exercise-title").innerText = exercise.title;

                if (!editor) {
                    editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
                        mode: "javascript",
                        lineNumbers: true
                    });
                }
                
                editor.setValue(exercise.codeKoToRefactor);

                // Pasamos codeOkForExpect a token_functions.js
                getAIExpect(exercise.codeOkForExpect);
            }
        }
