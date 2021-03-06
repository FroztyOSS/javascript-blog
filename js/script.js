'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  linkTag: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log (event);


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
   
  clickedElement.classList.add('active');

  

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }


  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);


  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');


}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);


  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');


    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */



    /* create HTML of the link */
    
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);


    /* insert link into titleList */
    html = html + linkHTML;

  }
  titleList.innerHTML = html;

  
  const links = document.querySelectorAll('.titles a');

    
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
}
generateTitleLinks();

function calculateTagsParams(tags) {

  const params = {max: 0, min: 999999};

  for(let tag in tags){

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}


function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
 

}

function generateTags() {
  
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);


  /* START LOOP: for every article: */

  for (let article of articles){


    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';


    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');


    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');


    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){

      /* generate HTML of the link */

      /* const linkTagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';*/

      const linkTagHTMLData = {id: tag, title: tag};
      const linkTagHTML = templates.linkTag(linkTagHTMLData);

      /* add generated code to html variable */

      html = html + linkTagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)) {
      /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
  
    tagsList.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};


  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags) {


    /* [NEW] genarate code of a link and add it to allTagsHTML */
    // allTagsHTML +- tag + '(' + allTags[tag] + ')';
    //allTagsHTML += '<li><a class="" href="#tag-' + tag + '">' + tag  + ' (' + allTags[tag] + ')' + '</a></li>';


    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags(); 

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let activeTagLink of activeTagLinks) {

    /* remove class active */

    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tag of tagLinksHref) {

    /* add class active */

    tag.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}


function addClickListenersToTags(){
  /* find all links to tags */

  const AllLinksTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let link of AllLinksTags) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function calculateAuthorParams(authors) {

  const authorParams = {max: 0, min: 999999};
  
  for(let articleAuthorName in authors){
  
    if(authors[articleAuthorName] > authorParams.max){
      authorParams.max = authors[articleAuthorName];
    }
    if(authors[articleAuthorName] < authorParams.min){
      authorParams.min = authors[articleAuthorName];
    }
  }
  
  return authorParams;
}

  

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */

    /* get authors from data-author attribute */
    const articleAuthorName = article.getAttribute('data-author');

    /* generate HTML of the link */
    const authorLinkHTMLData = { id: articleAuthorName, title: articleAuthorName };
    const authorLinkHTML = templates.authorLink(authorLinkHTMLData);

    /* add generated code to html variable */

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthorName]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthorName] = 1;
    } else {
      allAuthors[articleAuthorName]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = authorLinkHTML;

    /* [NEW] find list of authors in right column */
    const authorRightColumnList = document.querySelector(optAuthorsListSelector);

    const authorParams = calculateAuthorParams(allAuthors);

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = { authors: [] };

    /* [NEW] START LOOP: for each authorName in allAuthors: */
    for (let articleAuthorName in allAuthors) {
      allAuthorsData.authors.push({
        author: articleAuthorName,
        count: allAuthors[articleAuthorName],
      });
      /* END LOOP: for every article: */
    }

    authorRightColumnList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }

}

generateAuthors();


function authorClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */

  const activeAuthorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  for (let activeAuthorLinkHref of activeAuthorLinksHref) {

    /* add class active */
    activeAuthorLinkHref.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  /* find all links to authors */

  const AllLinksAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */

  for (let link of AllLinksAuthors) {

    /* add authorClickHandler as event listener for that link */

    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
