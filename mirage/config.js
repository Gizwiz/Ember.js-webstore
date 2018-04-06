export default function () {
  this.namespace = '/api';

  this.get('/bikes/', function () {

    return {
      data: [{
        type: 'bike',
        id: 1,
        attributes: {
          category: 'mtb',
          'sub-category': 'hardtail',
          name: 'testEntry',
          description: 'Enduro maniacs, here comes our PIKES PEAK 2 EN! Ready to race, with great parts, including an outstanding frame with excellent performance! Rock Shox legendary Lyrik offers suspension at the front.As an RCT3 version, it comes with the new Charger - 2 damping system that offers excellent response and improved traction in case of small bumps.Rock Shox also controls the reat stay: A Super Deluxe RC3 impresses with metric sizing and increased bushing overlap which, together with a sophisticated new bushing profile, virtually eliminates friction.The highly robust system wheelset M 1700 Spline Two b DT Swiss features the Boost standard – so, you can shred like there were no tomorrow.Shimano\'s XT rear derailleur helps you change gears, fat Maxxis Minion DHR2 tyres with 2,3 inches make sure you will keep track.',
          image: 'mtb/enduro_1.jpg',
          price: 4699
        }
      },
      {
        type: 'bike',
        id: 2,
        attributes: {
          category: 'road',
          'sub-category': 'Maraton',
          name: 'ROSE BACKROAD Dura Ace',
          description: 'The BACKROAD Dura Ace conquers the country roads – our marathon racer with extra versatility! Based on a high-end carbon frame with a weight from approx. 1040 g, this bike offers bicycle technology for a good deal of riding enjoyment. Everything revolves around a Dura-Ace 9100 groupset, the latest version of Shimano\'s best mechanical shifting groupsets. It changes gears extremely quickly and precisely, and the shifting travel was significantly further reduced – compared to the predecessor model, the brake lever has 24% less travel and the short lever a further 14% less. Besides, the bike comes with a biting Shimano disc brake. The elaborately produced 160mm brake discs have an aluminium core between their steel flanges to reduce the temperature by no less than 30 degrees. Schwalbe\'s Durano tyres let you cruise safely over asphalt and dirt, a Selle Italia SLR X-Cross saddle ensures high comfort!',
          image: 'road/road_1.jpg',
          price: 5777
        }
      },
      {
        type: 'bike',
        id: 4,
        attributes: {
          category: 'mtb',
          'sub-category': 'Maraton',
          name: 'ROSE BACKROAD Dura Ace',
          description: 'MTB TEST 2',
          image: 'road/road_1.jpg',
          price: 350
        }
      },
      {
        type: 'bike',
        id: 5,
        attributes: {
          category: 'cyclocross',
          'sub-category': 'Maraton',
          name: 'CYCLOCROSS SUPER 5000',
          description: '',
          image: 'road/road_1.jpg',
          price: 1700
        }
      },


      ]
    };
  });

  this.post('users', function(){

  });

  this.get('/mtbs/', function () {
    return {
      data: [{
        type: 'mtb',
        id: 3,
        attributes: {
          category: 'mtb',
          'sub-category': 'hardtail',
          name: 'testEntry',
          description: 'Enduro maniacs, here comes our PIKES PEAK 2 EN! Ready to race, with great parts, including an outstanding frame with excellent performance! Rock Shox legendary Lyrik offers suspension at the front.As an RCT3 version, it comes with the new Charger - 2 damping system that offers excellent response and improved traction in case of small bumps.Rock Shox also controls the reat stay: A Super Deluxe RC3 impresses with metric sizing and increased bushing overlap which, together with a sophisticated new bushing profile, virtually eliminates friction.The highly robust system wheelset M 1700 Spline Two b DT Swiss features the Boost standard – so, you can shred like there were no tomorrow.Shimano\'s XT rear derailleur helps you change gears, fat Maxxis Minion DHR2 tyres with 2,3 inches make sure you will keep track.',
          image: 'mtb/enduro_1.jpg',
          price: 4699
        }
      }]
    }
  });
}


