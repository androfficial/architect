let isMobile = {
   Android: function() {return navigator.userAgent.match(/Android/i);},
   BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
   iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
   Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
   Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
   any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
const moveUpBtn = document.getElementById('moveUp');
const moveDownBtn = document.getElementById('moveDown');

new fullpage('#page', {
   autoScrolling: true,
   scrollHorizontally: true,
   scrollingSpeed: 800,
   navigation: true,
   menu: '#menu-list',
   anchors: ['intro', 'about', 'services', 'projects', 'holiday', 'team', 'testimonials', 'contacts'],
});

moveUpBtn.addEventListener('click', (e) => {
   fullpage_api.moveSectionUp();
});
moveDownBtn.addEventListener('click', (e) => {
   fullpage_api.moveSectionDown();
});
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
   if (burger.classList.contains('_active')) {
      fullpage_api.setAllowScrolling(false, 'down');
   } else {
      fullpage_api.setAllowScrolling(true, 'down');
   }
   menu.classList.toggle('_active');
});
document.querySelector('.menu__link--services').addEventListener('click', (e) => {
   e.preventDefault();
});

// const links = document.querySelectorAll('.menu__link');

// if (links) {
//    for (let link of links) {
//       if (link.classList.contains('menu__link--services')) {
//          link.addEventListener('click', (e) => {
//             e.preventDefault();
//          });
//       } else {
//          link.addEventListener('click', (e) => {
//             if (document.querySelector('.menu__link._active')) {
//                document.querySelector('.menu__link._active').classList.remove('_active');
//             }
//             link.classList.add('_active');
//          });
//       }
//    }
// }

// const links = document.querySelectorAll('.menu__link');

// for (let link of links) {
//   link.addEventListener('click', (e) => {
//       e.preventDefault();

//       let href = link.getAttribute('href').substring(1);
//       console.log(`Получаем название секции по ее ID: ${href}`);

//       const scrollTarget = document.getElementById(href);
//       console.log(`Находим элемент к которому нужно скроллить по ID: ${scrollTarget}`);

//       const topOffset = document.querySelector('.header').offsetHeight;
//       console.log(`Получаем высоту фиксированной шапки: ${topOffset}`);

//       // const topOffset = 0; // если не нужен отступ сверху 
//       const elementPosition = scrollTarget.getBoundingClientRect().top;
//       console.log(`Получаем Позицию от верха полученой секции по ID: ${elementPosition}`);

//       const offsetPosition = elementPosition - topOffset;
//       console.log(`Получаем Позицию от верха полученой секции по ID с вычетом высоты шапки: ${offsetPosition}`);

//       window.scrollBy({
//         top: offsetPosition,
//         behavior: 'smooth'
//     });
//   });
// }

// const anchors = document.querySelectorAll('.menu__link');

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
    
//     const blockID = anchor.getAttribute('href');
//     document.querySelector(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }

//Работает без учета фиксированной шапки
const menuList   = document.querySelector('.menu__list');
const infoHeader = document.querySelector('.info-header');

if (isMobile.any()) {
   if (menuList) {
      menuList.addEventListener('click', (e) => {
         if (e.target.classList.contains('menu__link') || e.target.classList.contains('menu__arrow')) {
            let lastElement  = e.target.parentElement.lastElementChild;
            let subMenu      = e.target.parentElement.lastElementChild.previousElementSibling;

            subMenu.classList.toggle('_show');

            if (!lastElement.classList.contains('_show')) {
               lastElement.classList.add('_show');
               lastElement.style.height = 'auto';

               const height = lastElement.clientHeight + 'px';

               lastElement.style.height = '0px';

               setTimeout(() => {
                  lastElement.style.height = height;
               }, 0);
            } else {
               lastElement.style.height = '0px';
            
               lastElement.addEventListener('transitionend', (e) => {
                  lastElement.classList.remove('_show');
               }, {
                  once: true
               });
            }

         }
      });
   }
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
	loop: false,
	slidesPerView: 3,
	spaceBetween: 20,
 
	// Navigation arrows
	navigation: {
	  nextEl: '.slider-arrow.paginations-slider__arrow-next',
	  prevEl: '.slider-arrow.paginations-slider__arrow-prev',
	},

 });

new Swiper('.holiday__items', {
	// Optional parameters
	loop: false,
	slidesPerView: 1,
 
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