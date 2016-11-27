/*Java Script Syntax*/

var juego = {

/*1*/

  filas: [
   [], 
   [], 
   [] 
   		],

/*2*/

  espacioVacio: {
  	fila:2,
    columna:2
  },

/*3*/

  iniciar:function(elemento)
  {
    juego.instalarPiezas(elemento);
    juego.randomFichasL(20);
    juego.capturaTeclas();

  },

/*4*/

crearPieza:function(num, fi, co)
  {
    var obj = $("<div>");
    obj.addClass("pieza");
    obj.css(
    {
      top: fi * 200,
      left: co * 200,
      backgroundImage:"url(piezas/"+num+".png)"
    });
    return {
    	filaInicial: fi,
    	columnaInicial: co,
    	$obj: obj
    };
  },

/*5*/

instalarPiezas:function(tablero)
  {
    var contador = 0;
    for (var fi = 0; fi < 3; fi++) 
    {
      for (var co = 0; co < 3; co++) 
      {
        if (this.espacioVacio.columna === co && this.espacioVacio.fila === fi) 
        {
          this.filas[fi][co] = null;
        }
        else
        {
          contador = contador + 1;
          var pieza = this.crearPieza(contador,fi,co);
          this.filas[fi][co] = pieza;
          tablero.append(pieza.$obj);
        }
      
      }
      
    }

  },

/*6*/

  moveDown:function()
  {
      var filaOrigen = this.espacioVacio.fila-1;
      var columnaOrigen = this.espacioVacio.columna;
      this.cambioDePosicionEmptSpac(filaOrigen, columnaOrigen);
  },

  moveUp:function()
  {
      var filaOrigen = this.espacioVacio.fila+1;
      var columnaOrigen = this.espacioVacio.columna;
      this.cambioDePosicionEmptSpac(filaOrigen, columnaOrigen);  
  },

  moveRight:function()
  {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna-1;
      this.cambioDePosicionEmptSpac(filaOrigen, columnaOrigen);
  },

  moveLeft:function()
  {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna+1;
      this.cambioDePosicionEmptSpac(filaOrigen, columnaOrigen);
  },

  /*7*/

  capturaTeclas:function() {
    var that = this;
    $(document).keydown(function(evento) {
    
      switch(evento.which)
      {
        case 37:
          that.moveLeft();
        break;

        case 38:
          that.moveUp();
        break;

        case 39:
          that.moveRight();
        break;

        case 40:
          that.moveDown();
        break;
         
        default: return; 
      }
      juego.chequearSiGano();
      evento.preventDefault();

    });

  },

/*8*/

  moverFichaFilaColumna:function($obj,fila,columna)
  {
    $obj.css({
      top: fila * 200,
      left: columna * 200
    })
  },

/*9*/

  saveEmptySpace:function(fila,columna)
  {
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;
    this.filas[fila][columna] = null;
  },

/*10*/

  cambioDePosicionEmptSpac(fila,columna)
  {
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha.$obj,this.espacioVacio.fila,this.espacioVacio.columna);
      this.saveEmptySpace(fila,columna);
    }
  },

/*11*/

  chequearSiGano:function(){
    for (var f = 0; f < this.filas.length; f++) {
      for (var c = 0; c < this.filas.length; c++) {
        var actual = this.filas[f][c];
        if(actual && !(actual.filaInicial == f && actual.columnaInicial == c)){
          return false;
        }
      }
    }
    return alert('Felicitaciones, ah ganados!');
  },

/*12*/

  randomFichasL:function(veces){
    var that=this;
			var tempo=30;
			for (var i=0; i<=veces;i++) {
				
				var numeroazar=Math.floor(Math.random()*4);

				switch (numeroazar){

					case 0: setTimeout(function(){
						that.moveUp();
					}, i * tempo);
					break;

					case 1: setTimeout(function(){
						that.moveRight();
					}, i * tempo); 
					break;

					case 2: setTimeout(function(){
						that.moveLeft();
					}, i * tempo);
					break

					case 3: setTimeout(function(){
						that.moveDown();
					}, i * tempo);
					break;

				}
				
			}


    }

};



/* jQuery Syntax */

$(document).ready(function () {
  var go = $("#juego");
  juego.iniciar(go);

});