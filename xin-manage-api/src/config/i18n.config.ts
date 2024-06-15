import { I18n } from 'i18n'
import path from 'path'

const i18n: I18n = new I18n()
i18n.configure({
    locales: ['vi-VN', 'en-US'],
    directory: path.dirname(__dirname).concat('/utils/i18n'),
})

const i18nValidator = {
    fieldname: new I18n(),
    message: new I18n()
}

i18nValidator.fieldname.configure({
    locales: ['vi-VN', 'en-US'],
    directory: path.dirname(__dirname).concat('/validators/i18n/fieldname'),
})

i18nValidator.message.configure({
    locales: ['vi-VN', 'en-US'],
    directory: path.dirname(__dirname).concat('/validators/i18n/message'),
})


export {
    i18nValidator,
}
export default i18n