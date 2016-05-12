import faker from 'faker';

((win, doc, $, faker) => {

  var data, FakerData, len, _rand, path,
      _rand = function(min, max) { return Math.floor(Math.random() * (max- min + 1)) + min; };

  path = win.location.pathname;

  var fillOutLanding = function(){
    data = new FakerData(faker);
    if($(doc.body).hasClass('eq-style')){
      $('#landing-zip-code').val(data.zip).trigger('keyup');
      $('#reason-for-quote').find('option').last().prop('selected', true);
      setTimeout(function(){
        $('#zip-landing').submit()
      }, 1000);
    } else {
      // you're on a different landing than everquote
    }
  };

  var fillOutAutoPolicy = function(){
    data = new FakerData(faker);

    var fillYear, fillMake, fillModel,
        is_everquote = $(doc.body).hasClass('eq-style'),
        $yearSelects = $('select[name$="[year]"]'),
        $makeSelects = $('select[name$="[make]"');

    fillModel = function(){
      var $modelSelects = $('select[name$="[vehicle_model]"]');
      $modelSelects.each(function(){
        var $this = $(this);
        $this.children().eq(_rand(0,$this.children().length - 1)).prop('selected', true).trigger('change');
      });
    };

    fillMake = function(){
      $makeSelects.each(function(){
        var $this = $(this);
        $this.children().eq(_rand(0,$this.children().length - 1)).prop('selected', true).trigger('change');
        setTimeout(function(){
          fillModel();
        },1000);
      })
    };

    fillYear = function(){
      $yearSelects.each(function(){
        var $this = $(this);
        $this.children().eq(_rand(0,$this.children().length - 1)).prop('selected', true).trigger('change');
          setTimeout(function(){
            fillMake();
        },1000);
      })
    };

    fillYear();

    $('select:not(#auto_policy_autos_attributes_0_year):not(#auto_policy_autos_attributes_0_make):not(#auto_policy_autos_attributes_0_vehicle_model):not(#auto_policy_autos_attributes_0_submodel)').each(function() {
      data.randomizeSelect(this);
    });

    $('input[type="checkbox"]').each(function() {
      data.randomizeCheckbox(this);
    });

    $('textarea').each(function() {
      data.randomizeParagraph(this);
    });

    $('#auto_policy_email').each(function() {
      data.randomizeEmail(this);
    });

    data.randomizeRadio($('[name="radio-choice"]'));
    $('#auto_policy_drivers_attributes_0_first_name').val(data.firstName);
    $('#auto_policy_drivers_attributes_0_last_name').val(data.lastName);
    $('#auto_policy_street_address').val(data.address1);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#auto_policy_drivers_attributes_0_zip_code').val(data.zip);
    $('#pw').val(data.password);
    $('#pw-repeat').val(data.password);
    $('#auto_policy_phone').val(data.phone);
    $('#auto_policy_zip_code').val(data.zip);

    if(is_everquote){
      $('#auto_policy__x_driver_count').find('option[value=1]').prop('selected',true);
      $('#auto_policy__x_vehicle_count').find('option[value=1]').prop('selected',true);
      $('label[for=auto_policy_drivers_attributes_0_gender_Female]').trigger('click');
      $('label[for=auto_policy_drivers_attributes_0_marital_status_Married]').trigger('click');
      // submit the form with this line:
      // $('#submit-button').trigger('click');
    }
  };

  var routeForm = function(pathname) {
    switch(pathname){
      case '/landings':
        fillOutLanding();
        break;
      case '/auto_policies':
        fillOutAutoPolicy();
        break;
      default:
        fillOutLanding();
        break;
    }
  };

  var FakerData = function(faker){
    this.faker = faker;
    this.randomWord = faker.internet.domainWord();
    this.username = 'fake_' + this.randomWord;
    this.username += _rand(100,9999);
    this.password = faker.internet.password();
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.address1 = faker.address.streetAddress();
    this.city = faker.address.city();
    this.state = faker.address.stateAbbr();
    this.zip = '90210'// doesn't work so great for our purposes: faker.address.zipCode();
    this.phone = '6175519290';
  };

  FakerData.prototype.randomizeSelect = function(el){
    var $el = $(el);
    len = $el.find('option').length;
    $el.children().eq(_rand(1,len - 1)).prop('selected', true).trigger('change');
    return false
  };

  FakerData.prototype.randomizeRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len = radios.length;
    radios.prop('checked', false).eq( _rand(1, len - 1 ) ).prop('checked', true);
  };

  FakerData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(5));
  };

  FakerData.prototype.randomizeCheckbox = function(el) {
    var $el  = $(el);
    $el.prop('checked', false);
    if (_rand( 0,1 ) === 0) $el.prop('checked', true);
  };

  FakerData.prototype.randomizeEmail = function(el) {
    $(el).val(this.randomWord + '@gmail.com');
  };

  $(function(){
    routeForm(path);
  });


})(window,window.document,window.jQuery,faker)
