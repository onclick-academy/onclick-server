import nodemailer from 'nodemailer'

/**
 * Description - Send email to user with the given HTML template
 * @instructions
 *    1. create a file in views folder with the name of the template
 *    2. read the file using fs.readFileSync and store it in a variable
 *    3. pass the variable to handlebars.compile and store the result in a variable
 *    4. use template({}) to pass the data to the template
 *    5. pass the result to the sendEmail function
 * @param html HTML template to send
 * @param email Email to send the HTML template to
 * @returns void
 */
export const sendEmail = async (html: string, email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
            service: 'gmail'
        })

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: 'no-reply OnClick Academy',
            html
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
