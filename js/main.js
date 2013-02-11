
$(document).ready(function() {

		var loader = $('#loader');
		var search_sub_categories = $('#search-sub-categories');
		var search_car = $('#search-car');
		var search_categories = $('#search-categories');
		var year_div = $('#year-div');
		var model_div = $('#model-div');
		var comp_search = $('#comp-search');
		var comp_search_2 = $('#comp-search-2');
		var quick_search = $('#quick-search');
		var make = $('#make');
		var year = $('#year');
		var model = $('#model');
		
		loader.hide();
		search_sub_categories.hide();
		search_car.hide();
		search_categories.hide();
		year_div.hide();
		model_div.hide();
		comp_search.hide();
		comp_search_2.hide();										   
										   

		  make.change(function(){
  
			  loader.show();
			  quick_search.hide();
			  model_div.hide();
			  comp_search.hide();
			  comp_search_2.hide();										   
			  search_categories.hide();
			  search_sub_categories.hide();

			  $.post("p2_dropdown.php", {
				  car: make.val()
			  }, function(response){
				  //$('#selected_year').html(response);
				  finishAjax('year-div', 'year', escape(response));
			  });
			  return false;
		  });

		year.change(function(){
  
			  loader.show();
			  
			  quick_search.hide();
			  comp_search.hide();
			  comp_search_2.hide();										   
			  search_categories.hide();
			  search_sub_categories.hide();
			  
			  
			  $.post("p2_dropdown.php", {
				  car: make.val(),
				  year: year.val()
			  }, function(response){
				  //$('#selected_year').html(response);
				  finishAjax('model-div', 'model', escape(response));
			  });
			  return false;
		  });
		
		model.change(function(){
  
			  //$('#model').hide();			  $('#quick-search').hide();
			  $('#comp-search-2').hide();										   
			  $('#search-sub-categories').hide();

			  $('#comp-search').show();
			  //$("#comp-search").append("<br><br>");
  
			  $.post("p2_get_category.php", {
				  car: $('#make').val()
			  }, function(response){
				  //$('#selected_year').html(response);
				  finishAjax('search-categories','category', escape(response));
			  });
			  return false;
		  });
		
		
		
		$('#category').change(function(){
  
			  //$('#model').hide();
			  $('#loader').show();
			  $('#comp-search').hide();

			  $.post("p2_get_category.php", {
				  category_id: $('#category').val()
			  }, function(response){
				  //$('#selected_year').html(response);
				  finishAjax("search-sub-categories", "sub-category", escape(response));
			  });
			  return false;
		  });
		
		$('#sub-category').change(function(){
			$("#comp-search-2").show();										   
		 });

		
		
		$('#q-search').keyup(function(){
		  	$('#loader').show();
			//var car_var = $('#make').val();
			//var year_var = $('#year').val();
			//var model_var = $('#model').val();
			//var category_id_var = $('#sub-category').val();
			var search_var = $('#q-search').val();
			var data = {
				  //make: car_var,
				  //year: year_var,
				  //model: model_var
				  search_query: search_var
				  //category_id: category_id_var
				};
			getajax(data, 1);
		});
		
		$('#c-search').keyup(function(){
		  	$('#loader').show();
			var car_var = $('#make').val();
			var year_var = $('#year').val();
			var model_var = $('#model').val();
			var search_var = $('#c-search').val();
			var data = {
				  make: car_var,
				  year: year_var,
				  model: model_var,
				  search_query: search_var
				};
			getajax(data, 0);
		});
		$('#c-search-2').keyup(function(){
		  	$('#loader').show();
			var car_var = $('#make').val();
			var year_var = $('#year').val();
			var model_var = $('#model').val();
			var category_id_var = $('#sub-category').val();
			var search_var = $('#c-search-2').val();
			var data = {
				  make: car_var,
				  year: year_var,
				  model: model_var,
				  search_query: search_var,
				  category_id: category_id_var
				};
			getajax(data, 0);
		});

function getajax(data, qsearch){
		var quick = "p2_quick_search.php";
		var complete = "p2_search3.php";
		var searchtype;
		
		if(qsearch == 1){
			searchtype = quick;
		} else {
			searchtype = complete;
		}
		$.ajax({
			   type: "POST",
			   dataType: "json",
			   url: searchtype, 
			   data: data, 
			   success: function(res){
				$('#loader').hide();
				$("#searchresults").empty();
				$.each(res, function(i ,arr){
					
					content = "";
					//content += "<a href=\"details.php?products_id="+arr.pid+"\">";
					content += "<a href=\"parts/"+arr.seo+"\">";
					content += "<div id=\"search_result_"+i+"\" class=\"search_result_row_wrapper border-5\" >";
					content += "<div id=\"img_wrapper_"+i+"\" class=\"sr_img_wrapper\">";
					content += "<img id=\"picture_"+i+"\" src=\"http://www.alpinela.com/"+arr.thumb+"\">";
					content += "</div>";//img wrapper
					content += "<p>"+arr.show_name+"</p><br>";
					content += "<p>Price: $"+arr.price+"</p><br>";
					content += "<p>part #: "+arr.part_number+"</p>";
					content += "</div></a>";//search result
					//content += "";
					
					$(content).appendTo("#searchresults");
					

				}); //.each statement
			}});
   };
		}); //DOM READY
		
		function finishAjax(divid, id, response){
	 	 $('#loader').hide();
	 	 $('#'+id).html(unescape(response));
         //$('#'+id).removeAttr('disabled');
	 	 $('#'+divid).show();
		};



////////////////////////////////// details page top models view slider....

$(document).ready(function(){
	$("#modelsyears > div").hide();
	$("#modelsyears > p").click(function(){
	
	$("#modelsyears > div").slideToggle(200);
	$("#modelsyears > p").toggleClass("p-margin-bottom", 200);
	});
});



///////////////////////////////// shipping page YODLE HIIIIIIIIIII HOOOOOOOOOOO///////////////////

/*$(document).ready(function() {
    
	var sa = $("#saved_address");
	var sal = $("label[for=saved_address];");
	
		
	if(sa.is(':checked')){
		sal.text("Use different address");
		sal.css({"background-color":"#333"});
	}else {
		sal.text("Use your saved address");
		sal.css({"background-color":"#999"});
	} 

	
	button("saved_address");
	button("same_as_billing");
	
});

function button(v, checked){
	
	//var booz = "saved_address";
	
	var e = $("#"+v);
	var el = $("label[for="+v+"];");
	
	e.hide();
	
	el.css({
		width: "270px",
		height: "1.8em",
		"background-color": "#ccc",
		border: "1px solid #999",
		"line-height": "1.8em",
		padding: ".2em",
		"text-align": "center"
	})
	.addClass("border-5");
	
		
}
*/

