import { uploadToCloudflare } from '../utilities/cloudflareUpload'

class FileService {
    private path: string

    constructor(path: string) {
        this.path = path
    }

    public async putFile(file: any) {
        if (!this.isValidFile(file.mimetype)) {
            console.log('🚀 ~ FileService ~ uploadFile ~ file.type:', file)
            throw new Error('Invalid file type')
        }
        const uploadResult = await uploadToCloudflare(file, this.path)
        return uploadResult
    }

    public async getFile() {
        const url = `${process.env.CLOUDEFLARE_URL}/${this.path}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Custom-Auth-Key': process.env.CLOUDFLARE_HEADER_KEY
            }
        })
        if (!response.ok) {
            throw new Error('Failed to retrieve file from Cloudflare')
        }

        return response
    }

    public async deleteFile() {
        const url = `${process.env.CLOUDEFLARE_URL}/${this.path}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Custom-Auth-Key': process.env.CLOUDFLARE_HEADER_KEY
            }
        })
        if (!response.ok) {
            throw new Error('Failed to delete file from Cloudflare')
        }

        return response
    }

    private isValidFile(mimeType: string): boolean {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mpeg', 'video/quicktime ']
        return validTypes.includes(mimeType)
    }
}

export default FileService
