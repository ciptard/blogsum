(function($){
	var blogID = $('#blogsum_syndication').attr("blogid");
	// add bootstrap
	var cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css";
	var cssFile = document.createElement("link");
	cssFile.setAttribute("rel", "stylesheet");
  	cssFile.setAttribute("type", "text/css");
  	cssFile.setAttribute("href", cssURL);
  	$('head')[0].appendChild(cssFile);

  	// add image styling
  	var imgCSS = ".abc{width:64px;height:64px;overflow:hidden;position:relative}.abc img{position:absolute;left:-100%;right:-100%;top:-100%;bottom:-100%;margin:auto;min-height:100%;min-width:100%}";
  	var imgCSSElement = document.createElement("style");
  	$(imgCSSElement).text(imgCSS);
  	$('head')[0].appendChild(imgCSSElement);


  	// add a reference element to append posts to
  	var postList = document.createElement("ul");
  	postList.setAttribute("class", "list-group");

  	// Use Google Blogger API to pull blog posts and append them to the designated element
  	function appendPost(post){
  		$(postList).append(post);
  	}

  	(function getPosts(){
  		$(postList).html('');
  		$.getJSON("https://www.googleapis.com/blogger/v3/blogs/"+blogID+"/posts?fetchImages=true&key=AIzaSyDz9VuctC0hrC0FUkmUaX2PfGSC63uHnPk",function(e){var t=e.items;for(var n in t){var r=t[n];var i;if(r.images){i=r.images[0].url}else{i="http:"+r.author.image.url}var s=r.url;var o=r.title;var u=$.trim($($.parseHTML(r.content)).text()).substring(0,300).split(" ").slice(0,-1).join(" ")+"...";var a='<li class="list-group-item"><div class="media"><a class="pull-left" href="'+s+'"><div class="abc"><img class="media-object" height="64px" src="'+i+'"></div></a><div class="media-body"><h4 class="media-heading"><a href="'+s+'">'+o+"</a></h4>"+u+"</div></div></li>"; appendPost(a);} $(postList.outerHTML).insertBefore($('#blogsum_syndication'));});
  	})();

})(jQuery);