var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();


const ORG = 'gitpad-pl';
// const REPO = 'docs';
const REPO = 'app';
const BRANCH_NAME = 'master';
const FILE = 'README.md';
const PATH = 'README.md';
const CONTENT = 'first line of file';
const COMMIT_MSG = 'first commit';
const COMMIT_LIMIT = 10;

// const URL_REPO = `${HOST}/${USER}/${REPO}`;

var apiURL = `https://api.github.com/users/${ORG}/repos`;

// var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='


function img() {
    var url;
    var local_url;
    var base_64;
    var mimetype;
}

function dev() {
    var firstname;
    var lastname;

    var name;
    var url;
    var description;

    this.getImg = function () {

    }
}

function org() {
    var name;
    var url;
    var description;

    this.getDev = function () {

    }

    this.getImg = function () {

    }
}

function repo() {
    var name;
    var url;
    var description;

    var is_private;
    var is_fork;
}


var List = function (array) {
    this.array = array;

    var list;

    function first() {

    }

    function next() {

    }

    function prev() {

    }

    function current() {

    }

    function last() {

    }

    function all() {
        return this.array;
    }
}

function Github() {

    var username = username;

    var organisation;

    var repository;

    var response;

    // function setUsername(username) {
    //
    // }

    var $ = this;

    $.setOrganisation = function (organisation) {
        $.organisation = organisation;
        return $
    }

    $.setRepository = function (repository) {
        $.repository = repository;
        return $
    }

    $.getRepoList = function (organisation) {
        var response = getResponse();

        return List(response);
    }

    $.getOrgList = function (organisation) {
        var response = getResponse();

        return List(response);
    }


    function getResponse() {
        var xhr = new XMLHttpRequest()
        // var self = this
        xhr.open('GET', apiURL)
        xhr.onload = function () {
            // console.log(xhr.responseText);
            // self.repos = JSON.parse(xhr.responseText)
            var repo_json = JSON.parse(xhr.responseText)
            console.log(xhr.responseText);
            var repo_array = [];
            // xhr.responseText.each(function (key, obj) {
            for (let obj of repo_json) {
                // console.log(obj)
                repo_array.push(
                    {
                        dev: {
                            name: obj.owner.login,
                            url: obj.owner.html_url,
                            icon_url: obj.owner.avatar_url,
                            icon_base64: obj.owner.avatar_url,
                            repo: []
                        },
                        org: {
                            name: obj.owner.login,
                            url: obj.owner.html_url,
                            icon_url: obj.owner.avatar_url,
                            owner: obj.owner.login,
                            repo: []
                        },
                        repo: {
                            url: obj.html_url,
                            name: obj.name,
                            description: obj.description,
                            is_private: obj.private,
                            is_fork: obj.fork,
                        },
                        org_repo_url: obj.full_name,
                    }
                )
            }
            ;

            // console.log(self.commits[0].html_url)
            // self.repos = repo_array;
            console.log(repo_array)
        }
        xhr.send()
    }

    return $;
}

// var Gitapi = function () {
//
//     var api = this;
//
//     api.Github = Github;
//
//     return api;
// }


var repos = Github().setOrganisation("tom-sapletta-com").getRepoList();
console.log(repos);
// console.log(Github().setOrganisation("tom-sapletta-com"));
