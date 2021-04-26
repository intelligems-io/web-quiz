## HowdyScreen 
Task
- create form that takes in: name, email, company name 
- on submit: sends API POST to url and gives submit message

Thoughts
- designed for form consistency, wanted to keep the theme that was already started
- wanted to use as much of existing code as I could, such as InputRow component

Changes Made
- changed background gradient to match your homepage
- changed form spacing so it didn't overlap itself 
- made the main form headers bigger (easier to read)
- added howdy.tsx (sorry for the name) inside of my form folder
- added a form that comes from "I want to learn more" button on resultsScreen and does not loop back around

Difficulties
- adapting inputRow to do what I want -> the fade stopped working after I linked my page back into the carousel
- props passing data into the form initially -> wanted to use inputRow but the show attribute did not want to change so I left it as is and created a different prop system inside howdy.tsx

If-I-Had-More-Time
- added WAI-ARIA (web accessibility) features to my form (aria-labelling etc.)
- changed the UI look more (but the form already looked really good)
- worked out the kinks in my form (why the fade didn't work, how to loop around to the welcome page while keeping my submit message still working, reset values of form after submission)
- made separate style sheet
- I did add comments throughout the howdy.tsx so you aren't trying to decipher what goes to what 
