var canvas, ctx, Direction, Scale, cu;
var height_offset;
var width_offset;
var connect_pts = [];

$(function() {

	setupCanvas();

	cu = new Roof();

	drawCube(cu);

	$('#theCanvas').on('mousedown', function(event) {

		var click = getCursorPosition(canvas, event);

		console.log('Clicked at point: ' + click[0] + ', ' + click[1]);
		console.log(cu.p_pts());
		for (var i= 0; i<cu.p_pts().length; i++) {

			if (Math.abs(cu.p_pts()[i].x - click[0]) < 10) {
				if (Math.abs(cu.p_pts()[i].y - click[1]) < 10) {
					console.log('clicked a selector!');
					if (connect_pts.length < 2) {
						connect_pts.push(i);
					}

					if (connect_pts.length == 2) {
						cu.edges.push(connect_pts[0]);
						cu.edges.push(connect_pts[1]);
						connect_pts = [];
					}
					
					drawCube(cu);
				}
			}
		}

		console.log(connect_pts);
		
	});

	$('#theCanvas').on('mousemove', function(event) {
		var hover_loc = getCursorPosition(canvas, event);
		$('#theCanvas').css('cursor', 'default');

		if (connect_pts.length == 1) {
			drawCube(cu);
			drawLine(new Point(hover_loc[0], hover_loc[1]), cu.p_pts()[connect_pts[0]]);
		}

		for (var i= 0; i<cu.p_pts().length; i++) {

			if ((Math.abs(cu.p_pts()[i].x - hover_loc[0]) < 10) && (Math.abs(cu.p_pts()[i].y - hover_loc[1]) < 10)) {
				$('#theCanvas').css('cursor', 'pointer');
				console.log('hovering!');
			}
		}
	});

});

function setupCanvas() {
	canvas = $('#theCanvas')[0];
	ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#C5C5C5';
	ctx.translate(0, canvas.height);
	ctx.scale(1, -1);

	height_offset = canvas.height/2;
	width_offset = canvas.width/2;

}

function drawLine(p1, p2) {

	

	console.log(height_offset);

	p1.x = p1.x + width_offset;
	p2.x = p2.x + width_offset;
	p1.y = p1.y + height_offset;
	p2.y = p2.y + height_offset;

	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}

function drawVertexSelector(p) {
	var height_offset = canvas.height/2;
	var width_offset = canvas.width/2;

	p.x = p.x + width_offset;
	p.y = p.y + height_offset;

	ctx.beginPath();
	ctx.arc(p.x, p.y, 5, 0, 2*Math.PI);
	ctx.fillStyle = 'gray';
	ctx.fill();
}

function drawCube(cu) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();

	for (var i=0; i<cu.p_pts().length; i++) {
		drawVertexSelector(cu.p_pts()[i]);
	}

	for (var i=0; i<cu.edges.length; i = i + 2) {
		drawLine(cu.p_pts()[cu.edges[i]], cu.p_pts()[cu.edges[i + 1]]);
		console.log('new edge!');
	}
}

function getCursorPosition(canvas, event) {
	var x, y;

	canoffset = $(canvas).offset();
	x = (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left))-width_offset;
	y = -((event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1)-height_offset);

	return [x,y];
}

