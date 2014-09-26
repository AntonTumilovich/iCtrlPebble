var UI = require('ui');
//var sens_card = new UI.Card({title: 'Sensors :', icon: 'images/temp.png', body: ''});

var main = new UI.Menu({
  sections: [{
    items:
    [
      {title: 'Sensors', icon: 'images/temp.png'},
      {title: 'Room light', icon: 'images/bulb.png'},
      {title: 'Hall light', icon: 'images/bulb.png'},
      {title: 'Toal light', icon: 'images/bulb.png'},
      {title: 'Bath light', icon: 'images/bulb.png'},
      {title: 'Kitch light', icon: 'images/bulb.png'},
      {title: 'Bath Fan', icon: 'images/fan.png'},
      {title: 'Kitch Fan', icon: 'images/fan.png'},
      {title: 'Refresh iCtrl', icon: 'images/home.png'}

    ]
    }]
});

var data_menu = new UI.Menu({
  sections: [{
    items:
    [
      {title: 'Room', icon: 'images/temp.png'},
      {title: 'Out', icon: 'images/temp.png'},
      {title: 'Bath', icon: 'images/temp.png'},
      {title: 'Kitchen', icon: 'images/temp.png'},
      {title: 'Door In', icon: 'images/door.png'},
      {title: 'Door Out', icon: 'images/door.png'},
    ]
    }]
});


function refresh_switchs(e){
  var ajax = require('ajax');
      ajax({ url: 'http://www.nevicom.ru/cgi-bin/jva6', type: 'json'},
        function(data) {
          main.item(0, 1, {subtitle: data.room_l });
          main.item(0, 2, {subtitle: data.hall_l });
          main.item(0, 3, {subtitle: data.toal_l });
          main.item(0, 4, {subtitle: data.bath_l });
          main.item(0, 5, {subtitle: data.kitch_l });
          main.item(0, 6, {subtitle: data.bath_f });
          main.item(0, 7, {subtitle: data.kitch_f });
      }
      );
  console.log('Refresh switch : "');
}

function refresh_sensors(e){
  var ajax = require('ajax');
      ajax({ url: 'http://www.nevicom.ru/cgi-bin/jva6', type: 'json'},
        function(data) {
          data_menu.item(0, 0, {subtitle: data.room_th });
          data_menu.item(0, 1, {subtitle: data.out_th });
          data_menu.item(0, 2, {subtitle: data.bath_th });
          data_menu.item(0, 3, {subtitle: data.kitch_th });
          data_menu.item(0, 4, {subtitle: data.door_in });
          data_menu.item(0, 5, {subtitle: data.door_out });

      }
      );
  console.log('Refresh sensors : "');
}


data_menu.on('select', function(e) {
  refresh_sensors();
});


main.on('select', function(e) {
  var ajax = require('ajax');
  
      if (e.itemIndex === 0 )
    {
      refresh_sensors();
      data_menu.show();
    }

    if (e.itemIndex === 1 ) {ajax({ url: 'http://ictrl.home:1110/ts00', type: 'json' }, function(data) {main.item(0, 1, {subtitle: data.room_l });});}
    if (e.itemIndex === 2 ) {ajax({ url: 'http://ictrl.home:1110/ts01', type: 'json' }, function(data) {main.item(0, 2, {subtitle: data.hall_l });});}
    if (e.itemIndex === 3 ) {ajax({ url: 'http://ictrl.home:1110/ts02', type: 'json' }, function(data) {main.item(0, 3, {subtitle: data.toal_l });});}
    if (e.itemIndex === 4 ) {ajax({ url: 'http://ictrl.home:1110/ts03', type: 'json' }, function(data) {main.item(0, 4, {subtitle: data.bath_l });});}
    if (e.itemIndex === 5 ) {ajax({ url: 'http://ictrl.home:1110/ts04', type: 'json' }, function(data) {main.item(0, 5, {subtitle: data.kitch_l });});}
    if (e.itemIndex === 6 ) {ajax({ url: 'http://ictrl.home:1110/ts05', type: 'json' }, function(data) {main.item(0, 6, {subtitle: data.bath_f });});}
    if (e.itemIndex === 7 ) {ajax({ url: 'http://ictrl.home:1110/ts06', type: 'json' }, function(data) {main.item(0, 7, {subtitle: data.kitch_f });});}
    if (e.itemIndex === 8 ) {refresh_switchs();}


    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });

refresh_switchs();
main.show();
