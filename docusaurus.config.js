module.exports = {
    title: "Riot Tools",
    tagline: "Auxilary tooling for Riot JS",
    url: "https://riot-tools.github.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "riot-tools", // Usually your GitHub org/user name.
    projectName: "riot-tools.github.io", // Usually your repo name.
    themeConfig: {
        navbar: {
            title: "Riot Tools",
            logo: {
                alt: "Riot Tools Logo",
                src: "img/logo.svg",
            },
            items: [
                { to: "/meiosis/getting-started", label: "Meiosis", position: "left" },
                { to: "/final-form/getting-started", label: "Final Form", position: "left" },
                {
                    href: "https://github.com/riot-tools",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Meiosis",
                            to: "/meiosis/getting-started",
                        },
                        {
                            label: "Final Form",
                            to: "final-form/getting-started",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Stack Overflow",
                            href:
                                "https://stackoverflow.com/questions/tagged/riot-tools",
                        },
                        {
                            label: "Discord",
                            href: "https://discord.gg/PagXe5Y",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/riot-tools",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Riot Tools team.`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
					routeBasePath: '/',
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/riot-tools/riot-tools.github.io/edit/master/meiosis",
                },
                // blog: {
                //     showReadingTime: true,
                //     // Please change this to your repo.
                //     editUrl:
                //         "https://github.com/riot-tools/riot-tools.github.io/edit/master/website/blog/",
                // },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            },
        ],
    ],
};
