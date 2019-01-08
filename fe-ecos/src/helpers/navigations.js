export default {
    items: [
        {
          name: 'Dashboard',
          url: '/',
          icon: 'icon-speedometer',
          badge: {
              'text': 7,
              'class': 'badge badge-danger badge-pill float-right'
          }     
        },
        {
            name: 'Master Data',
            url: '/',
            icon: 'fi-layers',           // optional class names space delimited list for title item ex: "text-center"
            children: [
                {
                    name: 'Status',
                    url: '/status',
                    icon: 'icon-puzzle',
                  },
            ]
          },
    ]
}