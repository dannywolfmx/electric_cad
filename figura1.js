// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:

tool.minDistance = 10;



var colorActual = '#00000';
var tamCelda = 25;

trazoTemporal = new Path();

var ultimoPunto;

view.onResize = function(event) {
    dibujaGrid()
}

var dibujaGrid = function(){
	nuevoPath = new Path();

	for(i = 0;i<document.getElementById("miCanvas").width/tamCelda;i++){
		for(j=0;j<document.getElementById("miCanvas").height/tamCelda;j++){
			nuevoPath.add(new Path.Circle({
				center: [tamCelda*i, tamCelda*j],
				radius: 1.6,
				fillColor: 'black'
			}))
		}
	}
}


function onMouseDown(event) {
	dibujaGrid();
	if (Key.isDown('control')) {
		var x = ajustaCoordenadasCelda(event.point.x)
		var y = ajustaCoordenadasCelda(event.point.y)
	} else {
		var x = event.point.x
		var y = event.point.y
	}

	// The mouse was clicked, so let's put a newly created Path into
	// myPath, give it the color black and add the location as the
	// path's first segment.
	myPath = new Path();

	myPath.strokeColor = colorActual;

	ultimoPunto = [x, y];

	myPath.add(ultimoPunto);

}


function onMouseDrag(event) {
	if (Key.isDown('control')) {
		var x = ajustaCoordenadasCelda(event.point.x)
		var y = ajustaCoordenadasCelda(event.point.y)
	} else {
		var x = event.point.x
		var y = event.point.y
	}

	trazoTemporal.strokeColor = colorActual;

	trazoTemporal.removeSegments();

	trazoTemporal.add(ultimoPunto);

	trazoTemporal.add([x, y]);

}

function onMouseUp(event) {
	// The mouse was released, so we add the new location as the end
	// segment of the line.
	if (Key.isDown('control')) {
		var x = ajustaCoordenadasCelda(event.point.x)
		var y = ajustaCoordenadasCelda(event.point.y)
	} else {
		var x = event.point.x
		var y = event.point.y
	}

	myPath.add([x, y]);

	console.log(event.point)

	trazoTemporal.removeSegments();

}

function ajustaCoordenadasCelda(point) {
	return point - (point % tamCelda)
}
