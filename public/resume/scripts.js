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
        buttonText: "Ver em português",
        scheduleAConversation: "Let's schedule a conversation!"
    },
    pt: {
        name: "Acesse o meu currículo",
        downloadCV: "Baixar PDF",
        viewOnlineCV: "Ver Online",
        flagSrc: "https://flagcdn.com/w40/br.png",
        buttonText: "View in English",
        scheduleAConversation: "Agende uma conversa comigo!"
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
    document.getElementById('scheduleAConversation').textContent = languageContent[lang].scheduleAConversation;

    // Adjust links based on the language
    document.getElementById('download-cv').href = googleDocsLinks[lang] + "/export?format=pdf";
    document.getElementById('view-online-cv').href = googleDocsLinks[lang] + "/preview";
}

function toggleLanguage() {
    const currentLang = document.getElementById('language-button').textContent === languageContent['pt'].buttonText ? 'en' : 'pt';
    setLanguage(currentLang);
}

// Set initial language
setLanguage(getUserLanguage());
