const tabWidget = new TabWidget(document.getElementsByClassName('js-tabs')[0]);

const sliderFeedback = new Swiper('.slider-feedback', {});
const sliderFeedbackAuthor = new Swiper('.slider-feedback-author', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
const sliderFeedbackProduct = new Swiper('.slider-feedback-product', {});

sliderFeedback.on('slideChange', function () {
  sliderFeedbackProduct.slideTo(this.activeIndex);
  sliderFeedbackAuthor.slideTo(this.activeIndex);
});

sliderFeedbackAuthor.on('slideChange', function () {
  sliderFeedbackProduct.slideTo(this.activeIndex);
  sliderFeedback.slideTo(this.activeIndex);
});

sliderFeedbackProduct.on('slideChange', function () {
  sliderFeedback.slideTo(this.activeIndex);
  sliderFeedbackAuthor.slideTo(this.activeIndex);
});
