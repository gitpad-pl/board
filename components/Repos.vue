<template>
    <div id="board">
        <h1>Latest Commits</h1>
        <div v-for="branch in branches">

            <input type="radio"
                   :id="branch"
                   :value="branch"
                   name="branch"
                   v-model="currentBranch">

            <label :for="branch">{{ branch }}</label>
        </div>
        <p>{{repo}}@{{ currentBranch }}</p>
        <ul>
            <li v-for="repo in repos">
                <a :href="repo.repo_url" target="_blank" class="commit">{{ repo.org_name.slice(0, 7) }}</a>
                - <span class="message">{{ repo.repo_description | truncate }}</span><br>
                by <span class="author"><a :href="repo.org_url" target="_blank">{{ repo.org_name }}</a></span>

                img <img :src="repo.org_avatar_url" target="_blank"/>{{ repo.org_avatar_url }}
                <!--                at <span class="date">{{ record.commit.author.date | formatDate }}</span>-->
            </li>
        </ul>
    </div>
</template>
<!--https://developer.github.com/v3/repos/-->

<!--https://jsfiddle.net/yyx990803/c5g8xnar/?utm_source=website&utm_medium=embed&utm_campaign=c5g8xnar-->

<script>

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


    function List() {
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

    }

    function getDataFromApi() {

        function setUsername(username) {

        }

        function setOrganisation(organisation) {

        }

        function call() {

        }

        function getRepoList(organisation) {
            var array = call();
            return List(array);
        }

        function getOrgList(organisation) {

        }
    }

    export default {

        data() {
            return {
                branches: ['master', 'dev'],
                currentBranch: 'master',
                commits: null,
                repo: ORG + "/" + REPO,
                repos: []
            }
        },

        created: function () {
            this.fetchData()
        },

        watch: {
            currentBranch: 'fetchData'
        },

        filters: {
            truncate: function (v) {
                var newline = v.indexOf('\n')
                return newline > 0 ? v.slice(0, newline) : v
            },
            formatDate: function (v) {
                return v.replace(/T|Z/g, ' ')
            }
        },

        methods: {
            fetchData: function () {
                var xhr = new XMLHttpRequest()
                var self = this
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
                    self.repos = repo_array;
                    // console.log(repo_array)
                }
                xhr.send()
            }
        }
    }


</script>


<style>
    #board {
        font-family: 'Helvetica', Arial, sans-serif;
    }

    a {
        text-decoration: none;
        color: #f66;
    }

    li {
        line-height: 1.5em;
        margin-bottom: 20px;
    }

    .author, .date {
        font-weight: bold;
    }
</style>
