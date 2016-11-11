class Bezier{
  constructor(x,y,cx,cy){
    this.point = Point.new(x,y);
    this.control = Point.new(cx,cy);
  }

  get controlAbs(){
    //Absolute value of control point
    return Point.add(this.point,this.control);
  }

  lineSymY(){
    return new Bezier(-this.point.x,this.point.y,-this.control.x,this.control.y);
  }

  static new(x,y,cx,cy){
    return new Bezeir(x,y,cx,cy);
  }

  static offset(bezier,offset){
    //Add offset value to point and control
    // bezier : Class 'Bezier'
    // offset : Class 'Point'
    var output = new Bezier;
    output.point = Point.add(bezier.point,offset);
    output.control = bezier.control;
    return output;
  }
}

class Point{
  constructor(x=0,y=0){
    this.x = x;
    this.y = y;
  }

  lineSymY(){
     return new Point(-this.x,this.y);
  }

  static new(x,y){
    return new Point(x,y);
  }
  static add(p1,p2){
    var point = new Point();33
    point.x = p1.x + p2.x;
    point.y = p1.y + p2.y;
    return point;
  }
  static checkClass(point){
    if (!(point instanceof Point)){
      throw new Error("Invalid argument. Is not instance of Point");
    }
  }
}

function svg2jqr(val){
  var dom = document.createElementNS("http://www.w3.org/2000/svg", val);
  return $(dom);
}

function getRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}
