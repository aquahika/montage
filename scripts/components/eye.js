class Eye{

    constructor(){
      // 8 bezier
      this.topLeftStart = new Bezier();
      this.topLeftEnd = new Bezier();

      this.topRightStart = new Bezier();
      this.topRightEnd = new Bezier();

      this.bottomLeftStart = new Bezier();
      this.bottomLeftEnd = new Bezier();

      this.bottomRightStart = new Bezier();
      this.bottomRightEnd = new Bezier();

      this.possitiveError = new Error("Invalid argument. It muse be positive value.(>=0)");

      this.controls = [0,0,0,0,0,0,0,0];
    }

    lineSymY(){
      var output = new Eye;
      output.topLeftStart = this.topLeftStart.lineSymY();
      output.topLeftEnd = this.topLeftEnd.lineSymY();

      output.topRightStart = this.topRightStart.lineSymY();
      output.topRightEnd = this.topRightEnd.lineSymY();

      output.bottomLeftStart = this.bottomLeftStart.lineSymY();
      output.bottomLeftEnd = this.bottomLeftEnd.lineSymY();

      output.bottomRightStart = this.bottomRightStart.lineSymY();
      output.bottomRightEnd = this.bottomRightEnd.lineSymY();

      return output;
    }

    set controls(arr){
      this.c1 = arr[0];
      this.c2 = arr[1];
      this.c3 = arr[2];
      this.c4 = arr[3];
      this.c5 = arr[4];
      this.c6 = arr[5];
      this.c7 = arr[6];
      this.c8 = arr[7];
    }
    get controls(){
      var arr = new Array;
      arr[0] = this.c1;
      arr[1] = this.c2;
      arr[2] = this.c3;
      arr[3] = this.c4;
      arr[4] = this.c5;
      arr[5] = this.c6;
      arr[6] = this.c7;
      arr[7] = this.c8;
    }

    set c1(scalar){
      this._c1 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.topLeftStart.control.y = -scalar;
    }
    get c1(){  return this._c1;  }


    set c2(scalar){
      this._c2 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.topLeftEnd.control.x = -scalar;
    }
    get c2(){  return this._c2;  }



    set c3(scalar){
      this._c3 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.topRightStart.control.x = scalar;
    }
    get c3(){  return this._c3;  }


    set c4(scalar){
      this._c4 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.topRightEnd.control.y = -scalar;
    }
    get c4(){  return this._c4;  }


    set c5(scalar){
      this._c5 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.bottomRightStart.control.y = scalar;
    }
    get c5(){  return this._c5;  }


    set c6(scalar){
      this._c6 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.bottomRightEnd.control.x = scalar;
    }
    get c6(){  return this._c6;  }


    set c7(scalar){
      this._c7 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.bottomLeftStart.control.x = -scalar;
    }
    get c7(){  return this._c7;  }


    set c8(scalar){
      this._c8 = scalar;
      if(scalar < 0){
        throw this.possitiveError;
      }
      this.bottomLeftEnd.control.y = scalar;
    }
    get c8(){  return this._c8;  }



    set top(point){
      Point.checkClass(point);
      this._top = point;
      this.topLeftEnd.point = point;
      this.topRightStart.point = point;
    }
    get top(){ return this._top; }


    set bottom(point){
      Point.checkClass(point);
      this._bottom = point;
      this.bottomRightEnd.point = point;
      this.bottomLeftStart.point = point;
    }
    get bottom(){ return this._bottom; }


    set left(point){
      Point.checkClass(point);
      this._left = point;
      this.topLeftStart.point = point;
      this.bottomLeftEnd.point = point;
    }
    get left(){ return this._left; }


    set right(point){
      Point.checkClass(point);
      this._right = point;
      this.topRightEnd.point = point;
      this.bottomRightStart.point = point;
    }
    get right(){ return this._right; }

    static offset(eye,position){
      if (!(eye instanceof Eye)){
        new Error("Invalid argument. Argument[0] muse be class of 'Eye'");
      }
      Point.checkClass(position);

      var output = new Eye;

      output.topLeftStart = Bezier.offset(eye.topLeftStart,position);
      output.topLeftEnd = Bezier.offset(eye.topLeftEnd,position);

      output.topRightStart = Bezier.offset(eye.topRightStart,position);
      output.topRightEnd = Bezier.offset(eye.topRightEnd,position);

      output.bottomLeftStart = Bezier.offset(eye.bottomLeftStart,position);
      output.bottomLeftEnd = Bezier.offset(eye.bottomLeftEnd,position);

      output.bottomRightStart = Bezier.offset(eye.bottomRightStart,position);
      output.bottomRightEnd = Bezier.offset(eye.bottomRightEnd,position);

      return output;

    }

}
