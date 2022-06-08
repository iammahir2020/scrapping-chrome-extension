var url = "";
const todo = { todo: "getCurrentWindow" };

chrome.runtime.sendMessage(todo);
mainFunction();

function mainFunction() {
  var data = {};
  createSlide();

  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.todo == "toggle") {
      slider();
    }
  });

  data = extract();
  var bodycontainer = document
    .getElementById("slider")
    .querySelector("#sbodycontainer");
  bodycontainer = bodycontainer.querySelector("#objectvalue");
  bodycontainer.value = JSON.stringify(data);
  window.onscroll = function () {
    data = extract();
    var bodycontainer = document
      .getElementById("slider")
      .querySelector("#sbodycontainer");
    bodycontainer = bodycontainer.querySelector("#objectvalue");
    bodycontainer.value = JSON.stringify(data);
  };
}

function createSlide() {
  var slider = document.createElement("div");
  slider.id = "slider";
  var sliderDivInnerHTML = `<div id='sheader'>
        <h3>Profile Information will show in the text area below.</h3>
        <p>N.B: Please scroll down on linkedin profile for getting information</p>
        <p>Get information in JSON format regarding profile_info ( name, title, location, about, profile_pic, linkedin_profile_link), experiences, education, skills, languages and volunteer experience</p>
        <hr/>
    </div>
    <div id='sbodycontainer'>
        <textarea id='objectvalue'></textarea>
    </div>
    <div>
        <small>*close the sliding dock by clicking the extension icon again</small>
    </div>`;

  slider.innerHTML += sliderDivInnerHTML;

  var x = document.getElementsByClassName("ad-banner");
  var y = $(".ad-banner-container");
  try {
    x[0].remove();
    y.remove();
  } catch (err) {
    console.log(err);
  }

  document.body.prepend(slider);
}

function slider() {
  var slider = document.getElementById("slider");

  var styler = slider.style;

  if (styler.width == "0px") {
    styler.width = "400px";
  } else {
    styler.width = "0px";
  }
}

function extract() {
  var userProfile = {};

  const profileSection = document.querySelector(".pv-top-card");

  const fullNameElement = profileSection?.querySelector("h1");
  const fullName = fullNameElement?.textContent || null;

  const titleElement = profileSection?.querySelector(".text-body-medium");
  var title = titleElement?.textContent || null;

  var tbs = profileSection?.querySelectorAll(".text-body-small");
  const locationElement = tbs ? tbs[tbs.length - 2] : null;
  var location = locationElement?.textContent || null;

  const photoElement =
    document.querySelector(".pv-top-card-profile-picture__image") ||
    profileSection?.querySelector(".profile-photo-edit__preview");
  const photo = photoElement?.getAttribute("src") || null;

  const descriptionElement = document
    .querySelector("div#about")
    ?.parentElement.querySelector(
      ".pv-shared-text-with-see-more > div > span.visually-hidden"
    );
  var description = descriptionElement?.textContent || null;

  const url = window.location.href.toString();
  var rawProfileData = {
    fullName,
    title,
    location,
    photo,
    description,
    url,
  };

  var profileData = {
    name: getCleanText(rawProfileData.fullName),
    title: getCleanText(rawProfileData.title),
    location: getCleanText(rawProfileData.location),
    about: getCleanText(rawProfileData.description),
    profile_pic: rawProfileData.photo,
    linkedin_profile_link: rawProfileData.url,
  };

  var nodes =
    document
      .querySelector("div#experience")
      ?.parentElement.querySelectorAll(
        "ul.pvs-list > li.artdeco-list__item > div.pvs-entity"
      ) || [];
  let UwU = [];

  for (const node of nodes) {
    let experiences = node.querySelectorAll("span.visually-hidden");

    let experiences_strings = [];

    for (const experience of experiences) {
      experiences_strings.push(experience.textContent);
    }

    UwU.push(experiences_strings);
  }
  var experiences = UwU;

  var nodes =
    document
      .querySelector("div#education")
      ?.parentElement.querySelectorAll(
        "ul.pvs-list > li.artdeco-list__item > div.pvs-entity"
      ) || [];
  let VwV = [];

  for (const node of nodes) {
    let institutions = node.querySelectorAll("span.visually-hidden");

    let institution_strings = [];

    for (const institution of institutions) {
      institution_strings.push(institution.textContent);
    }

    VwV.push(institution_strings);
  }
  var education = VwV;

  var nodes =
    document
      .querySelector("div#skills")
      ?.parentElement.querySelectorAll(
        "ul.pvs-list > li.artdeco-list__item > div.pvs-entity"
      ) || [];
  let WuW = [];

  for (const node of nodes) {
    let skills = node.querySelectorAll("span.visually-hidden");

    let skills_strings = [];

    for (const skill of skills) {
      skills_strings.push(skill.textContent);
    }

    WuW.push(skills_strings);
  }
  var skills = WuW;

  var nodes =
    document
      .querySelector("div#languages")
      ?.parentElement.querySelectorAll(
        "ul.pvs-list > li.artdeco-list__item > div.pvs-entity"
      ) || [];
  let AuA = [];

  for (const node of nodes) {
    let languages = node.querySelectorAll("span.visually-hidden");

    let languages_strings = [];

    for (const language of languages) {
      languages_strings.push(language.textContent);
    }

    AuA.push(languages_strings);
  }
  var languages = AuA;

  var nodes =
    document
      .querySelector("div#volunteering_experience")
      ?.parentElement.querySelectorAll(
        "ul.pvs-list > li.artdeco-list__item > div.pvs-entity"
      ) || [];
  let QuQ = [];

  for (const node of nodes) {
    let volunteering_experience = node.querySelectorAll("span.visually-hidden");

    let volunteering_experience_strings = [];

    for (const experience of volunteering_experience) {
      volunteering_experience_strings.push(experience.textContent);
    }

    QuQ.push(volunteering_experience_strings);
  }
  var volunteering_experience = QuQ;

  userProfile = {
    profile_info: profileData,
    experiences: experiences,
    education: education,
    skills: skills,
    languages: languages,
    volunteer_experience: volunteering_experience,
  };

  return userProfile;
}

function getCleanText(text) {
  const regexRemoveMultipleSpaces = / +/g;
  const regexRemoveLineBreaks = /(\r\n\t|\n|\r\t)/gm;

  if (!text) return null;

  const cleanText = text
    .replace(regexRemoveLineBreaks, "")
    .replace(regexRemoveMultipleSpaces, " ")
    .replace("...", "")
    .replace("See more", "")
    .replace("See less", "")
    .trim();

  return cleanText;
}
