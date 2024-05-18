import { uploadToCloudflare } from '../utilities/cloudflareUpload'

export interface PathI {
    userId: string
    sectionId: string
    courseId: string
    lectureId: string
}

class FileService {
    private isSingle: boolean
    private path: PathI

    constructor(isSingle: boolean = true, path: PathI) {
        this.isSingle = isSingle
        this.path = path
    }

    public async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string) {
        console.log('🚀 ~ FileService ~ uploadFile ~ mimeType:', mimeType)
        if (!this.isValidFile(mimeType)) {
            throw new Error('Invalid file type')
        }
        const uploadResult = await uploadToCloudflare(mimeType, fileBuffer, fileName, this.path)
        return uploadResult
    }

    public async uploadFiles(files: any[]) {
        if (this.isSingle) {
            throw new Error('Cannot upload multiple files in single file mode')
        }
        if (!Array.isArray(files)) {
            throw new Error('Invalid files')
        }

        const uploadResults = []
        for (const file of files) {
            if (this.isValidFile(file.mimetype)) {
                const uploadResult = await uploadToCloudflare(file.mimeType, file.buffer, file.originalname, this.path)
                uploadResults.push(uploadResult)
            }
        }
        return uploadResults
    }

    private isValidFile(mimeType: string): boolean {
        // const validTypes = this.isSingle
        //     ? ['video/mp4']
        //     : ['image/jpeg', 'image/png', 'application/pdf', 'application/msword']
        // return validTypes.includes(mimeType)
        return true
    }
}

export default FileService
