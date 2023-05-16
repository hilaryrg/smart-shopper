/* eslint-disable no-console */
import { connection } from "../boot.js"
import UsersSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    
    console.log("Seeding users...")
    await UsersSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder