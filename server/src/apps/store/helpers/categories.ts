import YourDashUnreadApplication, { getAllApplications } from "../../../helpers/applications.js"

export default async function getAllCategories(): Promise<string[]> {
  const applications = await getAllApplications()

  const categories: { [ key: string ]: boolean } = {}

  for ( const application of applications ) {
    const app = await new YourDashUnreadApplication( application ).read()

    categories[app.getCategory()] = true
  }

  return Object.keys( categories )
}

export async function getAllApplicationsFromCategory( category: string ): Promise<string[]> {
  const applications = await getAllApplications()

  const results = await Promise.all( applications.map( async application => await ( new YourDashUnreadApplication( application ).read() ) ) )

  return results.filter( app => app.getCategory() === category ).map( app => app.getName() )
}
