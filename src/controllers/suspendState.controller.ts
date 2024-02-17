import { SuspendStateDao } from "@models/dao/suspendState.dao";
import { SuspendStateDto } from "@models/dto/suspendState.dto";
import { suspendStateValidation } from "@middlewares/validation/users/suspendState.validation";
import { Request, Response, NextFunction } from "express";

// TODO => when Susspended should add a field to the user model to check if the user is susspended or not
// make authorization middleware to check if the user is susspended or not

export class SuspendStateController {

    static createSuspendState = async (req: Request, res: Response) => {
        const suspendStateDao = new SuspendStateDao()
        const suspendStateDto = new SuspendStateDto(req.body)
        try {
            const { error } = await suspendStateValidation.createSuspendState(suspendStateDto)
            if (error) return res.status(400).send(error.details[0].message)

            const suspendState = await suspendStateDao.createSusspendState(suspendStateDto)
            return res.status(201).json({message: 'Suspend State Created Successfully', suspendState})
        }
        catch (error: any) {
            console.log(error);
            return res.status(500).json({error: error | 'Internal Server Error' as string as any})
        }
    }

    static updateSuspendState = async (req: Request, res: Response, next: NextFunction) => {
        const suspendStateDao = new SuspendStateDao()
        const suspendStateDto = new SuspendStateDto(req.body)
        suspendStateDto.id = req.params.id

        try {

            const { error } = await suspendStateValidation.updateSuspendState(suspendStateDto)
            if (error) return res.status(400).send(error.details[0].message)

            const suspendStateUpdated = await suspendStateDao.updateSusspendState(suspendStateDto)

            res.status(200).json({message: 'Suspend State Updated Successfully', suspendStateUpdated})
        } catch (error: any) {
            console.log(error);
            res.status(500).send({error: error | 'Internal Server Error' as string as any})
        }
    }
}