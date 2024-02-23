import { CronJob } from 'cron';
import { UserDao } from '@models/dao/user.dao';

// TODO We should send an anounce email before hard deleting...
export const hardDeleteUserAfter30Days = new CronJob('0 0 0 * * *', async () => {

    const userDao = new UserDao();

    const users = await userDao.getAllUsers();

    users.forEach(async (user) => {
        if (user.isDeleted) {
            const currDate = new Date();
            const deletedDate =  user.deletedAt as unknown as Date;
            const days = (currDate.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24);
            if (days >= 30) {
                // TODO send Announce Email
                await userDao.hardDeleteUser(user.id);
            }
        }
    });
});
