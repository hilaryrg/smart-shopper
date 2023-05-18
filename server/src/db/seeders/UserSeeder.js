import { User } from "../../models/index.js"

class UserSeeder {
    static async seed()
    {
        const users = [{
            email: "yukon@example.com",
            username: "Youk",
            zipCode: "02127",
            cryptedPassword: "$2b$10$kOxOT17hqCdynLVu8coR.O69noTUz5aZlbK417jIuxYBgmhraD2L2",
        },
        {
            email: "hilary@example.com",
            username: "Hilary",
            zipCode: "02127",
            cryptedPassword: "$2b$10$6cC6HxYi3/Fzw4DRtXf31uF7fnQN7FncfPjRKcGYIV80ycgrjqy2K",
        },
        {
            email: "alisal@example.com",
            username: "Ali",
            zipCode: "60093",
            cryptedPassword: "$2b$10$J7koMZLRPRPxm97WqdwJauNN6tZnhYE2DT2JLyhx1XN/n06p8/.jS",
        }]
        for (const user of users) {
            const inDB = await User.query().findOne( {username: user.username} )
            if (!inDB) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder