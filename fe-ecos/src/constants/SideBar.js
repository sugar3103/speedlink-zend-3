export default {
  items: [
    {
      id: 'dashboard',
      title: 'menu.dashboard',
      route: '/app/dashboards',
      icon: 'home'
    },
    {
      id: 'master-data',
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
          id: 'address',
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
        {
          id: 'customer_service',
          title: 'menu.customer_service',
          route: '/app/master-data/service-shipment',
          icon: 'store',
          childrens: [
            {
              title: 'menu.cs_carrier',
              route: '/app/master-data/service-shipment/carrier',
              icon: 'license'
            },
            {
              title: 'menu.cs_service',
              route: '/app/master-data/service-shipment/service',
              icon: 'map'
            },
            {
              title: 'menu.cs_shipment_type',
              route: '/app/master-data/service-shipment/shipment-type',
              icon: 'apartment'
            }
          ]
          },
          {
          id: 'networkport',
          title: 'menu.networkport',
          route: '/app/master-data/networkport',
          icon: 'store',
          childrens: [
            {
              title: 'menu.branch',
              route: '/app/master-data/networkport/branch',
              icon: 'license'
            },
            {
              title: 'menu.hub',
              route: '/app/master-data/networkport/hub',
              icon: 'map'
            }
          ]
        },
      ]
    },{
      id: 'system',
      title: 'menu.system',
      route: '/app/system',
      icon: 'cog',
      childrens: [
        {
          id: 'setting',
          title: 'menu.setting',
          route: '/app/system/setting',
          icon: 'layers'
        },
        {
          id: 'users',
          title: 'menu.user',
          route: '/app/system/user',
          icon: 'users',
          childrens: [            
            {
              id: 'user',
              title: 'menu.user.list',
              route: '/app/system/user/list',
              icon: 'users'
            },
            {
              id: 'role',
              title: 'menu.user.role',
              route: '/app/system/user/role',
              icon: 'link'
            },
            {
              id: 'permission',
              title: 'menu.user.permission',
              route: '/app/system/user/permission',
              icon: 'lock'
            }
          ]
        }        
      ]
    }
  ]
}