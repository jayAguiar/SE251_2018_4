function invert()
{

 var imageData = ctx3.getImageData(0,0, c3.width, c3.height);
 var data = imageData.data;
    
  
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    //ctx.putImageData(imageData, 0, 0);
	console.log(imageData);

}


/*function copy()
{
var imgData=ctx.getImageData(10,10,50,50);
alert(imgData.data[3]);
//ctx.putImageData(imgData,10,70);
}*/
