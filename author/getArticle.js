import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const getArticle = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.text();
        const $ = cheerio.load(data);

        const title = $('h1.entry-title').text();
        const datetime = $('time.entry-date').attr('datetime');
        const img = $('div.post-thumb a img').attr('src');

        const content = [];
        $('.single-content-wrap .single-entry p').each((i, element) => {
            const $element = $(element);
            let text = $element.text();
            if(text === ''){
                text = $element.find('img').attr('src');
            }
            content.push(text);
        });
        return {
            title,
            datetime,
            img,
            content
        };
    } catch (e){
        return { error: e };
    }
};