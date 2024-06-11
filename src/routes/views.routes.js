import { Router} from 'express';

const router = Router();


router.get("/", (req, res) => {
    res.render("index");
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

export default router;