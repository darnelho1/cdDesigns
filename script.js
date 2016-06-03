var imageCounter = 0;
var changeImageTiming;
var landingImagesArray = ['./images/happyhourapp.png','./images/happyHourMap.png','./images/kittenChoose2.png','./images/portfolioChooses.png', './images/portfolioWhaleTop.png' ];

function imageDots() {
  var numberOfImg = 0;
  landingImagesArray.forEach(function(each) {
    $('.imgCircles').append('<div id=img-'+numberOfImg+' class="circle"></div>');
    numberOfImg++;
  });
  $('#img-0').css('background-color', 'green');
}

function imgDotClick() {
  $('.circle').on('click', function(event) {
    event.preventDefault();
    clearInterval(changeImageTiming);
    var numberOfImg = $(this).attr('id').split('-')[1];
    $('#img-'+imageCounter).css('background-color', 'black');
    $(this).css('background-color', 'green');
    console.log(numberOfImg);
    $('.lpScrollingImage').attr('src', landingImagesArray[numberOfImg]);
    console.log(imageCounter);
    imageCounter = numberOfImg;
    console.log(imageCounter);
    if (imageCounter >= landingImagesArray.length) {
      console.log('back to 0');
      imageCounter = 0;
    }
    console.log(imageCounter);
    changeImageTiming =  setInterval(changeImage, 10000);
  });
}

function changeImage() {
  console.log('changeImage');
  $('.lpScrollingImage').addClass('zoomOut');

  setTimeout(function() {
    $('.lpScrollingImage').attr('src', landingImagesArray[imageCounter]);
    var oldImageCounter = imageCounter-1;
    $('#img-'+oldImageCounter).css('background-color', 'black');
    console.log(imageCounter);
    if (imageCounter === 0) {
      console.log('end');
      console.log(landingImagesArray.length);
      var endImage = landingImagesArray.length-1;
      $('#img-'+endImage).css('background-color', 'black');
    }
    $('#img-'+imageCounter).css('background-color', 'green');
    $('.lpScrollingImage').removeClass('zoomOut');
    $('.lpScrollingImage').addClass('zoomIn');

    setTimeout(function() {
      $('.lpScrollingImage').removeClass('zoomIn');
    }, 3000)
  }, 100)

  imageCounter++;
  console.log(imageCounter);
  if (imageCounter >= landingImagesArray.length) {
    console.log('back to 0');
    imageCounter = 0;
  }
}


$(window).ready(function(event) {
  imageDots();
  imgDotClick();
  changeImageTiming =  setInterval(changeImage, 10000);
  console.log('running');
});
