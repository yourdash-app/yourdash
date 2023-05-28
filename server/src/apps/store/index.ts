import { PromotedApplication } from "../../../../shared/apps/store/promotedApplication.js"
import YourDashUnreadApplication, { getAllApplications, YourDashApplicationServerPlugin } from "../../helpers/applications.js"

const promotedApplications: string[] = ["dash", "store"]

const main: YourDashApplicationServerPlugin = ( { app } ) => {
  app.get( "/app/store/promoted/applications", ( _req, res ) => {
    Promise.all(
      promotedApplications.map( async ( app ): Promise<PromotedApplication> => {
        const application = ( await new YourDashUnreadApplication( app ).read() )
        return {
          name: application.getName(),
          backgroundImage: `data:image/png;base64,${ ( await application.getStoreBackground() ).toString( "base64" ) }`,
          icon: `data:image/avif;base64,${ ( await application.getIcon() ).toString( "base64" ) }`,
          displayName: application.getDisplayName(),
          installed: application.isInstalled()
        }
      } ) ).then( out => res.json( out ) )
  } )

  app.get( "/app/store/categories", async ( _req, res ) => {
    const applications = await getAllApplications()

    const categories: { [ key: string ]: boolean } = {}

    for ( const application of applications ) {
      const app = await new YourDashUnreadApplication( application ).read()

      categories[app.getCategory()] = true
    }

    return res.json( Object.keys( categories ) )
  } )
}

export default main
