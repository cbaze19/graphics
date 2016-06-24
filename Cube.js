
var d = 1000;

function Cube() {
	this.points = [
		new Point3D(-50, -50, -50),
        new Point3D(50, -50, -50),
        new Point3D(50, 50, -50),
        new Point3D(-50, 50, -50),
        new Point3D(50, -50, 50),
        new Point3D(-50, -50, 50),
        new Point3D(-50, 50, 50),
        new Point3D(50, 50, 50)
	];

	this.edges = [
		0,1,
        1,2,
        2,3,
        3,0,
        4,5,
        5,6,
        6,7,
        7,4,
        0,5,
        1,4,
        2,7,
        3,6
	];

	this.p_pts = function() {
		var ps = [];

		for (var i=0; i<this.points.length; i++) {
			var newPoint = new Point(d * this.points[i].x / (d + this.points[i].z), d * this.points[i].y / (d + this.points[i].z));
			ps.push(newPoint);
		}

		return ps;
	};

	this.reset = function() {
		this.points = [
			new Point3D(-50, -50, -50),
	        new Point3D(50, -50, -50),
	        new Point3D(50, 50, -50),
	        new Point3D(-50, 50, -50),
	        new Point3D(50, -50, 50),
	        new Point3D(-50, -50, 50),
	        new Point3D(-50, 50, 50),
	        new Point3D(50, 50, 50)
		];
	}

	this.origin = function() {
		return new Point3D(
			(Math.abs(this.points[1].x) - Math.abs(this.points[0].x))/2,
			(Math.abs(this.points[2].y) - Math.abs(this.points[1].y))/2,
			(Math.abs(this.points[4].z) - Math.abs(this.points[3].z))/2
		);
	}

}