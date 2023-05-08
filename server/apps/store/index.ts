import { Application as ExpressApplication } from "express"
import { PromotedApplication } from "../../../shared/apps/store/promotedApplication.js"
import YourDashUnreadApplication from "../../core/applications.js"

const promotedApplications: string[] = ["dash", "store"]

export default function main( app: ExpressApplication ) {
  app.get( "/app/store/promoted/applications", ( _req, res ) => {
    Promise.all(
      promotedApplications.map( async ( app ): Promise<PromotedApplication> => {
        const application = ( await new YourDashUnreadApplication( app ).read() )
        return {
          name: application.getName(),
          backgroundImage: `data:image/png;base64,${ ( await application.getStoreBackground() ).toString( "base64" )}`,
          icon: `data:image/avif;base64,${ ( await application.getIcon() ).toString( "base64" )}`,
          displayName: application.getDisplayName()
        }
      } ) ).then( out => res.json( out ) )
  } )
}
