// ==========================================
// 1. INICIALIZAR REVEAL.JS
// ==========================================
Reveal.initialize({
    hash: true,
    transition: 'fade', 
    controls: true,
    progress: true,
    center: true
});

// ==========================================
// 2. CÓDIGO MATRIX (Versión 1010)
// ==========================================

// Aseguramos que apunte a "matrixCanvas" para que coincida con tu HTML
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let color = "#0f0";
let tamaFuente = 22;
let cantColumnas = canvas.width / tamaFuente;
let gotas = [];
let estaLloviendo = true;    
let velocidadCaida = 70;
let intervalId;
let caracteres = "1010";

// FUNCIÓN 1: PREPARAR EL TABLERO
function IniciarCaidaGotas() {
    // recalculamos las columnas por si cambió el tamaño de la pantalla
    cantColumnas = canvas.width / tamaFuente; 
    
    gotas = [];
    for (let i = 0; i < Math.ceil(cantColumnas); i++) {
        // Valores negativos para que entren desordenadas desde arriba
        gotas[i] = Math.random() * -100; 
    }
}

// Llamamos a la función para configurar todo al principio
IniciarCaidaGotas();

// FUNCIÓN 2: DIBUJAR
function animacionCaidaCaracteres() {
    // Pinta el fondo negro transparente (efecto estela)
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configura el texto verde
    ctx.fillStyle = color;
    ctx.font = tamaFuente + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        let caracter = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        
        // Coordenada X = La columna actual * el ancho de la letra
        let coordenadaX = i * tamaFuente;
        // Coordenada Y = La fila en la que va la gota * el alto de la letra
        let coordenadaY = gotas[i] * tamaFuente;
        
        ctx.fillText(caracter, coordenadaX, coordenadaY);
        
        // Si la gota llegó al suelo Y el azar lo decide, vuelve al techo (0)
        if (coordenadaY > canvas.height && Math.random() > 0.975) { 
            gotas[i] = 0; 
        }
        
        // Mueve la gota una fila hacia abajo
        gotas[i]++;
    }
}

// FUNCIÓN 3: INICIAR
function iniciarLluvia() {
    if(intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (estaLloviendo) animacionCaidaCaracteres();
    }, velocidadCaida); 
}

iniciarLluvia();

// EVENTO: SI CAMBIA EL TAMAÑO DE PANTALLA
window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    IniciarCaidaGotas(); 
});