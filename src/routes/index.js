import homepageRouter from './homepage.js';
import userRouter from './user.js';
import videoRouter from './video.js';
import adminRouter from './admin.js';
import authRouter from './auth.js';

export function route(app) {
    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.use('/homepage', homepageRouter);
    // app.get('/homepage', (req, res) => {res.render('homepage');});

    app.use('/video', videoRouter);

    app.use('/admin', adminRouter);

    app.use('/user', userRouter);

    app.use('/auth', authRouter);

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}
