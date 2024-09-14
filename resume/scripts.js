const googleDocsLinks = {
    en: "https://docs.google.com/document/d/1S5jECXEguofl2ZkJbNya6_og84U8Vh61tvMQQdnRMI8",
    pt: "https://docs.google.com/document/d/1CxVqhS6i_EAQZjvsUP_RokEoGVL33rmySCIqR84W1R0"
};

const languageContent = {
    en: {
        name: "Access my resume",
        downloadCV: "Download PDF",
        viewOnlineCV: "View Online",
        flagSrc: "https://flagcdn.com/w40/us.png",
        buttonText: "Change Language"
    },
    pt: {
        name: "Acesse o meu currículo",
        downloadCV: "Baixar PDF",
        viewOnlineCV: "Ver Online",
        flagSrc: "https://flagcdn.com/w40/br.png",
        buttonText: "Alterar Idioma"
    }
};

function getUserLanguage() {
    return navigator.language.startsWith('pt') ? 'pt' : 'en';
}

function setLanguage(lang) {
    document.getElementById('name').textContent = languageContent[lang].name;
    document.getElementById('download-cv').children[1].textContent = languageContent[lang].downloadCV;
    document.getElementById('view-online-cv').children[1].textContent = languageContent[lang].viewOnlineCV;
    document.getElementById('language-button').textContent = languageContent[lang].buttonText;

    // Adjust links based on the language
    document.getElementById('download-cv').href = googleDocsLinks[lang] + "/export?format=pdf";
    document.getElementById('view-online-cv').href = googleDocsLinks[lang] + "/preview?rm=demo";
}

function toggleLanguage() {
    const currentLang = document.getElementById('language-button').textContent === languageContent['pt'].buttonText ? 'en' : 'pt';
    setLanguage(currentLang);
}

// Set initial language
setLanguage(getUserLanguage());
