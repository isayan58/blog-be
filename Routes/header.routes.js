const headerController =require("../Controllers/headerController");

const headerRoutes = {
    blogRoutes: (app) =>
    {
        app.get("/bloggers", headerController.getBloggers);
        app.get("/blogs/:blogger_id", headerController.fetchBlogs);
        app.get("/blogger/:blogger_id", headerController.getBlogger);
        app.get("/blogcontent/:title", headerController.getBlogContent);
        app.get("/AllBlogs", headerController.getAllBlogs);
        app.post("/postBlog", headerController.postBlogs);
        app.post("/postUsers", headerController.postUsers);
    }
}

module.exports = headerRoutes;