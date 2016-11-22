
$(document).ready(function(){
  //$("#countor").css("border", "3px solid red");
  setNumber(1);
  generate();
});

function buildAll(){
  setNumber(1);
  for(var i=1 ; i<=500 ; i++){
    handleDownloadAndReGenerate();
  }
}

function setNumber(val){
  $('#number').val((("000"+val).slice(-4)));
}
function getNumber(){
  return Number($('#number').val());
}

$(window).keydown(function(e){

    if(e.keyCode == 73){
      // 'I' means download and next
      handleDownloadAndReGenerate();
    }

    if(e.keyCode == 69){
      // 'E' means NO, re-generate.
      generate();
    }
});

function generate(){
  var montageController = new Montage;

  values.eye.width    = getRandomInt(180,200);
  values.eye.height   = getRandomInt(20,120);

  values.eye.sclera.top.y = getRandomInt(-120,-35);
  values.eye.sclera.top.x = getRandomInt(-50,50);

  values.eye.sclera.bottom.y = getRandomInt(35,120);
  values.eye.sclera.bottom.x = getRandomInt(-50,50);

  values.eye.sclera.right.y = getRandomInt(-50,50);
  values.eye.sclera.right.x = getRandomInt(35,120);

  values.eye.sclera.left.y = getRandomInt(-50,50);
  values.eye.sclera.left.x = getRandomInt(-120,-35);

  values.mouth.width       = getRandomInt(20,260);
  values.mouth.height      = getRandomInt(20,180);
  values.mouth.topControl.x = getRandomInt(-50,50);
  values.mouth.topControl.y = getRandomInt(-50,50);
  values.mouth.bottomControl.x = getRandomInt(-150,150);
  values.mouth.bottomControl.y = getRandomInt(-150,150);

  var size  = getRandomInt(10,60);
  values.eye.pupil.top.y     =  -size;
  values.eye.pupil.bottom.y     =  size;
  values.eye.pupil.left.x     =  -size;
  values.eye.pupil.right.x     =  size;

  for(var i = 0; i <= 7; i++){
    values.eye.pupil.controls[i] = size*0.5;
  }



  if(getRandomInt(0,500) < 250){
    values.ear.enable = true;
    values.ear.start.deg = getRandomInt(-80,0);
    values.ear.start.control.x = getRandomInt(10,200);
    values.ear.start.control.y = getRandomInt(-200,200);
    values.ear.end.deg = getRandomInt(values.ear.start.deg,30);
    values.ear.end.control.x = getRandomInt(10,200);
    values.ear.end.control.y = getRandomInt(-200,200);

  }else{
    values.ear.enable = false;
    values.ear.start.deg = null;
    values.ear.start.control.x = null;
    values.ear.start.control.y = null;
    values.ear.end.deg = null;
    values.ear.end.control.x = null;
    values.ear.end.control.y = null;
  }



  for(var i = 0; i <= 7; i++){
    values.eye.sclera.controls[i] = getRandomInt(10,80);
  }

  montageController.load(values);
  montageController.draw(values);
}

function handleDownloadAndReGenerate(){
  handleDownload();
  setNumber(getNumber()+1);
  generate();
}

function handleDownload() {
  var xs = new XMLSerializer();
  var svgroot = document.querySelector('#montage');
  var xml = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + xs.serializeToString(svgroot);
  var blob = new Blob([ xml ], { "type" : "text/plain" });

  var svgLink = document.createElement("a");
  svgLink.href = URL.createObjectURL(blob);
  svgLink.target = '_blank';
  svgLink.download = $('#number').val()+'.svg';
  svgLink.click();

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(values,undefined,"\t"))
  jsonLink = document.createElement('a')
  jsonLink.setAttribute("href",dataStr)
  jsonLink.setAttribute("download", $('#number').val()+'.json')
  jsonLink.click();

}

var values = {
  countor:{
    stroke  : 3,
    //fill    : '#FFE4C4'
    fill    : 'white'
  },

  eye:{
    width   : 180,
    height  : 40,

    sclera:{  //白目
      top     :   { x:0 , y:-60},   // N, -
      bottom  :   { x:0 , y:60},    // N, +
      right   :   { x:60 , y:0},   // +, N
      left    :   { x:-60 , y:0},  // -, N
      controls :  [10,35,10,10,50,50,120,52],  // +
      stroke  :  3,
      color   :  'white'
    },

    pupil:{   //黒目
      top     :   { x:0 , y:-30},   // N, -
      bottom  :   { x:0 , y:30},    // N, +
      right   :   { x:30 , y:0},    // +, N
      left    :   { x:-30 , y:0},   // -, N
      controls :  [20,20,20,20,20,20,20,20],  //+
      color   :  'black'
    }

  },
  mouth:{
    width       : 100,               // +
    height      : 100,                // +
    topControl  :  {x:-50 , y:60},  // N, B(-)
    bottomControl: {x:60 , y:-60},     // N, B(+)
    stroke      : 3,
    color       : 'white'
  },

  ear:{

    enable : true,

    start:{
      deg       :  -80,             // -
      control   : {x:90,  y:200}   // +,N
    },
    end:{
      deg       : 10,               // +
      control   : {x:180,  y:-200}    // +,N
    },
    stroke: 3,
    color : 'white'


  }
};




class Montage{
  constructor(){
    this.size = 500;

    this.width = this.size;
    this.height = this.size;


    this.eyeleft = $("#eyeleft");
    this.eyeright = $("#eyeleft");

    //Initialize countor
    this.countorView = $("#countor");

    this.countorView.attr('stroke','black');
    this.countorView.attr('cx',this.size/2);
    this.countorView.attr('cy',this.size/2);
    this.countorView.attr('r',200);
    this.countorView.attr('stroke-width','1');
    this.countorView.attr('fill','white');

    //Inialize Views
    this.mouthView = $("#mouth");
    this.eyeView = $("#eye");
    this.earView  = $("#ear");

    //Inialize Models
    this.mouthModel = new Mouth;
    this.eyeModel   = new Eye; //白目
    this.pupilModel = new Eye; //黒目
    this.earModel   = new Ear(200); //countor radius

  }

  load(values){
    //load values from JS Hash
    this.values = values;

    //Mouth
    this.mouthModel.topControl = new Point(
      values.mouth.topControl.x,
      values.mouth.topControl.y
    );
    this.mouthModel.bottomControl = new Point(
      values.mouth.bottomControl.x,
      values.mouth.bottomControl.y
    );
    this.mouthModel.width = values.mouth.width;

    //Eye (sclera)
    this.eyeModel.top = new Point(
      values.eye.sclera.top.x,
      values.eye.sclera.top.y
    );
    this.eyeModel.bottom = new Point(
      values.eye.sclera.bottom.x,
      values.eye.sclera.bottom.y
    );
    this.eyeModel.right = new Point(
      values.eye.sclera.right.x,
      values.eye.sclera.right.y
    );
    this.eyeModel.left = new Point(
      values.eye.sclera.left.x,
      values.eye.sclera.left.y
    );
    this.eyeModel.controls = values.eye.sclera.controls;

    //Eye(pupil)
    this.pupilModel.top = new Point(
      values.eye.pupil.top.x,
      values.eye.pupil.top.y
    );
    this.pupilModel.bottom = new Point(
      values.eye.pupil.bottom.x,
      values.eye.pupil.bottom.y
    );
    this.pupilModel.right = new Point(
      values.eye.pupil.right.x,
      values.eye.pupil.right.y
    );
    this.pupilModel.left = new Point(
      values.eye.pupil.left.x,
      values.eye.pupil.left.y
    );
    this.pupilModel.controls = values.eye.pupil.controls;

    //Ear
    this.earModel.startDeg = values.ear.start.deg;
    this.earModel.endDeg   = values.ear.end.deg;
    this.earModel.start.control.x = values.ear.start.control.x;
    this.earModel.start.control.y = values.ear.start.control.y;
    this.earModel.end.control.x   = values.ear.end.control.x;
    this.earModel.end.control.y   = values.ear.end.control.y;
  }

  draw(){
    //Draw All components

    //*** Countor ***
    this.countorView.attr('stroke-width',values.countor.stroke);
    this.countorView.attr('fill',values.countor.fill);

    //***  Mouth ***
    var mouthOrigin = new Point(this.width/2,this.height/2+this.values.mouth.height);
    var mouth = Mouth.offset(this.mouthModel,mouthOrigin);
    this.mouthView.empty();
    this.drawMouth(mouth,this.values.mouth.color,this.values.mouth.stroke);

    //*** Eyes ***
    var rightEyeOrigin = new Point(
      this.width/2+this.values.eye.width/2,
      this.height/2-this.values.eye.height
    );
    var leftEyeOrigin = new Point(
      this.width/2-this.values.eye.width/2,
      this.height/2 - this.values.eye.height
    );

    this.rightEye   = Eye.offset(this.eyeModel,rightEyeOrigin);
    this.leftEye    = Eye.offset(this.eyeModel.lineSymY(),leftEyeOrigin);
    this.rightPupil = Eye.offset(this.pupilModel,rightEyeOrigin);
    this.leftPupil = Eye.offset(this.pupilModel.lineSymY(),leftEyeOrigin);

    this.eyeView.empty();
    this.drawEye(this.rightEye,values.eye.sclera.color,values.eye.sclera.stroke);
    this.drawEye(this.leftEye,values.eye.sclera.color,values.eye.sclera.stroke);
    this.drawEye(this.rightPupil,values.eye.pupil.color,0);
    this.drawEye(this.leftPupil,values.eye.pupil.color,0);

    //*** ear ***
    var earOrigin = new Point(this.width/2,this.height/2);
    this.rightEar  = Ear.offset(this.earModel,earOrigin);
    this.leftEar   = Ear.offset(this.earModel.lineSymY(),earOrigin);

    this.earView.empty();

    if(values.ear.enable == true){
      this.drawEar(this.rightEar,values.ear.color,values.ear.stroke);
      this.drawEar(this.leftEar,values.ear.color,values.ear.stroke);
    }
  }




  drawEar(ear,fill='transparent',strokeWidth='1px'){
    var strokeStr  = `M${ear.start.point.x} ${ear.start.point.y} `
                + `C${ear.start.controlAbs.x} ${ear.start.controlAbs.y}, `
                + `${ear.end.controlAbs.x} ${ear.end.controlAbs.y}, `
                + `${ear.end.point.x} ${ear.end.point.y}   `;

    var stroke = svg2jqr('path');
    stroke.attr('stroke','black');
    stroke.attr('stroke-width',strokeWidth);
    stroke.attr('d',strokeStr);
    stroke.attr('fill',fill);

    this.earView.append(stroke);
  }

  drawEye(eye,fill='transparent',strokeWidth='1px'){

    var strokeStr  = `M${eye.topLeftStart.point.x} ${eye.topLeftStart.point.y} `
                + `C${eye.topLeftStart.controlAbs.x} ${eye.topLeftStart.controlAbs.y}, `
                + `${eye.topLeftEnd.controlAbs.x} ${eye.topLeftEnd.controlAbs.y}, `
                + `${eye.topLeftEnd.point.x} ${eye.topLeftEnd.point.y}   `

                + `C${eye.topRightStart.controlAbs.x} ${eye.topRightStart.controlAbs.y}, `
                + `${eye.topRightEnd.controlAbs.x} ${eye.topRightEnd.controlAbs.y}, `
                + `${eye.topRightEnd.point.x} ${eye.topRightEnd.point.y}   `

                + `C${eye.bottomRightStart.controlAbs.x} ${eye.bottomRightStart.controlAbs.y}, `
                + `${eye.bottomRightEnd.controlAbs.x} ${eye.bottomRightEnd.controlAbs.y}, `
                + `${eye.bottomRightEnd.point.x} ${eye.bottomRightEnd.point.y}   `

                + `C${eye.bottomLeftStart.controlAbs.x} ${eye.bottomLeftStart.controlAbs.y}, `
                + `${eye.bottomLeftEnd.controlAbs.x} ${eye.bottomLeftEnd.controlAbs.y}, `
                + `${eye.bottomLeftEnd.point.x} ${eye.bottomLeftEnd.point.y}  Z `;

    var stroke = svg2jqr('path');
    stroke.attr('stroke','black');
    stroke.attr('stroke-width',strokeWidth);
    stroke.attr('d',strokeStr);
    stroke.attr('fill',fill);

    this.eyeView.append(stroke);

  }



  drawMouth(mouth,fill='white',strokeWidth='1px'){

    var strokeStr  = `M${mouth.topStart.point.x} ${mouth.topStart.point.y} `
                + `C${mouth.topStart.controlAbs.x} ${mouth.topStart.controlAbs.y}, `
                + `${mouth.topEnd.controlAbs.x} ${mouth.topEnd.controlAbs.y}, `
                + `${mouth.topEnd.point.x} ${mouth.topEnd.point.y}   `

                + `M${mouth.bottomStart.point.x} ${mouth.bottomStart.point.y} `
                + `C${mouth.bottomStart.controlAbs.x} ${mouth.bottomStart.controlAbs.y}, `
                + `${mouth.bottomEnd.controlAbs.x} ${mouth.bottomEnd.controlAbs.y}, `
                + `${mouth.bottomEnd.point.x} ${mouth.bottomEnd.point.y}`;

    var stroke = svg2jqr('path');
    stroke.attr('stroke','black');
    stroke.attr('stroke-width',strokeWidth);
    stroke.attr('d',strokeStr);
    stroke.attr('fill',fill)

    this.mouthView.append(stroke);

  }
}
