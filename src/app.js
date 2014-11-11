var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel'); Accel.init();

var main = new UI.Menu({
  sections: [{
    items:
    [
      {title: 'Sensors', icon: 'images/temp.png'},
      {title: 'Room light', icon: 'images/bulb.png'},
      {title: 'Room 2 light', icon: 'images/bulb.png'},
      {title: 'Room 3 Light', icon: 'images/bulb.png'},
      {title: 'Stor light', icon: 'images/bulb.png'},
      {title: 'Hall light', icon: 'images/bulb.png'},
      {title: 'Toal light', icon: 'images/bulb.png'},
      {title: 'Bath light', icon: 'images/bulb.png'},
      {title: 'Kitch light', icon: 'images/bulb.png'},
      {title: 'Bath fan', icon: 'images/fan.png'}
    ]
    }]
});

var data_menu = new UI.Menu({
  sections: [{
    items:
    [
      {title: 'Room', icon: 'images/temp.png'},
      {title: 'Room 2', icon: 'images/temp.png'},
      {title: 'Room 3', icon: 'images/temp.png'},
      {title: 'Out', icon: 'images/temp.png'},
      {title: 'Bath', icon: 'images/temp.png'},
      {title: 'Kitchen', icon: 'images/temp.png'},
      {title: 'Door In/Out', icon: 'images/door.png'},
    ]
    }]
});




function refresh_switchs(e)
{
  ajax({ url: 'http://ictrl.home:1110/jva6', type: 'json'},
    function(data)
    {
      main.item(0, 1, {subtitle: data.room_l });
      main.item(0, 2, {subtitle: data.room2_l });
      main.item(0, 3, {subtitle: data.room3_l });
      main.item(0, 4, {subtitle: data.stor_l });
      main.item(0, 5, {subtitle: data.hall_l });
      main.item(0, 6, {subtitle: data.toal_l });
      main.item(0, 7, {subtitle: data.bath_l });
      main.item(0, 8, {subtitle: data.kitch_l });
      main.item(0, 9, {subtitle: data.bath_f });


    },
    function()
    {
      ajax({ url: 'http://www.nevicom.ru/cgi-bin/jva6', type: 'json'},
        function(data)
        {
          main.item(0, 1, {subtitle: data.room_l });
          main.item(0, 2, {subtitle: data.room2_l });
          main.item(0, 3, {subtitle: data.room3_l });
          main.item(0, 4, {subtitle: data.stor_l });
          main.item(0, 5, {subtitle: data.hall_l });
          main.item(0, 6, {subtitle: data.toal_l });
          main.item(0, 7, {subtitle: data.bath_l });
          main.item(0, 8, {subtitle: data.kitch_l });
          main.item(0, 9, {subtitle: data.bath_f });
        }           
      );
    }
  );
}




function refresh_sensors(e)
{
  ajax({ url: 'http://ictrl.home:1110/jva6', type: 'json'}, 
    function(data)
    {
      data_menu.item(0, 0, {subtitle: data.room_th });
      data_menu.item(0, 1, {subtitle: data.room2_th });
      data_menu.item(0, 2, {subtitle: data.room3_th });
      data_menu.item(0, 3, {subtitle: data.out_th });
      data_menu.item(0, 4, {subtitle: data.bath_th });
      data_menu.item(0, 5, {subtitle: data.kitch_th });
      data_menu.item(0, 6, {subtitle: data.door_in + "/" + data.door_out });
    },
    function()
    {         
      ajax({ url: 'http://www.nevicom.ru/cgi-bin/jva6', type: 'json'}, 
        function(data)
        {
          data_menu.item(0, 0, {subtitle: data.room_th });
          data_menu.item(0, 1, {subtitle: data.room2_th });
          data_menu.item(0, 2, {subtitle: data.room3_th });
          data_menu.item(0, 3, {subtitle: data.out_th });
          data_menu.item(0, 4, {subtitle: data.bath_th });
          data_menu.item(0, 5, {subtitle: data.kitch_th });
          data_menu.item(0, 6, {subtitle: data.door_in + "/" + data.door_out });
        }
      );
    }
  );
}

main.on('select', function(e) {
  if (e.itemIndex === 0 )
  {data_menu.show(); refresh_sensors();}

  if (e.itemIndex === 1 ) {ajax({ url: 'http://ictrl.home:1110/ts00', type: 'json' }, function(data) {main.item(0, 1, {subtitle: data.room_l });});}
  if (e.itemIndex === 2 ) {ajax({ url: 'http://ictrl.home:1110/ts05', type: 'json' }, function(data) {main.item(0, 2, {subtitle: data.room2_l });});}
  if (e.itemIndex === 3 ) {ajax({ url: 'http://ictrl.home:1110/ts06', type: 'json' }, function(data) {main.item(0, 3, {subtitle: data.room3_l });});}
  if (e.itemIndex === 4 ) {ajax({ url: 'http://ictrl.home:1110/ts01', type: 'json' }, function(data) {main.item(0, 4, {subtitle: data.hall_l });});}
  if (e.itemIndex === 5 ) {ajax({ url: 'http://ictrl.home:1110/ts02', type: 'json' }, function(data) {main.item(0, 5, {subtitle: data.toal_l });});}
  if (e.itemIndex === 6 ) {ajax({ url: 'http://ictrl.home:1110/ts03', type: 'json' }, function(data) {main.item(0, 6, {subtitle: data.bath_l });});}
  if (e.itemIndex === 7 ) {ajax({ url: 'http://ictrl.home:1110/ts04', type: 'json' }, function(data) {main.item(0, 7, {subtitle: data.kitch_l });});}
  if (e.itemIndex === 8 ) {ajax({ url: 'http://ictrl.home:1110/ts07', type: 'json' }, function(data) {main.item(0, 8, {subtitle: data.bath_f });});}
  if (e.itemIndex === 9 ) {ajax({ url: 'http://ictrl.home:1110/ts08', type: 'json' }, function(data) {main.item(0, 9, {subtitle: data.stor_l });});}
});

main.on('accelTap', function(e) {refresh_sensors();});
data_menu.on('accelTap', function(e) {refresh_sensors();});
data_menu.on('select', function(e) {refresh_sensors();});


main.show();
refresh_switchs();
