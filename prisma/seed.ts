import { PrismaClient, Speciality } from '@prisma/client';
const prisma = new PrismaClient();

(function seed() {
    const students = [
        { pin: "123456789", phone: "321654978", group: "TA-22E" },
        { pin: "2345678", phone: "2321654978", group: "TA-22E" },
        { pin: "345678900", phone: "3216345654978", group: "TA-22E" },
        { pin: "57567984", phone: "34521654978", group: "TA-22V" },
        { pin: "24364574567", phone: "34521654978", group: "TA-22V" },
    ];
    const companies = [
        { name: "Abc OÜ", regnr: "4123", contactFirstName: "", contactLastName: "", contactPhone: "", contactEmail: "", logo: "" },
        { name: "Random AS", regnr: "4567", contactFirstName: "", contactLastName: "", contactPhone: "", contactEmail: "", logo: "" },
        { name: "OÜ Maksupettus", regnr: "1237", contactFirstName: "", contactLastName: "", contactPhone: "", contactEmail: "", logo: "" },
        { name: "Prismamarket", regnr: "9453", contactFirstName: "", contactLastName: "", contactPhone: "", contactEmail: "", logo: "" },
    ];
    const offers = [
        { createdAt: new Date(), title: "Arendaja", desc: "", deadline: randomDate(), poster: "", tags: "test", speciality: Speciality.Engineering },
        { createdAt: new Date(), title: "Testija", desc: "", deadline: randomDate(), poster: "", tags: "test", speciality: Speciality.Engineering },
        { createdAt: new Date(), title: "Kujundaja", desc: "", deadline: randomDate(), poster: "", tags: "qwe test", speciality: Speciality.Design },
        { createdAt: new Date(), title: "Kujundaja", desc: "", deadline: randomDate(), poster: "", tags: "qwe test", speciality: Speciality.Design },
        { createdAt: new Date(), title: "Kujundaja", desc: "", deadline: randomDate(), poster: "", tags: "qwe test", speciality: Speciality.Design },
        { createdAt: new Date(), title: "C# arendaja", desc: "", deadline: randomDate(), poster: "", tags: "asd", speciality: Speciality.Engineering },
        { createdAt: new Date(), title: "Java arendaja", desc: "", deadline: randomDate(), poster: "", tags: "test", speciality: Speciality.Engineering },
        { createdAt: new Date(), title: "Turundaja", desc: "", deadline: randomDate(), poster: "", tags: "test", speciality: Speciality.Marketing },
    ];

    students.forEach(async student => {
        await prisma.student.create({
            data: student
        });
    });

    companies.forEach(async company => {
        await prisma.company.create({
            data: {
                ...company,
                jobOffers: {
                    create: offers.splice(0, 2)
                },
            }
        });
    });
    console.log("Seeded successfully!")
})();

// random date between 2024-04-01 and 2024-06-01
function randomDate() {
    const start = new Date(2024, 4, 1);
    const end = new Date(2024, 6, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}