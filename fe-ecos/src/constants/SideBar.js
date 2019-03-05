export default {
  items: [
    {
      id: 'dashboard',
      title: 'menu.dashboard',
      route: '/app/dashboards',
      icon: 'icon-dasbhoard'
    },
    {
      id: 'master-data',
      title: 'menu.master-data',
      route: '/app/master-data',
      icon: 'icon-navigation',
      childrens: [
        {
          id: 'status',
          title: 'menu.status',
          route: '/app/master-data/status',
          icon: 'lnr lnr-dice',
        },
        {
          id: 'address',
          title: 'menu.address',
          route: '/app/master-data/address',
          icon: 'icon-geo-location',
          childrens: [
            {
              id: 'address_code',
              title: 'menu.address_code',
              route: '/app/master-data/address/code',
              icon: 'lnr lnr-license'
            },
            {
              id: 'country',
              title: 'menu.address_country',
              route: '/app/master-data/address/country',
              icon: 'lnr lnr-map'
            },
            {
              id: 'country',
              title: 'menu.address_city',
              route: '/app/master-data/address/city',
              icon: 'lnr lnr-apartment'
            },
            {
              id: 'district',
              title: 'menu.address_district',
              route: '/app/master-data/address/district',
              icon: 'lnr lnr-location'
            },
            {
              id: 'ward',
              title: 'menu.address_ward',
              route: '/app/master-data/address/ward',
              icon: 'lnr lnr-construction'
            }
          ]
        },
        {
          id: 'customer_service',
          title: 'menu.customer_service',
          route: '/app/master-data/service-shipment',
          icon: 'icon-modal',
          childrens: [
            {
              id: 'carrier',
              title: 'menu.cs_carrier',
              route: '/app/master-data/service-shipment/carrier',
              icon: 'lnr lnr-license'
            },
            {
              id: 'service',
              title: 'menu.cs_service',
              route: '/app/master-data/service-shipment/service',
              icon: 'lnr lnr-map'
            },
            {
              id: 'shipment_type',
              title: 'menu.cs_shipment_type',
              route: '/app/master-data/service-shipment/shipment-type',
              icon: 'lnr lnr-apartment'
            }
          ]
          },
          {
          id: 'networkport',
          title: 'menu.networkport',
          route: '/app/master-data/networkport',
          icon: 'icon-product-grid',
          childrens: [
            {
              id: 'hub',
              title: 'menu.hub',
              route: '/app/master-data/networkport/hub',
              icon: 'lnr lnr-map'
            },
            {
              id: 'branch',
              title: 'menu.branch',
              route: '/app/master-data/networkport/branch',
              icon: 'lnr lnr-license'
            }
          ]
        },
      ]
    },
    {
      id: 'pricing_management',
      title: 'menu.pricing_management',
      route: '/app/pricing-management',
      icon: 'icon-pricing-table',
      childrens: [
        {
          id: 'pricing',
          title: 'menu.pricing',
          route: '/app/pricing-management/pricing',
          icon: 'lnr lnr-map'
        },
        {
          id: 'range_weight',
          title: 'menu.range_weight',
          route: '/app/pricing-management/range-weight',
          icon: 'lnr lnr-license'
        },
        {
          id: 'zone_code',
          title: 'menu.zone_code',
          route: '/app/pricing-management/zone-code',
          icon: 'lnr lnr-map'
        }
      ]
    },
    {
      id: 'system',
      title: 'menu.system',
      route: '/app/system',
      icon: 'lnr lnr-cog',
      childrens: [
        {
          id: 'setting',
          title: 'menu.setting',
          route: '/app/system/setting',
          icon: 'lnr lnr-layers'
        },
        {
          id: 'users',
          title: 'menu.user',
          route: '/app/system/user',
          icon: 'lnr lnr-users',
          childrens: [            
            {
              id: 'user',
              title: 'menu.user.list',
              route: '/app/system/user/list',
              icon: 'lnr lnr-users'
            },
            {
              id: 'role',
              title: 'menu.user.role',
              route: '/app/system/user/role',
              icon: 'lnr lnr-link'
            },
            {
              id: 'permission',
              title: 'menu.user.permission',
              route: '/app/system/user/permission',
              icon: 'lnr lnr-lock'
            }
          ]
        }        
      ]
    }
  ]
}