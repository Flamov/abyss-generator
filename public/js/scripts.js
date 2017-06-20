// From darkest to lightest
var colours = [
	'#02071C',
	'#010824',
	'#011E41',
	'#042846',
	'#02294B',
	'#073553',
	'#06374D',
	'#094C5F',
	'#064C5C',
	'#064B51',
	'#085152',
	'#1B6D6B',
	'#456A58',
	'#7C8B7B'
];

var scene, camera, renderer;

function setupScene() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	addCamera();
	addLayers();
	animate();

}

function addCamera() {

	camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1000;

	// camera.rotation.x = 90 * Math.PI;

}

var group;

function addLayers() {

	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin(true);

	group = new THREE.Group();

	var layerDepth = 10;

	var extrudeSettings = {
		amount: layerDepth,
		bevelEnabled: false
	};

	/* loader.load(
		// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/paper%20texture.png',
		// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/stone.gif',
		// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/paper_2.png',
		// 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/paper_3.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/paper_4.png',
		function(texture) {

			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(0.05, 0.05); */

			var svgElement = document.getElementsByTagName('svg')[0];
			var svgPaths = document.getElementsByTagName('path');

			for (var i = 0; i < svgPaths.length; i++) {

				try {

					var path = $d3g.transformSVGPath(svgPaths[i].getAttribute('d')).currentPath;

					var circle = new THREE.Shape();
					circle.absarc(0, 0, 200, 0, Math.PI * 2, false);

					circle.holes.push(path);

					var geometry = new THREE.ExtrudeGeometry(circle, extrudeSettings);

					var material = new THREE.MeshBasicMaterial({
						// map: texture,
						overdraw: 10,
						color: new THREE.Color(colours[i])
						// color: new THREE.Color('red')
					});

					var mesh = new THREE.Mesh(geometry, material);
					mesh.position.z = i * layerDepth;

					group.add(mesh);

				}
				catch(error) {

					console.log(error);

				}

			}

			var circle = new THREE.Shape();
			circle.absarc(0, 0, 200, 0, Math.PI * 2, false);
			var geometry = new THREE.ShapeBufferGeometry(circle);
			var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
			mesh.position.z = 0;
			group.add(mesh);

			// group.position.x = -250;
			// group.position.y = -250;

		/* }

	); */

	// group.position.y = -80;
	// group.rotation.x = -0.4;

	scene.add(group);

}

function animate() {

	requestAnimationFrame(animate);

	// group.rotation.x += 0.001;
	group.rotation.y += 0.01;

	renderer.render(scene, camera);

}

setupScene();