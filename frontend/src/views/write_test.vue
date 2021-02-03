/* eslint-disable no-console */

<template>
    <div>
        <md-snackbar :md-active.sync="showLoading"> {{loadingMessage}} </md-snackbar>
        <!--list of question by group-->
        <div v-if="questionList && testLoaded" class="">
            <!---->
            <div class="md-layout md-alignment-top-right" style="min-height: 100vh">
                <div class=" md-size-25 md-xsmall-hide md-layout-item">
                <md-drawer 
                    style="height: 85vh; max-height: 85vh; min-width: 25%; z-index: 1000; position: fixed;  top: 5em; overflow: scroll"
                    class="md-scrollbar md-size-100" md-permanent="clipped"
                >
                    <span v-for="(item, index) in questionList" :key="index">
                        <a 
                            @click="jumpTo(item)"
                            class="cursor"
                            :class="navClassName(questions[item])"
                        >{{questionNo[item]}}</a>
                    </span>
                </md-drawer>
                </div>
                <md-content class="md-layout-item md-size-67" id="question-list">
                <div id="top"></div>
                <div v-for="(item, index) in paginator.current()" :key="index" class="question-list" 
                    style="bottom: 90px"
                >
                    <div v-if="questions[item].group" class="md-subheading">
                        <p></p>
                        <div>{{questions[item].group.header_note}}</div>
                        <div class="md-body-1"><strong><i>
                            use the instruction to answer question {{questions[item].group.from}} 
                            <span v-if="questions[item].group.to">- {{questions[item].group.to}}</span>
                        </i></strong></div>
                        <div class="md-inset" v-if="questions[item].group.image">
                            <img :src="questions[item].group.image.image" 
                            :width="width" class="question-image" :height="height">
                        </div>
                    </div>

                    <ol>
                        <li 
                            :id="'q' + item"
                            :value="questionNo[item]"
                            style="list-style: decimal; list-style-position: outside">
                            <div class="ql-editor" v-html="questions[item].question"></div>
                        </li>
                        <div v-if="answerType('OPTION', questions[item])">
                            <li 
                            style="list-style: none" 
                            v-for="(option, optionIndex) in sortOptions(questions[item].options)" 
                            :key="optionIndex">
                                <md-radio v-model="questions[item].answer" :value="option.label" :disabled="submitted">
                                    {{option.label}}. {{option.answer}}
                                </md-radio>
                            </li>
                        </div>
                    </ol>

                    <div v-if="answerType('FILL', questions[item])">
                        <md-field>
                            <label>Enter answer:</label>
                            <md-textarea class=""
                            v-model.lazy="questions[item].answer" md-autogrow/>
                        </md-field>
                    </div>
                    <div v-if="answerType('FILE', questions[item])">
                        <md-field>
                            <label>Upload {{questions[item].file_type}} File:</label>
                            <md-file v-model="questions[item].answer" @change="onFileChange"/>
                            <md-button class="md-title  md-raised md-dense md-accent md-layout-item md-size-25" 
                            @click="uploadAnswer(questions[item])"  :disabled="uploading"
                    >upload</md-button>
                        </md-field>
                    </div>
                </div>
                <div class="md-layout md-size-100">
                    <div class="md-layout-item md-size-70">
                        <md-button class=" md-title md-raised md-dense md-accent md-layout-item " 
                            :disabled="!paginator.back" @click="prev()" v-scroll-to="'#top'">Previous</md-button>
                        <md-button class=" md-title md-raised md-dense md-accent md-layout-item " 
                            :disabled="!paginator.front" @click="next()"  v-scroll-to="'#top'">Next</md-button>
                    </div>
                    <md-button class="md-title  md-raised md-dense md-accent md-layout-item md-size-25" 
                        @click="showSubmitDialog ()"  :disabled="submitted"
                    >Submit</md-button>
                </div>
                </md-content>
            </div>
        </div>
    </div>
    </template>

    <script>
    import {mapGetters} from "vuex";
    //import {mapState} from "vuex";
    import TestTimer from "../assets/js/timer";
    import Paginator from "../assets/js/paginator";
    import resultDialog from "../components/result";
    import testAuthDialog from "../components/test_auth";
    import startTestDialog from "../components/start_test";
    import submitTestDialog from "../components/submit_test.vue";
    import mixins from "../mixins";
    export default {
    mixins: [mixins],
    data(){
        return {
            pageData: {
                showTestToolBar: true,
                showAppDrawer: false,
                pageTitle: 'Tests'
            },
            test: {},
            testLoaded: false,
            questions: [],
            questionNo: [],
            lastQuestionNo: 0,
            answers: {},
            result: '',
            loadingMessage: "Loading ...",
            showLoading: false,
            groupIds: [],
            groupQuestions: {},
            questionList: [],
            answered: [],
            password: '',
            width: 200,
            height: 100,
            uploadFile: null,
            uploading: false,
            resultId: '',
            submitted: false,
            testTimer: null,
            paginator: null,
            offlineMode: false,
        };
    },
    props: ['test_id'],
    methods: {
        questionAnswered() {
            let answered = this.questions.filter((question)=>{
                if(typeof question.answer == 'string') 
                question.answer = question.answer.trim()
                if (question.answer)
                return true
                return false
            })
            //console.log(answered)
            return answered.length
        },
        showTestAuthDialog () {
            this.$modal.show(testAuthDialog, {test: this.test})
            .then((startData)=>{
                this.$modal.cancel()
                if (startData.start_test == true) {
                this.openStartPrompt(startData)
                this.password = startData.password
                }
            })
            .catch(()=>{
                this.$router.go(-1)
            })
        },
        openStartPrompt (startData) {
            this.$modal.show(startTestDialog, {startData})
            .then((data)=>{
                //console.log(data)
                this.questions = data.questions
                this.resultId = data.resultId
                this.setQuestionGroups()
                this.setPaginator()
                //use prevous if exist time exist
                //let testSavedTime = localStorage.getItem(`watch-${this.userDetail.id}-${this.test_id}-${this.resultId}`)
                //if (testSavedTime) this.setTimer(testSavedTime)
                if (this.test.duration) this.setTimer(this.test.duration)
                this.$nextTick(this.renderMath)
                this.$store.commit('allowTestExit', false)
                this.testLoaded = true
            })
            .catch(()=>{
                this.$router.go(-1)
            })
        },
        showSubmitDialog () {
            let answeredCount = this.questionAnswered()
            this.$modal.show(
                submitTestDialog,
                {
                answered: answeredCount,
                unanswered: this.questions.length - answeredCount,
                total: this.questions.length
                }
            )
            .then(()=>{
                this.submitTest()
                this.testTimer.stop()
            })
            .catch(()=>{})
        },
        showResult () {
                this.$modal.show(resultDialog, {
                test: this.test,
                result: this.result
                })
                .then(()=>{})
                .catch(()=>{})
        },
        collectAnswers() {
            for(let question of this.questions){
                if (!question.answer) 
                question.answer = ''
                this.answers[question.id] = question.answer
            }
        },
        submitTest () {
            this.loadingMessage = ""
            this.collectAnswers()
            //console.log(this.answers)
            let time = 0
            if (this.test.duration) {
                time = (this.test.duration * 60) - (this.testTimer.minute * 60) - this.testTimer.seconds
            }
            let data = {"password": this.password, "testId": this.test_id, answers: this.answers, time, resultId: this.resultId}
            this.$http({url: 'testapi/1/submittest/', method: 'POST', data})
            .then(resp => {
                //console.log(resp.data)
                this.$store.commit('allowTestExit', true)
                this.$store.commit('updateTestTime', "")
                //localStorage.removeItem(`watch-${this.userDetail.id}-${this.test_id}-${this.resultId}`)
                this.result = resp.data
                this.showResult()
                this.submitted = true
            })
            .catch(err => {
                //console.log(err);
                this.$store.commit('allowTestExit', true)
                this.$store.commit('updateTestTime', "")
                this.loadingMessage = "Failed to submit, Try again."
                this.showLoading = true
            })
        },
        onFileChange(e){
            this.uploadFile = e.target.files[0];
        },
        uploadAnswer (question) {
            this.uploading = true
            let data = {
                name: question.answer,
                question: question.id,
                test_data: this.test.id,
                result: this.resultId,
                file: this.uploadFile,
                password: this.password, 
            }
            let formData= new FormData()
            Object.keys(data).forEach((key)=>{
                formData.append(key, data[key])
            })
            this.$http({url: 'testapi/1/answerfileupload/', data: formData, method: 'POST' })
            .then(() => {
                //console.log(resp)
                this.uploading = false
                this.loadingMessage = "file uploaded successfully"
                this.showLoading = true
            })
            .catch(error => {
                this.uploading = false
                // display fields errors
                let storeError
                for(let key in error.response.data) {
                storeError += key + ': ' + error.response.data[key].join('\n')
                }
                this.loadingMessage = storeError
                this.showLoading = true
                //console.log(error.response.data);
            });
        },
        setTimer (time=0) {
            this.testTimer = new TestTimer({
                time: time,
                stop: this.submitTest,
                start: ()=>{},
                updateTimer: (display)=>{ 
                this.$store.commit('updateTestTime', display)
                if (!this.offlineMode) {
                    //storage key format => watch-[userId]-[testId]-[resultId]
                    //localStorage.setItem(`watch-${this.userDetail.id}-${this.test_id}-${this.resultId}`, this.testTimer.minute)
                }
                },
                running: () =>{
                return !this.submitted
                }
            })
            this.testTimer.start()
        },
        setPaginator () {
            this.paginator = new Paginator(this.questionList, this.test.question_per_page)
        },
        setupOffline () {
            let offlineData = { 
                "questions": [ 
                { 
                        "id": 17, 
                        "question": "hjvhj", 
                        "options": [ 
                            { "label": "A", "answer": "nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj nbkj " }, 
                            { "label": "B", "answer": "hjfhgfhf" }, 
                            { "label": "C", "answer": "ghfkhgf" }, 
                            { "label": "D", "answer": "hgfhgf" }, 
                            { "label": "E", "answer": "hhjh" } 
                        ], 
                        "group": { 
                            "id": 5, 
                            "image": { 
                            "id": 4, 
                            "name": "hy", 
                            "image": "/media/image/question_images/FB_IMG_14852037056198600.jpg", 
                            "timestamp": "2020-11-01T23:47:10.639435Z", 
                            "test_data": 5 
                            }, 
                            "name": "yes", 
                            "header_note": "this is for the the best", 
                            "test_data": 5 
                        }, 
                        "answer_type": "OPTION", 
                        "file_type": "IMAGE", 
                        "valid_question": true, 
                        "mark_scheme": "", 
                        "test_data": 5 
                } 
                ], 
                "result": 29 
            }
            for (let i = 0; i < 10; i++)
                this.questions.push(offlineData.questions[0])
            this.offlineMode = true
            this.test.name = "csc 102 - Introduction to programming"
            this.pageData.pageTitle = this.test.name
            this.$store.commit('setPageData', this.pageData)
            this.test.randomize_questions = true
            this.test.question_per_page = 3            
            this.setQuestionGroups()
            this.setPaginator() 
            this.setTimer(2)
            this.testLoaded = true
        },
        getMyTest () {
            this.$http({url: 'testapi/1/mytest/' + this.test_id + '/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.test = resp.data
                this.pageData.pageTitle = this.test.name
                this.$store.commit('setPageData', this.pageData)
                this.showTestAuthDialog()
            })
            .catch(() => {
                //console.log(err);
                this.loadingMessage = "Failed to load test data"
                //this.setupOffline()
                this.showLoading = true
            })
        },
        setQuestionNo () {
            this.questionNo = []
            let groupItemIndex
            this.questionList.forEach((item)=>{
                this.lastQuestionNo++
                this.questionNo[item] = this.lastQuestionNo
                if(this.questions[item].group != null) {
                groupItemIndex = item
                this.questions[groupItemIndex].group.from = this.lastQuestionNo
                } 
                else if (groupItemIndex)
                this.questions[groupItemIndex].group.to = this.lastQuestionNo 
            })
            //console.log(this.questionNo)
        },
        setQuestionGroups () {
            //group questions
            this.groupQuestions = {}
            this.questionList = []
            this.questions.forEach((question, index)=>{
                let group
                if(question.group  == null)
                group = question.group
                else
                group = question.group.id
                if(!this.groupQuestions[group])
                this.groupQuestions[group] = [index]
                else if (this.groupQuestions[group].indexOf(index) == -1)
                this.groupQuestions[group].push(index)
            })
            Object.keys(this.groupQuestions).forEach((group)=>{
                //randomize group questions  
                if(this.test.randomize_questions) 
                this.groupQuestions[group] = this.shuffleQuestions(this.groupQuestions[group])
                //remove group object from group questions
                //console.log("before remove group")
                this.groupQuestions[group].forEach((questionIndex, index)=>{
                //allow group object in only the group first question
                if (index != 0)
                        this.questions[questionIndex].group = null
                })
                //console.log("after remove group")
                //join groups questions
                if(this.questions[this.groupQuestions[group][0]].group != null)
                this.questionList = this.questionList.concat(this.groupQuestions[group])
                else
                this.questionList.unshift(...this.groupQuestions[group])
                //console.log("after join group")
            })
            //console.log(this.questionList)
            //console.log(this.setQuestionGroups)
            this.setQuestionNo()
        },
        shuffleQuestions(arr){
            let fill = [];
            let count = 1;
            while(count++ <= arr.length){
                let index = Math.floor(Math.random() * arr.length);
                while(fill.includes(arr[index])){
                index = Math.floor(Math.random() * arr.length);
                }
                fill.push(arr[index]);
            }
            return fill;
        },
        navClassName (question) {
            if(typeof question.answer == 'string') 
                question.answer = question.answer.trim()
            if (question.answer)
                return "answered-question-nav-link"
            return "question-nav-link"
        },
    },
    computed: { 
        ...mapGetters(["getPageTitle"]),
        ...mapGetters(["testTime"]),
        ...mapGetters(["userDetail"]),
    },
    mounted: function() {
        this.$store.commit('setPageData', this.pageData)
        this.getMyTest()
    },
    beforeDestroy: function() {
        if(this.testTimer.status == "on")
            clearInterval(this.testTimer.stopInterval);
        this.$store.commit('allowTestExit', true)
        this.$store.commit('updateTestTime', "")      
    }
};
</script>