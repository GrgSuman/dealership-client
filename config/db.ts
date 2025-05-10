import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Error handling for connection issues
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((error: Error) => {
    console.error('Failed to connect to the database:', error)
  })

// Handle application termination
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

console.log(123)

export default prisma