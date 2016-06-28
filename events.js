
$('.navLink').click(function(){
  console.log(this.text);
  $("#"+this.text).show();
  $('#mainSection').css('background-image', 'url("./images/servicesBackground.jpg")');
  clearInterval(changeImageTiming);
  $('.landingPageSection').hide();
  $('#pageNav').hide();

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
