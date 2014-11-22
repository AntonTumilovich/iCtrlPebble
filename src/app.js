var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel'); Accel.init();

var main = new UI.Menu({
  sections: [{
    items:
    [
      {title: 'Room', icon: 'images/bulb.png'},
      {title: 'Room 2', icon: 'images/bulb.png'},
      {title: 'Room 3', icon: 'images/bulb.png'},
      {title: 'Stor', icon: 'images/bulb.png'},
      {title: 'Hall', icon: 'images/bulb.png'},
      {title: 'Toal', icon: 'images/bulb.png'},
      {title: 'Bath', icon: 'images/bulb.png'},
      {title: 'Kitch', icon: 'images/bulb.png'},
      {title: 'Bath', icon: 'images/fan.png'},
      {title: 'Out', icon: 'images/temp.png'},
      {title: 'Door In/Out', icon: 'images/door.png'}
    ]
    }]
});


function refresh_data(e)
{
  ajax({ url: 'http://ictrl.home:1110/jva6', type: 'json'},
    function(data)
    {
      main.item(0, 0, {title: data.room_ls, subtitle: data.room_th });
      main.item(0, 1, {title: data.room2_ls, subtitle: data.room2_th });
      main.item(0, 2, {title: data.room3_ls, subtitle: data.room3_th });
      main.item(0, 3, {title: data.stor_ls });
      main.item(0, 4, {title: data.hall_ls });
      main.item(0, 5, {title: data.toal_ls });
      main.item(0, 6, {title: data.bath_ls, subtitle: data.bath_th });
      main.item(0, 7, {title: data.kitch_ls, subtitle: data.kitch_th });
      main.item(0, 8, {title: data.bath_fs, subtitle: data.bath_th });

      main.item(0, 9, {subtitle: data.out_th });
      main.item(0, 10, {subtitle: data.door_in + "/" + data.door_out });

    },
    function()
    {
      ajax({ url: 'http://www.nevicom.ru/cgi-bin/jva6', type: 'json'},
        function(data)
        {
          main.item(0, 0, {title: data.room_ls, subtitle: data.room_th });
          main.item(0, 1, {title: data.room2_ls, subtitle: data.room2_th });
          main.item(0, 2, {title: data.room3_ls, subtitle: data.room3_th });
          main.item(0, 3, {title: data.stor_ls });
          main.item(0, 4, {title: data.hall_ls });
          main.item(0, 5, {title: data.toal_ls });
          main.item(0, 6, {title: data.bath_ls, subtitle: data.bath_th });
          main.item(0, 7, {title: data.kitch_ls, subtitle: data.kitch_th });
          main.item(0, 8, {title: data.bath_fs, subtitle: data.bath_th });

          main.item(0, 9, {subtitle: data.out_th });
          main.item(0, 10, {subtitle: data.door_in + "/" + data.door_out });

        }           
      );
    }
  );
}





main.on('select', function(e) {
  if (e.itemIndex === 0 ) {ajax({ url: 'http://ictrl.home:1110/ts00', type: 'json' }, function(data) {main.item(0, 0, {title: data.room_ls, subtitle: data.room_th });});}
  if (e.itemIndex === 1 ) {ajax({ url: 'http://ictrl.home:1110/ts05', type: 'json' }, function(data) {main.item(0, 1, {title: data.room2_ls, subtitle: data.room2_th });});}
  if (e.itemIndex === 2 ) {ajax({ url: 'http://ictrl.home:1110/ts06', type: 'json' }, function(data) {main.item(0, 2, {title: data.room3_ls, subtitle: data.room3_th });});}
  if (e.itemIndex === 3 ) {ajax({ url: 'http://ictrl.home:1110/ts08', type: 'json' }, function(data) {main.item(0, 3, {title: data.stor_ls });});}
  if (e.itemIndex === 4 ) {ajax({ url: 'http://ictrl.home:1110/ts01', type: 'json' }, function(data) {main.item(0, 4, {title: data.hall_ls });});}
  if (e.itemIndex === 5 ) {ajax({ url: 'http://ictrl.home:1110/ts02', type: 'json' }, function(data) {main.item(0, 5, {title: data.toal_ls });});}
  if (e.itemIndex === 6 ) {ajax({ url: 'http://ictrl.home:1110/ts03', type: 'json' }, function(data) {main.item(0, 6, {title: data.bath_ls, subtitle: data.bath_th });});}
  if (e.itemIndex === 7 ) {ajax({ url: 'http://ictrl.home:1110/ts04', type: 'json' }, function(data) {main.item(0, 7, {title: data.kitch_ls, subtitle: data.kithc_th });});}
  if (e.itemIndex === 8 ) {ajax({ url: 'http://ictrl.home:1110/ts07', type: 'json' }, function(data) {main.item(0, 8, {title: data.bath_fs, subtitle: data.bath_th });});}
});

main.on('accelTap', function(e) {refresh_data();});

main.show();
refresh_data();
