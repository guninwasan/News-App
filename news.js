import {article_url, api_key} from './config'


export async function getNewsArticles(){
    try{
      let articles= await fetch(`${article_url}?country=${country_code}&category=${category}&apiKey=${api_key}`);

      let result = await articles.json();
      articles=null;

      return result.articles;

    }
    catch(error){
      throw error;
    }
}
