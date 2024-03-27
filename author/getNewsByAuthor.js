import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const newsUrl = 'https://infohealth.com.br/author/';

export const getNewsByAuthor = async (authorName) => {
    try {
        const response = await fetch(`${newsUrl}${authorName}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.text();
        const $ = cheerio.load(data);
        const news = [];

        $('.layout3-post').each((i, element) => {
            const $element = $(element);
            const title = $element.find('h3.post-title a.post-title-link').text();
            const url = $element.find('h3.post-title a.post-title-link').attr('href');
            news.push({
                title,
                url
            });
        });

        const author = {
            name: $('span.vcard').text(),
            description: $('li.item-current-raphael').text(),
        };

        const columnist = {
            author,
            news
        };
        return columnist;
    } catch (e) {
        return { error: e };
    }
}

export default getNewsByAuthor;