// Obtener el parámetro `token` de la URL
const token = urlParams.get('token');
if (token) {
	    // Realiza una solicitud al servicio externo para validar el token
	    fetch(`https://www.refactorii.com/validate-token?token=${token}`)
	    .then(response => response.json())
	    .then(data => {
	        if (data.valid) {
	            console.log("data retornada del back: " + data.valid);
	             // Decodifica el token para obtener el payload
                     const decodedToken = decodeJwtResponse(token);
         	     const recipeId = decodedToken._id; // Asegúrate de usar el nombre correcto del campo en el payload
                     console.log('Recipe ID:', recipeId);
		     // Almacenar recipeId en local storage
                     localStorage.setItem('recipeId', recipeId);
	             // Llama a la función de prueba
	             test_cases_scenario();

                     // Mostrar el número de solicitudes restantes
            	     document.getElementById('remaining-requests').innerText = `Remaining AI requests: ${data.remainingRequests}`;
            	     // Si tiene solicitudes restantes, habilitar el botón
                     if (data.remainingRequests > 0) {
			const sendResponseButton = document.getElementById('ai-assistance');
			sendResponseButton.classList.add('enabled');
                     } else {
                        const sendResponseButton = document.getElementById('ai-assistance');
			sendResponseButton.classList.add('disabled');
                     }
			
	        } else {
	            console.log(data.valid);
	            document.body.innerHTML = 'Access denied. Invalid token.';
	        }
	    }).catch(error => {
	        document.body.innerHTML = 'Error validating token.';
	        console.error('Error:', error);
	    });
} else {
	    document.body.innerHTML = 'Access denied. No token provided.';
}

function decodeJwtResponse(token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	    return JSON.parse(jsonPayload);
}

// Obtener el botón de ai-assistance
const runButton = document.getElementById('ai-assistance');	     
async function fetchAIResponse() {
      // Obtén el código del textarea
      const code = document.getElementById('code-editor').value;
      // Obtén el mensaje de desafío
      const challenge = document.getElementById('challenge').textContent;
      const apiKey = 'a6bf17214c0744a0bb984614d4bc26d0'; // Reemplaza con tu clave API real
      const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`  // Incluye tu API key
        },
        body: JSON.stringify({
          model: 'gpt-4o',  // El modelo que estás usando
          messages: [
            {
              role: 'system',
              content: 'You are a JavaScript expert. You will review code provided by the user, correct any errors, and explain how it works.'
            },
            {
              role: 'user',
              content: `Here is my JavaScript code:\n\n${code}\n\nI used this code to solve this challenge: ${challenge}`
            }
          ]
        })
      });
      // Procesa la respuesta
      const data = await response.json();
      // Extraer solo el mensaje del assistant
      document.getElementById('challenge').textContent = data.choices[0].message.content;
}

// Al presionar el botón "AI Assistance"
document.getElementById('ai-assistance').addEventListener('click', () => {
	    fetch('https://www.refactorii.com/ai-assistance', {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({ token })
	    })
	    .then(response => response.json())
	    .then(data => {
	        if (data.success) {
	            console.log('AI assistance provided:', data.message);
	            document.getElementById('remaining-requests').innerText = `Remaining AI requests: ${data.remainingRequests}`;
	            // Actualizar la interfaz para reflejar las solicitudes restantes
	            if (data.remainingRequests <= 0) {
			const sendResponseButton = document.getElementById('ai-assistance');
	                document.getElementById('ai-assistance').disabled = false;
	            }
		    fetchAIResponse(); // Ejecutar la función de AI	
	        } else {
	            console.log('Error:', data.message);
	            const sendResponseButton = document.getElementById('ai-assistance'); // Deshabilitar el botón si ya no puede hacer más solicitudes
	            document.getElementById('ai-assistance').disabled = true;
		}
	    })
	    .catch(error => {
	        console.error('Error:', error);
	    });
});

async function guardarResultados() {
	    const formData = JSON.parse(localStorage.getItem("formData"));
	    const email = formData ? formData.Email : null;
            const recipeId = localStorage.getItem('recipeId'); // Recuperar recipeId de local storage
	    // Crear el objeto que se guardará en la base de datos
	    // Obtener la URL actual
	    const currentUrl = window.location.href;
	    // Crear un objeto URL
	    const url = new URL(currentUrl);
	    // Eliminar el parámetro 'token' de la query string
	    url.searchParams.delete('token');
	    // Obtener el pathname sin el token
            const urlWithoutToken = url.pathname.split('/').pop();
	    const recipeCalificadaOk = {
	        recipeId: recipeId,
		url: urlWithoutToken,
	        date: new Date().toISOString()
	    };
	    try {
	        const response = await fetch('https://www.refactorii.com/updateOneGoogleSigninUserRecipe', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            //body: JSON.stringify({ Email: email, recipeCalificadaOk: recipeId })
		    body: JSON.stringify({ Email: email, recipeCalificadaOk })	
	        });
	        const data = await response.json();
	        console.log('Server responds:', "Ok");
		// Redirección a la página original
                window.location.href = `https://www.refactorii.com/recipes/${recipeId}`;
	    } catch (error) {
	        console.error('Error sending the results to the server:', error);
	    }
}
