## RESTful JSON API example with nodejs/Express 4

This simple API allows users to track the books they’ve read.
The API should has an endpoint `/users/<user_id>/books/favourite` that, when called, returns a single book object.
The data source of this book object can be different for each user.
There will be two users in this example:

* Frank (id: 1):  His favourite book is stored in a local yaml file.
* June (id: 2):  Her favourite book is stored in an external API and can be accessed by calling
http://openlibrary.org/api/books?bibkeys=ISBN:0201558025&jscmd=data&format=json

The API has been designed in a modular way, using the [facade design pattern](https://en.wikipedia.org/wiki/Facade_pattern) in the library.
It can be extended at any time. For example :
* Replace the config files by API call (external API or database)
* Add another data processing method to be able to process other formats in the future (XML, excel sheets, SQL files, TSV, CSV, etc...) 

#### Dependencies
* axios: ^0.17.1
* express: ^4.16.2
* q: ^1.5.1
* yamljs: ^0.3.0

#### Installation
* application: `yarn install`

#### Execution
* Locally, run `node api.js`, `npm start` or use [forever](http://github.com/foreverjs/forever) or [pm2](https://github.com/Unitech/pm2)
* the app should be running on port 3000:
http://localhost:3000/users/1/books/favourite
http://localhost:3000/users/2/books/favourite

* and see what happens when the user doesn't exist in our data sources :
http://localhost:3000/users/NOBODY/books/favourite



#### Note
The lib corrects the provided YAML file which contains a tab as indentation, doing its job as a data processing library (at least minimal error correction functions must be implemented)