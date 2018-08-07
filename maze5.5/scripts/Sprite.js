function Sprite(json, parent, source)
{
	var data;
	if(json)
	{
		data = json;
	}
	else data = null;
	var s = 
	{
		data:data,
		image:new Image(),
		height:function(){return parent.scaleY * this.image.height},
		width:function(){return parent.scaleX * this.image.width},
	}
	s.image.src = source;
	return s;
};