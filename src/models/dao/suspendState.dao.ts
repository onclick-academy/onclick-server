import prisma from "@models/prisma/prisma-client";

export class SuspendStateDao {
    createSusspendState = async (susspendStateDto: SuspendStateDtoI) => {
        //validate Ids

        const susspendState = await prisma.suspendState.create({
            data: susspendStateDto
        })

        return susspendState
    }

    updateSusspendState = async (susspendStateDto: SuspendStateDtoI) => {
        //validate Ids

        const susspendState = await prisma.suspendState.update({
            where: {
                id: susspendStateDto.id // should we user userId instead?
            },
            data: susspendStateDto
        })

        return susspendState
    }
}