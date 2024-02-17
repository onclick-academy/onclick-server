import prisma from '../prisma/prisma-client'

export class LectureMaterialDao {
    createLectureMaterial = async (lectureMaterialDto: lectureMaterialI) => {
        const lectureMaterial = await prisma.lecturesMaterials.create({
            data: lectureMaterialDto
        })
        return lectureMaterial
    }

    getLectureMaterial = async (id: string) => {
        const lectureMaterial = await prisma.lecturesMaterials.findFirst({
            where: {
                id: id,
                isDeleted: false
            }
        })
        return lectureMaterial
    }

    updateLectureMaterial = async (lectureMaterialDto: lectureMaterialI) => {
        const lectureMaterial = await prisma.lecturesMaterials.update({
            where: {
                id: lectureMaterialDto.id,
                isDeleted: false
            },
            data: {
                title: lectureMaterialDto.title,
                description: lectureMaterialDto.description
            }
        })
        return lectureMaterial
    }

    deleteLectureMaterial = async (id: string) => {
        const lectureMaterial = await prisma.lecturesMaterials.delete({
            where: {
                id: id,
                isDeleted: false
            }
        })
        return lectureMaterial
    }
}
