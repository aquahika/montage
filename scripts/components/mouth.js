class Mouth{
  constructor(){
    this.topStart = new Bezier();
    this.topEnd = new Bezier();

    this.bottomStart = new Bezier();
    this.bottomEnd = new Bezier();

    this._topControl = new Point();
    this._bottomControl = new Point();

    this.width=100;
  }

  set width(width){
    this._width = width;
    this.topStart.point.x = -(width/2);
    this.topEnd.point.x = +(width/2);
    this.bottomStart.point.x = -(width/2);
    this.bottomEnd.point.x = +(width/2);
  }
  get width(){ return this._width; }

  set topControl(point){
    this._topControl = point;

    //Inverse X-axis of Start bezier control point
    this.topStart.control.x = -(point.x);
    this.topStart.control.y = point.y;

    this.topEnd.control = point;
  }
  get topControl(){ return this._topControl; }


  set bottomControl(point){
    this._bottomControl = point;

    //Inverse X-axis of Start bezier control point
    this.bottomStart.control.x = -(point.x);
    this.bottomStart.control.y = point.y;

    this.bottomEnd.control = point;
  }
  get bottomControl(){ return this._bottomControl; }

  static offset(mouth,position){
    if (!(mouth instanceof Mouth)){
      new Error("Invalid argument. Argument[0] muse be class of 'Mouth'");
    }
    Point.checkClass(position);

    console.log(mouth);

    var output = new Mouth;

    output.topStart = Bezier.offset(mouth.topStart,position);
    output.topEnd   = Bezier.offset(mouth.topEnd,position);

    output.bottomStart  = Bezier.offset(mouth.bottomStart,position);
    output.bottomEnd    = Bezier.offset(mouth.bottomEnd,position);


    return output;

  }

}
