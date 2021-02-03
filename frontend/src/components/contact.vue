/* eslint-disable no-console */
   
<template>
    <div>
        <md-card class="md-elevation-5" id="contact" md-with-hover>
            <md-card-header>
                <div>
                    <iconify-icon class="iconify" width="26" height="26" icon="card-account-details-outline"/>
                    <span class="md-title">Contacts</span>
                </div>
            </md-card-header>
            <!---->
            <md-card-content>
                <div>
                    <iconify-icon class="iconify" width="26" height="26" icon="gmail"/>
                    <span class="md-subheading">Email: abdulnazifmail@gmail.com</span>
                </div>
                <div>
                    <iconify-icon class="iconify" width="26" height="26" icon="call"/>
                    <span class="md-subheading">Phone No.: +2348132366857</span>
                </div>
                <!---->
                <div>
                    <iconify-icon class="iconify" width="26" height="26" icon="chat"/>
                    <span class="md-subheading">
                        Social: <iconify-icon class="iconify" width="26" height="26" icon="facebook"/>
                    </span>
                </div>
                
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
/* eslint-disable no-console */
export default {
    name: "Contact",
    data: () => ({
        pageData: {
          pageTitle: 'Contacts'
        }
    }),
    methods: {

    },
    computed: { 
      ...mapGetters(["getPageTitle"]),
    },
    mounted: function() {
        //this.$store.commit('setPageData', this.pageData)
    },
};
</script>