var APIKey;
$.ajax({
	url: "config/config.json",
	dataType:"json",
	success:function(data){
		APIKey = data.APIKey
		getPosts();
	}
});

function getPosts(){
	$.ajax({
		url: "https://www.googleapis.com/blogger/v3/blogs/8963739832928580166/posts?key="+APIKey,
		type: "GET",
		dataType:"jsonp",
		beforeSend: function(x) {
			if (x && x.overrideMimeType) {
			  x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
	    success: function(result) {
	    	var posts = result.items;
	        for (var i = 0; i < posts.length; i++) {
	          $("#mainContent").append("<div class='col-sm-10 col-sm-offset-1'>" +
	                                    "<div class='blogPostBlock'>" +
	                                      "<div class='blogPostTitleBlock'>" +
	                                        "<h5 class='blogPostCategory'>" +
	                                          moment(posts[i].published).format('MMMM Do YYYY') +
	                                        "</h5>" +
	                                        "<h2 class='blogPostTitle'>" +
	                                          posts[i].title +
	                                        "</h2>" +
	                                      "</div>" +
	                                      "<div class='blogPostContent'>" +
	                                        "<p>" + posts[i].content + "</p>" +
	                                      "</div>" +
	                                    "</div>" +
	                                  "</div>"
	                                );
	        }
	        $(".col-sm-10").mouseenter(function(){
	        	var titleBlock = $(this).find(".blogPostTitleBlock");
	        	titleBlock.addClass("pushTitle");
	        	titleBlock.removeClass("pushTitleFix");
			});
			$(".col-sm-10").mouseleave(function(){
	        	var titleBlock = $(this).find(".blogPostTitleBlock");
	        	titleBlock.addClass("pushTitleFix");
	        	titleBlock.removeClass("pushTitle");
			})
	    }
	})
}

$("#postForm").submit(function(event){

	event.preventDefault();
	console.log("form sent");
	var title = $("#title").val();
	var content = $("#content").val();
	var url = "http://localhost:3000/createGoogleBloggerPost";
	if(title.length == 0){
		alert("please enter a title");
		return;
	}
	if(content.length == 0){
		alert("please enter some content");
		return;
	}
	$.ajax({
		url: url,
		type: "post",
		data: { title: title, content : content},
		dataType:"json",
        success: function(result) {
   			console.log(result);
        	window.location = result;
        },
        error:function(error){
        	console.log(error);
        }
	})
});

