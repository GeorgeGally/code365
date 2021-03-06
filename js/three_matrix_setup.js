
var scene = new THREE.Scene();
scene.target_rotation = new Vector();
var aspect = window.innerWidth / window.innerHeight;

var block_size = 90;
var boxes = [];

var blocks_x = Math.round(width/block_size);
var blocks_y = Math.round(height/block_size);

// console.log(blocks_x);
// console.log(blocks_y);

var x_offset = blocks_x * block_size/2;
var y_offset = blocks_y * block_size/2;

var geometry;
var i, j, ux, uy, ox, oy, geometry;

ux = 1 / blocks_x;
uy = 1 / blocks_y;

xsize = w / blocks_x;
ysize = h / blocks_y;

var texture = new THREE.Texture(canvas);


//var camera = new THREE.PerspectiveCamera( 70, aspect, 0.1, 1000 );
camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 2, 2000 );

//var renderer = new THREE.CanvasRenderer();
var renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
    renderer.setClearColor( 0x000000 );
    //renderer.setClearColor( rgba(255, 0.1) );
    renderer.setSize( window.innerWidth, window.innerHeight );


    document.body.appendChild( renderer.domElement );

    var block_gap = block_size;

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
    });

    material.map.minFilter = THREE.LinearFilter;

    material.shading = THREE.SmoothShading;
    //scene.fog = new THREE.FogExp2( 0xeeeeee, 0.001 );

    addLights();

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    camera.position.z = 850;
    // camera.near = 20;
    // camera.far  = 950;
    //scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    //var grid = new THREE.Object3d();

    var geometry = new THREE.BoxGeometry( 250, 250, 250);
    var main_block = new THREE.Mesh( geometry, material );
    main_block.target = main_block.start = new THREE.Vector3(1, 1, 1);
    main_block.target_scale = main_block.scale = new THREE.Vector3(1, 1, 1);
    main_block.visible = false;
    scene.add(main_block);

    var pivot = new THREE.Group();
    scene.add( pivot );

    var num = 0;

    /////// SETUP A MATRIX OF CUBES

    for (var y = 0; y < blocks_y; y++) {

      for (var x = 0; x < blocks_x; x++) {

      ox = x;
			oy = y;

      geometry = new THREE.BoxGeometry( block_gap, block_gap, block_gap);
      geometry.dynamic = true;

      change_uvs( geometry, ux, uy, ox, oy );

        var pos = x+y*x;
        boxes[num] = new THREE.Mesh( geometry, material );

        var xx = (x * block_size) - x_offset;
        var yy = (y * block_size) - y_offset;

        //boxes[num].start = new THREE.Vector3();
        //boxes[num].target = new THREE.Vector3();
        boxes[num].position.x = xx;
        boxes[num].position.y = yy;
        boxes[num].position.z = 0;

        //if(chance(2)) boxes[num].visible = false;
        boxes[num].target = boxes[num].start = new THREE.Vector3(xx, yy, 0);
        boxes[num].target_scale = boxes[num].scale = new THREE.Vector3(1, 1, 1);
        boxes[num].target_rotation = new THREE.Vector3(boxes[num].rotation.x, boxes[num].rotation.y, boxes[num].rotation.z);
        //scene.add( boxes[num] );
        pivot.add( boxes[num] );
        num++;

      }

    }

    console.log(boxes.length);
    //scene.add(grid);
    // scene.target_rotation = new THREE.Vector3(0,0,0);
    // scene.target_rotation = scene.rotation;
    // camera.target_rotation = new THREE.Vector3(0,0,0);
    // camera.target_rotation = camera.rotation;
    pivot.target_rotation = new THREE.Euler().copy(pivot.rotation);
    //pivot.target_rotation = pivot.rotation;
    ///////// END THREE MATRIX
    //console.log(scene.rotation);


    //////////////////////// THREE tween

    function tweenBlocks(){
      //TWEEN.update();
      //pivot.rotation.set = (tween(pivot.rotation.x, pivot.target_rotation.x, 40), 0,0);
      //pivot.rotation.y = tween(pivot.rotation.y, pivot.target_rotation.y, 40);
      //pivot.rotation.z = tween(pivot.rotation.z, pivot.target_rotation.z, 40);
      //console.log(pivot.target_rotation.x + " : " + pivot.rotation.x);
      // camera.rotation.x = tween(camera.rotation.x, camera.target_rotation.x, 40);
      // camera.rotation.y = tween(camera.rotation.y, camera.target_rotation.y, 40);
      // camera.rotation.z = tween(camera.rotation.z, camera.target_rotation.z, 40);

      var b = main_block;

      b.position.x = tween(b.position.x, b.target.x, 40);
      b.position.y = tween(b.position.y, b.target.y, 40);
      b.position.z = tween(b.position.z, b.target.z, 40);

      b.scale.x = tween(b.scale.x, b.target_scale.x, 20);
      b.scale.y = tween(b.scale.y, b.target_scale.y, 20);
      b.scale.z = tween(b.scale.z, b.target_scale.z, 20);

      for (var i = 0; i < boxes.length; i++) {

        var b = boxes[i];

        b.position.x = tween(b.position.x, b.target.x, 20);
        b.position.y = tween(b.position.y, b.target.y, 20);
        b.position.z = tween(b.position.z, b.target.z, 20);

        b.scale.x = tween(b.scale.x, b.target_scale.x, 20);
        b.scale.y = tween(b.scale.y, b.target_scale.y, 20);
        b.scale.z = tween(b.scale.z, b.target_scale.z, 20);

        b.rotation.x = tween(b.rotation.x, b.target_rotation.x, 20);
        b.rotation.y = tween(b.rotation.y, b.target_rotation.y, 20);
        b.rotation.z = tween(b.rotation.z, b.target_rotation.z, 20);

      }

    }

    function addLights() {

      var ambientLight = new THREE.AmbientLight(0xcccccc);
      scene.add(ambientLight);

      // add spotlight for the shadows
      var spotLight = new THREE.DirectionalLight(0xffffff);
      spotLight.position.set(0, 160, 20);
      // spotLight.intensity = 0.8;
      // spotLight.castShadow = true;
      // spotLight.shadow.bias = 0.0001;
      //spotLight.shadowCameraVisible = true;
      scene.add(spotLight);

      // spotLight.shadow.camera.right = 15;
      // spotLight.shadow.camera.left = -15
      // spotLight.shadow.camera.top = 15;
      // spotLight.shadow.camera.bottom = -15;
      //
      // spotLight.shadow.mapSize.width = 4096;
      // spotLight.shadow.mapSize.height = 4096;
      //
      // var d = 100;
      //
      // spotLight.shadow.camera.right = d;
      // spotLight.shadow.camera.left = -d
      // spotLight.shadow.camera.top = d;
      // spotLight.shadow.camera.bottom = -d;

      light = new THREE.DirectionalLight( 0xddddff, 1 );
      	light.position.set( - 1, 1, - 100 );
      	scene.add( light );

      // add spotlight for the shadows
      // var spotLight2 = new THREE.SpotLight(0x111111, 1.75, 1000);
      // spotLight2.position.set(-10, 160, 0);
      // spotLight2.intensity = 0.0005;
      // //spotLight2.castShadow = true;
      // //spotLight2.shadow.bias = 0.0001;;
      // //spotLight.shadowCameraVisible = true;
      // var d = 100;
      //
      // spotLight2.shadow.camera.right = d;
      // spotLight2.shadow.camera.left = -d
      // spotLight2.shadow.camera.top = d;
      // spotLight2.shadow.camera.bottom = -d;
      //
      // spotLight2.shadow.mapSize.width = 4096;
      // spotLight2.shadow.mapSize.height = 4096;

      //scene.add(spotLight2);

      // SHADOW CAMERA HELPER
      // shadow_helper = new THREE.CameraHelper( light.shadow.camera );
      // scene.add( shadow_helper );
      //scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ));

    }
