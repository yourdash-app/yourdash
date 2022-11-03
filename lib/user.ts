export default interface YourDashUser {
  name: string;
  userName: string;
  profile: {
    image: string;
    banner: string;
    description: string;
    location: string;
    status: string;
    externalLinks: {
      twitter: string;
      youtube: string;
      git: string; // this links to the internal git ui
    };
  };
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
}
