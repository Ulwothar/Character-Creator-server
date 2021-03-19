# Character-Creator-server
Server part of Character Cretor application

API endpoints:

There are three main routes:

#1. /character

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

#2. /characterdata - lets you create more general data, used by all characters:
