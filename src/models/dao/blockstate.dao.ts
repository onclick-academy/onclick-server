import prisma from '@models/prisma/prisma-client'

export class BlockStateDao {
    createBlockState = async (blockStateDto: any) => {
        const blockState = await prisma.blockState.create({
            data: blockStateDto
        })
        return blockState
    }

    getBlockState = async (id: string) => {
        const blockState = await prisma.blockState.findFirst({
            where: {
                id: id
            }
        })
        return blockState
    }

    updateBlockState = async (blockStateDto: any) => {
        const blockState = await prisma.blockState.update({
            where: {
                id: blockStateDto.id
            },
            data: blockStateDto
        })
        return blockState
    }

    deleteBlockState = async (id: string) => {
        const blockState = await prisma.blockState.delete({
            where: {
                id: id
            }
        })
        return blockState
    }
}
