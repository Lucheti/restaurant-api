import { PrismaClient } from '@prisma/client'
import restaurants from "./data/restaurant.json"
import countries from "./data/country.json"
import images from "./data/restaurant_has_image.json"
const prisma = new PrismaClient()

async function main() {
  await prisma.restaurant.deleteMany({})
  await prisma.country.deleteMany({})

  await prisma
    .country
    .createMany({
    data: countries.map(country => ({
      code: country.country_code,
      locales: country.locales,
      allowedReviews: country.country_code === "FR",
    }))
  })

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: {
        id: restaurant.restaurant_uuid,
        name: restaurant.name,
        country: {
          connect: {
            code: restaurant.country_code
          }
        },
        images: []
      }
    })
  }

  for (const image of images) {
    await prisma.restaurant.update({
      where: {
        id: image.restaurant_uuid
      },
      data: {
        images: {
          push: image.image_uuid
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
