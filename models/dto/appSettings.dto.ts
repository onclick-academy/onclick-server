class AppSettingsDto {
  mainEmail: string
  contactEmail: string
  contactPhone: string
  aboutUs: string
  terms: string
  privacy: string
  logo: string
  favicon: string
  coverSlides: string[]
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }

  constructor(bodyReq: AppSettingsInterface) {
    this.mainEmail = bodyReq['mainEmail']
    this.contactEmail = bodyReq['contactEmail']
    this.contactPhone = bodyReq['contactPhone']
    this.aboutUs = bodyReq['aboutUs']
    this.terms = bodyReq['terms']
    this.privacy = bodyReq['privacy']
    this.logo = bodyReq['logo']
    this.favicon = bodyReq['favicon']
    this.coverSlides = bodyReq['coverSlides']
    this.socialLinks = bodyReq['socialLinks']
  }
}
