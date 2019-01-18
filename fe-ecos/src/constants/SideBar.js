export default {
  items: [
    {
      title: 'menu.dashboard',
      route: '/app/dashboards',
      icon: 'home'
    },
    {
      title: 'menu.master-data',
      route: '/app/master-data',
      icon: 'database',
      childrens: [
        {
          title: 'menu.status',
          route: '/app/master-data/status',
          icon: 'dice',
        },
        {
          title: 'menu.address',
          route: '/app/master-data/address',
          icon: 'store',
          childrens: [
            {
              title: 'menu.address_code',
              route: '/app/master-data/address/code',
              icon: 'license'
            },
            {
              title: 'menu.address_country',
              route: '/app/master-data/address/country',
              icon: 'map'
            },
            {
              title: 'menu.address_city',
              route: '/app/master-data/address/city',
              icon: 'apartment'
            },
            {
              title: 'menu.address_district',
              route: '/app/master-data/address/district',
              icon: 'location'
            },
            {
              title: 'menu.address_ward',
              route: '/app/master-data/address/ward',
              icon: 'construction'
            }
          ]
        },
      ]
    }
  ]
}