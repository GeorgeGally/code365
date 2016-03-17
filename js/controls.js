
var havePointerLock = checkForPointerLock();

function checkForPointerLock() {
  return 'pointerLockElement' in document || 
         'mozPointerLockElement' in document || 
         'webkitPointerLockElement' in document;
}


function initPointerLock() {
  var element = document.body;

  if (havePointerLock) {
    var pointerlockchange = function (event) {
      if (document.pointerLockElement === element ||
          document.mozPointerLockElement === element ||
          document.webkitPointerLockElement === element) {
        controlsEnabled = true;
        controls.enabled = true;
      } else {
        controlsEnabled = false;
        controls.enabled = false;
      }
    };

    var pointerlockerror = function (event) {
      element.innerHTML = 'PointerLock Error';
    };

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    var requestPointerLock = function(event) {
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
    };
    element.addEventListener('click', requestPointerLock, false);
  } else {
    element.innerHTML = 'Bad browser; No pointer lock';
  }
}

function initControls() {
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  initPointerLock();
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

function onKeyDown(e) {
  switch (e.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;
    case 37: // left
    case 65: // a
      moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
    case 32: // space
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
}

function onKeyUp(e) {
  switch(e.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;
    case 37: // left
    case 65: // a
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
}

function updateControls() {
  if (controlsEnabled) {
    var delta = clock.getDelta();
    var walkingSpeed = 200.0;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta;

    if (moveForward) velocity.z -= walkingSpeed * delta;
    if (moveBackward) velocity.z += walkingSpeed * delta;
    if (moveLeft) velocity.x -= walkingSpeed * delta;
    if (moveRight) velocity.x += walkingSpeed * delta;

    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateY(velocity.y * delta);
    controls.getObject().translateZ(velocity.z * delta);

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;
      canJump = true;
    }
  }
}