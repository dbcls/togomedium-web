//TODO: use better parser
const decodeHTMLEntities = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
};

export { decodeHTMLEntities as d };
//# sourceMappingURL=decodeHtmlEntities-9696853d.js.map
