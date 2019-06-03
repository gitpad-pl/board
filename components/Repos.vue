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
                <a :href="repo.url" target="_blank" class="commit">{{ repo.name.slice(0, 7) }}</a>
                - <span class="message">{{ repo.description | truncate }}</span><br>
<!--                by <span class="author"><a :href="repo.org_url" target="_blank">{{ repo.org_name }}</a></span>-->

<!--                img <img :src="repo.org_avatar_url" target="_blank"/>{{ repo.org_avatar_url }}-->
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

                var api = require("gitpad-github");
                // var api = require("./github");
                var Github = new api.Github;
                // console.log(api);
                var self = this;

                // Github.Organisation("tom-sapletta-com").RepositorySaveTo(function (result) {
                //     console.log("result",result);
                //     self.repos = result;
                // });
                //
                // Github.Organisation("tom-sapletta-com").getData(function (data) {
                //     self.repos = api.RepoList(data);
                //     // self.repos = api.OrgList(data);
                //     // self.repos = api.DevList(data);
                // });


                Github.Organisation("tom-sapletta-com").get(
                    function (item) {
                        return {
                            url: item["html_url"],
                            name: item.name,
                            description: item.description,
                        }
                    },
                    function (all) {
                        // var RepoList = api.List(RepoArray);
                        console.log("repo_list", all);
                        self.repos = all;
                    }
                );

                // var repo_list =
                // console.log(repo_list);

                // this.repos = repo_list;
                // Api().Github().getRepoList();
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
