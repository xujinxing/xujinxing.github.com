module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'GitHub', link: 'https://xujinxing.github.com' },
        ],
        // sidebar: [
        //     '/',
        //     '/page-a',
        //     ['/page-b', 'Explicit link text']
        // ],
        search: false,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated', // string | boolean
    }
}