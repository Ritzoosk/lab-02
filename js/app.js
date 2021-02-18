'use strict';

function HornedPics(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  HornedPics.allHornedPics.push(this);
}
HornedPics.allHornedPics = [];


HornedPics.prototype.renderHorn = function(){
  const $liCopy = $('#tempLi').clone();
  $liCopy.attr('id', "nottemp");
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.url);
  //console.log(this.url);

  $liCopy.find('h5').text(this.description);
  $liCopy.find('p').text(this.horns);
  //console.log(this);
  $('section').append($liCopy);
}

HornedPics.prototype.populateDrop = function(){
 
  const arrDrop = [];
    if(arrDrop.includes(`${this.keyword}`)=== false){
      arrDrop.push(this.keyword);
    }
  arrDrop.forEach(value => {
    // console.log(value);

    const $dropOp = $('#tempOp').clone();
    $dropOp.attr('value', this.keyword);

    //$optionCopy.attr('value', this.keyword);

    $dropOp.text(this.keyword)
    // console.log(arrDrop);

    $('select').append($dropOp);
    
  });
};




$.ajax('data/page-1.json').then (goGet);

function goGet(comesBackPotato) {
  //console.log(comesBackPotato);

  comesBackPotato.forEach(hornJsonObject => {
    //console.log(hornJsonObject.url);
    new HornedPics(hornJsonObject.image_url, hornJsonObject.title, hornJsonObject.description, hornJsonObject.keyword, hornJsonObject.horns);
  });
  //console.log(HornedPics);
  HornedPics.allHornedPics.forEach(hornPic => hornPic.renderHorn());

  HornedPics.allHornedPics.forEach(hornPic => hornPic.populateDrop())
}


$('select').on('change', handleClick);

function handleClick(){
  //console.log("in the listener");

  const clickedKeyword = $('select').val();
  //console.log(clickedKeyword);
  showKeywordHideOthers(clickedKeyword);
}

function showKeywordHideOthers(keyword){
  $('li').hide();
  $(`li:contains(${keyword})`).show();
}



$('#page1').on('click', pageClick1);

function pageClick1(){
  console.log("page1 click happened");
  $('section').empty();
  $('select').empty();
  HornedPics.allHornedPics = [];
  $('#page1').toggle();
  $('#page2').toggle();

  $.ajax('data/page-2.json').then (goGet);

}

$('#page2').on('click', pageClick2);

function pageClick2(){
  console.log("page2 click happened");
  $('section').empty();
  $('select').empty();
  HornedPics.allHornedPics = [];
  $('#page1').toggle();
  $('#page2').toggle();

  $.ajax('data/page-1.json').then (goGet);

}






  
  

