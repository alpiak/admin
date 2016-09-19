/* JS */

"use strict";

/* Navigation */

$(document).ready(function(){

  if ($(window).width() >= 750) {
    $(".sidebar").addClass("onside inactive")
    .children("#nav").addClass("onside inactive");
  }

  $(window).resize(function() {
    if($(window).width() >= 750) {
      $(".sidebar #nav").css("display","block");
      $(".sidebar").addClass("onside inactive")
      .children("#nav").addClass("onside inactive");
    } else {
      $(".sidebar #nav").css("display","none");
    }
  });

  // controls the sub menus of the collapsed side bar
  $(".sidebar").delegate("#nav.onside li.has_sub","mouseenter",function(e) {
    if (!$(this).parents(".sidebar.onside").hasClass("active")) {
      $(this).children("ul").css("display","block");
    }
  }).delegate("#nav li.has_sub","mouseleave",function(e) {
    if (!$(this).parents(".sidebar.onside").hasClass("active")) {    
      $(this).children("ul").css("display","none"); 
    }
  });
  
  $(".sidebar").delegate("#nav.active li.has_sub a","click",function(e) {
      e.preventDefault();

      if(!$(this).hasClass("subdrop")) {
        // hide any open menus and remove all other classes
        $("#nav li ul").slideUp(350);
        $("#nav li a").removeClass("subdrop");
        
        // open our new menu and add the open class
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      }
      
      else if($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      } 
  });

  // switch sidebar between active and inactive mode
  $(".sidebar-switch a").on("click",function(e){
    e.preventDefault();
    var $this = $(this);

    $this.parents(".sidebar.onside").children("#nav").find("ul")
    .css("display","none").prev(".subdrop").removeClass("subdrop");
    $this.parent(".sidebar-switch").next("#nav").toggleClass("active inactive")
    .parent(".sidebar.onside").toggleClass("active inactive")
    .next(".mainbar").toggleClass("with-sidebar-active");
  })
});

$(document).ready(function(){
  $(".sidebar-dropdown a").on('click',function(e){
      e.preventDefault();

      if(!$(this).hasClass("open")) {
        // hide any open menus and remove all other classes
        $(".sidebar #nav").slideUp(350);
        $(".sidebar-dropdown a").removeClass("open");
        
        // open our new menu and add the open class
        $(".sidebar #nav").slideDown(350);
        $(this).addClass("open");
      }
      
      else if($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(".sidebar #nav").slideUp(350);
      }
  });

});

/* Widget close */

$('.wclose').click(function(e){
  e.preventDefault();
  var $wbox = $(this).parent().parent().parent();
  $wbox.hide(100);
});

/* Widget minimize */

  $('.wminimize').click(function(e){
    e.preventDefault();
    var $wcontent = $(this).parent().parent().next('.widget-content');
    if($wcontent.is(':visible')) 
    {
      $(this).children('i').removeClass('icon-chevron-up');
      $(this).children('i').addClass('icon-chevron-down');
    }
    else 
    {
      $(this).children('i').removeClass('icon-chevron-down');
      $(this).children('i').addClass('icon-chevron-up');
    }            
    $wcontent.toggle(500);
  }); 

/* Support */

$(document).ready(function(){
  $("#slist a").click(function(e){
     e.preventDefault();
     $(this).next('p').toggle(200);
  });
});

/* Scroll to Top */


  $(".totop").hide();

  $(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop()>300)
      {
        $('.totop').slideDown();
      } 
      else
      {
        $('.totop').slideUp();
      }
    });

    $('.totop a').click(function (e) {
      e.preventDefault();
      $('body,html').animate({scrollTop: 0}, 500);
    });

  });

/* jQuery Notification */

$(document).ready(function(){

  setTimeout(function() {noty({text: '<strong>Howdy! Hope you are doing good...</strong>',layout:'topRight',type:'information',closeWith:['click','button'],timeout:15000});}, 7000);

  setTimeout(function() {noty({text: 'This is an all in one theme which includes Front End, Admin & E-Commerce. Dont miss it. Grab it now',layout:'topRight',type:'alert',closeWith:['click','button'],timeout:13000});}, 9000);

});
