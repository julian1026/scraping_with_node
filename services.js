const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv"); //0

const init = async () => {
  console.time();
  let $ = await request({
    uri: "http://quotes.toscrape.com/",
    transform: (body) => cheerio.load(body),
  });
  //   console.log($.html());

  //   ========
  //   const webSite = $("head");
  //   console.log(webSite.html());

  //

  //   const webSiteheading = $("h1");
  //   console.log(webSiteheading.text().trim());

  //   const quote = $(".quote").find("a");
  //   console.log(quote.html());

  //   const bloque = $(".row .col-md-8").children();
  //   const bloque = $(".row .col-md-8").parent().next();
  //   console.log(bloque.html());

  /*
  const ads = $(".quote span.text").each((i, value) => {
    const t_v = $(value).text();
    const t = t_v.replace(/(^\“|\”$)/g, "");
    console.log(t);
  });
*/
  const data = {};
  writeStream.write("Quote|Author|Tags\n"); //1
  const ads = $(".quote").each((i, pointer) => {
    let all = [];
    let statement = $(pointer)
      .find("span.text")
      .text()
      .replace(/(^\“|\”$)/g, "");

    let authors = $(pointer).find("span small.author").text();

    $(pointer)
      .find(".tags a")
      .each((j, v) => {
        all[j] = $(v).text();
        // console.log($(v).text());
      });

    // console.log(i, statement, authors, all);
    data[i] = { statement, authors, tags: all };
    writeStream.write(`${statement}|${authors}|${all}\n`); //2
  });
  //   let z = JSON.stringify(data);
  //   console.log(z);
  //   console.log(data);
  console.timeEnd();

  return data;
};

module.exports = init;
