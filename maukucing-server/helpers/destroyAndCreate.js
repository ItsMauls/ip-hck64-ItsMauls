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
        console.log(error);
    }
}

const destroyCreatedUser = async (userId) => {
await User.destroy({
    where : {
        id : userId
    }
})
}

module.exports = {destroyCreatedUser, destroyDatabase}