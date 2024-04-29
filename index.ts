import { PrismaClient } from '@prisma/client'
import express from 'express';

const app = express()
const port = process.env.PORT || 3000
const prisma = new PrismaClient()


app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

app.post('/api/students', async (req, res) => {
    const { phone, pin, group } = req.body;
    const student = await prisma.student.create({
        data: { pin, phone, group }
    });
    res.status(201).json(student)
});

app.get('/api/students', async (req, res) => {
    const students = await prisma.student.findMany();
    res.json(students)
});

app.post('/api/companies', async (req, res) => {
    const { name, regnr } = req.body;
    const company = await prisma.company.create({
        data: { 
            name, 
            regnr,
            contactFirstName: '', 
            contactLastName: '', 
            contactPhone: '', 
            contactEmail: '', 
            logo: '' 
        }
    });
    res.status(201).json(company)
});

app.get('/api/companies', async (req, res) => {
    const companies = await prisma.company.findMany();
    res.json(companies)
});

app.get('/api/companies/:id', async (req, res) => {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
        where: { id: Number(id) },
        include: { jobOffers: true } // LEFT JOIN  ON company.id == jobOffer.companyId
    });
    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company)
});

app.post('/api/job-offers/:id/apply', async (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body;
    const jobOffer = await prisma.job_Offer.findUnique({
        where: { id: Number(id) }
    });
    if (!jobOffer) {
        return res.status(404).json({ error: 'Job offer not found' });
    }
    const student = await prisma.student.findUnique({
        where: { id: Number(studentId) }
    });
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const studentJobOffer = await prisma.student_Job_Offer.create({
        data: {
            student: { connect: { id: studentId } },
            jobOffer: { connect: { id: Number(id) } }
        }
    });
    res.status(201).json(studentJobOffer)
});