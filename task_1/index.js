import { encoded, translations } from "./data.js";

/**
 * Функция декодирует поля id, кроме полей: _groupId_, _service_, _formatSize_ и _ca_.
 * @param {Object[]} encoded - Список объектов с закодированными id.
 * @param {Object} translations -  Словарь значений id, используемый при раскодировании.
 * @returns {Object[]} - Список объектов с декодированными id.
 */
const decode = (encoded, translations) => {
    const decoded = [];
    const excluded = ["groupId", "service", "formatSize", "ca"];
    for (let i = 0; i < encoded.length; i += 1) {
        decoded[i] = {};
        for (let field in encoded[i]) {
            if (excluded.includes(field) || !translations[encoded[i][field]]) {
                decoded[i][field] = encoded[i][field];
            } else {
                decoded[i][field] = translations[encoded[i][field]];
            }
        }
    }
    return decoded;
};

/**
 * Функция, которая возвращает id, уникальные для всего списка encoded, без исключения полей _groupId_, _service_, _formatSize_ и _ca_
 * @param {Object[]} encoded - Список объектов с закодированными id
 * @returns {Array} - Список уникальных id
 */
const findUniqueIds = (encoded) => {
    const Ids = [];
    const duplicates = [];
    const uniqueIds = [];
    for (let group of encoded) {
        for (let field in group) {
            if (!Ids.includes(group[field])) {
                Ids.push(group[field]);
            } else {
                duplicates.push(group[field]);
            }
        }
    }
    for (let id of Ids) {
        if (!duplicates.includes(id)) {
            uniqueIds.push(id);
        }
    }
    return uniqueIds;
};

/**
 * Функция, которая возвращает id, которые невозможно раскодировать, используя translations, без исключения полей _groupId_, _service_, _formatSize_ и _ca_
 * @param {Object[]} encoded - Список объектов с закодированными id
 * @param {Object} translations -  Словарь значений id, используемый при раскодировании.
 * @returns {Array} - Список id, которые невозможно раскодировать, используя translations
 */
const findAllFieldsWithUntranslatableIds = (encoded, translations) => {
    const untranslatables = [];
    for (let group of encoded) {
        for (let field in group) {
            if (!translations[group[field]]) {
                untranslatables.push(group[field]);
            }
        }
    }
    const setOfUntranslatables = new Set(untranslatables);
    return Array.from(setOfUntranslatables);
};

const decoded = decode(encoded, translations);
const uniqueIds = findUniqueIds(encoded);
const untranslatableIds = findAllFieldsWithUntranslatableIds(
    encoded,
    translations
);

// console.log("Let's rock");
// console.log(translations);
console.log(decoded);
console.log(uniqueIds);
// console.log(untranslatableIds);
