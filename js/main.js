// Objetos de cada personaje
// Images powered by Gema!!!

const arrayPersonajes = [
{
    // DISNEY
// nombre: "Anna",
// ruta: "img/DisneyGema/Anna.png"
// },
// {
// nombre: "Campanilla",
// ruta: "img/DisneyGema/Campanilla.png"
// },
// {
// nombre: "Cenicienta",
// ruta: "img/DisneyGema/Cenicienta.png"
// },
// {
// nombre: "Elsa",
// ruta: "img/DisneyGema/Elsa.png"
// },
// {
// nombre: "Flynn",
// ruta: "img/DisneyGema/Flynn.png"
// },
// {
// nombre: "Genio",
// ruta: "img/DisneyGema/Genio.png"
// },
// {
// nombre: "Kaa",
// ruta: "img/DisneyGema/Kaa.png"
// },
// {
// nombre: "Mushu",
// ruta: "img/DisneyGema/Mushu.png"
// },
// {
// nombre: "Pascal",
// ruta: "img/DisneyGema/Pascal.png"
// },
// {
// nombre: "Pepito",
// ruta: "img/DisneyGema/Pepito.png"
// },
// {
// nombre: "Primavera",
// ruta: "img/DisneyGema/Primavera.png"
// },
// {
// nombre: "Rapunzel",
// ruta: "img/DisneyGema/Rapunzel.png"

    // POKEMON
nombre: "abra",
ruta: "img/Pokemon/abra.png"
},
{
nombre: "bullbasaur",
ruta: "img/Pokemon/bullbasaur.png"
},
{
nombre: "charmander",
ruta: "img/Pokemon/charmander.png"
},
{
nombre: "dratini",
ruta: "img/Pokemon/dratini.png"
},
{
nombre: "eevee",
ruta: "img/Pokemon/eevee.png"
},
{
nombre: "jigglypuff",
ruta: "img/Pokemon/jigglypuff.png"
},
{
nombre: "mankey",
ruta: "img/Pokemon/mankey.png"
},
{
nombre: "meowth",
ruta: "img/Pokemon/meowth.png"
},
{
nombre: "pidgey",
ruta: "img/Pokemon/pidgey.png"
},
{
nombre: "pikachu",
ruta: "img/Pokemon/pikachu.png"
},
{
nombre: "psyduck",
ruta: "img/Pokemon/psyduck.png"
},
{
nombre: "squirtle",
ruta: "img/Pokemon/squirtle.png"
}
];

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");


// ---- CREACIÓN DE REJILLA ----

rejilla.setAttribute("class", "rejilla");
game.appendChild(rejilla);

// ----


var song = document.getElementById("song");       // audio   
var clic = document.getElementById("clic");      // audio                                     
var bounce = document.getElementById("bounce"); // audio                                       
var win = document.getElementById("win");      // audio     
var fail = document.getElementById("fail");    // audio                               

var contador = 0;
var primerSel = "";
var segundoSel  = "";
var selPrevio = null;
var eliminados = 0;

var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");
var segundos = 90; //TIME



// ---- FUNCIÓN PARA BARAJAR LOS DIVS CON CADA PERSONAJE ----

function baraja(){
    const personajesDobles = arrayPersonajes.concat(arrayPersonajes)
                                            .sort(() => 0.5 - Math.random());


    personajesDobles.forEach(personaje => {
    const {nombre, ruta } = personaje;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.dataset.name = nombre;

    const anverso = document.createElement("div");
    anverso.classList.add("anverso");

    const reverso = document.createElement("div");
    reverso.classList.add("reverso");
    reverso.style.backgroundImage = `url(${ruta})`;

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);
    });

    gameover.style.opacity = "0";
    winner.classList.remove("open"); // quitamos "WINNER" 
    rejilla.classList.remove("out");  // quitamos la 1clase out a rejilla para que baje    
    rejilla.classList.add("start");  // añadimos la clase start a rejilla para que baje
    start.style.display = "none";      // apagar el botón
    reloj.style.display = "initial";  // encender reloj
    song.play();  // audio
    eliminados = 0;
    reloj.classList.remove("intermitente");    /* reloj intermitente */
}



// ---- FUNCIÓN DE INICIO DEL JUEGO Y RELOJ CUENTA ATRÁS ----

function startGame(){

    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2);
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (eliminados === 24) { //personajes 24
        return;
    }
    
    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        },1000)
    }else{
        gameOver();
    }
    segundos--;
    
    if (segundos < 10) {   /* reloj intermitente */
        reloj.classList.add("intermitente"); 
    };
}



// ---- FUNCIÓN PARA EJECUTAR LA LÓGICA DE PARTIDA PERDIDA ----

function gameOver() {
    segundos = 90; //time
    song.pause();
    song.currentTime = 0;
    fail.play();   // audio
    rejilla.classList.add("out");
    gameover.style.opacity = "1";
    start.style.display = "initial";
    reloj.style.display = "none";
    setTimeout(function() {  // para retrasarlo
        while(rejilla.firstChild) {
            rejilla.removeChild(rejilla.firstChild);
        }    
    }, 1000);
};

/*<rejilla>
    <aladin>
    <...>
    <hada>
quito el primero aladin, a la segunda vuelta se carga el siguiente, asi hasta la ultima,"hada"
*/



// ---- EVENTO CLICK PARA SELECCIONAR CADA PERSONAJE ----

rejilla.addEventListener("click", function(evento){
    clic.currentTime = 0;  // audio
    clic.play();          // audio

    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || 
    seleccionado.parentNode === selPrevio ||
    seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }
   
    if (contador < 2) {
        contador++;
        if (contador === 1) { 
            primerSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        // selPrevio = seleccionado.parentNode; //en Versión fácil on
        } else {
            segundoSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        }
        // console.log(primerSel);
        // console.log(segundoSel);
    if (primerSel !== "" && segundoSel !==""){
        if(primerSel === segundoSel){
            bounce.currentTime = 0;
            bounce.play();
            setTimeout (eliminar, 500);
                // eliminar(); //tuneamos esta en 120 y 107
            setTimeout (resetSel, 500);
            contEliminados();
                // resetSel();
        } else {
            setTimeout (resetSel, 600);
        // selPrevio = null; //en Versión fácil on
                // resetSel();
             }  // tenemos que ponerle un retraso antes de que lo reset 
        }       // para dejar observar la imagen antes de voltear
        selPrevio = seleccionado.parentNode; //en version fácil off
     }
});


// ---- FUNCIÓN PARA ELIMINAR LOS ELEMENTOS COIINCIDENTES ----

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.add("eliminado");
    });
}




// ---- FUNCIÓN PARA RESET LOS SELECCIONADOS DESPUÉS DE 2 INTENTOS ----

var resetSel = function() {
    contador = 0;
    primerSel = "";
    segundoSel = "";

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });
}




// ---- FUNCIÓN PARA CONTAR LOS ELIMINADOS Y CUANDO LLEGUEN A 24 EJECUTAR LA LÓGICA DE PARTIDA GANADA ----

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length +2;
    // console.log(eliminados);
    if (eliminados === 24) {  // personajes 24
        // console.log("ejecuto winner")        
        winner.classList.add("open");
        win.currentTime = 0;  // audio
        win.play();          // audio    
        segundos = 20;  // LO MISMO QUE ARRIBA (aunque se podría poner menos ;))
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        setTimeout(function() {  // para retrasarlo
            while(rejilla.firstChild) {
                rejilla.removeChild(rejilla.firstChild);
            }    
        }, 1000);    
    }
}

