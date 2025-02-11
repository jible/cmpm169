
// Consants for projection Matrix
let height = 400
let width = 400


let fNear = .1
let fFar = 1000.0
let fFov = 90.0
let fAspectRatio = height/ width
let fFovRad = 1.0/ Math.tan(fFov * 0.5 / 180.0 * Math.PI)




// Declare classes

class Vector2{
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

class Vector3{
  constructor(x,y,z){
    this.x = x
    this.y = y
    this.z = z
  }
}


class Triangle{
  constructor(points){
    this.points= points
  }
  
  drawMe(pM){
    this.projected = new Triangle()
    this.projected.points = this.points.map(p => multiplyMatrixVector(p, pM));
    
    for (let i = 0; i < 3; i++){
      this.projected.points[i].x = this.projected.points[i].x * width / 2 + width / 2
      this.projected.points[i].y = this.projected.points[i].y * height / 2 + height / 2
    }
    
    drawLine(this.projected.points[0],this.projected.points[1])
    drawLine(this.projected.points[1],this.projected.points[2])
    drawLine(this.projected.points[2],this.projected.points[0])
    
    
  }
}

function drawLine(pointA, pointB){
  let clr = [0,0,0]
  if (pointA.x != pointB.x ){
    clr [ 0 ]= 255
  }
  if (pointA.y != pointB.y ){
    clr [ 1 ]= 255
  }
  if (pointA.z != pointB.z ){
    clr [ 2 ]= 255
  }
  
  stroke(clr[0], clr[1], clr[2], )
  line(
      pointA.x,pointA.y,
      pointB.x,pointB.y
    )
}


class Object3D{
  constructor(triangles){
    this.origin = new Vector3(0,0,0)
    this.triangles = triangles
  }
  
  drawMe(pM){
    for (let tri of this.triangles){
      tri.drawMe(pM)
    }
  }
  
  trans(v){
    this.origin.x += v.x
    this.origin.y += v.y
    this.origin.z += v.z
    for (let tri of this.triangles){
      for (let points of tri.points){
        points.x += v.x
        points.y += v.y
        points.z += v.z
      }
    }
  }

  rotateX(theta) {
    for (let tri of this.triangles) {
      for (let point of tri.points) {
        // Translate the point to the origin
        let translatedPoint = new Vector3(point.x - this.origin.x, point.y - this.origin.y, point.z - this.origin.z);
        
        // Apply the rotation to the translated point
        let rotatedPoint = multiplyMatrixVector(translatedPoint, new RotationXMatrix(theta));
  
        // Translate back to original position
        point.x = rotatedPoint.x + this.origin.x;
        point.y = rotatedPoint.y + this.origin.y;
        point.z = rotatedPoint.z + this.origin.z;
      }
    }
  }

  rotateZ(theta) {
    for (let tri of this.triangles) {
      for (let point of tri.points) {
        // Translate the point to the origin
        let translatedPoint = new Vector3(point.x - this.origin.x, point.y - this.origin.y, point.z - this.origin.z);
        
        // Apply the rotation to the translated point
        let rotatedPoint = multiplyMatrixVector(translatedPoint, new RotationZMatrix(theta));
  
        // Translate back to original position
        point.x = rotatedPoint.x + this.origin.x;
        point.y = rotatedPoint.y + this.origin.y;
        point.z = rotatedPoint.z + this.origin.z;
      }
    }
  }
}

class Renderer{
  constructor(projectionMatrix){
    this.pM = projectionMatrix
    this.objects = []
  }
  
  render(){
    for (let obj of this.objects){
      obj.drawMe(this.pM)
    }
    
  }
}



class Matrix{
  // m [row][column]
  constructor(){
    this.m = []
    for (let i  = 0; i < 4; i++ ) {
      this.m[i] = []
      for (let j = 0; j < 4; j++ ) {
        this.m[i][j] = 0
      }
    }
  }
}




class RotationZMatrix extends Matrix{
    constructor(theta){
        super()
        this.m[0][0] = Math.cos(theta)
        this.m[0][1] = Math.sin(theta) 
        this.m[1][0] = - Math.sin(theta)
        this.m[1][1] = Math.cos(theta)
        this.m[2][2] = 1
        this.m[3][3] = 1
    }
}

class RotationXMatrix extends Matrix {
    constructor(theta) {
      super();
      this.m[0][0] = 1;
      this.m[1][1] = Math.cos(theta);
      this.m[1][2] = Math.sin(theta);
      this.m[2][1] = -Math.sin(theta);
      this.m[2][2] = Math.cos(theta);
      this.m[3][3] = 1;
    }
  }
  


// Configure Projection Matrix
let projectionMatrix = new Matrix()
projectionMatrix.m [0][0] = fAspectRatio * fFovRad
projectionMatrix.m [1][1] = fFovRad
projectionMatrix.m [2][2] = fFar/(fFar - fNear)
projectionMatrix.m [3][2] = (-fFar * fNear ) / (fFar - fNear)
projectionMatrix.m [2][3] = 1.0
projectionMatrix.m [3][3] = 0.0



// FUNCTIONS

function multiplyMatrixVector(v, m){
  let o = new Vector3()
  o.x = v.x * m.m[0][0] + v.y * m.m[1][0] + v.z * m.m[2][0] + m.m[3][0]
  o.y = v.x * m.m[0][1] + v.y * m.m[1][1] + v.z * m.m[2][1] + m.m[3][1]
  o.z = v.x * m.m[0][2] + v.y * m.m[1][2] + v.z * m.m[2][2] + m.m[3][2]
  let w = v.x * m.m[0][3] + v.y * m.m[1][3] + v.z * m.m[2][3] + m.m[3][3]

  if ( w!= 0){
    o.x = o.x/w
    o.y = o.y/w
    o.z = o.z/w
  }
  return o

}


// class Camera{
  
//   constructor(pos){   
//     this.pos = pos
//   }
// }

