export const uploadToCloudflare = async (file: any, path: string) => {
    try {
        const fileBuffer = file.buffer

        const url = `${process.env.CLOUDEFLARE_URL}/${path}`

        const response = await fetch(url, {
            method: 'PUT',
            body: fileBuffer,
            headers: {
                'X-Custom-Auth-Key': process.env.CLOUDFLARE_HEADER_KEY,
                'Content-Type': file.mimetype
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to upload file to Cloudflare: ${response.statusText}`)
        }

        return {
            response,
            url,
            filename: file.originalname,
            size: (fileBuffer.byteLength / 1024).toFixed(2) + 'KB' // Format the size to two decimal places
        }
    } catch (error: any) {
        throw new Error('Failed to upload file to Cloudflare')
    }
}
