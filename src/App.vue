<template>
    <v-app>

        <TopToolbar></TopToolbar>

        <BottomNav></BottomNav>

    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import TopToolbar from '../../foobar/src/components/TopToolbar.vue';
    import BottomNav from '../../foobar/src/components/BottomNav.vue';
    @Component({
        components: {
            TopToolbar,
            BottomNav
        }
    })
    export default class extends Vue {
    }
</script>