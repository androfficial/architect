let isMobile = {
   Android: function() {return navigator.userAgent.match(/Android/i);},
   BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
   iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
   Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
   Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
   any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
if (window.innerWidth < 769) {
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
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
const moveUpBtn = document.getElementById('moveUp');
const moveDownBtn = document.getElementById('moveDown');

if (window.innerWidth > 769) {
   new fullpage('#page', {
      autoScrolling: true,
      scrollHorizontally: true,
      scrollingSpeed: 800,
      navigation: true,
      menu: '#menu-list',
      scrollOverflow: true,
      anchors: ['secIntro', 'secAbout', 'secServices', 'secProjects', 'secHoliday', 'secTestimonials', 'secContacts'],
      // normalScrollElements: '#map',
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

// new fullpage('#page', {
//    autoScrolling: true,
//    scrollHorizontally: true,
//    scrollingSpeed: 800,
//    navigation: true,
//    menu: '#menu-list',
//    scrollOverflow: true,
//    anchors: ['intro', 'about', 'services', 'projects', 'holiday', 'testimonials', 'contacts'],
//    // normalScrollElements: '#map',
//    responsiveWidth: 769,
//    // responsiveHeight: 626
// });

// moveUpBtn.addEventListener('click', (e) => {
//    fullpage_api.moveSectionUp();
// });
// moveDownBtn.addEventListener('click', (e) => {
//    fullpage_api.moveSectionDown();
// });
document.addEventListener('click', (e) => {
   if (!e.target.closest('.info-header__column')) {
      for (let infoHeaderColumn of document.querySelectorAll('.info-header__column')) {
         infoHeaderColumn.classList.remove('_show');
      }
   }
});
const body   = document.querySelector('body');
const burger = document.querySelector('.header__icon');
const menu   = document.querySelector('.menu__body');

burger.addEventListener('click', (e) => {
   body.classList.toggle('_lock');
   burger.classList.toggle('_active');
   menu.classList.toggle('_active');
});
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
         body.classList.remove('_lock');
         menu.classList.remove('_active');
         burger.classList.remove('_active');
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
	lazy: {
		loadOnTransitionStart: true,
		loadPrevNext: false,
	},
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
	speed: 900,
 
	// Navigation arrows
	navigation: {
		nextEl: '.slider-arrow.paginations-slider__arrow-next',
		prevEl: '.slider-arrow.paginations-slider__arrow-prev',
	},

});
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
   e.preventDefault();
   
   let error = checkValueInput(form);
   if (error === 0) {
      console.log('Все поля успешно заполнены.');
   } else {
      console.log('Пожалуйста, заполните поля.');
   }
});

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