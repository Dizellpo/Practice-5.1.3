document.addEventListener('DOMContentLoaded', function () {
    const brandsSlider = document.querySelector('.brands__slider');
    const brandsSliderMobile = document.querySelector('.brands__slider-mobile');
    const brandsList = document.querySelector('.brands__list');
    const brandsListMobile = brandsSliderMobile.querySelector('.brands__list');

    const brandsItems = brandsList.children;
    const brandsItemsMobile = brandsListMobile.children;
    const brandItemTemplateMobile = document.querySelector('.swiper-template').content.querySelector('.brands__item');
    const brandItemTemplate = document.querySelector('.brand-template').content;
    const brandItem = brandItemTemplate.querySelector('.brands__item');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showMoreBtnText = showMoreBtn.textContent;

    let setSliderItems = function (numOfElems) {
        let screenWidth = window.innerWidth;
        if (screenWidth >= 768) {
            for (let i = brandsItems.length; i <= numOfElems; i++) {
                let brandItemDuplicate = brandItem.cloneNode(true);
                brandsList.appendChild(brandItemDuplicate);
                let brandLogo = brandsItems[i].querySelector('.brands__logo');
                let brandLogoSrc = brandLogo.src;
                let validBrandLogoSrc = brandLogoSrc.replace('brand-1.png', 'brand-' + (i + 1) + '.png');
                brandLogo.src = validBrandLogoSrc;
            }
        } else if (screenWidth < 768) {
            for (let i = brandsItemsMobile.length; i <= numOfElems; i++) {
                let brandItemDuplicate = brandItemTemplateMobile.cloneNode(true);
                brandsListMobile.appendChild(brandItemDuplicate);
                let brandLogo = brandsItemsMobile[i].querySelector('.brands__logo');
                let brandLogoSrc = brandLogo.src;
                let validBrandLogoSrc = brandLogoSrc.replace('brand-1.png', 'brand-' + (i + 1) + '.png');
                brandLogo.src = validBrandLogoSrc;
            }
        }
    };

    let adjustSliderItems = function () {
        let screenWidth = window.innerWidth;
        if (screenWidth >= 1120) {
            setSliderItems(7);
        } else if (screenWidth >= 768) {
            setSliderItems(5);
        } else if (screenWidth < 768) {
            setSliderItems(8)
        }
    }
    adjustSliderItems();
    window.addEventListener('resize', adjustSliderItems);

    let initializeSwiper = function () {

        let screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            console.log('swiper is initialized');
            const swiper = new Swiper('.mySwiper', {
                
                slidesPerView: 1.5,
                spaceBetween: 16,
                centerInsufficientSlides: false,
                // Optional parameters
                direction: 'horizontal',
                loop: true,

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                slideToClickedSlide: true,
                draggable: true, 

            });
        }
    }
    initializeSwiper();
    let validateSlider = function () {
        let screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            brandsSlider.classList.add('brands__slider--hide');
            brandsSlider.classList.remove('brands__slider--show');
            brandsSliderMobile.classList.remove('brands__slider-mobile--hide');
            brandsSliderMobile.classList.add('brands__slider-mobile--show');
        } else if (screenWidth >= 768) {
            brandsSlider.classList.add('brands__slider--show');
            brandsSlider.classList.remove('brands__slider--hide');
            brandsSliderMobile.classList.add('brands__slider-mobile--hide');
            brandsSliderMobile.classList.remove('brands__slider-mobile--show');
        }
    }
    validateSlider();
    window.addEventListener('resize', validateSlider);

    showMoreBtn.addEventListener('click', function () {
        if (!showMoreBtn.classList.contains('show-more-btn--active')) {
            showMoreBtn.textContent = 'Скрыть';
            showMoreBtn.classList.add('show-more-btn--active');
            let numOfElems = brandsItems.length + 2;
            setSliderItems(numOfElems);
        } else {
            showMoreBtn.textContent = showMoreBtnText;
            showMoreBtn.classList.remove('show-more-btn--active');
            let itemsToDisplay = brandsItems.length - 3;
            console.log(itemsToDisplay);
            for (let j = brandsItems.length; j = itemsToDisplay; j--) {
                if (brandsItems[j]) {
                    brandsItems[j].remove();
                } else {
                    break;
                }
            }
        }
    });
});
