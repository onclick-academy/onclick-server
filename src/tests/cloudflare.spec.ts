import { uploadToCloudflare } from '../utilities/cloudflareUpload'

describe('uploadToCloudflare', () => {
    it('should upload file to Cloudflare', async () => {
        // Mock the necessary dependencies and environment variables
        const file = {
            buffer: Buffer.from('file content'),
            mimetype: 'image/jpeg',
            originalname: 'image.jpg'
        }
        const path = 'uploads/image.jpg'
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            statusText: 'OK'
        })
        global.fetch = fetchMock
        process.env.CLOUDEFLARE_URL = 'https://example.com'
        process.env.CLOUDFLARE_HEADER_KEY = 'your-auth-key'

        // Call the function
        const result = await uploadToCloudflare(file, path)

        // Assertions
        expect(fetchMock).toHaveBeenCalledWith('https://example.com/uploads/image.jpg', {
            method: 'PUT',
            body: file.buffer,
            headers: {
                'X-Custom-Auth-Key': 'your-auth-key',
                'Content-Type': 'image/jpeg'
            }
        })
        expect(result).toEqual({
            response: {
                ok: true,
                statusText: 'OK'
            },
            url: 'https://example.com/uploads/image.jpg',
            filename: 'image.jpg',
            size: '0.01KB'
        })
    })

    it('should throw an error if file upload fails', async () => {
        // Mock the necessary dependencies and environment variables
        const file = {
            buffer: Buffer.from('file content'),
            mimetype: 'image/jpeg',
            originalname: 'image.jpg'
        }
        const path = 'uploads/image.jpg'
        const fetchMock = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Bad Request'
        })
        global.fetch = fetchMock
        process.env.CLOUDEFLARE_URL = 'https://example.com'
        process.env.CLOUDFLARE_HEADER_KEY = 'your-auth-key'

        // Call the function and expect it to throw an error
        await expect(uploadToCloudflare(file, path)).rejects.toThrow('Failed to upload file to Cloudflare')
    })
})
