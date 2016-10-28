
/*
 *		This file contains the javascript code for my Animals Site
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var category_template, animals_template, animal_template, slideshow_template;

// variables to store the current displayed album and animal
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#animals-template").html();
	animals_template = Handlebars.compile(source);
	
	source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	// 
	//  clicking on the albums tab shows the 
	//  thumbnails of all the albums
	//
	$("#category-tab").click(function () {

		// displays the albums template
		showTemplate(category_template, animals_data);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$("#category-tab").addClass("active");

		// add a click callback to each album 
		// thumbnail which displays the animals
		// template on that album
		// (I have written out the code for this 
		// function for clarity but it is actually
		// pretty much the same as the animals tab
		// function so we could acutally just
		// call $(".animal-thumbnail").click() ) 
		$(".animal-category").click(function (){
			
			// get the index (position in the array)
			// of the album we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_category = animals_data.category[index];

			// displays the animals template
			showTemplate(animals_template, current_category);
      
      // display the current selected category name
      $('.results').html(current_category.name);

			// add an on click al all the animal thumbnails
			// which displays the animal in a modal popup
			$(".animal-thumbnail").click(function (){
				// get the index (position in the array)
				// of the animal we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the animal in
				// the array - @index)
				var index = $(this).data("id");

				// set the current animal to this animal
				current_animal = current_category.animals[index];
				
				// displays the single animal template
				showTemplate(animal_template, current_animal);
			});
		});
	});

	// 
	//  clicking on the animals tab shows all of the 
	//  animals in the current album
	//
	$("#animals-tab").click(function () {
		
		// displays the animals template
		showTemplate(animals_template, current_category);
    
    // display the current selected category name
    $('.results').html(current_category.name);
    
		// make the animals tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make animals tab active
		$("#animals-tab").addClass("active");

		// add an on click al all the animal thumbnails
		// which displays the animal in a modal popup
		$(".animal-thumbnail").click(function (){
			// get the index (position in the array)
			// of the animal we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the animal in
			// the array - @index)
			var index = $(this).data("id");

			// set the current animal to this animal
			current_animal = current_category.animals[index];
			
			// displays the single animal template
			showTemplate(animal_template, current_animal);
      
		});
	});

	// 
	//  clicking on the slideshow tab displays the
	//  current album as a slide show
	//
	$("#slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(slideshow_template, current_category);
		
    // display the current selected category name
    $('.results').html(current_category.name);
    
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});

	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#category-tab").click();

});