// Making a cube
function makeCube() {
  let cubeTris = [
    // South Triangles
    new Triangle([new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0)]),
    new Triangle([new Vector3(0, 0, 0), new Vector3(1, 1, 0), new Vector3(1, 0, 0)]),

    // East Triangles
    new Triangle([new Vector3(1, 0, 0), new Vector3(1, 1, 0), new Vector3(1, 1, 1)]),
    new Triangle([new Vector3(1, 0, 0), new Vector3(1, 1, 1), new Vector3(1, 0, 1)]),

    // North Triangles
    new Triangle([new Vector3(1, 0, 1), new Vector3(1, 1, 1), new Vector3(0, 1, 1)]),
    new Triangle([new Vector3(1, 0, 1), new Vector3(0, 1, 1), new Vector3(0, 0, 1)]),

    // West Triangles
    new Triangle([new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 1)]),
    new Triangle([new Vector3(0, 0, 0), new Vector3(0, 1, 1), new Vector3(0, 0, 1)]),

    // Top Triangles
    new Triangle([new Vector3(0, 1, 0), new Vector3(0, 1, 1), new Vector3(1, 1, 1)]),
    new Triangle([new Vector3(0, 1, 0), new Vector3(1, 1, 1), new Vector3(1, 1, 0)]),

    // Bottom Triangles (Optional, if you want the bottom faces of the cube)
    new Triangle([new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 1)]),
    new Triangle([new Vector3(0, 0, 0), new Vector3(1, 0, 1), new Vector3(0, 0, 1)]),
  ];
  
  return cubeTris;
}


let delta = 0
let start = 0
let cubeA, cubeB, cubeC
function setup() {
  start = millis()
  canvasContainer = $("#canvas-container");
  width = canvasContainer.width()
  height = canvasContainer.height()
  
  const canvas = createCanvas(width, height)
  canvas.parent("canvas-container");

  // createCanvas(width, height)
  cubeA = new Object3D(makeCube()); // Add more triangles for a cube later
  cubeA.trans(new Vector3(1, 0, 4))

  cubeB = new Object3D(makeCube()); // Add more triangles for a cube later
  cubeB.trans(new Vector3(-3, -2, 7))

  cubeC = new Object3D(makeCube()); // Add more triangles for a cube later
  cubeC.trans(new Vector3(0, 2, 15))


  renderer = new Renderer(projectionMatrix);
  renderer.objects.push(cubeA, cubeB, cubeC);
}


function draw() {
  delta = (millis()- start)/ 100000
  background(0);
  cubeA.rotateX(delta)
  cubeB.rotateZ(delta)

  renderer.render();
}

