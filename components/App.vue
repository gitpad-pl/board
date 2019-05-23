<template>
    <div id="app">
<!--        <toolbar></toolbar>-->
        <account-list></account-list>
        <!--        <board></board>-->
        <repos></repos>
    </div>
</template>

<script>
    // import Toolbar from './Toolbar.vue';
    import AccountList from "./AccountList.vue";
    // import Board from './Board.vue'
    import Repos from './Repos.vue'


    export default {
        components: {
            // Toolbar,
            "account-list" : AccountList,
            // Board,
            "repos": Repos
        }
    }
</script>
