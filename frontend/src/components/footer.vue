/* eslint-disable no-console */
<template>
    <div>
        <about/>
        <contact/>
    </div>
</template>

<script>
import contact from "./contact"
import about from "./about"
export default {
    name: 'appFooter',
    components: {contact, about},
    data(){
        return {
            
        };
    },
    methods: {

    }
};
</script>