var swiper;
function slidePrep(callback) {
  $('#scrollingArticles').empty();
  articles.forEach(function(each) {
    var template = $('#articleTemplate').html();
    var compileTemplate = Handlebars.compile(template);
    var html = compileTemplate(each);
    $('#scrollingArticles').append(html);
    var galleryTop = new Swiper('#'+each.id+' .gallery-top', {
      effect: 'cube',
      grabCursor: true,
      cube: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
      },
        nextButton: '#'+each.id+' .swiper-button-next',
        prevButton: '#'+each.id+' .swiper-button-prev',
        spaceBetween: 0,
        keyboardControl: true
    });
  });
    swiper = new Swiper('#PORTFOLIO', {
      pagination: '.swiper-pagination',
      direction: 'vertical',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 0,
      keyboardControl: true,
      mousewheelControl: true
  });

    if (callback) {
        callback();
    }
  else{
    history.pushState('/','/','/');
    history.pushState('portfolio?'+articles[0].id,'portfolio?'+articles[0].id,'portfolio?'+articles[0].id);
  }

  swiper.on('slideChangeStart', function () {
      var swiperIndex = swiper.activeIndex;
      var swiperID = articles[swiperIndex].id;
      history.pushState('/','/','/');
      history.pushState('portfolio?'+swiperID,'portfolio?'+swiperID,'portfolio?'+swiperID);
      console.log(swiperID);
  });
}

$('.navLink').click(function(){
  history.pushState('/','/','/');
  console.log(this.text);
  if (pageOn === 'HOME') {
    $('.landingPageSection').hide();
    $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
    $('#mainSection').removeClass('homePageBackground');
    $('#mainSection').addClass('otherBackground');
    clearInterval(changeImageTiming);
    pageOn = this.text;
  }
  else {
    $('#'+pageOn).hide();
    pageOn = this.text;
  }
  $("#"+this.text).show();
  $("#"+this.text).css('display', 'flex');
  $('#pageNav').hide();
  $('#pageNavHeader').css('display', 'flex');
  if (pageOn === 'PORTFOLIO') {
    slidePrep();
  }
});

$('#pageTitle').click(function(event) {
  history.pushState('/','/','/');
  window.open("index.html","_self");
});


$('#submitForm').on('click', function(event) {
  event.preventDefault();
  $('#submitForm').unbind("click");
  $('#submitForm').css('opacity', '.3');
  var form = $('#servicesForm').serializeArray();
  var object = {
    firstName: form[0].value,
    lastName: form[1].value,
    businessName: form[2].value,
    number: form[3].value,
    currentWebsite: form[4].value,
    email: form[5].value,
    message: form[6].value
  };
  console.log(object);
  if ((object.firstName.length >= 2) && (object.lastName.length >= 2) && (object.number.length >= 10) &&  (object.message.length >= 2) && (document.getElementById('email').checkValidity())) {
    $.post('/contactFormSend', {info: object}, function(data) {
    }).done(function(data) {
      if (data.flag === true) {
        $('#form').empty();
        $('#form').append("<h1 class='formData'>"+ data.message +"</h1>");
      }
      else {
        $('#formTitle').html(data.message);
        $('#submitForm').bind("click");
        $('#submitForm').css('opacity', '1');

      }
    });
  }
  else {
    alert('Please fill out form completely.');
  }
});

$('.lpScrollingImage').on('click', function(event) {
  event.preventDefault();
  var imageClick = $(this).attr('title');
  console.log(imageClick);
  $('.landingPageSection').hide();
  $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
  $('#mainSection').removeClass('homePageBackground');
  $('#mainSection').addClass('otherBackground');
  clearInterval(changeImageTiming);
  pageOn = 'PORTFOLIO';
  $("#PORTFOLIO").show();
  $("#PORTFOLIO").css('display', 'flex');
  $('#pageNav').hide();
  $('#pageNavHeader').css('display', 'flex');
  slidePrep();
  var eachCounter = -1;
  var pickedAtricle = 0;
  articles.forEach(function(each) {
    eachCounter ++;
    if (each.id === imageClick) {
      pickedAtricle = eachCounter;
      swiper.slideTo(pickedAtricle);
    }
  });
});

testvar = window.location.href.toUpperCase();
if(testvar.indexOf('INDEX.HTML') > -1){
  history.pushState('/','/','/');
}
if(testvar.indexOf('ABOUT') > -1){
  $('.landingPageSection').hide();
  $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
  $('#mainSection').removeClass('homePageBackground');
  $('#mainSection').addClass('otherBackground');
  setTimeout(function functionName() {
    clearInterval(changeImageTiming);
  },1000);
  pageOn = 'ABOUT';
  $("#ABOUT").show();
  $("#ABOUT").css('display', 'flex');
  $('#pageNav').hide();
  $('#pageNavHeader').css('display', 'flex');
}
if(testvar.indexOf('PORTFOLIO') > -1){
    $('.landingPageSection').hide();
    $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
    $('#mainSection').removeClass('homePageBackground');
    $('#mainSection').addClass('otherBackground');
    setTimeout(function functionName() {
      clearInterval(changeImageTiming);
    },1000);
    pageOn = 'PORTFOLIO';
    $("#PORTFOLIO").show();
    $("#PORTFOLIO").css('display', 'flex');
    $('#pageNav').hide();
    $('#pageNavHeader').css('display', 'flex');
    slidePrep(function(){
      if(window.location.href.indexOf('?') > -1){
        var slideId = window.location.href.split('?')[1];
          var eachCounter = -1;
          var pickedAtricle;
          articles.forEach(function(each) {
            eachCounter ++;
            if (each.id.toUpperCase() === slideId.toUpperCase()) {
              pickedAtricle = eachCounter;
              swiper.slideTo(pickedAtricle);
            }
          });
        }
    });

  }
// }

if(testvar.indexOf('SERVICES') > -1){
  $('.landingPageSection').hide();
  $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
  $('#mainSection').removeClass('homePageBackground');
  $('#mainSection').addClass('otherBackground');
  setTimeout(function functionName() {
    clearInterval(changeImageTiming);
  },1000);
  pageOn = 'SERVICES';
  $("#SERVICES").show();
  $("#SERVICES").css('display', 'flex');
  $('#pageNav').hide();
  $('#pageNavHeader').css('display', 'flex');
}
if(testvar.indexOf('CONTACT') > -1){
  $('.landingPageSection').hide();
  $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
  $('#mainSection').removeClass('homePageBackground');
  $('#mainSection').addClass('otherBackground');
  setTimeout(function functionName() {
    clearInterval(changeImageTiming);
  },1000);
  pageOn = 'CONTACT';
  $("#CONTACT").show();
  $("#CONTACT").css('display', 'flex');
  $('#pageNav').hide();
  $('#pageNavHeader').css('display', 'flex');
}
