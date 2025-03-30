[
    {
        "id": 1,
        "title": "Ejercicio 1: Variables y Tipos de Datos",
        "description": "Corrige el código para que asigne correctamente el valor a la variable y lo imprima.",
        "language": "Python",
        "codeKoToRefactor": "numero = 10\nprint(numero + texto)",
        "codeOkForExpect": "numero = 10\ntexto = 'es un número'\nprint(str(numero) + ' ' + texto)",
        "expectedConsoleOutput": "10 es un número",
        "errorSimulation": "Error: variable 'texto' no definida.",
        "successMessage": "¡Bien hecho! Ahora el código imprime correctamente la concatenación."
    },
    {
        "id": 2,
        "title": "Ejercicio 2: Estructuras Condicionales",
        "description": "Corrige el código para que evalúe correctamente si un número es positivo, negativo o cero.",
        "language": "Python",
        "codeKoToRefactor": "num = -5\nif num > 0:\nprint('Positivo')\nelif num < 0:\nprint('Negativo')\nelse:\nprint('Cero')",
        "codeOkForExpect": "num = -5\nif num > 0:\n    print('Positivo')\nelif num < 0:\n    print('Negativo')\nelse:\n    print('Cero')",
        "expectedConsoleOutput": "Negativo",
        "errorSimulation": "Error: Indentación incorrecta.",
        "successMessage": "¡Correcto! Has corregido la indentación en la estructura condicional."
    },
    {
        "id": 3,
        "title": "Ejercicio 3: Bucles 'for' y Listas",
        "description": "Corrige el código para que imprima cada elemento de la lista correctamente.",
        "language": "Python",
        "codeKoToRefactor": "numeros = [1, 2, 3, 4, 5]\nfor i in numeros:\nprint i",
        "codeOkForExpect": "numeros = [1, 2, 3, 4, 5]\nfor i in numeros:\n    print(i)",
        "expectedConsoleOutput": "1\n2\n3\n4\n5",
        "errorSimulation": "Error: Sintaxis incorrecta en print.",
        "successMessage": "¡Bien hecho! Ahora el bucle imprime correctamente los valores."
    },
    {
        "id": 4,
        "title": "Ejercicio 4: Funciones",
        "description": "Corrige el código para que la función devuelva la suma de dos números.",
        "language": "Python",
        "codeKoToRefactor": "def sumar(a, b):\n    print(a + b)\nresultado = sumar(3, 4)",
        "codeOkForExpect": "def sumar(a, b):\n    return a + b\nresultado = sumar(3, 4)\nprint(resultado)",
        "expectedConsoleOutput": "7",
        "errorSimulation": "Error: La función no retorna un valor.",
        "successMessage": "¡Correcto! Has modificado la función para que retorne la suma."
    },
    {
        "id": 5,
        "title": "Ejercicio 5: Diccionarios",
        "description": "Corrige el código para acceder correctamente a los valores del diccionario.",
        "language": "Python",
        "codeKoToRefactor": "persona = {nombre: 'Juan', edad: 25}\nprint(persona[nombre])",
        "codeOkForExpect": "persona = {'nombre': 'Juan', 'edad': 25}\nprint(persona['nombre'])",
        "expectedConsoleOutput": "Juan",
        "errorSimulation": "Error: Claves de diccionario mal definidas.",
        "successMessage": "¡Bien hecho! Ahora el diccionario funciona correctamente."
    },
    {
        "id": 6,
        "title": "Ejercicio 6: Listas y Métodos",
        "description": "Corrige el código para agregar un elemento a la lista correctamente.",
        "language": "Python",
        "codeKoToRefactor": "numeros = [1, 2, 3]\nnumeros + [4]\nprint(numeros)",
        "codeOkForExpect": "numeros = [1, 2, 3]\nnumeros.append(4)\nprint(numeros)",
        "expectedConsoleOutput": "[1, 2, 3, 4]",
        "errorSimulation": "Error: La lista no se modifica correctamente.",
        "successMessage": "¡Bien hecho! Ahora el elemento se agrega correctamente a la lista."
    },
    {
        "id": 7,
        "title": "Ejercicio 7: Manejo de Excepciones",
        "description": "Corrige el código para manejar correctamente una excepción de división por cero.",
        "language": "Python",
        "codeKoToRefactor": "a = 5\nb = 0\nprint(a / b)",
        "codeOkForExpect": "a = 5\nb = 0\ntry:\n    print(a / b)\nexcept ZeroDivisionError:\n    print('Error: División por cero no permitida.')",
        "expectedConsoleOutput": "Error: División por cero no permitida.",
        "errorSimulation": "Error: División por cero.",
        "successMessage": "¡Correcto! Ahora el código maneja la excepción adecuadamente."
    },
    {
        "id": 8,
        "title": "Ejercicio 8: Clases y Objetos",
        "description": "Corrige el código para definir e instanciar correctamente una clase.",
        "language": "Python",
        "codeKoToRefactor": "class Persona:\n    def __init__(self, nombre):\n        nombre = nombre\np = Persona('Ana')\nprint(p.nombre)",
        "codeOkForExpect": "class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre\np = Persona('Ana')\nprint(p.nombre)",
        "expectedConsoleOutput": "Ana",
        "errorSimulation": "Error: El atributo 'nombre' no se asigna correctamente.",
        "successMessage": "¡Bien hecho! Ahora la clase maneja correctamente los atributos."
    },
    {
        "id": 9,
        "title": "Ejercicio 9: Programación Funcional",
        "description": "Corrige el código para usar una función lambda correctamente.",
        "language": "Python",
        "codeKoToRefactor": "doble = lambda x: x * 2\nprint doble(5)",
        "codeOkForExpect": "doble = lambda x: x * 2\nprint(doble(5))",
        "expectedConsoleOutput": "10",
        "errorSimulation": "Error: Sintaxis incorrecta en print.",
        "successMessage": "¡Bien hecho! Has corregido la sintaxis de la función lambda."
    },
    {
        "id": 10,
        "title": "Ejercicio 10: Módulos y Librerías",
        "description": "Corrige el código para importar correctamente un módulo y usarlo.",
        "language": "Python",
        "codeKoToRefactor": "import math\nprint(math.sqrt(16)",
        "codeOkForExpect": "import math\nprint(math.sqrt(16))",
        "expectedConsoleOutput": "4.0",
        "errorSimulation": "Error: Paréntesis faltante en la llamada a la función.",
        "successMessage": "¡Correcto! Ahora el módulo se importa y usa adecuadamente."
    }
]
