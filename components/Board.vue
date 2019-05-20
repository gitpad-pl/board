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
            <li v-for="record in commits">
                <a :href="record.html_url" target="_blank" class="commit">{{ record.sha.slice(0, 7) }}</a>
                - <span class="message">{{ record.commit.message | truncate }}</span><br>
                by <span class="author"><a :href="record.author.html_url" target="_blank">{{ record.commit.author.name }}</a></span>
                at <span class="date">{{ record.commit.author.date | formatDate }}</span>
            </li>
        </ul>
    </div>
</template>

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

    var apiURL = `https://api.github.com/repos/${ORG}/${REPO}/commits?per_page=${COMMIT_LIMIT}&sha=`;

    // var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

    /**
     * Actual demo
     */

    export default {

        data() {
            return {
                branches: ['master', 'dev'],
                currentBranch: 'master',
                commits: null,
                repo: ORG + "/" + REPO
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
                xhr.open('GET', apiURL + self.currentBranch)
                xhr.onload = function () {
                    self.commits = JSON.parse(xhr.responseText)
                    console.log(self.commits[0].html_url)
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
