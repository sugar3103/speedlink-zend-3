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
          id: 'status',
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
              id: 'address_code',
              title: 'menu.address_code',
              route: '/app/master-data/address/code',
              icon: 'license'
            },
            {
              id: 'country',
              title: 'menu.address_country',
              route: '/app/master-data/address/country',
              icon: 'map'
            },
            {
              id: 'country',
              title: 'menu.address_city',
              route: '/app/master-data/address/city',
              icon: 'apartment'
            },
            {
              id: 'district',
              title: 'menu.address_district',
              route: '/app/master-data/address/district',
              icon: 'location'
            },
            {
              id: 'ward',
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
              id: 'carrier',
              title: 'menu.cs_carrier',
              route: '/app/master-data/service-shipment/carrier',
              icon: 'license'
            },
            {
              id: 'service',
              title: 'menu.cs_service',
              route: '/app/master-data/service-shipment/service',
              icon: 'map'
            },
            {
              id: 'shipment_type',
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
              id: 'branch',
              title: 'menu.branch',
              route: '/app/master-data/networkport/branch',
              icon: 'license'
            },
            {
              id: 'hub',
              title: 'menu.hub',
              route: '/app/master-data/networkport/hub',
              icon: 'map'
            }
          ]
        },
      ]
    },
    {
      id: 'pricing',
      title: 'menu.pricing',
      route: '/app/pricing',
      icon: 'dice',
      childrens: [
        {
          id: 'rangeweight',
          title: 'menu.rangeweight',
          route: '/app/pricing/rangeweight',
          icon: 'license'
        },
        {
          id: 'zonecode',
          title: 'menu.zonecode',
          route: '/app/pricing/zonecode',
          icon: 'map'
        }
      ]
    },
    {
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