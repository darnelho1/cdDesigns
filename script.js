var imageCounter = 0;
var landingImagesArray = ['./images/happyhourapp.png','./images/happyHourMap.png','./images/kittenChoose2.png','./images/portfolioChooses.png', './images/portfolioWhaleTop.png' ];

$(window).ready(function(event) {
  console.log('running');
  function changeImage() {
    console.log('changeImage');
    $('.lpScrollingImage').addClass('zoomOut');
    setTimeout(function() {
      $('.lpScrollingImage').attr('src', landingImagesArray[imageCounter]);
      $('.lpScrollingImage').removeClass('zoomOut');
      $('.lpScrollingImage').addClass('zoomIn');
      setTimeout(function() {
        $('.lpScrollingImage').removeClass('zoomIn');
      }, 3000)
    }, 100)

    imageCounter++;
    console.log(imageCounter);
    if (imageCounter > landingImagesArray.length) {
      console.log('back to 0');
      imageCounter = 0;
    }
  }
  setInterval(changeImage, 10000);
});
