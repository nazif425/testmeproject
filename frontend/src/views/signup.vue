/* eslint-disable no-console */

<template>
    <div>    
        <vue-form :state="formstate" class="md-layout" @submit.prevent="onSubmit">
                <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                <div class="md-display-1">Signup</div>
                </md-card-header>

                <md-card-content>
                <div v-if="error.non_field_errors" class="md-body-1" style="color: red">{{error.non_field_errors.join(', ')}}</div>
                <div v-if="error.username" class="md-body-1" style="color: red">{{error.username.join(', ')}}</div>
                <validate tag="md-field" :class="fieldClassName(formstate.username)">
                    <label for="first-name">User Name  </label>
                    <md-input class="" name="user-name" id="user-name" autocomplete="off" 
                    v-model="form.username" :disabled="sending" required />
                    <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The user name is required</div>
                            <div slot="maxlength">Invalid user name</div>
                    </field-messages>
                </validate>
                <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <div v-if="error.first_name" class="md-body-1" style="color: red">{{error.first_name.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.first_name)"
                        :custom="{maxInputLength, minInputLength}">
                        <label for="first-name">First Name  </label>
                        <md-input class="" name="first-name" id="first_name" 
                            autocomplete="off" v-model="form.first_name" 
                            :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The first name is required</div>
                            <div slot="maxlength">Invalid first name</div>
                            <div slot="maxInputLength">Invalid first name, maximum length reached</div>
                            <div slot="minInputLength">Invalid first name, minimum of at least 3 character</div>
                        </field-messages>
                    </validate>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <div v-if="error.last_name" class="md-body-1" style="color: red">{{error.last_name.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.last_name)"
                        :custom="{maxInputLength, minInputLength}">
                        <label for="last-name">Last Name  </label>
                        <md-input class="" name="last-name" id="last_name" 
                            autocomplete="off" v-model="form.last_name" 
                            :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The first name is required</div>
                            <div slot="maxInputLength">Invalid last name, maximum length reached</div>
                            <div slot="minInputLength">Invalid last name, minimum of at least 3 character</div>
                        </field-messages>
                    </validate>
                </div>
                </div>

                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                    <div v-if="error.password1" class="md-body-1" style="color: red">{{error.password1.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.password1)"
                        :custom="{validatePassword}">
                        <label for="enter-password">Password</label>
                        <md-input class="" type="password" name="password1" id="password1" 
                            autocomplete="new-password" v-model="form.password1" 
                            :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The password is required</div>
                            <div slot="validatePassword">Password should be aleast 8 characters</div>
                        </field-messages>
                    </validate>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <div v-if="error.password2" class="md-body-1" style="color: red">{{error.password2.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.password2)"
                        :custom="{matchPassword}">
                        <label for="re-enter-password">Re-enter Password</label>
                        <md-input class="" type="password" name="password2" id="password2" 
                            autocomplete="new-password" v-model="form.password2" 
                            :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">please re-enter password</div>
                            <div slot="matchPassword">password does not match</div>
                        </field-messages>
                    </validate>
                </div>
                </div>
                <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <div v-if="error.email" class="md-body-1" style="color: red">{{error.email.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.email)">
                        <label for="email">Email</label>
                        <md-input class="" type="email" name="email" id="email" autocomplete="off" v-model="form.email" :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The email is required</div>
                            <div slot="email">Invalid email address</div>
                        </field-messages>
                    </validate>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <div v-if="error.phone_number" class="md-body-1" style="color: red">{{error.phone_number.join(', ')}}</div>
                    <validate tag="md-field" :class="fieldClassName(formstate.phone_number)"
                        :custom="{validatephoneNo}">
                        <label for="phone-number">Phone Number</label>
                        <md-input class="" type="text" name="phone_number" id="phone-number"
                            autocomplete="off" v-model="form.phone_number" 
                            :disabled="sending"
                            />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="validatephoneNo">Invalid phone number</div>
                        </field-messages>
                    </validate>
                </div>
                </div>
                <div v-if="error.date_of_birth" class="md-body-1" style="color: red">{{error.date_of_birth.join(', ')}}</div>
                <validate tag="md-field" :class="fieldClassName(formstate.date_of_birth)">
                    <md-datepicker name="birth" id="birth" v-model="form.date_of_birth">
                            <label for="select-birth-date">Date of birth</label>
                    </md-datepicker>
                    <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                    </field-messages>
                </validate>
                <div v-if="error.gender" class="md-body-1" style="color: red">{{error.gender.join(', ')}}</div>
                <validate tag="md-field" :class="fieldClassName(formstate.gender)">
                    <label for="gender">Gender</label>
                    <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                        <md-option></md-option>
                        <md-option value="M">Male</md-option>
                        <md-option value="F">Female</md-option>
                    </md-select>
                    <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">The gender is required</div>
                    </field-messages>
                </validate>
                <div v-if="error.group" class="md-body-1" style="color: red">{{error.group.join(', ')}}</div>
                <div v-if="error.access_key" class="md-body-1" style="color: red">{{error.access_key.join(', ')}}</div>
                <div  v-if="group && group.requires_access_key && !group.is_author">
                    <div class="md-subheading">Enter {{group.name}} access Key</div>
                    <validate tag="md-field" 
                        :class="fieldClassName(formstate.access_key)">
                        <label for="access key">access key</label>
                        <md-input 
                            name="access_key" id="access_key" 
                            v-model="access_key"  autocomplete="new-password" md-dense :disabled="sending"></md-input>
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                            <div slot="required">The group access key required</div>
                        </field-messages>
                    </validate>
                </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                <md-button type="submit" class="md-accent md-raised" :disabled="sending">Register</md-button>
                </md-card-actions>
                </md-card>

                <md-snackbar :md-active.sync="showSnackBar">{{snackMessage}}</md-snackbar>
        </vue-form>
    </div>
    </template>

    <script>
    import {mapGetters} from "vuex";
    //import {mapState} from "vuex";
    
    
    export default {
    data: () => ({
        pageData: {
            pageTitle: 'Signup'
        },
        signupMessage: '',
        snackMessage: '',
        formstate: {},
        form: {
                username: '',
                first_name: '',
                last_name: '',
                password1: '',
                password2: '',
                email: '',
                phone_number: '',
                date_of_birth: '',
                gender: ''
        },
        error: {},
        access_key: '',
        group: null,
        showSnackBar: false,
        sending: false,
        maxInputLen: 100,
        minInputLen: 3,
        passLen: 8,
    }),
    props: ['group_id'],
    methods: {
        clearForm () {
            this.form.username = ''
            this.form.first_name = ''
            this.form.last_name = ''
            this.form.password1 = ''
            this.form.password2 = ''
            this.form.email = ''
            this.form.phone_number = ''
            this.form.gender = ''
            this.form.date_of_birth = ''
            this.access_key = ''
        },
        maxInputLength (value) {
                return value.length <= this.maxInputLen
        },
        minInputLength (value) {
                return value.length >= this.minInputLen
        }, 
        validatePassword (value) {
            return value.length >= this.passLen
        },
        matchPassword (value) {
            return value === this.form.password1
        },
        validatephoneNo (value) {
                return value.length == 0 || ((value.length === 11) && (typeof Number(value) === "number"))
        },
        signup () {
            this.error = {}
            if(this.group_id) this.form.group = this.group_id
            if(this.group && this.group.requires_access_key) this.form.access_key = this.access_key
            this.$store.dispatch('register', this.form)
            .then(() => {
                const username = this.form.username
                const password = this.form.password1
                this.clearForm()
                this.formstate._reset();
                this.sending = false
                this.snackMessage = "Registration was successful. Logging in..."
                this.showSnackBar = true
                if (this.isLoggedIn) {
                this.$router.go(-1)
                }
                else {
                this.$store.dispatch("login", {username, password})
                .then(() => {
                    this.$router.replace('/dashboard')
                })
                .catch(error => {
                    //console.log(error)
                    this.snackMessage = "Failed to Loggin. Try logging in again."
                    this.showSnackBar = true
                    this.$router.replace('/login')
                })
                }
                
            })
            .catch(err => {
                this.sending = false
                this.snackMessage = "Incorrect or missing required field"
                this.showSnackBar = true
                // display fields errors
                this.error = err.response.data
                
            });
        },

        onSubmit () {
            if (this.formstate.$invalid) {
                return;
            } else {
                this.sending = true
                this.signup()
            }
        },
        checkAccess () {
            this.$http({url: 'testapi/1/group_access/' + this.group_id + '/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.group = resp.data
            })
            .catch(err => {
                //console.log(err.response.data);
                this.error = err.response.data
            })
        },
        fieldClassName: function (field) {
            if(!field) {
            return '';
            }
            if((field.$touched || field.$submitted) && field.$valid) {
            return 'has-success';
            }
            if((field.$touched || field.$submitted) && field.$invalid) {
            return 'has-danger';
            }
        }
    },
    computed: { 
        ...mapGetters(["isLoggedIn"]),
        ...mapGetters(["getPageTitle"]),
    },
    mounted: function() {
        this.$store.commit('setPageData', this.pageData)
        if (this.group_id) this.checkAccess()
    },
};
</script>