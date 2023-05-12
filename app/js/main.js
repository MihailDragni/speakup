document.addEventListener("DOMContentLoaded", () => {
  //---бургер-меню---

  const burger = document.querySelector(".burger");
  const removeBtn = document.querySelector(".mobile-menu__btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.querySelector("body");
  const menu = document.querySelector(".mobile-menu__menu");

  const activateMobileMenu = () => {
    mobileMenu.classList.toggle("mobile-menu--active");
    if (mobileMenu.classList.contains("mobile-menu--active")) {
      body.classList.add("lock");
    } else {
      body.classList.remove("lock");
    }
  };
  const removeMobileMenu = () => {
    mobileMenu.classList.remove("mobile-menu--active");
    body.classList.remove("lock");
  };

  const removeOnTarget = (e) => {
    if (
      e.target !== removeBtn &&
      e.target !== mobileMenu &&
      e.target !== burger &&
      e.target !== menu
    ) {
      mobileMenu.classList.remove("mobile-menu--active");
      body.classList.remove("lock");
    }
  };

  burger.addEventListener("click", activateMobileMenu);
  removeBtn.addEventListener("click", removeMobileMenu);
  document.addEventListener("click", removeOnTarget);

  //---Слайдер---

  new Swiper(".user-reviews__swiper", {
    initialSlide: 1,
    loop: true,
    loopedSlides: 2,
    grabCursor: true,
    observer: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      578: {
        slidesPerView: 2,
        centeredSlidesBounds: false,
        centeredSlides: false,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlidesBounds: true,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        centeredSlides: true,
      },
    },
  });

  //--Анимация при скроле---

  const animItems = document.querySelectorAll("._anim-items");
  if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("_active");
        } else {
          if (!animItem.classList.contains("_anim-no-hide")) {
            animItem.classList.remove("_active");
          }
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
      animOnScroll();
    }, 300);
  }
});
