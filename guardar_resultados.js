async function guardarResultados() {

  const recipeId = localStorage.getItem("recipeId");
  const userEmail = localStorage.getItem("email");
  if (!recipeId) {
    console.error("No recipeId found in localStorage");
    return;
  }

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  url.searchParams.delete("token");
  const urlWithoutToken = url.pathname.split("/").pop();

  const bodyToSend = {
    Email: userEmail,
    recipeId: recipeId,
    urlCalificada: urlWithoutToken,
    date: new Date().toISOString(),
  };

  try {
    const response = await fetch(
      "https://www.refactorii.com/updateOneGoogleSigninUserRecipe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
      }
    );
    const data = await response.json();
    console.log("Server responds:", data);

    // Redirigir a la receta
    window.location.href = `https://www.refactorii.com/recipes/${recipeId}`;
  } catch (error) {
    console.error("Error sending the results to the server:", error);
  }
  
} 
