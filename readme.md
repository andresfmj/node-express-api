# node-express-api
> _A sample for the darkzone idle-rpg api rest_

This repo enables for you some of the endpoints used in a game called as _darkzone_, only for demo purposes. Final product can be found on google play and app store. 

## Tech stack used
* Node/Express
* MongoDB
* SocketIO

## Installation
* Get Node and NPM from [here](https://nodejs.org/download).
* Rename `.env.example` file to `.env`
* Set the variables in `.env` file correctly
* Run the following command: 
    ```
    $ npm install && npm start
    ```
> Remember you need to install mongoDB 4.4 preferably in order to get this api working

## API/Events Reference
|   Endpoint	|   Method	|   URI |   	|   Parameters	|  
|---	|---	|---	|---	|---	|
|   GetFriends	|   GET, Event	|   /hunters/friends	|   	|   user: Object,<br />hunterSelected: String	|
|   GetRandom	|   GET, Event	|   /hunters/random	    |  	|   user: Object,<br />hunterSelected: String	|
|   Healthcheck	|   GET	|   /	|   	|   	|
|   ON_SUCCESS_GETRANDOM	|   Event	|   	|   	|   	|    |
|   ON_ERROR_GETRANDOM	|   Event	|   	|   	|   	|
|   ON_SUCCESS_GETFRIENDS	|   Event	|   	|   	|   	| 
|   ON_ERROR_GETFRIENDS	|   Event	|   	|   	|   	|

All endpoints and emitted events deliver a json response like this:
* In case of error:
    ```javascript
    {
        error: Boolean,
        message: '', // empty string
    }
    ```
* On success response:
    ```javascript
    {
        error: Boolean,
        message: 'string',
        rows: Number,
        results: Array
    }
    ```

<br />

## How to use
Every api request can be point from any app or postman to the port specified at the APP_PORT environment variable.
SocketIO Events can be listened at the same port.

### Parameters can be received like this:
```javascript
{
    "user": {
        "_id": String, // _id must be in string-format
        "friends": Array // every _id of user's friends must be an array of string
    },
    "hunterSelected": String // _id in string-format
}
```


