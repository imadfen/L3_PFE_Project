import express from 'express';
import path from 'path';

const router = express.Router();

const imagesDirectory = path.join('service', 'data', 'images');

router.use('/api/image', express.static(imagesDirectory));

router.get('/api/image/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(imagesDirectory, fileName);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Image not found.');
        }
    });
});

export default router;