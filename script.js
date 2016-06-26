var imageCounter = 0;
var changeImageTiming;
var landingImagesArray = [
  ['./images/happyhourapp.png', 'Happy Hour App', 'hHCountDownCode.png'],
  ['./images/happyHourMap.png', 'Map View for happy Hour App', 'hHLocationCode.png'],
  ['./images/kittenChoose2.png', 'Kitten Voter', 'hHScrollCode.png'],
  ['./images/portfolioChooses.png', 'Corey Portfolio', 'hHServerPostCode.png'],
  ['./images/portfolioWhaleTop.png', 'Portfolio Whalephants Description', 'hHLocationCode.png'],
  ['./images/happyhourapp.png', 'Happy Hour App', 'hHCountDownCode.png'],
  ['./images/portfolioChooses.png', 'Corey Portfolio', 'hHServerPostCode.png'],
  ['./images/happyhourapp.png', 'Happy Hour App', 'hHLocationCode.png'],
  ['./images/portfolioWhaleTop.png', 'Portfolio Whalephants Description', 'hHCountDownCode.png'],
  ['./images/kittenChoose2.png', 'Kitten Voter', 'hHServerPostCode.png']];

$('#contactUs').hide();

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
    $('.lpScrollingImage').attr('src', landingImagesArray[numberOfImg][0]);
    $('.ImageDesc').text(landingImagesArray[numberOfImg][1]);
    $('.landingPageSection').css('background-image', 'url(../images/'+landingImagesArray[numberOfImg][2]+')');
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
    $('.lpScrollingImage').attr('src', landingImagesArray[imageCounter][0]);
    $('.ImageDesc').text(landingImagesArray[imageCounter][1]);
    $('.landingPageSection').css('background-image', 'url(../images/'+landingImagesArray[imageCounter][2]+')');
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
