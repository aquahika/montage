class Ear{
  constructor(radius = 200){
    this.radius = radius;
    this.start = new Bezier();
    this.end   = new Bezier();
  }

  set startRad(radian){
    this._startRad = radian;
    this.start.point.x = this.radius * Math.cos(radian);
    this.start.point.y = this.radius * Math.sin(radian);
  }
  set startDeg(deg){
    this.startRad = deg * Math.PI / 180;
  }
  get startRad(){return this._startRad};

  set endRad(radian){
    this._endRad = radian;
    this.end.point.x = this.radius * Math.cos(radian);
    this.end.point.y = this.radius * Math.sin(radian);
  }
  set endDeg(deg){
    this.endRad = deg * Math.PI / 180;
  }
  get endRad(){return this._endRad};

  static offset(ear,position){
    if (!(eye instanceof Ear)){
      new Error("Invalid argument. Argument[0] muse be class of 'Ear'");
    }
    Point.checkClass(position);

    var output = new Ear;

    output.startRad = ear.startRad;
    output.endRad   = ear.endRad;
    output.start = Bezier.offset(ear.start,position);
    output.end   = Bezier.offset(ear.end,position);

    return output;

  }

  lineSymY(){
    var output = new Eye;
    output.start = this.start.lineSymY();
    output.end   = this.end.lineSymY();
    return output;
  }

}
