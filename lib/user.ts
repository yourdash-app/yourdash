export default interface YourDashUser {
  version: '1';
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
  quota: number,
  permissions: YourDashUserPermissions[]
}

export interface YourDashUserSettings {
  panel: {
    launcher: {
      slideOut: {
        gridColumns: number;
      };
      shortcuts: {
        name: string;
        icon: string;
        url: string;
      }[];
    };
    tray: {
      visibleIcons: {}[];
    };
  };
  applications: {
    dash: {
      chips: {
        name: string;
        id: string;
      }[];
      background: {
        src: string,
        blur: number
      }
    };
    files: {
      sidebar: {},
      items: {
        display: {
          size: number,
          type: "" | ""
        }
      }
    }
  };
}

export enum YourDashUserPermissions {
  // eslint-disable-next-line no-unused-vars
  AddUsers,
  // eslint-disable-next-line no-unused-vars
  RemoveUsers,
  // eslint-disable-next-line no-unused-vars
  InstallApplications,
  // eslint-disable-next-line no-unused-vars
  RemoveApplications,
  // eslint-disable-next-line no-unused-vars
  ManageRoles,
  // eslint-disable-next-line no-unused-vars
  ManageStorageQuotas
}