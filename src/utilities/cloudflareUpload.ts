import { Blob } from 'buffer'
import { PathI } from '../services/FileService'

export const uploadToCloudflare = async (mimeType: string, fileBuffer: Buffer, fileName: string, path: PathI) => {
    try {
        console.log(`Uploading ${fileName} to Cloudflare...`)
        const formData = new FormData()
        // Convert Buffer to Blob
        const blob = new Blob([fileBuffer], { type: mimeType })

        formData.append('file', blob, fileName)

        const { userId, sectionId, courseId, lectureId } = path

        const response = await fetch(
            `https://onclick-worker.imhusamg.workers.dev/${userId}/${courseId}/${sectionId}/${lectureId}`,
            {
                method: 'PUT',
                body: formData,
                headers: {
                    'X-Custom-Auth-Key': 'a223adbe-48c9-4a90-967b-838f6139ddd8',
                    'Content-Type': 'multipart/form-data'
                }
            }
        )

        if (!response.ok) {
            throw new Error(`Failed to upload file to Cloudflare: ${response.statusText}`)
        }

        console.log(`Uploaded ${fileName} to Cloudflare!`)

        return {
            url: `https://onclick-worker.imhusamg.workers.dev/${userId}/${courseId}/${sectionId}/${lectureId}/${fileName}`,
            filename: fileName,
            size: fileBuffer.byteLength
        }
    } catch (error: any) {
        console.log('🚀 ~ uploadToCloudflare ~ error:', error)
        console.log(error)
        throw new Error('Failed to upload file to Cloudflare')
    }
}
