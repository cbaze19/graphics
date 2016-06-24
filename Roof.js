
var d = 1000;

function Roof() {
	this.points = [
		new Point3D(-200, -25, -100),
        new Point3D(200, -25, -100),
        new Point3D(200, -25, 100),
        new Point3D(-200, -25, 100),
        new Point3D(-200, 25, 0),
        new Point3D(200, 25, 0),
        new Point3D(-75, -25, -100),
        new Point3D(-75, -25, -200),
        new Point3D(75, -25, -200),
        new Point3D(75, -25, -100),
        new Point3D(0, 25, 0),
        new Point3D(0, 25, -200),
	];

	this.edges = [
		// 0,6,
  //       6,7,
  //       8,9,
  //       9,1,
  //       2,3,
  //       0,4,
  //       3,4,
  //       2,5,
  //       1,5,
  //       4,5,
  //       6,10,
  //       9,10,
  //       10,11,
  //       7,11,
  //       8,11
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
			new Point3D(-50, -25, -50),
	        new Point3D(50, -25, -50),
	        new Point3D(50, 25, -50),
	        new Point3D(-50, 25, -50),
	        new Point3D(50, -25, 50),
	        new Point3D(-50, -25, 50),
	        new Point3D(-50, 25, 50),
	        new Point3D(50, 25, 50)
		];
	}

	this.origin = function() {
		return new Point3D(
			((this.points[1].x) + (this.points[0].x))/2,
			((this.points[4].y) + (this.points[0].y))/2,
			((this.points[3].z) + (this.points[0].z))/2
		);
	}

}