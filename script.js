const juego=document.querySelector(".juego");
const menu=document.querySelector(".menu");
const nuevaPalabra=document.querySelector(".nuevaPalabra");
const iconaud=document.querySelector("#audIcon");
const iconmute=document.querySelector("#muteIcon");

const audioFondo = new Audio("Audios/fondo.mp3");
const musicwin = new Audio("./Audios/win.mp3");
audioFondo.play();
audioFondo.loop = true;
audioFondo.autoplay=true;
audioFondo.muted=false;
var teclas = document.querySelector(".teclas");
let tablero = document.getElementById("ahorcado").getContext("2d");
var letrasDOM = document.querySelector(".letras")

var palabras=["OLA","CUARTO","PELOTA","TORRE","FUERZA","FUERTE","CURA","HOMBRE","NOTA","LOCAL","VISTA","RANGO","HOTEL","MUJER","PAIS","PROGRAMA","RATON","USUARIO","CANCION","ONDA","ESPECIE","BORRACHO"];
var letrasPermitidas="QWERTYUIOPASDFGHJKLZXCVBNM";
var palabraSecreta="";
var palabraElejida="";
var palabrasUsadas=[];
var intentos=0;
var letrasEncontradas="";
var ganar=false;


//Selector de Palabras

function palabraAleatoria(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra
    return palabraSecreta
}
            
function palabraEscogida(){
    var contador=1;
                
    while(contador <= 1) {
        var palabraElejida = palabraAleatoria();
        var existe = false;
        for(var posicion = 0; posicion < palabras.length; posicion++) {
            if(palabrasUsadas[posicion] == palabraElejida){
                existe = true;
                break;
            }
        }
        if(existe == false) {
            palabrasUsadas.push(palabraElejida);
            contador++;
        }
    }
    return palabraElejida;
}

//DIbujo lineas

        function dibujarCanvas(){
            tablero.lineWidth = 8;
            tablero.lineCap = "round";
            tablero.lineJoin = "round";
            tablero.fillStyle = "#000000";
            tablero.strokeStyle = "#000000";
        }

        function dibujarLinea(){

            tablero.lineWidth = 6;
            tablero.lineCap = "round";
            tablero.lineJoin = "round";
            tablero.fillStyle = "#000000";
            tablero.strokeStyle = "#000000";

            let anchura = 300/palabraElejida.length;
            for (let i = 0; i < palabraElejida.length; i++){
                            
                tablero.moveTo(250 + (anchura*i), 60)
                tablero.lineTo(275 + (anchura*i), 60)
            }

            tablero.stroke();
            tablero.closePath();
        }

//Aparicion imgnes ahorcado
        

function generarDibujo(){
    intentos+=1;
    if(intentos<=6){
        let parteN =".img"+intentos;
        let parteBorrar=".img"+(intentos-1);
        document.querySelector(parteN).style.display="block";
        document.querySelector(parteBorrar).style.display="none";         
    }
            
}

//Alertas al terminar el juego.

function alertar(numeroDeMensaje){
    if(numeroDeMensaje==1){
        alert("Lo Siento Perdiste! \nLa palabra era: "+palabraElejida+"\nFin del juego!");
    }
    if(numeroDeMensaje==2){
        alert("Muy Bien Ganaste!\nFin del juego!");
    }
    if(numeroDeMensaje==3){
        alert("¡Palabra agregada exitosamente!");
    }
                
    if(numeroDeMensaje==4){
        alert("No es posible guardar en blanco, repeticiones, números o caracteres especiales incluido Ñ");
    }
}   
            
//Funcionalidad del juego
//Mostrar las letras que se aciertan.

function mostrarLetraAcertada(keyValue) {

if(!letrasEncontradas.includes(keyValue)){
    letrasEncontradas += keyValue;
    repaudioCheck();
}

for(let i = 0; i <palabraElejida.length;i++){
    if(palabraElejida[i] == keyValue){
        let aux = "#l"+i;
        let extracto = document.querySelector(aux);
        extracto.innerHTML = keyValue;
    }
}
}

//Sombrear las teclas seleccionadas en el teclado virtual. 
function pintar(boton) {
    let datoBoton = boton.innerHTML;
    if(intentos<6 && !ganar){
        if(!palabraElejida.includes(datoBoton)){
            boton.style.background="#cf1500";
        }else{
            boton.style.background="#8f9044";
        }
        funcionalidad(datoBoton);
    }
}

//Al finalizar el juego
function finDelJuego() {
    if(comprobarTodasLasLetras(letrasEncontradas,palabraElejida)){
        ganar=true;
        ganaste();
    }
}

function ganaste(){
    document.querySelector(".img0").style.display="none";
    document.querySelector(".img1").style.display="none";   
    document.querySelector(".img2").style.display="none"; 
    document.querySelector(".img3").style.display="none"; 
    document.querySelector(".img4").style.display="none";
    document.querySelector(".img5").style.display="none";  
    document.querySelector(".img7").style.display="block";
    musicwin.play();
    audioFondo.pause();
    ganar=false;

}

function limpiar(){
    document.querySelector(".img0").style.display="none";
    document.querySelector(".img1").style.display="none";   
    document.querySelector(".img2").style.display="none"; 
    document.querySelector(".img3").style.display="none"; 
    document.querySelector(".img4").style.display="none";
    document.querySelector(".img5").style.display="none";  
    document.querySelector(".img6").style.display="none";
    document.querySelector(".img7").style.display="none";
    musicwin.pause();  

}

function comprobarTodasLasLetras(l,palabra){
    for(let i = 0; i <palabra.length;i++){
        if(!l.includes(palabra[i])){
            return false;
        }
    }
    return true;
}
             

//Accion al presionar teclas en el teclado.

            
var listener = function (event){              
    let keyValue = event.key.toUpperCase();               
    emparejar(keyValue);           
}

    function funcionalidad(letra){
        if(!letrasPermitidas.includes(letra)){
            return;
        }else{
            if(intentos>6 || ganar){
                return;
            }
            if(!palabraElejida.includes(letra) && !document.querySelector(".incorreto").innerHTML.includes(letra)){
                if(intentos<=6){
                    agregarLetraIncorrecta(letra);
                    generarDibujo();
                    repaudioFondo();
                    document.getElementById('intentosRestantes').innerHTML='Intentos Restantes: '+(6-intentos);
                }
                if(intentos==6){
                    alertar(1);
                    repaudioQueja();
                }
                return;
            }
            mostrarLetraAcertada(letra);
            finDelJuego();
        }
    }

    function generarLetrasDOM(){
        let aux = "";
        for(let i=0; i<palabraElejida.length; i++){
            aux += '<li class="letra" ><p id="l'+i+'"></p><div class="lineaLetra"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="4" viewBox="0 0 80 4" fill="none"><rect width="80" height="4" rx="2" fill="#000000"/></svg></div></li> ';
        }
        letrasDOM.innerHTML=aux;
    }

    function emparejar(letra) {
        let boton = document.getElementById("tecla"+letra);
        pintar(boton);
    }

    function agregarLetraIncorrecta(keyValue){
        let letrasIncorretas = document.querySelector(".incorreto")
        letrasIncorretas.innerHTML += keyValue;
        repaudioError();
    }

    function limpiarLetraIncorrecta(intentos){
        let letrasIncorretas = document.querySelector(".incorreto")
        letrasIncorretas.innerHTML= "Incorrectas: ";
        document.getElementById('intentosRestantes').innerHTML='Intentos Restantes: '+(6-intentos);
    }

    function mostrarTeclado(){
        for(let i = 0; i <letrasPermitidas.length;i++){
                teclas.innerHTML += '<button onclick="pintar(this)" class="tecla" id="tecla'+letrasPermitidas[i]+'">'+letrasPermitidas[i]+'</button>';
        }
    }

    //Iniciar el Juego

    function iniciarJuego(){
        menu.style.display="none";
        juego.style.display="block";
        document.getElementById('intentosRestantes').innerHTML='Intentos Restantes: '+(6-intentos);
        dibujarCanvas()
        dibujarLinea();
        document.querySelector(".img0").style.display="block";
        teclas.innerHTML="";
        mostrarTeclado();
        palabraElejida=palabraEscogida()
        generarLetrasDOM();
        document.addEventListener('keydown', listener);
    }

    function btnRepetir(){
        limpiar();
        intentos=0;
        letrasEncontradas="";
        limpiarLetraIncorrecta(intentos);
        dibujarCanvas();
        dibujarLinea();
        document.querySelector(".img0").style.display="block";
        teclas.innerHTML="";
        mostrarTeclado();
        palabraElejida=palabraEscogida()
        generarLetrasDOM();
        document.addEventListener('keydown', listener);
        repaudioFondo();
    }
            
    function irMenu(){
        intentos=0;
        limpiar();
        limpiarLetraIncorrecta(intentos);
        juego.style.display="none";
        menu.style.display="block";
        
    }

    //Agregar Palabra Nueva

    function agregarPalabra(){
        nuevaPalabra.style.display = "block";
      }
      
    function btnCancelar(){
        nuevaPalabra.style.display = "none";
    }

    async function btnGuardar(){
        let a = document.querySelector("#addPalabra").value;
        a = a.toUpperCase();
        if(a != "" && !palabras.includes(a) && comprobarTodasLasLetras(letrasPermitidas,a) && comprobarPalabra(a)){
            palabras.push(a);
            alertar(3);
            nuevaPalabra.style.display = "none";
            await sleep(1700);
            iniciarJuego();
        }else{
            alertar(4);
        }
    }

    function comprobarPalabra(palabraNueva){
        for(i=0;i<=palabras.length;i++){
            if(palabraNueva==palabras[i]){
                return false;
            }
        }
        return true;
    }

    //Audios

    let repaudioQueja = () => {
        const music = new Audio("./Audios/queja.mp3");
        music.play();
      }

      let repaudioCheck = () => {
        const music = new Audio("./Audios/check.mp3");
        music.play();
      }

      let repaudioError = () => {
        const music = new Audio("./Audios/error.mp3");
        music.play();
      }

      let repaudioFondo = () => {
        audioFondo.play();
      }

      let muteOn = () => {
        audioFondo.pause();
        audioFondo.muted=true;
        musicwin.pause();
        iconaud.style.display="none";
        iconmute.style.display="block";
      }
    
      let muteOff = () => {
        audioFondo.play();
        audioFondo.muted=false;
        iconaud.style.display="block";
        iconmute.style.display="none";
      }
    
    

