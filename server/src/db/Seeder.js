/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ListSeeder from "./seeders/ListSeeder.js"
import ItemSeeder from "./seeders/ItemSeeder.js"

class Seeder {
  static async seed() {
    
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding lists...")
    await ListSeeder.seed()

    console.log("Seeding items...")
    await ItemSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder