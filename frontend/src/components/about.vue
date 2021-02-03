/* eslint-disable no-console */

<template>
    <div>
        <md-card class="md-elevation-5" id="about" md-with-hover>
            <md-card-header>
                <div>
                    <iconify-icon class="iconify" width="26" height="26" icon="contacts"/>
                    <span class="md-title">About</span>
                </div>
            </md-card-header>
            <!---->
            <md-card-content class="md-layout md-gutter">
                <img class="md-size-30 md-layout-item" :src="getDeveloperAvatar || getLandScapeUrl"  alt="profile image">
                <div class="md-size-70 md-layout-item">
                    <div class="md-title"></div>
                    <p class="md-subheading">Nazif abdulkadir is front-end and back-end web developer who he is skilled in building interactive web applications with javascript. 
                        Also having experience in building website with languages and frameworks like vuejs, jquery, python, django etc.
                    </p>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
    

export default {
    name: 'About',
    data: () => ({
        pageData: {
            pageTitle: 'About Developer',
            info: '',
        }
    }),
    methods: {
        
    },
    computed: {
        ...mapGetters(["getLandScapeUrl"]),
        ...mapGetters(["getDeveloperAvatar"]),
        ...mapGetters(["userDetail"]),
        ...mapGetters(["getprofilePicUrl"])
    },
    mounted: function() {
        //this.$store.commit('setPageData', this.pageData)
    },
};
</script>