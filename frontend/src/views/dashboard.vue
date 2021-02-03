/* eslint-disable no-console */

<template>
    <div>
        <div class="dashboard-container">
            <div class="md-layout  md-gutter">
                <div 
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <!----><router-link to="/dashboard/profile">
                        <iconify-icon icon="card-account-details-outline" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Profile</div>
                    <!----></router-link>
                </div>
                <div 
                    v-if="userDetail && userDetail.is_author"
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <router-link to="/dashboard/testbuilder">
                        <iconify-icon icon="monitor-edit" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Test Builder</div>
                    </router-link>
                </div>
                <div 
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <router-link to="/dashboard/test">
                        <iconify-icon icon="monitor-edit" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Tests</div>
                    </router-link>
                </div>
                <div 
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <router-link to="/dashboard/groups">
                        <iconify-icon icon="account-group" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Groups</div>
                    </router-link>
                </div>
                <div 
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <router-link to="/dashboard/results">
                        <iconify-icon icon="clipboard-check-outline" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Results</div>
                    </router-link>
                </div>
                <div 
                    class="dashboard-card md-layout md-layout-item md-size-32 
                    md-small-size-49 md-xsmall-size-100  
                    md-alignment-center-center"
                >
                    <router-link to="/dashboard/settings">
                        <iconify-icon icon="cog-outline" 
                            class="vsm--icon iconify dashboard-card-icon md-layout-item md-size-100 md-title"
                            ></iconify-icon>
                        <div class="dashboard-card-action md-layout-item md-size-100">Settings</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
    
    
export default {
    data: () => ({
        pageData: {
            pageTitle: 'Dashboard'
        }
    }),
    methods: {

    },
    computed: { 
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["userDetail"]),
    },
    mounted: function() {
        this.$store.commit('setPageData', this.pageData)
    },
};
</script>