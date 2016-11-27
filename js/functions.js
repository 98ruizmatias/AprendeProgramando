var myPixelDraw = {

	colorPicked: 0,
	cellColor: '#ecf0f1',
	defaultCells: 30,
	coloring: false,
	fns: {

		calcSize: function(cantidad) {

	        	if (cantidad === undefined)
	        	{
	        		cantidad = myPixelDraw.defaultCells;
	        	}
	        	
	        	var totalCeldas = cantidad * cantidad;
	        	myPixelDraw.container.empty();
	        	
	        	for (var i = 0; i < totalCeldas; i++) {
	        		myPixelDraw.container.append('<div class="celda" draggable> </div>')
	        	}
	        	
	        	var tamDeCelda = myPixelDraw.container.width() / cantidad;

	        	$(".celda").width(tamDeCelda).height(tamDeCelda);
	        },
	    
	    reSize: function() {
	          $('#arrowTog').on('click', function() {
	          	var newSize = $('#reSize').val();
	          	if (newSize == 0 || newSize > 50) 
	          	{
	          		alert('Ingres un valor de 1 a 50');
                    newSize = this.defaultCells;

	          	} else if (isNaN(newSize)) {
	          		alter('Ingrese un numero valido');
	          		newSize = this.defaultCells;
	          	}
	          	myPixelDraw.fns.calcSize(newSize);
	          })

	        },
		
		detectMouseUp: function() {
				$(document).on('mouseup', function(e) {
                myPixelDraw.coloring = false;
            	});
			},

		colorPalette: function() {
				$('#colorPick > *').each(function(i, e) {
                var clase = $(e).attr('class');
                $(e).css('background-color', clase);
            	});
			},

		pickColor: function() {
			$('#colorPick > div').on('click', function() {
                myPixelDraw.colorPicked = $(this).attr('class');
                $(this).parent().find('.select').removeClass("select");
                $(this).addClass("select");
            	});
			},

		colorIt: function() {
				$(document).on('mousedown', '#container .celda', function(e) {
	                e.preventDefault();
	                myPixelDraw.coloring = true;
	                if (e.button == 2) {
	                    $(this).css('background-color', myPixelDraw.cellColor);
	                    return false;
	                } else {
	                    $(this).css('background-color', myPixelDraw.colorPicked);
	                }
           		 });
			},
		
		colorOnDrag: function() {
				$(document).on('mousemove', function(e) {
	                if (myPixelDraw.coloring == true) {
	                    var x = e.clientX;
	                    var y = e.clientY;
	                    var colorDraggedTo = document.elementFromPoint(x, y);
	                    if ($(colorDraggedTo).hasClass('celda') && e.button != 2) {
	                        $(colorDraggedTo).css('background-color', myPixelDraw.colorPicked);
	                    } else if ($(colorDraggedTo).hasClass('celda') && e.button == 2) {
	                        $(colorDraggedTo).css('background-color', myPixelDraw.cellColor);
	                    }
                	}	
            	});

			},
		
		reset: function() {
				$('#reset').on('click', function() {
                $('.celda').css('background-color', myPixelDraw.cellColor);
            	});
			},
		
		toggleBorders: function() {
				$('#toggleBorder').on('click', function() {
                $('.celda').toggleClass('no-border');
            	});
			},
		
		disableRightClick: function() {
				myPixelDraw.container.on('contextmenu', function() {
                return false;
            	})
			},
		
		grabImage: function() {
			$('#grabIt').on('click', function(e) {
                var container = document.getElementById('container');
                html2canvas(container, {
                    onrendered: function(canvas) {
                        document.body.appendChild(canvas);
                        $('#killDraw').show();
                    }
                	});
           		});
        	},

        destroy: function() {
        	$('#killDraw').on('click', function(e) {
                $('canvas').hide();
                $('#killDraw').hide();
                });
        	}
        
	},

	init: function(container) {
        myPixelDraw.container = container;
        var fns = myPixelDraw.fns;
        for (var i = 0; i < Object.keys(fns).length; i++) {
            fns[Object.keys(fns)[i]]();
        }
    }
};

$(document).ready(function () {
  var container = $('#container');
    myPixelDraw.init(container);
});