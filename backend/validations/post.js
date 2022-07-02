import {body} from 'express-validator';

export const postCreateValidation = [
    body('title', "enter your post's title").isLength({ min: 3}).isString(),
    body('text', 'enter description of your post').isLength({ min: 10}).isString(),
    body('tags', 'wrong format of tags (should be array)').optional().isString(),
    body('imageUrl', 'wrong image url').optional().isString(),
    // body('file', 'wrong type of file').optional(),
]