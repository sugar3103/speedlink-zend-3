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