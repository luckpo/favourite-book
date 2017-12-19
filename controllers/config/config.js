//JSON file for now, but with bigger amounts of data, this should be transformed into a service supported by a database
module.exports = {
    "1": {
        extractFunction: "localYAML",
        source: "favourite-book.yml",
        name: "Frank"
    },
    "2": {
        extractFunction: "httpJSON",
        source: "http://openlibrary.org/api/books?bibkeys=ISBN:0201558025&jscmd=data&format=json",
        name: "June"
    }
}