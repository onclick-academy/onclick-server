import prisma from '../prisma/prisma-client'


export class BlockStateDao {
        createBlockState = async (blockStateDto: BlockStateI) => {
        const blockState = await prisma.blockState.create({
        data: {
                id: blockStateDto.id,
                userId: blockStateDto.UserDtoId,
                adminId: blockStateDto.adminId,
                state: blockStateDto.state,
                reason: blockStateDto.reason,
                period: blockStateDto.period
        }
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
        data: {
                userId: blockStateDto.UserDtoId,
                adminId: blockStateDto.adminId,
                state: blockStateDto.state,
                reason: blockStateDto.reason,
                period: blockStateDto.period
        }
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