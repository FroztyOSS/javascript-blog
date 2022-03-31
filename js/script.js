'use strict';

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
  optArticleTagsSelector = '.post-tags .list';


  function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles', articles);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');


    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */



    /* create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


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

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* START LOOP: for every article: */

  for (let article of articles){


  /* find tags wrapper */

  const tagsList = article.querySelector(optArticleTagsSelector);
  console.log('tagsList', tagsList);
  /* make html variable with empty string */

let html = '';


  /* get tags from data-tags attribute */

  const articleTags = article.getAttribute('data-tags');
  console.log('articleTags', articleTags);

  /* split tags into array */

  const articleTagsArray = articleTags.split(' ');
  console.log('articleTagsArray', articleTagsArray);

  /* START LOOP: for each tag */

  for (let tag of articleTagsArray){

  /* generate HTML of the link */

  const linkTagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
  console.log('linkTagHTML',linkTagHTML);

  /* add generated code to html variable */

  html = html + linkTagHTML;
  }
  /* END LOOP: for each tag */
  }
  /* insert HTML of all the links into the tags wrapper */
  
  tagsList.innerHTML = html;

  /* END LOOP: for every article: */
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

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();