var UI = require('ui');

//var Vector2 = require('vector2');

  var main = new UI.Menu({
    sections: [{
      items: [
      {
        title: 'Sensors',
        icon: 'images/bulb.png'
      },
      {
        title: 'Room light',
        icon: 'images/bulb.png',
//        subtitle: 'Light SW'
      },
      {
        title: 'Hall light',
        icon: 'images/bulb.png',
      },
      {
        title: 'Toal light',
        icon: 'images/bulb.png',
      },
      {
        title: 'Bath light',
        icon: 'images/bulb.png',
      },
      {
        title: 'Kitch light',
        icon: 'images/bulb.png',
      },
      {
        title: 'Bath Fan',
        icon: 'images/fan.png',
      },
      {
        title: 'Kitch Fan',
        icon: 'images/fan.png',
      }]
    }]
});

  var sens_card = new UI.Card({
    title: 'Sensors :',
    icon: 'images/bulb.png',
    body: 'Room Temp : 20.6 C\nHall Temp : 21.1'
  });



main.on('select', function(e) {
//  var req = new XMLHttpRequest();
  var ajax = require('ajax');
  
  
  
    if (e.itemIndex === 0 )
    {
//      ajax({ url: 'http://ictrl.home:1110/jva7', type: 'json' },

      ajax({ url: 'http://ictrl.home:1110/jva7' },
        function(data) {
//            sens_data.title(data.contents.author);
            sens_card.body(data);
          console.log('FROM SERV ANSW : "' + data + '"');
        }
      );
 
        sens_card.show();
    }

    if (e.itemIndex === 1 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts00' });

//        function(data) {
//            sens_data.title(data.contents.author);
 //           sens_card.body(data);
 //         console.log('FROM SERV ANSW : "' + data + '"');
 //       }
 //     );
    }

    if (e.itemIndex === 2 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts01' });
    }

    if (e.itemIndex === 3 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts02' });
    }

    if (e.itemIndex === 4 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts03' });
    }

    if (e.itemIndex === 5 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts04' });
    }

    if (e.itemIndex === 6 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts05' });
    }

    if (e.itemIndex === 7 )
    {
      ajax({ url: 'http://ictrl.home:1110/ts06' });
    }

    
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });

main.show();


