# Technical Screening Test for CREATIWISE

# ###Please SCroll Down to active the scrapping process###

## Google Chrome Extension for Linkedin Profile Scrapping

When in a Linkedin Profile of an user, the extension scrapes through the profile and gets information in JSON format regarding name, title, location, about, profile_pic, linkedin_profile_link, experiences, education, skills, languages and volunteer experience.

## Work Procedure

After clicking the extension icon, the extension first checks if the url is a linkedin user profile. If the link is an user profile then the extension slides out slider dock which will show the JSON data of the profile. The extension needs the user to scroll for the scrapping to start. While scrapping, the extension gets the data with the use of jquery. We get the specific sections with the help of section id (querySelector) and then traverse through the section to get different data. While getting data for section where there are multiple data of similar type, such as education or experience, we get the specific section through the section id and get similar type of datas through class name (querySelectorAll) then traverse through the array of data to get the different information.
