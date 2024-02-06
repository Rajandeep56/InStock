const users = [
    {
        userName: 'DevTeam',
        permission: 'admin'
    }
]

const authMiddleware = (req,res,next) =>{
    const userName = req.header.user;
    const isAuthenticated = users.filter(user =>userName === user.userName).length
    return isAuthenticated ? next() : res.status(401).json(`Oops! ${userName} does not have permission. Please contact your administrator`);
    
}

module.exports = authMiddleware