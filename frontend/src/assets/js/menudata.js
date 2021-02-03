
export default [
    {
        header: true,
        title: 'Main Menu',
        hiddenOnCollapse: true
    },
    {
        href: '/',
        title: 'Home',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "home"},
            text: 'hello'
        }
    },
    {
        href: '/dashboard',
        title: 'Dashboard',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "view-dashboard"},
            // text: ''
        }
    },
    {
        href: '/dashboard/test',
        title: 'Tests',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "monitor-edit"},
            // text: ''
        }
    },
    {
        href: '/dashboard/groups',
        title: 'Groups',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "account-group"},
            // text: ''
        }
    },
    {
        href: '/#contact',
        title: 'Contacts',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "card-account-details-outline"},
            // text: ''
        }
    },
    {
        href: '/#about',
        title: 'About',
        icon: {
            element: 'iconify-icon',
            class: 'vsm--icon iconify',
            attributes: {icon: "contacts"},
            // text: ''
        }
    }
]