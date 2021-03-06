# Character-Creator-server
Server part of Character Cretor application
All endpoints can be checked on this project's website using apio-docs. Please check: http://cc.mattkrp.co.uk/api-docs

API endpoints:

There are three main routes:

# 1. /character

This route includes all the endpoints needed to manage our character:

GET '/:characterCode' - returns all the data of specific character,

POST '/' - Creates new character and returns it back in JSON format. It requires some data to be passed in the body of request:
- race,
- _class,
- name,
- nature,
- stats,
- skills.

PATCH '/' - Updates existing character, this request has all the requirements above and:
- characterCode,
- level.

DELETE '/:characterCode' - deletes the character with specified characterCode.

# 2. /characterdata 

Lets you create more general data, used by all characters. All theese routes return created item in JSON format:

POST '/add-class' - create new class, field 'name' must be provided.

POST '/add-nature' - create new nature, field 'name' must be provided

POST '/add-race' - create new race, field 'name' must be provided

POST '/add-skill' - create new skill, field 'name' must be provided

POST '/add-stat' - create new stat, field 'name' must be provided

POST '/add-school' - create new school of magic, field 'name' must be provided

POST '/add-spell' - create new spell. The following fields must be provided:
- name - string,
- cost - number,
- schoolId - Id of school of magic in string format,
- description - string,
- summary - string.

# 3. /formdata

There is one route here, showing all possible features the character can have (all from section 2).

GET '/character' - returns object with all possible classes, races, natures, skills, stats, schools and spells.

# 3 /api-docs

This is swagger route - documentation of this API. Every route can be checked, used or tested. This route is used for two main reasons:
- lets you test the API and quickly add items to database.
- helps front-end people find out how to communicate with this API.
