import fetch from "node-fetch";
import * as cheerio from "cheerio";

async function audit(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  return {
    title: $("title").text(),
    metaDescription: $('meta[name="description"]').attr("content"),
    h1: $("h1").first().text()
  };
}

audit("https://example.com").then(console.log);
