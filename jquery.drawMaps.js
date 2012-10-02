/*
	for easy draw Google Maps for v3 .jQuery
							
							***
							
	@author		:	tsuyoshi higuchi a@wpe.jp
	@copyright	:	2012 (c)wpe
	@license		:	The MIT License
	@github		:	https://github.com/neuwpe/jquery.drawMaps
	@web			:	http://b.wpe.jp/
	@modified	:	2012-10-2 16:43
	@since			:	2012-10-1 19:00
	@version		:	1.01
	@use			:	jQuery1.4later 
	@howto		:	https://github.com/neuwpe/jquery.drawMaps/wiki/howto-use
	
*/
(function($){
	$.fn.drawMaps = ( function(o)
	{
		var me = $(this);
		var defaultLatlng = new google.maps.LatLng(33.958739,130.94153);
		var ex = $.extend({}, {
			key			:	'shimonoseki',
			query		:	true,
			zoom		:	14,
			center		:	defaultLatlng,
			typeId		:	google.maps.MapTypeId.ROADMAP,
			callback	:	function(){}
		}, o);
		var f = {
			key				:	ex.key,
			map				:	null,
			marker		:	null,
			localsearch	:	null,
			draw			:	function()
			{
				if(ex.query) f.getQuery();
				f.search(f.key, function(result){
					var searchLatlng = result? new google.maps.LatLng(result.lat, result.lng) : defaultLatlng;
					f.options = { zoom: ex.zoom, center: searchLatlng, mapTypeId: ex.typeId },
					f.map = new google.maps.Map(me.get(0), f.options);
					f.marker = new google.maps.Marker({
						position: searchLatlng,  map: f.map
					});
					if(typeof ex.callback=='function' && ex.callback) ex.callback(result);
				});
			},
			search			:	function(k, c)
			{
				f.localsearch = new google.search.LocalSearch();
				f.localsearch.setSearchCompleteCallback(this, function(e){
					if(typeof c =='function'&&c) c(f.localsearch.results[0]);
				}, null);
				f.localsearch.execute(k);
			},
			getQuery		:	function()
			{
				var q = decodeURIComponent(location.search.substring(1));
				var a = q.split('&');
				if(a) $.each(a, function(k,c){
					if(c.match(/key=/)) f.key = c.split('key=')[1];
				});
				if(!f.key || f.key=='') f.key = ex.key; 
			}
		};
		f.draw();
		return this;
	});
})(jQuery);