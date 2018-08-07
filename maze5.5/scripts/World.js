function World(css, layer, sprite, map, bg){


  this.c = document.createElement("canvas");
  this.c.setAttribute("width", String(css.width));
  this.c.setAttribute("height", String(css.height));
  this.c.style.zIndex = String(layer);
  if(bg != undefined)
  {
    this.bg = bg;
	this.background="";
	for(var i=0; i < this.bg.length; i++)
	{
		this.background += "url(" +
		bg[i] +
		")"
		if(i!=bg.length-1)this.background+=","
	}
  }
  else
  {
	  this.bg = "none";
  }
  this.c.style.backgroundImage = this.background;
  document.body.appendChild(this.c);
  this.ctx = this.c.getContext("2d");
  this.x = 0;
  this.y = 0;
  this.gravity = 1;
  this.scaleX = 1;
  this.scaleY = 1;
  this.sprite = new Sprite(null, this, sprite);
  this.sprite.crossOrigin="anonymous";
  console.log(this.sprite.image);
  this.map = new Sprite(null, this, map);
  this.map.crossOrigin="anonymous";
  this.width = function(){return this.sprite.width * this.scaleX};
  this.height= function(){return this.sprite.width * this.scaleY};
  this.draw = function()
  	{
    this.ctx.drawImage(this.sprite.image,this.x,this.y,this.sprite.width(), 
	this.sprite.height());
  	}
  this.drawhit = function()
  	{
    this.ctx.drawImage(this.map.image,this.x,this.y,this.sprite.width(), 
	this.sprite.height());
  	}
  this.renderHitMap = function ()
	{
	this.ctx.clearRect(0,0,this.c.width, this.c.height);
	this.drawhit();
	}
  this.getBackgroundPosition = function()
  {
   var spd = .25;
   var background = "";
	for(var i=this.bg.length; i > 0; i--)
	{
		background +=  (this.x*(spd*(i+1))) +"px " + this.y*(spd*(i+1)) +"px"
		if(i!=this.bg.length-1)background+=","
	}
	return background;
  }
 
}
