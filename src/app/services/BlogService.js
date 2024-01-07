import blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }

        let currentPage = parseInt(req.query.page) || 1;
        const itemsPerPage = 6;

        blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            if (currentPage <= 0) {
                currentPage = 1;
            }
            else if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            blog.find({})
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((blogs) => {
                    blogs = multipleMongooesToOject(blogs);

                    res.render('blog', { blogs, isLogin, currentPage, totalPages });
                })
                .catch((err) => {
                    res.status(400).json({ err: 'ERROR!' });
                });
        });
    }

    showDetail(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                console.log("id = ", blog._id);
                Comment.findOne({ idBlog: blog._id })
                    .then(comment => {
                        console.log("comment = ", comment);
                        res.render('blogDetail', {
                            blog: mongooesToOject(blog),
                            isLogin,
                            comment: mongooesToOject(comment),
                        });
                    })
            })
            .catch((err) => {

                res.status(400).json({ err: 'ERROR!' });
            });
    }

    createBlog = async (req, res) => {
        const formData = req.body;
        //const slug = req.body.title;
        console.log(formData);
        const saveBlog = await blog.create(formData);
        saveBlog
            .save()
            .then(() => res.redirect("/blog"))
            .catch((err) => console.log(err));
    };
}
export default new BlogService();