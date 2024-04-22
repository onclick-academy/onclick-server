// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// async function seedDatabase() {
//     // Create Categories
//     for (let i = 1; i <= 2; i++) {
//         await prisma.category.create({
//             data: {
//                 title: `Category ${i}`,
//                 description: `Description for Category ${i}`,
//                 photo: `https://example.com/path/to/category/photo${i}`
//             }
//         })
//     }

//     const categories = await prisma.category.findMany({
//         include: {
//             subCategories: true
//         }
//     })

//     // Create SubCategories and Topics
//     for (const category of categories) {
//         for (let i = 1; i <= 5; i++) {
//             const subCategory = await prisma.subCategory.create({
//                 data: {
//                     categoryId: category.id,
//                     name: `SubCategory ${i} for ${category.title}`,
//                     description: `Description for SubCategory ${i} of ${category.title}`
//                 }
//             })

//             for (let j = 1; j <= 2; j++) {
//                 const topic = await prisma.topic.create({
//                     data: {
//                         title: `Topic ${j} for ${subCategory.name}`
//                     }
//                 })

//                 // Connect SubCategory and Topic (many-to-many)
//                 await prisma.subCategoryTopic.create({
//                     data: {
//                         subCategoryId: subCategory.id,
//                         topicId: topic.id
//                     }
//                 })
//             }
//         }
//     }

//     // Create Users as Instructors
//     for (let i = 1; i <= 10; i++) {
//         const user = await prisma.user.create({
//             data: {
//                 fullName: `Instructor ${i}`,
//                 username: `instructor${i}`,
//                 email: `instructor${i}@example.com`,
//                 password: 'hashed_password', // Reminder: Hash in real applications
//                 phoneNum: `000000000${i}`,
//                 birthDate: new Date('1980-01-01'),
//                 gender: 'MALE',
//                 role: 'INSTRUCTOR'
//             }
//         })

//         await prisma.instructor.create({
//             data: {
//                 userId: user.id,
//                 nationalID: `123456789${i}`,
//                 cvLink: `https://example.com/cv/instructor${i}`
//             }
//         })
//     }

//     const instructors = await prisma.instructor.findMany()
//     const topics = await prisma.topic.findMany()

//     // Create Courses with all related models
//     for (const [index, instructor] of instructors.entries()) {
//         const course = await prisma.course.create({
//             data: {
//                 createdBy: instructor.id as unknown as never, // Cast instructor.id to the correct type
//                 title: `Course ${index + 1}`,
//                 description: 'A great course',
//                 price: 99.99,
//                 duration: '10 hours',
//                 photo: 'https://example.com/photo.jpg',
//                 categoryId: categories[index % categories.length].id,
//                 isAvailable: true,

//                 certificate: 'Certificate details' // Add the 'certificate' property
//             }
//         })

//         // Connect Course and Topics (many-to-many)
//         for (const topic of topics.slice(0, 2)) {
//             await prisma.courseTopic.create({
//                 data: {
//                     courseId: course.id,
//                     topicId: topic.id
//                 }
//             })
//         }

//         // Create Lectures, Contents, and Materials
//         for (let i = 1; i <= 3; i++) {
//             const section = await prisma.section.create({
//                 data: {
//                     courseId: course.id as unknown as string, // Cast course.id to the correct type
//                     title: `Section ${i}`
//                 }
//             })

//             for (let j = 1; j <= 2; j++) {
//                 const lectureContent = await prisma.lecture.create({
//                     data: {
//                         sectionId: section.id,
//                         title: `Content ${j} of Lecture ${i}`,
//                         description: `Description of Content ${j} of Lecture ${i}`,
//                         videoUrl: 'https://example.com/video.mp4',
//                         duration: `${j * 10} minutes`,
//                         thumbnail: 'https://example.com/thumbnail.jpg'
//                     }
//                 })

//                 for (let k = 1; k <= 2; k++) {
//                     await prisma.lecturesMaterials.create({
//                         data: {
//                             lectureContentId: lectureContent.id,
//                             title: `Material ${k} for Content ${j}`,
//                             description: 'Detailed description of the material.'
//                         }
//                     })
//                 }
//             }
//         }
//     }
// }

// seedDatabase()
//     .catch(e => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
