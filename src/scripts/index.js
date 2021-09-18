const tabWidget = new TabWidget(document.getElementsByClassName('js-tabs')[0]);

const sliderFeedback = new Swiper('.slider-feedback', {});
const sliderFeedbackAuthor = new Swiper('.slider-feedback-author', {});
const sliderFeedbackProduct = new Swiper('.slider-feedback-product', {});

sliderFeedback.controller.control = [sliderFeedbackAuthor, sliderFeedbackProduct];
sliderFeedbackAuthor.controller.control = [sliderFeedback, sliderFeedbackProduct];
