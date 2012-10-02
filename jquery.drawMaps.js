/*
	for easy draw Google Maps for v3 .jQuery
							
							***
							
	@author		:	tsuyoshi higuchi a@wpe.jp
	@copyright	:	2012 (c)wpe
	@license		:	The MIT License
	@github		:	http://github.com/neuwpe/wpe.jquery.drawMaps.min.js
	@web			:	http://b.wpe.jp/
	@modified	:	2012-10-2 12:53
	@since			:	2012-10-1 19:00
	@version		:	1.00
	@use			:	jQuery1.4later 
	@howto			:	$('#idObject_or_.ClassObject_or_DOMObjct').drawGoogleMaps({key: 'keyword_or_address_or_build name...'});
	
*/
(function($){
	$.fn.drawGoogleMaps = ( function(o)
	{
		var me = $(this);
		var myLatlng = new google.maps.LatLng(-34.397, 150.644);
		var ex = $.extend({}, {
			zoom		:	14,
			center		:	myLatlng,
			typeId		:	google.maps.MapTypeId.ROADMAP,
			callback	:	function(){}
		}, o);
		var f = {
			map				:	null,
			marker		:	null,
			localsearch	:	null,
			draw			:	function()
			{
				f.search(ex.key, function(result){
					var searchLatlng = new google.maps.LatLng(result.lat, result.lng);
					f.options = { zoom: ex.zoom, center: searchLatlng, mapTypeId: ex.typeId },
					f.map = new google.maps.Map(me.get(0), f.options);
					f.marker = new google.maps.Marker({
						position: searchLatlng,  map: f.map
					});
				});
			},
			search			:	function(k, c)
			{
				f.localsearch = new google.search.LocalSearch();
				f.localsearch.setSearchCompleteCallback(this, function(e){
					if(typeof c =='function'&&c) c(f.localsearch.results[0]);
				}, null);
				f.localsearch.execute(k);
			}
		};
		f.draw();
		return this;
	});
})(jQuery);