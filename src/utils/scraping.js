import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeFideProfile = async (fideId) => {
    const url = `https://ratings.fide.com/profile/${fideId}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const name = $('h1').text().trim();
        const rating = $('div.profile-top-rating-data span').first().text().trim();
        const country = $('div.profile-top-info-data span').first().text().trim();

        return { name, rating, country };
    } catch (error) {
        console.error("Error scraping FIDE profile: ", error.message);
        return null;

    }
}