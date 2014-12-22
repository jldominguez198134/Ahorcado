var palabra = ['Peyorativo','Misantropia','hipofisis','hipotalamo','Ventriculo','esclerosis','necrosis','isquemia','filantropia','Epilepsia'];
var hombre, l, espacio;

function escogePalabra()
{
	var pAleatoria = Math.floor(Math.random()*(palabra.length));
	seleccion = palabra[pAleatoria];
	return seleccion;
}

// Clase Ahorcado
var Ahorcado = function(con)
{
	// this es las variables locales de la clase, accesibles en toda la clase
	// this.contexto es el context de dibujo del canvas, que llega por parametro
	// desde la variable con
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();
}

Ahorcado.prototype.dibujar = function()
{
	var dibujo = this.contexto;

	// Dibujando el Poste
	// dibujo.beginPath();
	// dibujo.moveTo(150,100);
	// dibujo.lineTo(150,50);
	// dibujo.lineTo(400,50);
	// dibujo.lineTo(400,350);
	// dibujo.lineWidth = 15;
	// dibujo.strokeStyle = '#000000';
	// dibujo.stroke();
	// dibujo.closePath();
	var fondo = new Image();
	fondo.src = 'img/fondo1.png';
	fondo.onload = function()
	{
		dibujo.drawImage(fondo, 0, 0);
	}

	if(this.intentos > 0)
	{
		// intentos = 1 --> rostro
		// dibujo.beginPath();
		// dibujo.arc(150,140,40,0, Math.PI * 2, false);
		// dibujo.strokeStyle = '#f00';
		// dibujo.lineWidth = 5;
		// dibujo.stroke();
		// dibujo.closePath();	
		var fondoDos = new Image();
		fondoDos.src = 'img/fondo2.png';
		fondoDos.onload = function()
		{
			dibujo.drawImage(fondoDos, 0, 0);
		}

		var cabeza = new Image();
		cabeza.src = 'img/cabeza.png';
		cabeza.onload = function()
		{
			dibujo.drawImage(cabeza, 370, 197);
		}

		if(this.intentos > 1)
		{
			// intentos = 2 --> torso
			// dibujo.beginPath();
			// dibujo.moveTo(150,180);
			// dibujo.lineTo(150,250);
			// dibujo.strokeStyle = '#f00';
			// dibujo.lineWidth = 5;
			// dibujo.stroke();
			// dibujo.closePath();

			var torso = new Image();
			torso.src = 'img/tronco.png';
			torso.onload = function()
			{
				dibujo.drawImage(torso, 362, 213);
			}

			if(this.intentos > 2)
			{
				// intentos = 3 --> brazos
				// dibujo.beginPath();
				// dibujo.moveTo(120,220);
				// dibujo.lineTo(150,180);
				// dibujo.lineTo(180,220);
				// dibujo.strokeStyle = '#f00';
				// dibujo.lineWidth = 5;
				// dibujo.stroke();
				// dibujo.closePath();
				var brazos = new Image();
				brazos.src = 'img/brazos.png';
				brazos.onload = function()
				{
					dibujo.drawImage(brazos, 360, 232);
				}

				if(this.intentos > 3)
				{
					// intentos = 4 --> piernas
					// dibujo.beginPath();
					// dibujo.moveTo(120,290);
					// dibujo.lineTo(150,250);
					// dibujo.lineTo(180,290);
					// dibujo.strokeStyle = '#f00';
					// dibujo.lineWidth = 5;
					// dibujo.stroke();
					// dibujo.closePath();
					var piernas = new Image();
					piernas.src = 'img/piernas.png';
					piernas.onload = function()
					{
						dibujo.drawImage(piernas, 378, 305);
					}

					if(this.intentos > 4)
					{
						console.log(this.intentos);
						// intentos = 5 --> ojos muertos
						dibujo.beginPath();
						// Ojo izquierdo
						// dibujo.moveTo(125,120);
						// dibujo.lineTo(145,145);
						// dibujo.moveTo(145,120);
						// dibujo.lineTo(125,145);
						// // Ojo derecho
						// dibujo.moveTo(155,120);
						// dibujo.lineTo(175,145);
						// dibujo.moveTo(175,120);
						// dibujo.lineTo(155,145);

						dibujo.fillStyle = '#f00';
						// dibujo.lineWidth = 5;
						// dibujo.stroke();
						dibujo.font = 'bold 14px sans-serif';
						dibujo.fillText('¡Perdiste!',362,215);
						dibujo.closePath();
					}
				}
			}
		}
	}
}
Ahorcado.prototype.trazar = function()
{
	this.intentos++;
	if(this.intentos >= this.maximo)
	{
		this.vivo = false;
		alert('¡Estás muerto!');
	}
	this.dibujar();
}

function iniciar()
{
	l = document.getElementById('letra');
	var b = document.getElementById('boton');
	var canvas = document.getElementById('ahorcado');
	var palabraE = escogePalabra();
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext('2d');
	hombre = new Ahorcado(contexto);

	// Convierte a mayúscula un texto
	palabra = palabraE.toUpperCase();

	// Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabraE.length);

	// Agregamos una función que se dispare al dar click al botón
	b.addEventListener('click', agregarLetra);

	mostrarPista(espacio);
}
function agregarLetra()
{
	var letra = l.value;
	letra = letra.toUpperCase();
	l.value = '';
	l.focus();
	mostrarPalabra(palabra, hombre, letra);
}
function mostrarPalabra(palabra, ahorcado, letra)
{
	var pista = document.getElementById('pista');
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	for(p in palabra)
	{
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	// Si no lo encontré
	if(!encontrado)
	{
		ahorcado.trazar();
	}

	if(!ahorcado.vivo)
	{
		pista.innerText = palabra +' era la palabra :(';
	}
}
function mostrarPista(espacio)
{
	var pista = document.getElementById('pista');
	var texto = '';
	var i;
	var largo = espacio.length;

	for(i = 0; i < largo; i++)
	{
		if(espacio[i] != undefined)
		{
			texto += espacio[i] + ' ';
		}
		else
		{
			texto += '_ ';
		}
		pista.innerText = texto;
	}
}







