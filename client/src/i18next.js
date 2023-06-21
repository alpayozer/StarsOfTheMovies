import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Dropdown, Typography, Space, Menu } from "antd";
import {langs} from '../src/Language.js';
import { Link, useNavigate, useParams } from 'react-router-dom'


const fallbackLng = ['en'];
const availableLanguages = ['en', 'tr'];

i18n
  .use(Backend) // load translations using http (default                                               public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng:'en' ,
    resources: {
        en: {
          translation: langs.en
        },
        tr: {
          translation: langs.tr
        }
      },// fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

  export const ML=(key)=>{
    return(
        <>
        {i18n.t(key)}
        </>
    );
  }

  export const supportedLanguages = [
    { flag: '🏳️TR', code: 'tr' },
    { flag: '🏳️EN', code: 'en' },
  ];

  export function Language(){
    const navigate = useNavigate();

    const selectedLanguage = supportedLanguages.find(x=>x.code==i18n.language)
    return(
        <Dropdown overlay={<Menu>
            {supportedLanguages.map((language) => {
              return (
                <Menu.Item onClick={() => {
                  i18n.changeLanguage(language.code);
                  navigate("/");
                  // window.location.reload()
                }}>{language.flag}</Menu.Item>
              )
            })}
          </Menu>}>
            <Typography.Link>
              <Space>
                {selectedLanguage?.flag || i18n.language}
              </Space>
            </Typography.Link>
          </Dropdown>
    );
  }

export default i18n;