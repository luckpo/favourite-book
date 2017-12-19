"use strict"
//My libs
/*
Q is for async calls. I use promises with a deferred object. Promises can also be managed natively by es6 promises
YAML is for YAML parsing
axios is for http requests
*/
const Q = require("q"),
    YAML = require('yamljs'),
    fs = require("fs"),
    axios = require("axios");

//Our function to get the localYAML. Note : the file has to be in the "data" folder,
//hence the presence of __dirname in the param to ensure that.
let localYAML = function (filename) {
    let d = Q.defer();
    //CAVEAT : doing this in a test is OK, but in high concurrency, calls to the filesystem can quickly become a bottleneck.
    //If we don't have the choice, it is better to create a script that will be able to load our files in the RAM first thing.
    //Just a singleton can do the trick, and of course, the amount of ram has to be checked first.
    try {
        fs.readFile(`${__dirname}/data/${filename}`, function (err, data) {
            if (err) throw err;
            let targetObject = {};
            //The source YAML contained tabs as indentation, which made it an invalid YAML.
            //I had to replace them by spaces with a regexp as the yaml library complained about this.
            //I did not want to modify manually the source yaml file,
            //as the extraction process itself should be able to correct the errors in the source data when possible
            let localFavBook = YAML.parse(data.toString().replace(/\t+/g, " "));
    
            //Let's create our target object. The format must be consistent across all the extractors :
            //title: text, authors: array, info: text
            targetObject.title = localFavBook.title;
            targetObject.authors = localFavBook.authors;
            targetObject.info = localFavBook.description;
    
            //let's resolve our promise with it
            d.resolve(targetObject);
        });
    } catch(e) {
        d.reject();
    }

    //let's send the promise to the client code
    return d.promise;
}

//Our function to get the file with an http request
let httpJSON = function (url) {
    let d = Q.defer();
    try {
        axios.get(url)
        .then(function (dataUnprocessed) {
            //we extract the relevant part of the data here : we need the first element of the response object
            //without having to know its name. In javascript, that requires getting the keys of the object in an array,
            //then getting the first item of the array
            let data = dataUnprocessed.data[Object.keys(dataUnprocessed.data)[0]]
            //Let's create our target object. The format must be consistent across all the extractors :
            //title: text, authors: array, info: text
            let targetObject = {};
            targetObject.title = data.title;
            targetObject.authors = [];
            targetObject.info = data.notes;
            //we get rid of the extra data in the source, to keep our data consistent : we just want the names in an array
            for (let iAuthors in data.authors) {
                targetObject.authors.push(data.authors[iAuthors].name);
            }
            //here we go
            d.resolve(targetObject)
        })
        .catch(function (error) {
            throw "Error in the HTTP request"
        });
    } catch(e) {
        d.reject();
    }

    return d.promise;
}

//We are now ready to expose the methods of our library !
module.exports = {
    localYAML: localYAML,
    httpJSON: httpJSON
}