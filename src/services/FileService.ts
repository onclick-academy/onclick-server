import { uploadToCloudflare } from '../utilities/cloudflareUpload'

class FileService {
    private path: string

    constructor(path: string) {
        this.path = path
    }

    public async uploadFile(file: any) {
        if (!this.isValidFile(file.mimetype)) {
            console.log('🚀 ~ FileService ~ uploadFile ~ file.type:', file)
            throw new Error('Invalid file type')
        }
        const uploadResult = await uploadToCloudflare(file, this.path)
        return uploadResult
    }

    public async uploadFiles(files: any[]) {
        if (!Array.isArray(files)) {
            throw new Error('Invalid files')
        }

        const uploadResults = []
        for (const file of files) {
            if (this.isValidFile(file.mimetype)) {
                const uploadResult = await uploadToCloudflare(file, this.path)
                uploadResults.push(uploadResult)
            }
        }
        return uploadResults
    }

    private isValidFile(mimeType: string): boolean {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime ']
        return validTypes.includes(mimeType)
        return true
    }
}

export default FileService
