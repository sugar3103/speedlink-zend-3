export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',      
      },
      
      {
        name: 'Addresses',
        url: '/address',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Address Code',
            url: '/address/code',
            icon: 'icon-setting'
          },
          {
            name: 'Coutries',
            url: '/address/country',
            icon: 'icon-puzzle',
          },
          {
            name: 'City/Province',
            url: '/address/city',
            icon: 'icon-puzzle',
          },
          {
            name: 'Districts',
            url: '/address/district',
            icon: 'icon-puzzle',
          },
          {
            name: 'Wards',
            url: '/address/ward',
            icon: 'icon-puzzle',
          }          
        ],
      },
    ]
  };
  