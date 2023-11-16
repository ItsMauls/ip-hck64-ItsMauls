const { User, Post } = require('../models/index')


// const seedDatabase = async () => {
// await Post.bulkCreate(data)
// }

const destroyDatabase = async () => {
    try {
        await Post.destroy({
            where : {},
            truncate : true,
            restartIdentity : true,
            cascade : true
        
        })
        
    } catch (error) {
        console.log(error.message);
    }
}

const destroyCreatedUser = async (userId) => {
    try {
        await User.destroy({
            where : {},
            truncate : true,
            restartIdentity : true,
            cascade : true
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {destroyCreatedUser, destroyDatabase}