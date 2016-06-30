var imageCounter = 0;
var changeImageTiming;
var landingImagesArray = [
  ['./images/happyhourapp.png', 'Happy Hour App', 'code12.jpg'],
  ['./images/happyHourMap.png', 'Map View for happy Hour App', 'code13.jpg'],
  ['./images/kittenChoose2.png', 'Kitten Voter', 'code12.jpg'],
  ['./images/portfolioChooses.png', 'Corey Portfolio', 'code13.jpg'],
  ['./images/portfolioWhaleTop.png', 'Portfolio Whalephants Description', 'code12.jpg'],
  ['./images/happyhourapp.png', 'Happy Hour App', 'code13.jpg'],
  ['./images/portfolioChooses.png', 'Corey Portfolio', 'code12.jpg'],
  ['./images/happyhourapp.png', 'Happy Hour App', 'code13.jpg'],
  ['./images/portfolioWhaleTop.png', 'Portfolio Whalephants Description', 'code12.jpg'],
  ['./images/kittenChoose2.png', 'Kitten Voter', 'code13.jpg']];

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
    $('#mainSection').css('background-image', 'url(../images/'+landingImagesArray[numberOfImg][2]+')');
    $('#mainSection').removeClass('homePageBackground');
    setTimeout(function() {
      $('#mainSection').addClass('homePageBackground');
    },10);
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
    $('#mainSection').css('background-image', 'url(../images/'+landingImagesArray[imageCounter][2]+')');
    $('#mainSection').removeClass('homePageBackground');
    setTimeout(function() {
      $('#mainSection').addClass('homePageBackground');
    },10);
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
