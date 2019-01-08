var container, stats, controls, clock;
var tick = 0;
var auto_rotate = false;
var camera, scene, renderer, geometry, material;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

loadScript( 'js/three.min.js', init );

function init() {
  loadScript( 'js/threejs/controls/TrackballControls.js', setupThree );
  //loadScript('js/threejs/Detector.js');
}


function setupThree() {

  //if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer( {
    alpha: true,
    //antialias: true
  } );
  renderer.setClearColor( 0x000000 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 2.2;
  controls.panSpeed = 1;
  controls.dynamicDampingFactor = 0.3;
	// orbitControls = new THREE.OrbitControls(camera);
	// orbitControls.autoRotate = true;
  // stats = new Stats();
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.style.top = '0px';
  // container.appendChild( stats.domElement );

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );



  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

  }


  function onDocumentTouchStart( event ) {

    if ( event.touches.length == 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }

  }


  function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

  }

}


function render() {

  var delta = clock.getDelta();
  tick += delta;
  controls.update();
  renderer.render( scene, camera );
}





function loadScript( url, callback ) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName( 'head' )[ 0 ];
  var script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  if ( callback ) {
    script.onreadystatechange = callback;
    script.onload = callback;
  }

  // Fire the loading
  head.appendChild( script );
}
