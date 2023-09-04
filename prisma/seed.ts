import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.session.deleteMany({});
    await prisma.credential.deleteMany({});
    await prisma.note.deleteMany({});
    await prisma.card.deleteMany({});
    await prisma.wifi.deleteMany({});
    await prisma.license.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.health.deleteMany({});

    await prisma.health.createMany({
        data: [{
            route: "wifi",
            health_names: "wifi okay!"
        },
        {
            route: "users",
            health_names: "users okay!"
        },
        {
            route: "notes",
            health_names: "notes okay!"
        },
        {
            route: "licenses",
            health_names: "licenses okay!"
        },
        {
            route: "erase",
            health_names: "erase okay!"
        },
        {
            route: "crdentials",
            health_names: "crdentials okay!"
        },
        {
            route: "cards",
            health_names: "cards okay!"
        },
        {
            route: "app",
            health_names: "app okay!"
        },
        {
            route: "auth",
            health_names: "auth okay!"
        }]
    })


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })