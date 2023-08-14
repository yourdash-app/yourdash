import YourDashUnreadApplication, { getAllApplications } from "backend/src/helpers/applications.js";
import log, { logTypes } from "backend/src/helpers/log.js";
export default async function getAllCategories() {
    const applications = await getAllApplications();
    const categories = {};
    for (const application of applications) {
        const app = await new YourDashUnreadApplication(application).read();
        try {
            categories[app.getCategory()] = true;
        }
        catch (_err) {
            log(logTypes.error, `application: ${app.getName()} doesn't have a category defined`);
        }
    }
    return Object.keys(categories);
}
export async function getAllApplicationsFromCategory(category) {
    const applications = await getAllApplications();
    const results = await Promise.all(applications.map(async (application) => await (new YourDashUnreadApplication(application).read())));
    return results.filter(app => app.getCategory() === category).map(app => app.getName());
}
//# sourceMappingURL=categories.js.map