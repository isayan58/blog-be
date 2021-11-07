const headerController =require("../Controllers/headerController");

const headerRoutes = {
    blogRoutes: (app) =>
    {
        app.get("/bloggers", headerController.getBloggers);
    }
}

module.exports = headerRoutes;