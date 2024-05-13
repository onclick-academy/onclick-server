import { SearchDao } from '@models/dao/search.dao'

export class SearchController {

    static search = async (req: any, res: any) => {
        const searchDao = new SearchDao()
        try {
            const { query } = req.params
            const searchResults = await searchDao.search(query)
            return res.status(200).json({ message: 'Search results', data: searchResults })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }
}