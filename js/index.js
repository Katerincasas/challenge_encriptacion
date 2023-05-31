// Declaramos variables.
let entradaMaestra;
let datosEncriptados;
let objCodigo = {'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat'};
let entradaDatos = document.getElementById("entrada");
let boton = document.getElementById("encrip");
let imagen = document.getElementById("muneco");
let botonDes = document.getElementsByClassName("desencriptar");
let copiarButton = document.querySelector(".copiar");
let myText = document.querySelector(".salida");
let mensajeInicial = document.getElementById("mensaje-inicial");

// Función para controlar la visibilidad de los elementos
function controlarVisibilidad() {
  if (myText.value.trim() === "") {
    imagen.style.display = "block";
    mensajeInicial.style.display = "block";
    myText.style.display = "none";
    copiarButton.style.display = "none";
  } else {
    imagen.style.display = "none";
    mensajeInicial.style.display = "none";
    myText.style.display = "block";
    copiarButton.style.display = "block";
  }
}

// Llamamos a la función inicialmente para establecer la visibilidad inicial
controlarVisibilidad();

//Creamos un evento que nos permita obtener en tiempo real nuestra entrada de texto.
entradaDatos.addEventListener("input", function() {
    entradaMaestra = this.value;
});

//Creamos el evento para hacer funcional el boton de copiar.
copiarButton.addEventListener('click', () => {
    if(myText.textContent!==''){
        navigator.clipboard.writeText(myText.textContent)
        .then(() => {
            alert('Hemos copiado tu texto');
        })
        .catch(err => {
            alert('Algo pasó al copiar, intente de nuevo!');
        });
    }
});

//Creamos nuestra funcion encriptar basada en los parametros indicados
function encriptar(){
    datosEncriptados = entradaMaestra.replace(/[aeiou]/g, function(match) {
        return objCodigo[match];
    });
    document.getElementsByClassName("salida")[0].innerHTML = datosEncriptados;
    entradaDatos.value = "";
    entradaDatos.focus();
    controlarVisibilidad();
}
//Ahora nuestra función desencriptar para revertir los cambios
function desencriptar() {
    if(entradaMaestra===undefined){
        alert("Debes escribir algo primero!");
    }
    else{
        let objDecript = {};
        for (let key in objCodigo) {
            objDecript[objCodigo[key]] = key;
        }
        let datosDesencriptados = entradaMaestra.replace(new RegExp(Object.keys(objDecript).join('|'), 'g'), function(match) {
            return objDecript[match];
        });
        document.getElementsByClassName("salida")[0].innerHTML = datosDesencriptados;
        entradaDatos.value = "";
        entradaDatos.focus();
        controlarVisibilidad();
    }
}

//Creamos nuestra función que valide las mayusculas y minusculas, retornando false o true.
function esMinusculas(letra){
    return letra === letra.toLowerCase();
}

//Variable condición para se usada como validador, de permanecer en true, se llama a la funcion encriptar.
let condicion = true;
function validarEncriptado(){
    if(entradaMaestra===undefined){
        alert("Debes escribir algo primero!");
    }
    else{
        for (let x = 0; x < entradaMaestra.length; x++){
            if (!esMinusculas(entradaMaestra[x]) && entradaMaestra[x] !== " "){
                alert("Todas las letras deben ser minusculas y sin caracteres especiales!");
                condicion = false;
                break;
            } 
        }
        if (condicion){
            encriptar(); 
        }
    }
}

boton.onclick = validarEncriptado;
botonDes[0].onclick = desencriptar;