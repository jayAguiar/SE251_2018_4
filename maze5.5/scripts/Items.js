function drawItems(css, layer, world, imageObj, source, _sourceData) {
       
        var c = document.createElement("canvas");	
		c.setAttribute("width", String(imageObj.width));
  		c.setAttribute("height", String(imageObj.height));
		c.setAttribute("style", css);
  		c.style.zIndex = String(layer);
		c.style.border = "1px solid green";
  		
		var sourceData = _sourceData;
  		if(sourceData == undefined)
		{
			sourceData = null;
		}
		
	    var items = [];
        var x =0;
        var y = 0;
		c.width = String(imageObj.width);
		c.height = String(imageObj.height);
	
		
  		document.body.appendChild(c);
  		var ctx = c.getContext("2d");
        ctx.drawImage(imageObj, x, y);
        var imageData = ctx.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;
        
	 	var index = 0;
		
        for(var i = 0; i < data.length; i += 4) 
		{
          // red
         // data[i] = 255 - data[i];
          // green
         // data[i + 1] = 255 - data[i + 1];
          // blue
         // data[i + 2] = 255 - data[i + 2];
		  //alpha
		 if(data[i] == 255)
		 {console.log(c.height)
			 var _x = (Math.floor(i / 4) % imageObj.width);
			 var _y = Math.floor(Math.floor(i/imageObj.width)/4);
			items[index]= (new Item({c:c, ctx:ctx},source, level, 0, sourceData));
			items[index].x = _x*world.scaleX;
			items[index].y = _y*world.scaleY;
			index++;
			console.log(Math.floor(i/imageObj.width)/4);
			
		 }
        }

        // overwrite original image with an inverted color
       	// context.putImageData(imageData, x, y);
		c.width = viewPort.width;
		c.height = viewPort.height;
		
		return {items:items, ctx:ctx, c:c};
      }