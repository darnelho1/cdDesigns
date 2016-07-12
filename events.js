$('.navLink').click(function(){
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
    var swiper = new Swiper('#PORTFOLIO', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        keyboardControl: true,
        mousewheelControl: true
    });
  }
});

$('#pageTitle').click(function(event) {
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
      autoplay: 5000,
        nextButton: '#'+each.id+' .swiper-button-next',
        prevButton: '#'+each.id+' .swiper-button-prev',
        spaceBetween: 0,
        keyboardControl: true
    });
  });
  var swiper = new Swiper('#PORTFOLIO', {
      pagination: '.swiper-pagination',
      direction: 'vertical',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 0,
      keyboardControl: true,
      mousewheelControl: true
  });
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
