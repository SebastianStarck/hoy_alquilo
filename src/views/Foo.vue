<template>
    <div>asdadsads</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Geo} from "@/Geo";
    import {Search} from '@/Search/Search'
    import {Mercadolibre} from "@/Search/Integrations/Mercadolibre/Facade";

    export class Foo extends Vue {
        mount() {
            alert('foo');
        }
    }
</script>
<style>
    *, *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    body {
        background-color: #dcdde1;
        color: #2f3640;
        padding: 3rem;
    }

    .search-location {
        display: block;
        width: 60vw;
        margin: 0 auto;
        margin-top: 5vw;
        font-size: 20px;
        font-weight: 400;
        outline: none;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
    }
</style>
