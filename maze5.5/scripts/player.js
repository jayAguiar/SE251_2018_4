function Player(css, layer, source, spd, world)
{

 
  var c = document.createElement("canvas");
  c = document.createElement("canvas");
  c.setAttribute("width", css.width);
  c.setAttribute("height", css.height);
  c.style.zIndex = String(layer);
  c.style.border = "1px red solid";
 
  this.ctx = c.getContext("2d");
  this.c = c;
  document.body.appendChild(this.c);
  this.level = world;
  if(world != this.parent){world = {x:0,y:0}};
  this.x = this.c.width/2;
  this.y = this.c.height/2;
  this.worldX = function(){return this.x + world.x;}
  this.worldY = function(){return this.y + world.y;}
  this.spd = spd;
  this.vy = 0;
  this.vx = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  
  //the actual amount of pixels the player moved after collision
  this.actualVX = 0;
  this.actualVY = 0;
  
  this.ax = 0;
  this.ay = 0;
  this.rotation = 0;
  this.color ="#ff0000";
  this.scaleX = 1;
  this.scaleY = 1; 
  
  this.sprite = new Sprite(getPlayer(), this, source);
  this.width = function(){return this.sprite.data.frames[0][0].sourceSize.w * this.scaleX};
  this.height= function(){return this.sprite.data.frames[0][0].sourceSize.h * this.scaleY};
  this.canJump = false;
  this.sprite.crossOrigin="anonymous";
  this._index = 0;
  this.spriteDirection = 2;
  
  this.index = function()
  {
	this._index++
	if(this._index >= this.sprite.data.frames[this.spriteDirection].length)this._index = 0;
	
	return this._index;
  }
  //draws the Sprite
  this.drawSprite = function(i)
  {
	this.ctx.save();
		this.draw();
		this.ctx.globalCompositeOperation = "source-in";
	var _i
	if(i != undefined){_i = i;}
	else{_i = this.index(this.spriteDirection)}
	
    this.ctx.drawImage
	(
	this.sprite.image,
	this.worldX() - this.width()/2 - this.sprite.data.frames[this.spriteDirection][_i].frame.x*this.scaleX,
	this.worldY() - this.height()/2 - this.sprite.data.frames[this.spriteDirection][_i].frame.y*this.scaleY, this.sprite.width(), 
	this.sprite.height()
	);
	this.ctx.restore();
  }
  
  this.setVX = function (x) 
  {
	 this.vx = x;
  }
  this.getVX = function()
  {
	  return this.actualVX;
  }  
  this.regulateVX = function()
  { 
	this.actualVX = Math.round(this.vx)
	return this;
  }
  
  this.setVY = function (y) 
  {
	 this.vy = y;
  }
				
  this.regulateVY = function()
  { 
	this.actualVY = Math.round(this.vy)
	return this;
  }
 this.getVY = function()
  {
	  return this.actualVY;
  }  
  this.applyFrictionX = function(friction)
  {
	  this.vx *= friction;
	  return this;
  }
  
  this.applyFrictionY = function(friction)
  {
	  this.vy *= friction;
	  return this;
  }
  
  this.accelerateX = function(spd)
  {
	 this.vx += spd; 
	 return this;
  }
  
  this.accelerateY = function(spd)
  {
	 this.vy += spd; 
	 return this;
  }
  
  this.stopX = function(spd)
  {
	 this.vx = 0;
	 this.x += spd;
	 this.actualVX += spd;
  }
  
  this.stopY = function(spd)
  {
	 this.vy = 0;
	 this.y += spd;
	 this.actualVY += spd;
  }
  
  this.cameraFollow = function()
  {
 	this.y += -this.getVY();
  	this.x += -this.getVX();
  	this.level.x += -this.getVX();
  	this.level.y += -this.getVY();
  }
 /* this.moveX = function(dir){
	  this.x += dir ;
	  return this;
  }
  this.moveY = function(dir){
	   this.y += dir;
	   return this;
  }*/
  this.jump = function(impulse)
  {
	this.canJump = false; 
	this.vy = -impulse;
	return this;
  }
  //The players velocity fixed to pixel lengths
 this.fixedVX = function()
  {
  	return Math.round(this.vx);
  }
  this.fixedVY = function()
  {
  	return Math.round(this.vy);
  }
  
  //The direction the player is moving in. This returns 1 or -1
  this.directionX = function()
  {
  		if(this.getVX()!==0)
  		{
			return this.getVX()/Math.abs(this.getVX());
  		}
  		else
  		{
			return 0;
  		}
  		
  }
  this.directionY = function()
  
  {
  		if(this.getVY()!==0)
  		{
			return this.getVY()/Math.abs(this.getVY());
  		}
  		else
  		{
			return 0;
  		}
  }
 
  //draws the player 
  this.draw = function()
  {
 	this.ctx.fillStyle=this.color;
  	this.ctx.save();
    this.ctx.translate(this.worldX(), this.worldY());
    this.ctx.rotate(this.rotation * Math.PI/180);
 	this.ctx.fillRect(this.width()/-2,this.height()/-2,this.width(),this.height());
  	this.ctx.restore();
  }
  
  //returns hit points and alpha of pixel
  this.checkPixelColor = function(point, object)
  {
	var imgData= object.ctx.getImageData(point.x, point.y,1,1);
	return {color:imgData.data};
  }
  this.checkCollision = function(point, obj)
  {
		 if(this.checkPixelColor(point, obj).color[3] != 0)
		 {
			return true;
		 }
		 else
		 {
			 return false;
		 }
  }
  
	  
  this.top = function()
  {
  	 var point = {x:this.worldX(),y:this.worldY()-this.height()/2};
     return {x:point.x, y:point.y, obstructed:this.checkCollision(point, this.level), direction:1};
  }
  this.bottom = function()
  {
  	var point = {x:this.worldX(),y:this.worldY()+this.height()/2};
    return {x:point.x,y:point.y, obstructed:this.checkCollision(point, this.level), direction:-1};
  }
  this.right = function()
  {
  	var point = {x:this.worldX()+this.width()/2,y:this.worldY()};
    return {x:point.x,y:point.y, obstructed:this.checkCollision(point, this.level), direction:-1};
  }
  this.left = function()
  {
  	var point = {x:this.worldX()-this.width()/2,y:this.worldY()};
    return {x:point.x,y:point.y, obstructed:this.checkCollision(point, this.level), direction:1};
  }
  
  this.points = function(){return[this.top(), this.bottom(), this.left(), this.right()];}
  
  this.drawpoints = function(array)
  {
	var points;
	if(array ==null){points=this.points()}
	else points= array;
  	this.ctx.fillStyle = "black";
  	for(var i=0; i < points.length; i++)
  	{
  		this.ctx.fillRect(points[i].x-2, points[i].y-2, 4,4)
  	}
  }
  
  this.hitTestObject = function(object)
  {
	if(this.bottom().y > object.top().y && this.top().y < object.bottom().y &&
	   this.left().x < object.right().x && this.right().x > object.left().x) 
	{
		return true;
	}
	else
	{
		return false;
	}
  }
} 