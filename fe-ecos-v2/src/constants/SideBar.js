export default {
    items: [
        {
            id : 'dashboards',
            name: 'menu.dashboards',
            url: '/app/dashboards',
            icon: 'iconsmind-Shop-4'
        },
        {
            id : 'master-data',
            name: 'menu.master-data',
            url: '/app/master-data',
            icon: 'iconsmind-Digital-Drawing',
            childrens: [
                {
                    id : 'status',
                    name: 'menu.status',
                    url: '/app/master-data/status',
                    icon: 'simple-icon-credit-card',
                },
                {
                    id : 'address',
                    name: 'menu.address',
                    url: '/app/master-data/address',
                    icon: 'simple-icon-location-pin',
                    childrens: [
                        {
                            id : 'address-code',
                            name: 'menu.address_code',
                            url: '/app/master-data/address/code'                            
                        },
                        {
                            id : 'country',
                            name: 'menu.address_country',
                            url: '/app/master-data/address/country'                            
                        },
                        {
                            id : 'city',
                            name: 'menu.address_city',
                            url: '/app/master-data/address/city'                            
                        },
                        {
                            id : 'district',
                            name: 'menu.address_district',
                            url: '/app/master-data/address/district'                            
                        },
                        {
                            id : 'ward',
                            name: 'menu.address_ward',
                            url: '/app/master-data/address/ward'                            
                        }
                    ]
                },
                {
                    id : 'hub',
                    name: 'menu.hub',
                    url: '/app/master-data/hub',
                    icon: 'simple-icon-globe',
                },
            ]
        }
    ]
}