# Blogsum
Blogsum is a javascript widget that depends on jQuery to make an AJAX call to the Google Blogger API to retrieve blog post summaries and thumbnail images. It uses Bootstrap by Twitter to style the summary list as media objects. It is a function that can be dropped in an HTML page or linked to in a script HTML tag.

Visit the [demo page](http://ejsuncy.github.io/blogsum/) for an example.

## Usage
The script essentially places the widget where you include the script. To find your blog's id, follow the instructions [here](https://support.google.com/blogger/answer/42191?hl=en).

If you're looking for the id of a blog that does not belong to you, it can usually be found in the blog's HTML source code.

Example usage:

```
<script id="blogsum_syndication" blogid="6169819136321035666" src="blogsum.min.js"></script>
```

or, for circumstances where you can't include external local javascript files, drop in the full code:

```
<script id="blogsum_syndication" blogid="6169819136321035666">
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
</script>
```

Of course, you can drop in the minified code instead of the full code. 

## Suggestions
I used Bootstrap to contain this widget along with other widgets. Bootstrap uses the `container` class. Here's an example:

```
<div class="container">
	<div class="col col-md-5">
		<h4>Preview:</h4>
		<script id="blogsum_syndication" blogid="6169819136321035666" src="blogsum.min.js"></script>
	</div>
</div>
```

Compare the [index.html](http://ejsuncy.github.io/blogsum) and [index2.html](http://ejsuncy.github.io/blogsum/index2.html) pages.

## Roadmap
As I have time to maintain this, I'd like to add functionality for Wordpress blogs as well. Also, it would be cool to be able to include the blog URL in the script attributes instead of having to fish around for the blog id. An example would be:

```
<script id="blogsum_syndication" blogURL="http://blog.dbunked.org" src="blogsum.min.js"></script>
```