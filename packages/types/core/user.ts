interface YourDashUser {
    version: "1";
    name: {
        first: string;
        last: string;
    };
    userName: string;
    profile: {
        image: string;
        banner: string;
        description: string;
        location: {
            value: string;
            public: boolean;
        };
        status: {
            value: string;
            public: boolean;
        };
        externalLinks: {
            custom?: {
                value: string;
                public: boolean;
            };
            twitter?: {
                value: string;
                public: boolean;
            };
            youtube?: {
                value: string;
                public: boolean;
            };
            tiktok?: {
                value: string;
                public: boolean;
            };
            instagram?: {
                value: string;
                public: boolean;
            };
            facebook?: {
                value: string;
                public: boolean;
            };
            mastodon?: {
                value: string;
                public: boolean;
            };
            git?: {
                personal: {
                    value: string;
                    public: boolean;
                };
                org: {
                    value: string;
                    public: boolean;
                }[];
            }; // this links to the internal git ui
        };
    };
    quota: number;
    permissions: YourDashUserPermissions[];
}

interface YourDashUserSettings {
    panel: {
        launcher: {
            slideOut: {
                gridColumns: number;
            };
            shortcuts: {
                name: string;
                url: string;
            }[];
        };
        tray: {
            visibleIcons: object[];
        };
        applicationContainer: {
            windowMode: true;
        };
    };
    applications: {
        dash: {
            chips: {
                name: string;
                id: string;
            }[];
            background: {
                src: string;
                blur: number;
            };
        };
        files: {
            sidebar: object;
            items: {
                display: {
                    size: number;
                    type: "";
                };
            };
        };
    };
}

enum YourDashUserPermissions {
    AddUsers,
    RemoveUsers,
    InstallApplications,
    RemoveApplications,
    ManageRoles,
    ManageStorageQuotas,
    ChangeUserName,
    Administrator,
}

export { type YourDashUserSettings, YourDashUserPermissions, type YourDashUser };
