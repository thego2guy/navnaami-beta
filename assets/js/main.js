(function($) {
  "use strict";
    
    
/*----------------------------
   Preloader
------------------------------ */
 
    
$(".preloader").fadeOut(500);
    
  
    
/*--------------------------
    Scroll Sticky
---------------------------- */
    
  var windows = $(window);
  var Header = $(".main-header");  
  if (Header.length) {
    var navOffset = Header.offset().top;
    windows.on('scroll', function() {
      var scroll = windows.scrollTop();
      if (scroll > navOffset) {
        $(".main-header").addClass('sticky');
      }
      else {
        $(".main-header").removeClass('sticky');
      }
    });
  }
  var documentElem = $(document), navAppear = $('.main-header'), lastScrollTop=0;
  documentElem.on('scroll', function() {
    var currentScrollTop = $(this).scrollTop();
    if(currentScrollTop > lastScrollTop) navAppear.addClass('nav-out');
    else navAppear.removeClass('nav-out');
    lastScrollTop = currentScrollTop;
  });
    
    
// niceSelect;
  $("select").niceSelect();
    
    
// Chart


    

/*--------------------------
    Mobile Menu
---------------------------- */
    
  $("#my-mobile-menu").meanmenu({
    meanMenuContainer: ".my-mobile-menu",
    meanScreenWidth: "991"
  });

  // offcanvas menu
  $(".menu-icon").on("click", function () {
    $(".offcanvas-menu,.offcanvas-overly").addClass("active");
    return false;
  });
  $(".menu-close,.offcanvas-overly").on("click", function () {
    $(".offcanvas-menu,.offcanvas-overly").removeClass("active");
  });

    
    

  // slider
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function(e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on("beforeChange", function(e, slick, currentSlide, nextSlide) {
      var $animatingElements = $(
        '.single-slider[data-slick-index="' + nextSlide + '"]'
      ).find("[data-animation]");
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: true,
      fade: true,
      prevArrow:
        '<button type="button" class="slick-prev"> <i class="lnr lnr-arrow-left"></i> prev </button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="lnr lnr-arrow-right"></i> Next</button>',
      arrows: false,
      responsive: [
        { breakpoint: 767, settings: { dots: false, arrows: false } },
        {
          breakpoint: 1201,
          settings: {
            arrows: false
          }
        }
      ]
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function() {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function() {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();
    

    
    
    // Home Banner Carousel
    $('.home-banner').owlCarousel({
        loop:true,    
        items:1,
        margin:0,
        dots:false,
        nav:true,
        navText : ["",""],
        rewindNav : true,
        stagePadding:0,
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true
    });
   
    // Single Carousel
    $('.carousel-project-single').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        navText : ["",""],
        rewindNav : true,
        dots:false,
        responsiveClass: true,
        responsive:{
            
            0:{
                items:1,
                nav:false,
                dots:true
            },
            600:{
                items:1,
                nav:false,
                dots:true
            },
            1000:{
                items:1,
                nav:true,
                dots:false
            }
        }
    })
    

    
    // Project Slides
    $('.project-slides').owlCarousel({
        loop:false,
        margin:30,
        nav:true,
        navText : ["",""],
        rewindNav : true,
        dots:false,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
                nav:false,
                dots:true
            },
            600:{
                items:1,
                nav:false,
                dots:true
            },
            
            800:{
                items:2,
                nav:false,
                dots:true
            },
            
            1000:{
                items:2,
                nav:true,
                dots:false
            }
        }
    })


    
    // Property Details Carousel
	if ($('.pro-image-carousel').length && $('.pro-thumbs-carousel').length) {

		var $sync1 = $(".pro-image-carousel"),
			$sync2 = $(".pro-thumbs-carousel"),
			flag = false,
			duration = 500;

			$sync1
				.owlCarousel({
					loop:false,
					items: 1,
					margin: 0,
					nav: true,
					navText : ["",""],
                    rewindNav : true,
					dots: false,
					autoplay: true,
					autoplayTimeout: 5000
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = false;
						$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

			$sync2
				.owlCarousel({
					loop:false,
					margin: 10,
					items: 1,
					nav: false,
                    rewindNav : true,
					dots: true,
					center: true,
					autoplay: true,
					autoplayTimeout: 5000,
					responsive: {
						0:{
				            items:6,
				            autoWidth: false
				        },
				        400:{
				            items:6,
				            autoWidth: false
				        },
				        600:{
				            items:6,
				            autoWidth: false
				        },
				        1000:{
				            items:4,
				            autoWidth: false
				        },
						1200:{
				            items:8,
				            autoWidth: false
				        }
				    },
				})
				
		.on('click', '.owl-item', function () {
			$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = true;		
				$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});

	}
    
    //LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
    
    // EMI Cal
    var loanAmount = $("#la_value").html();
    var numberOfMonths = $("#nm_value").html();
    var rateOfInterest = $("#roi_value").html();
    var monthlyInterestRatio = (rateOfInterest/100)/12;

    var top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
    var bottom = top -1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
 

  // service-active
  $(".service-active").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // case-active
  $(".case-active").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"> <i class="far fa-arrow-alt-circle-left"></i>  </button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="far fa-arrow-alt-circle-right"></i> </button>',
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
    // Single Testimonial 
  $(".testimonial-active").slick({
   
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
       dots: true,
      arrows: false
      
  });

  // brand-active
  $(".brand-active").slick({
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,   
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"> <i class="far fa-arrow-alt-circle-left"></i>  </button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="far fa-arrow-alt-circle-right"></i> </button>',
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // magnificPopup
  $(".view-video,.video-view").magnificPopup({
    type: "iframe"
  });

  

  // counterUp

  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  // isotope
  $('.portfolio-active').imagesLoaded(function () {
      var $grid = $('.portfolio-active').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        layoutMode: 'fitRows',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      })

      // filter items on button click
      $('.portfolio-menu').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });
      //for menu active class
      $('.portfolio-menu button').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });

  });



})(jQuery);
