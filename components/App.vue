<template>
    <div id="app">
        <toolbar></toolbar>
        <account-list></account-list>
        <board></board>
    </div>
</template>

<script>
    import AccountList from "./AccountList.vue";
    import Toolbar from './Toolbar.vue'
    import Board from './Board.vue'


    export default {
        components: {
            Toolbar,
            AccountList,
            Board
        }
    }
</script>
