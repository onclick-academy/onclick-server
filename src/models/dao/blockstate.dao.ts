import prisma from '../prisma/prisma-client'


export class BlockStateDao {
        createBlockState = async (blockStateDto: BlockStateI) => {
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
        
        updateBlockState = async (blockStateDto: BlockStateI) => {
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
