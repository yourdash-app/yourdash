export default interface YourDashUser {
  name: string,
  userName: string,
  profile: {
    image: string,
    banner: string,
    description: string,
    location: string,
    status: string,
    externalLinks: {
      twitter: string
    }
  },
  settings: {
    panel: {
      launcher: {
        slideOut: {
          gridColumns: number
        }
      }
    }
  }
}