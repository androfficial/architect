let isMobile = {
   Android: function() {return navigator.userAgent.match(/Android/i);},
   BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
   iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
   Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
   Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
   any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
if (window.innerWidth < 769 && document.querySelector('body').classList.contains('enable-fullpage')) {
	function checkScroll() {
		const header = document.querySelector('.header');
	
		if (window.pageYOffset > 60) {
			header.classList.add('_sticky');
		} else {
			header.classList.remove('_sticky');
		}
	}
	checkScroll();
	window.addEventListener('scroll', checkScroll)
} else {
	function checkScroll() {
		const header = document.querySelector('.header');
	
		if (window.pageYOffset > 60) {
			header.classList.add('_sticky');
		} else {
			header.classList.remove('_sticky');
		}
	}
	checkScroll();
	window.addEventListener('scroll', checkScroll)
}
const body   = document.querySelector('body');
const burger = document.querySelector('.header__icon');
const menu   = document.querySelector('.menu__body');

burger.addEventListener('click', (e) => {
   body.classList.toggle('_lock');
   burger.classList.toggle('_active');
   menu.classList.toggle('_active');
});
new Swiper('.projects__items', {
	// Optional parameters
	observer: true,
	observeParents: true,
	loop: false,
	slidesPerView: 3,
	spaceBetween: 20,
	watchOverflow: true,
	speed: 900,
	preloadImages: false,
	lazy: true,
	// lazy: {
	// 	loadOnTransitionStart: true,
	// 	loadPrevNext: false,
	// },
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	breakpoints: {
		320: {  
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},	
			slidesPerView: 1,
			spaceBetween: 20
		},
		601: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		993: {
			slidesPerView: 3,
			spaceBetween: 20,
		}
	},
 
	// Navigation arrows
	navigation: {
		nextEl: '.slider-arrow.paginations-slider__arrow-next',
		prevEl: '.slider-arrow.paginations-slider__arrow-prev',
	},

});

new Swiper('.holiday__items', {
	// Optional parameters
	observer: true,
	observeParents: true,
	loop: false,
	slidesPerView: 1,
	watchOverflow: true,
	speed: 700,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	preloadImages: false,
	lazy: true,
 
	// Navigation arrows
	navigation: {
		nextEl: '.slider-arrow.paginations-slider__arrow-next',
		prevEl: '.slider-arrow.paginations-slider__arrow-prev',
	},

});
const moveUpBtn = document.getElementById('moveUp');
const moveDownBtn = document.getElementById('moveDown');

if (window.innerWidth > 769 && document.querySelector('body').classList.contains('enable-fullpage')) {
   new fullpage('#page', {
      autoScrolling: true,
      scrollHorizontally: true,
      scrollingSpeed: 800,
      navigation: true,
      menu: '#menu-list',
      scrollOverflow: true,
      anchors: ['secIntro', 'secAbout', 'secServices', 'secProjects', 'secHoliday', 'secTestimonials', 'secContacts'],
      normalScrollElements: '.info-header__submenu',
      // responsiveWidth: 769,
      // responsiveHeight: 626
   });
   
   moveUpBtn.addEventListener('click', (e) => {
      fullpage_api.moveSectionUp();
   });
   moveDownBtn.addEventListener('click', (e) => {
      fullpage_api.moveSectionDown();
   });
} else {
   if (document.querySelector('body').classList.contains('enable-fullpage')) {
      const linkNav = document.querySelectorAll('.menu__link');
         
      for (let link of linkNav) {
         if (!link.classList.contains('menu__link--services')) {
            link.addEventListener('click', (e) => {
               e.preventDefault();
      
               const cutHref = link.getAttribute('href').substring(4);
               const fullHref = cutHref[0].toLowerCase() + cutHref.slice(1);
      
               const scrollTarget = document.getElementById(fullHref);
               const headerOffset = 60;
               const elementPosition = scrollTarget.getBoundingClientRect().top;
               const offsetPosition = elementPosition - headerOffset;
      
               // console.log(href);
               // console.log(scrollTarget);
               // console.log(elementPosition);
               // console.log(offsetPosition);
      
               window.scrollBy({
                  top: offsetPosition,
                  behavior: "smooth"
               });
      
            });
         }
      }
   }
}
document.querySelector('.menu__link--services').addEventListener('click', (e) => {
   e.preventDefault();
});

const menuList   = document.querySelector('.menu__list');
const infoHeader = document.querySelector('.info-header');

if (isMobile.any()) {
   menuList.addEventListener('click', (e) => {
      if (e.target.classList.contains('menu__link--services') || e.target.classList.contains('menu__arrow')) {
         let subMenu = e.target.parentElement.lastElementChild;
         let arrow   = e.target.parentElement.lastElementChild.previousElementSibling;

         arrow.classList.toggle('_show');

         if (!subMenu.classList.contains('_show')) {
            subMenu.classList.add('_show');
            subMenu.style.height = 'auto';

            const height = subMenu.clientHeight + 'px';

            subMenu.style.height = '0px';

            setTimeout(() => {
               subMenu.style.height = height;
            }, 0);
         } else {
            subMenu.style.height = '0px';
         
            subMenu.addEventListener('transitionend', (e) => {
               subMenu.classList.remove('_show');
            }, {
               once: true
            });
         }
      } else {
         if (document.querySelector('body').classList.contains('enable-fullpage')) {
            body.classList.remove('_lock');
            menu.classList.remove('_active');
            burger.classList.remove('_active');
         }
      } 
   });
}

if (infoHeader) {
   infoHeader.addEventListener('click', (e) => {
      if (e.target.classList.contains('info-header__current-lang') || e.target.classList.contains('_icon')) {
         let parent = e.target.parentElement;
         if (parent.classList.contains('info-header__column--region')) {
            if (document.querySelector('.info-header__column--lang').classList.contains('_show')) {
               document.querySelector('.info-header__column--lang._show').classList.remove('_show')
            }
            parent.classList.toggle('_show');
         } else {
            if (document.querySelector('.info-header__column--region').classList.contains('_show')) {
               document.querySelector('.info-header__column--region._show').classList.remove('_show')
            }
            parent.classList.toggle('_show');
         }
      }
   });
}
document.addEventListener('click', (e) => {
   if (!e.target.closest('.info-header__column')) {
      for (let infoHeaderColumn of document.querySelectorAll('.info-header__column')) {
         infoHeaderColumn.classList.remove('_show');
      }
   }
});
const forms = document.querySelectorAll('[data-form="form"]');

if (forms) {
   for (let form of forms) {
      form.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON' && e.target.hasAttribute('type', 'submit')) {
            e.preventDefault();
   
            let error = checkValueInput(form);
            if (error === 0) {
               console.log('Все поля успешно заполнены.');
            } else {
               console.log('Пожалуйста, заполните поля.');
            }
         }
      });
   }
}

const checkValueInput = (form) => { 
   let error = 0;
   const inputs = form.querySelectorAll('._req');

   for (let input of inputs) {
      input.classList.remove('_error', '_fld-email');
      if (input.classList.contains('_email')) {
         if (emailTest(input)) {
            input.classList.add('_error', '_fld-email');
            error++;
         }
      } else {
         if (input.value === '') {
            input.classList.add('_error');
            error++;
         }
      }

   }

   return error;
   
};

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
