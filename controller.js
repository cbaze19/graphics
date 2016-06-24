
$(function() {

	// Enums to handle directional transformations
	Direction = {
		UP: 1,
		DOWN: 2,
		RIGHT: 3,
		LEFT: 4
	}

	Scale = {
		UP: 1,
		DOWN: 2
	}

	Rotate = {
		LEFT: 1,
		RIGHT: 2,
		UP: 3,
		DOWN: 4,
		YLEFT: 5,
		YRIGHT: 6
	}

	Origin = {
		TO: 1,
		FROM: 2
	}

	$(document).keydown(function(e) {
		var key = e.which;

		switch(key) {
			case 85:
				translate(cu, Direction.UP);
				break;
			case 68:
				translate(cu, Direction.DOWN);
				break;
			case 82:
				translate(cu, Direction.RIGHT);
				break;
			case 76:
				translate(cu, Direction.LEFT);
				break;
			case 70:
				translate(cu, Direction.FORWARD);
				break;
			case 66:
				translate(cu, Direction.BACK);
				break;
			case 88:
				cu.reset();
				drawCube(cu);
				break;

			case e.shiftKey && 38:
				// Scale Up
				scale(cu, Scale.UP);
				break;
			case e.shiftKey && 40:
				// Scale Down
				scale(cu, Scale.DOWN);
				break;

			case e.shiftKey && 37:
				rotate(cu, Rotate.LEFT);
				break;
			case e.shiftKey && 39:
				rotate(cu, Rotate.RIGHT);
				break;	

			case 37:
				// Rotate Left
				rotate(cu, Rotate.YLEFT);
				break;
			case 39:
				// Rotate Right
				rotate(cu, Rotate.YRIGHT);
				break;

			case 38:
				// Rotate Up
				rotate(cu, Rotate.UP);
				break;
			case 40:
				// Rotate Down
				rotate(cu, Rotate.DOWN);
				break;
			
			case 81:
				// Backspace - Delete Last Edge
				console.log('delete key pressed!');
				deleteEdge(cu);
				drawCube(cu);
				break;
		}

	});

});


function translate(obj, dir) {
	var inc = 10;

	switch(dir) {
		case Direction.UP:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].y = obj.points[i].y + inc;
			}
			break;

		case Direction.DOWN:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].y = obj.points[i].y - inc;
			}
			break;

		case Direction.RIGHT:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].x = obj.points[i].x + inc;
			}
			break;

		case Direction.LEFT:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].x = obj.points[i].x - inc;
			}
			break;

		case Direction.FORWARD:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].z = obj.points[i].z + inc;
			}
			break;

		case Direction.BACK:
			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].z = obj.points[i].z - inc;
			}
			break;
	}

	drawCube(obj);
}

//var tempPoints;
function moveToOrigin(obj, dir, oo) {

	switch(dir) {
		case Origin.TO:
			var tempPoints = JSON.parse(JSON.stringify(obj.points));

			for (var i=0; i<obj.points.length; i++) {
				
				tempPoints[i].x = obj.points[i].x - obj.origin().x;
				tempPoints[i].y = obj.points[i].y - obj.origin().y;
				tempPoints[i].z = obj.points[i].z - obj.origin().z;

			}
			obj.points = JSON.parse(JSON.stringify(tempPoints));
			break;
		case Origin.FROM:
			var tempPoints = JSON.parse(JSON.stringify(obj.points));

			for (var i=0; i<obj.points.length; i++) {
				
				tempPoints[i].x = obj.points[i].x + oo.x;
				tempPoints[i].y = obj.points[i].y + oo.y;
				tempPoints[i].z = obj.points[i].z + oo.z;

			}
			obj.points = JSON.parse(JSON.stringify(tempPoints));
			break;
	}
}

function scale(obj, dir) {
	var inc = 0;
	var original_origin = obj.origin();
	switch(dir) {
		case Scale.UP:
			inc = 1.1;
			break;

		case Scale.DOWN:
			inc = 0.9;
			break;
	}

	moveToOrigin(obj, Origin.TO, []);

			for (var i=0; i<obj.points.length; i++) {
				obj.points[i].x = obj.points[i].x * inc;
				obj.points[i].y = obj.points[i].y * inc;
				obj.points[i].z = obj.points[i].z * inc;
			}

			moveToOrigin(obj, Origin.FROM, original_origin);
			drawCube(obj);
}

function rotate(obj, dir) {
	var inc = .1;
	var tempPoints = JSON.parse(JSON.stringify(obj.points));
	console.log(dir);
	switch(dir) {
		case Rotate.LEFT:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].x = obj.points[i].x * Math.cos(inc) - obj.points[i].y * Math.sin(inc);
				tempPoints[i].y = obj.points[i].x * Math.sin(inc) + obj.points[i].y * Math.cos(inc);
			}
			break;

		case Rotate.RIGHT:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].x = obj.points[i].x * Math.cos(-inc) - obj.points[i].y * Math.sin(-inc);
				tempPoints[i].y = obj.points[i].x * Math.sin(-inc) + obj.points[i].y * Math.cos(-inc);
			}
			break;

		case Rotate.UP:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].y = obj.points[i].y * Math.cos(inc) - obj.points[i].z * Math.sin(inc);
				tempPoints[i].z = obj.points[i].y * Math.sin(inc) + obj.points[i].z * Math.cos(inc);
			}
			break;

		case Rotate.DOWN:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].y = obj.points[i].y * Math.cos(-inc) - obj.points[i].z * Math.sin(-inc);
				tempPoints[i].z = obj.points[i].y * Math.sin(-inc) + obj.points[i].z * Math.cos(-inc);
			}
			break;

		case Rotate.YLEFT:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].z = obj.points[i].z * Math.cos(inc) - obj.points[i].x * Math.sin(inc);
				tempPoints[i].x = obj.points[i].z * Math.sin(inc) + obj.points[i].x * Math.cos(inc);
			}
			break;

		case Rotate.YRIGHT:
			for (var i=0; i<obj.points.length; i++) {
				tempPoints[i].z = obj.points[i].z * Math.cos(-inc) - obj.points[i].x * Math.sin(-inc);
				tempPoints[i].x = obj.points[i].z * Math.sin(-inc) + obj.points[i].x * Math.cos(-inc);
			}
			break;
	}

	obj.points = JSON.parse(JSON.stringify(tempPoints));
	drawCube(obj);
}

function deleteEdge(obj) {
	console.log('deleting edge!');
	obj.edges.pop();
	obj.edges.pop();
}