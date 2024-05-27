import prisma from '../models/prisma/prisma-client'
import dotenv from 'dotenv'

dotenv.config()

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const randomBool = () => Math.random() < 0.5

const randomDate = (start: Date, end: Date) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

const seed = async () => {
    // Clear existing data
    // await prisma.courseEnrollment.deleteMany()
    // await prisma.courseOwners.deleteMany()
    // await prisma.lecture.deleteMany()
    // await prisma.section.deleteMany()
    // await prisma.course.deleteMany()
    // await prisma.user.deleteMany()
    // await prisma.category.deleteMany()

    // Create Users
    const users = []
    for (let i = 0; i < 50; i++) {
        const user = await prisma.user.create({
            data: {
                firstName: `FirstName${i}`,
                lastName: `LastName${i}`,
                username: `user${i}`,
                email: `user${i}@example.com`,
                phoneNum: `123-456-789${i}`,
                bio: `Bio of user${i}`,
                password: `password${i}`,
                birthDate: randomDate(new Date(1980, 0, 1), new Date(2003, 11, 31)),
                gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
                role: i < 10 ? 'INSTRUCTOR' : 'STUDENT',
                profilePic: `https://example.com/avatar${i}.png`,
                isEmailConfirm: randomBool(),
                isDeleted: false,
                isAvailable: true,
                isApprovedAsInstructor: i < 10
            }
        })
        users.push(user)
    }

    // Create Categories
    const categories = []
    for (let i = 0; i < 10; i++) {
        const category = await prisma.category.create({
            data: {
                title: `Category ${i}`,
                description: `Description for category ${i}`,
                photo: `https://example.com/category${i}.jpg`,
                isDeleted: false
            }
        })
        categories.push(category)
    }

    // Create Courses
    for (let i = 0; i < 100; i++) {
        const course = await prisma.course.create({
            data: {
                title: `Course Title ${i}`,
                description: `Description for course ${i}`,
                price: parseFloat(randomInt(10, 200).toFixed(2)),
                photo: `https://example.com/course${i}.jpg`,
                categoryId: categories[randomInt(0, categories.length - 1)].id,
                isAvailable: randomBool(),
                introVideo: `https://example.com/video${i}.mp4`,
                isApproved: randomBool()
            }
        })

        // Assign an instructor to the course
        await prisma.courseOwners.create({
            data: {
                courseId: course.id,
                userId: users[randomInt(0, 9)].id, // Select random instructor
                role: 'PUBLISHER'
            }
        })

        // Enroll students in the course
        for (let j = 10; j < 50; j++) {
            await prisma.courseEnrollment.create({
                data: {
                    courseId: course.id,
                    userId: users[j].id,
                    progress: { progress: randomInt(0, 100) } // Using JSON field
                }
            })
        }

        // Create sections and lectures
        for (let k = 0; k < 5; k++) {
            const section = await prisma.section.create({
                data: {
                    courseId: course.id,
                    title: `Section ${k} of course ${i}`,
                    lectures: {
                        create: Array.from({ length: 5 }, (_, index) => ({
                            title: `Lecture ${index + 1} of section ${k} in course ${i}`,
                            description: `Description of lecture ${index + 1}`,
                            thumbnail: `https://example.com/lecture${index + 1}.jpg`,
                            duration: `${randomInt(5, 60)} minutes`
                        }))
                    }
                }
            })
        }
    }
}

seed()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
