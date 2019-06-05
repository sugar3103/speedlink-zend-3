export default {
  items: [
    {
      id: 'dashboard',
      title: 'menu.dashboard',
      route: '/dashboards',
      icon: 'icon-dasbhoard'
    },
    {
      id: 'master-data',
      title: 'menu.master-data',
      route: '/master-data',
      icon: 'icon-navigation',
      childrens: [
        {
          id: 'status',
          title: 'menu.status',
          route: '/master-data/status',
          icon: 'lnr lnr-dice',
        },
        {
          id: 'address',
          title: 'menu.address',
          route: '/master-data/address',
          icon: 'icon-geo-location',
          childrens: [
            {
              id: 'address_code',
              title: 'menu.address_code',
              route: '/master-data/address/code',
              icon: 'lnr lnr-license'
            },
            {
              id: 'country',
              title: 'menu.address_country',
              route: '/master-data/address/country',
              icon: 'lnr lnr-map'
            },
            {
              id: 'country',
              title: 'menu.address_city',
              route: '/master-data/address/city',
              icon: 'lnr lnr-apartment'
            },
            {
              id: 'district',
              title: 'menu.address_district',
              route: '/master-data/address/district',
              icon: 'lnr lnr-location'
            },
            {
              id: 'ward',
              title: 'menu.address_ward',
              route: '/master-data/address/ward',
              icon: 'lnr lnr-construction'
            }
          ]
        },
        {
          id: 'customer_service',
          title: 'menu.customer_service',
          route: '/master-data/service-shipment',
          icon: 'icon-modal',
          childrens: [
            {
              id: 'carrier',
              title: 'menu.cs_carrier',
              route: '/master-data/service-shipment/carrier',
              icon: 'lnr lnr-license'
            },
            {
              id: 'service',
              title: 'menu.cs_service',
              route: '/master-data/service-shipment/service',
              icon: 'lnr lnr-map'
            },
            {
              id: 'shipment_type',
              title: 'menu.cs_shipment_type',
              route: '/master-data/service-shipment/shipment-type',
              icon: 'lnr lnr-apartment'
            }
          ]
          },
          {
          id: 'networkport',
          title: 'menu.network_port',
          route: '/master-data/networkport',
          icon: 'icon-product-grid',
          childrens: [
            {
              id: 'hub',
              title: 'menu.hub',
              route: '/master-data/networkport/hub',
              icon: 'lnr lnr-map'
            },
            {
              id: 'branch',
              title: 'menu.branch',
              route: '/master-data/networkport/branch',
              icon: 'lnr lnr-license'
            }
          ]
        },
      ]
    },
    {
      id: 'pricing_domestic',
      title: 'menu.pricing_domestic',
      route: '/pricing-domestic',
      icon: 'icon-pricing-table',
      childrens: [
        {
          id: 'pricing_index_domestic',
          title: 'menu.pricing_index_domestic',
          route: '/pricing-domestic/pricing',
          icon: 'lnr lnr-map'
        },
        {
          id: 'area_domestic',
          title: 'menu.area_domestic',
          route: '/pricing-domestic/area',
          icon: 'lnr lnr-map'
        },
        {
          id: 'zone_domestic',
          title: 'menu.zone_domestic',
          route: '/pricing-domestic/zone',
          icon: 'lnr lnr-license'
        },
        {
          id: 'range_weight_domestic',
          title: 'menu.range_weight_domestic',
          route: '/pricing-domestic/range-weight',
          icon: 'lnr lnr-map'
        }
      ]
    },
    // {
    //   id: 'pricing_management',
    //   title: 'menu.pricing_international',
    //   route: '/pricing-international',
    //   icon: 'icon-pricing-table',
    //   childrens: [
    //     {
    //       id: 'pricing',
    //       title: 'menu.pricing',
    //       route: '/pricing-international/pricing',
    //       icon: 'lnr lnr-map'
    //     },
    //     {
    //       id: 'range_weight',
    //       title: 'menu.range_weight',
    //       route: '/pricing-international/range-weight',
    //       icon: 'lnr lnr-license'
    //     },
    //     {
    //       id: 'zone_code',
    //       title: 'menu.zone_code',
    //       route: '/pricing-international/zone-code',
    //       icon: 'lnr lnr-map'
    //     }
    //   ]
    // },
    {
      id: 'system',
      title: 'menu.system',
      route: '/system',
      icon: 'lnr lnr-cog',
      childrens: [
        {
          id: 'setting',
          title: 'menu.setting',
          route: '/system/setting',
          icon: 'lnr lnr-layers'
        },
        {
          id: 'users',
          title: 'menu.user',
          route: '/system/user',
          icon: 'lnr lnr-users',
          childrens: [            
            {
              id: 'user',
              title: 'menu.user.list',
              route: '/system/user/list',
              icon: 'lnr lnr-users'
            },
            {
              id: 'role',
              title: 'menu.user.role',
              route: '/system/user/role',
              icon: 'lnr lnr-link'
            },
            // {
            //   id: 'permission',
            //   title: 'menu.user.permission',
            //   route: '/system/user/permission',
            //   icon: 'lnr lnr-lock'
            // }
          ]
        }        
      ]
    }
  ]
}