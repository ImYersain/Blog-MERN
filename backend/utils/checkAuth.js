import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,''); // если пришел токен или нет, передай все равно пустую строчку. а метод реплейс перезаписать какое то слово
    if(token){
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'no access'
            })    
        }
    } else {
        return res.status(403).json({
            message: 'no access'
        })
    }
    

    
}