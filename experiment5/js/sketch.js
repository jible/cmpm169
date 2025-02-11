// Making a cube
let cubeTris = [
  // South Triangles
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0)] ),
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(1, 1, 0), new Vector3(1, 0, 0)] ),
  
  // East Triangles
  new Triangle ( [new Vector3(1, 0, 0), new Vector3(1, 1, 0), new Vector3(1, 1, 1)] ),
  new Triangle ( [new Vector3(1, 0, 0), new Vector3(1, 1, 1), new Vector3(1, 0, 1)] ),
  
  // North Triangles
  new Triangle ( [new Vector3(1, 0, 1), new Vector3(1, 1, 1), new Vector3(0, 1, 1)] ),
  new Triangle ( [new Vector3(1, 0, 1), new Vector3(0, 1, 1), new Vector3(0, 0, 1)] ),
  
  // West Triangles
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 1)] ),
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(0, 1, 1), new Vector3(0, 0, 1)] ),
  
  // Top Triangles
  new Triangle ( [new Vector3(0, 1, 0), new Vector3(0, 1, 1), new Vector3(1, 1, 1)] ),
  new Triangle ( [new Vector3(0, 1, 0), new Vector3(1, 1, 1), new Vector3(1, 1, 0)] ),
  
  // Bottom Triangles (Optional, if you want the bottom faces of the cube)
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(1, 0, 0), new Vector3(1, 0, 1)] ),
  new Triangle ( [new Vector3(0, 0, 0), new Vector3(1, 0, 1), new Vector3(0, 0, 1)] ),
]



function setup() {
  canvasContainer = $("#canvas-container");
  width = canvasContainer.width()
  height = canvasContainer.height()
  
  const canvas = createCanvas(width, height)
  canvas.parent("canvas-container");

  // createCanvas(width, height)
   let cube = new Object3D(cubeTris); // Add more triangles for a cube later
  cube.trans(new Vector3(1, 2, 3))
  renderer = new Renderer(projectionMatrix);
  renderer.objects.push(cube);
}


function draw() {

  background(0);
  renderer.render();
}

