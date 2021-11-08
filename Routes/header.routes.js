const headerController =require("../Controllers/headerController");

const headerRoutes = {
    blogRoutes: (app) =>
    {
        app.get("/bloggers", headerController.getBloggers);
        app.get("/blogs/:blogger_id", headerController.fetchBlogs);
    }
}

module.exports = headerRoutes;