function Item(canvas, source, world, spd, sourceData)
{
  this.c = canvas.c;
  this.ctx = canvas.ctx;
  this.world = world;
  this.x = this.c.width/2;
  this.y = this.c.height/2;
  this.worldX = function(){return this.x + world.x;}
  this.worldY = function(){return this.y + world.y;}
  this.spd = spd;
  this.source = source;
  this.sourceData;
  if(this.sourceData == undefined)
  {
	this.sourceData = null;
  }
  else
  {
	this.sourceData = sourceData
  }
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
  this.width;
  this.height;
  this.sprite = new Sprite(this.sourceData, this, this.source);
  if(this.sprite.data){
  this.width = function(){return this.sprite.data.frames[0][0].sourceSize.w * this.scaleX; };
  this.height= function(){return this.sprite.data.frames[0][0].sourceSize.h * this.scaleY};
  }
  else
  {
  this.width = function(){return this.sprite.image.height * this.scaleX;};
  this.height= function(){return this.sprite.image.height * this.scaleY;};
  }
  this.canJump = false;
  this.sprite.crossOrigin="anonymous";
  this._index = 0;
  this.direction = 0;
  
  this.index = function()
  {
	this._index++
	if(this._index >= this.sprite.data.frames[this.direction].length)this._index = 0;
	
	return this._index;
  }
  //draws the Sprite
  this.drawSprite = function(i)
  {
	var _i
	if(i != undefined){_i = i;}
	else{_i = this.index(this.direction)}
	if(this.sprite.data != null){
    this.ctx.drawImage
	(
	this.sprite.image,
	this.worldX() - this.width()/2 - this.sprite.data.frames[this.direction][_i].frame.x*this.scaleX,
	this.worldY() - this.height()/2 - this.sprite.data.frames[this.direction][_i].frame.y*this.scaleY, this.sprite.width(), 
	this.sprite.height()
	);
	}
	else
	{
	this.ctx.drawImage
	(
	this.sprite.image,
	this.worldX() - this.width()/2 * this.scaleX,
	this.worldY() - this.height()/2 * this.scaleY, this.sprite.width(), 
	this.sprite.height()
	);
	}
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
  		if(this.fixedVX()!==0)
  		{
  		return this.fixedVX()/Math.abs(this.fixedVX());
  		}
  		else
  		{
  		return 0;
  		}
  		
  }
  this.directionY = function()
  {
  		if(this.fixedVY()!==0)
  		{
			return this.fixedVY()/Math.abs(this.fixedVY());
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
   //returns hit points and alpha of pixel
 this.checkWallCollision = function(point, object){
	var imgData= object.ctx.getImageData(point.x, point.y,1,1);
	return {color:imgData.data};
  }
  this.top = function()
  {
  	 var point = {x:this.worldX(),y:this.worldY()-this.height()/2};
     return {x:point.x,y:point.y};
  }
  this.bottom = function()
  {
  	var point = {x:this.worldX(),y:this.worldY()+this.height()/2};
    return {x:point.x,y:point.y}; 
  }
  this.right = function()
  {
  	var point = {x:this.worldX()+this.width()/2,y:this.worldY()};
    return {x:point.x,y:point.y};
  }
  this.left = function()
  {
  	var point = {x:this.worldX()-this.width()/2,y:this.worldY()};
    return {x:point.x,y:point.y};
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