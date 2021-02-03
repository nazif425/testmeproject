/* eslint-disable no-console */

<template>
    <div class="phone-viewport">
        <!--question editor-->
        <div v-if="question">
            <vue-modaltor :visible="open" @hide="hideModal">
                <template slot="close-icon">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="20"
                    height="20"
                    xml:space="preserve"
                >
                <path
                    class="st0"
                    fill="#41b883"
                    d="M8.7,7.6c-0.4-0.4-1-0.4-1.4,0C6.9,8,6.9,8.6,7.3,9l11,11l-11,11c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0 l11-11l11,11c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4l-11-11L32,9c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-11,11L8.7,7.6z"
                />
                </svg>
                </template>
                <vue-form :state="formstate" class="mydialog" 
                @submit.prevent="onSubmit">
                <md-card :id="'question_' + question.id" 
                    class="md-elevation-5">
                    <md-card-header>
                        <md-toolbar class="md-primary">
                            <div class="md-toolbar-section-start md-subheading">
                                Question ({{this.questionNo[questionIndex]}})
                            </div> 
                            <div class="md-toolbar-section-end md-size-10 no-default-a">
                            </div>
                        </md-toolbar>
                    </md-card-header>
                    <md-card-content>
                        <div v-show="quill" class="standalone-container md-layout-item md-size-100">
                            <div  id="editor" style="height: 100px;"></div>
                        </div>
                        <md-field v-show="!quill" 
                            class="md-layout-item md-size-100">
                            <label for="question-field">Question</label>
                            <md-textarea class="" :name="fieldId('question', question)" :id="fieldId('question', question)" 
                                v-model="question.question" :disabled="saving" md-autogrow required></md-textarea>
                            
                        </md-field>
                        <md-field v-if="answerType('FILL', question)" class="md-layout-item md-size-100"
                            >
                            <label for="question-field">Fill anwser as mark Scheme:</label>
                            <md-textarea class="" :name="fieldId('fillanswer', question)" :id="fieldId('fillanswer', question)" 
                            v-model.lazy="question.mark_scheme" :disabled="saving" md-autogrow required></md-textarea>
                        </md-field>
                        <div v-if="answerType('OPTION', question)" class="border">
                            <!---->
                            <div v-for="(option, optionIndex) in question.options" class="md-layout md-size-100" :key="optionIndex"> 
                            <md-field class="md-layout-item md-size-100"
                                >
                                <label for="question-field">{{option.label}}</label>
                                <md-input class="md-layout-item md-size-94" :name="fieldId('option' + option.label, question)" 
                                    :id="fieldId('option' + option.label, question)"
                                    v-model.lazy="option.answer" :disabled="saving" md-autogrow required></md-input>
                                <iconify-icon
                                    @click="openformulaBox('formula-box' + optionIndex, optionIndex)"
                                    class="iconify cursor md-layout-item md-size-5" icon="function-variant"
                                    width="20" align="right" height="20" />
                            </md-field>
                            <div class="md-layout" v-show="showMathField(optionIndex)">
                                <div :id="'formula-box' + optionIndex" style="width: 40%"></div>
                                <md-button class="md-dense md-raised md-primary" 
                                    @click="saveFormula(option)">Save</md-button>
                            </div>
                            
                            </div>
                            <div class="md-layout">
                            <div class="md-headline md-layout-item md-size-50">
                                total option: {{question.options.length}}
                                <router-link to="" @click.native="addOption(question)">
                                    <iconify-icon class="iconify vsm--icon" icon="round-add"></iconify-icon>
                                </router-link>
                                <router-link to="" @click.native="removeOption(question)">
                                    <iconify-icon class="iconify vsm--icon" icon="round-minus"></iconify-icon>
                                </router-link>
                            </div>
                            <md-field class="md-layout-item md-size-50"
                                >
                                <label for="select-answer">Answer</label>
                                <md-select :name="fieldId('answerid', question)" id="fieldId('answerid', question)" 
                                    v-model.lazy="question.answer" md-dense :disabled="saving">
                                    <div v-for="(option, optionIndex) in sortOptions(question.options)" :key="optionIndex">
                                        <md-option :value="option.label">{{option.label}}</md-option>
                                    </div>
                                </md-select>
                            </md-field>
                            
                            </div>
                        </div>
                        <div v-if="answerType('FILE', question)">
                            <md-field class="md-layout-item md-size-50">
                            <label for="file-answer-type">File type</label>
                            <md-select :name="fieldId('filetype', question)" id="fieldId('filetype', question)"
                                v-model.lazy="question.file_type" md-dense :disabled="saving">
                                <md-option value="IMAGE">Image</md-option>
                                <md-option value="PDF">Pdf</md-option>
                                <md-option value="DOC">Doc</md-option>
                            </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout">
                            <md-field class="md-layout-item md-size-50">
                            <label for="file-answer-type">Answer type</label>
                            <md-select :name="fieldId('answertype', question)"
                                id="fieldId('answertype', question)"
                                v-model.lazy="question.answer_type" md-dense :disabled="saving">
                                <md-option value="OPTION">Option</md-option>
                                <md-option value="FILL">Fill</md-option>
                                <md-option value="FILE">File</md-option>
                            </md-select>
                            </md-field>
                            <md-field class="md-layout-item md-size-50">
                                <label for="file-answer-type">Group</label>
                                <md-select :name="fieldId('group', question)"
                                    id="fieldId('group', question)" @change="setQuestionGroups()"
                                    v-model.lazy="question.group" md-dense :disabled="saving">
                                    <md-option value=""></md-option>
                                    <md-option v-for="(group, groupIndex) in groups" 
                                        :key="groupIndex" :value="group.id">{{group.name}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    </md-card-content>
                </md-card>
                </vue-form>
            </vue-modaltor>
        </div>
        <!--navitation-->
        <md-tabs md-alignment="fixed" class="md-accent" 
            @md-changed="changeTab">
            <md-tab md-label="Question" id="question_tab" class="">
                <md-snackbar :md-active.sync="showLoading"> {{loadingMessage}} </md-snackbar>
                <!--list of question by group-->
                <div v-if="questionsReady && groups">
                <!--
                    <div class="md-layout md-alignment-top-right" style="min-height: 100vh">
                        <div class=" md-size-25 md-xsmall-hide md-layout-item">
                            <md-drawer 
                                style="min-width: 25%; z-index: 1000; position: fixed;  top: 1em; overflow: scroll"
                                class="md-scrollbar md-size-100" md-permanent="clipped"
                            >
                            </md-drawer>
                        </div>
                    </div>
                    class="md-layout-item md-size-67"
                -->
                <md-content id="question-list">
                                
                    
                    <div id="top"></div>
                    <div v-for="(item, index) in paginator.current()"
                        class="md-subheading" :key="index">
                        <div v-if="questionGroup[item]" class="md-subheading">
                            <div>{{questionGroup[item].group.header_note}}</div>
                            <div class="md-body-1"><strong><i>
                                use the instruction to answer question {{questionGroup[item].from}} 
                                <span v-if="questionGroup[item].to">- {{questionGroup[item].to}}</span>
                            </i></strong></div>
                            <div v-if="questionGroup[item].group.image" 
                                v-html="getImageById(questionGroup[item].group.image, true, 200, 100)">
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
                                <md-radio v-model="questions[item].answer" :value="option.label" disabled>
                                    {{option.label}}. {{option.answer}}
                                </md-radio>
                            </li>
                            </div>
                        </ol>
                        <div v-if="answerType('FILL', questions[item])">
                            <md-field>
                            <label>Enter answer:</label>
                            <md-textarea class=""
                                v-model.lazy="questions[item].mark_scheme" disabled md-autogrow/>
                            </md-field>
                        </div>
                        <div v-if="answerType('FILE', questions[item])">
                            <md-field>
                            <label>Upload {{questions[item].file_type}} File:</label>
                            <md-file v-model="uploadFile" disabled/>
                            </md-field>
                        </div>
                        <md-button class=" md-raised md-dense md-accent" @click="removeQuestion(item)">Delete</md-button>
                        <md-button class=" md-raised md-dense md-accent" @click="showQuestionEditor(item)">Edit</md-button>
                    </div>
                    <div class="md-layout md-alignment-center-right">
                        <div><md-button class=" md-title md-raised md-dense md-accent md-layout-item " 
                            :disabled="!paginator.back" @click="prev()" v-scroll-to="'#top'">Previous</md-button>
                        <md-button class=" md-title md-raised md-dense md-accent md-layout-item " 
                            :disabled="!paginator.front" @click="next()"  v-scroll-to="'#top'">Next</md-button></div>
                    </div>
                    <div>
                        <span v-for="(item, index) in questionList" :key="index">
                            <a 
                            @click="jumpTo(item)"
                            class="cursor question-nav-link"
                            >{{questionNo[item]}}</a>
                        </span>
                    </div>
                </md-content>
                </div>
            </md-tab>
            <md-tab md-label="Group" id="group_tab" class="">
                <md-card class="md-elevation-5">
                <md-card-header>
                    <!--group title bar-->
                    <md-toolbar class="md-primary">
                        <div class="md-title">Question Groups</div>
                    </md-toolbar> 
                </md-card-header>
                <md-card-content>
                    <!--table actions-->
                    <md-button @click="selectionToggle" 
                        class="md-raised md-dense md-primary">{{selectState}}</md-button>
                    <md-button v-if="selectable" @click="selectAllRows" 
                        class="md-raised md-dense md-primary">select all</md-button>
                    <md-button v-if="selectable" @click="deselectAllRows" 
                        class="md-raised md-dense md-primary">deselect all</md-button>
                    <md-button v-if="selectable" @click="deleteSelectedRows" class="md-raised md-dense md-primary">
                        delete ({{groupTable? groupTable.getSelectedData().length: "0"}})</md-button>
                    <md-button v-if="selectable" class="md-dense">
                        selected ({{groupTable? groupTable.getSelectedData().length: "0"}})</md-button>
                    <!--table layout container-->
                    <div  id="group-table" class="" style=""></div>
                </md-card-content>
                </md-card>
            </md-tab>
            <md-tab md-label="Images" id="images_tab">
                <md-progress-bar md-mode="indeterminate" v-if="inProgress" />
                <stack :column-min-width="200" :gutter-width="8" :gutter-height="8" monitor-images-loaded>
                <stack-item v-for="(item, i) in images" :key="i">
                    <img :src="item.image"> 
                    <span class="">{{item.name}}</span> 
                    | <a @click.prevent="removeImage(i)" class="cursor">remove</a>
                </stack-item>
                </stack>
            </md-tab>
        </md-tabs>
        <md-button @click="add" class="md-primary md-raised md-fab md-fixed md-fab-bottom-right">
            <iconify-icon class="iconify vsm--icon" icon="round-add" width="26" height="26"/>
        </md-button>
        <div class="bottom-bar md-layout-item md-layout md-size-100">
            <div class=" md-title md-size-30 md-layout-item"> Name: {{testName}} </div>
            <div class=" md-title md-size-30 md-layout-item"> Total Question: {{questions.length}} </div> 
            <div class=" md-title md-size-30 md-layout-item"> Time: {{time}}</div>
        </div>
    </div>
    </template>

    <script lang="ts">
    import {mapGetters} from "vuex";
    //import {mapState} from "vuex";
    import toolbarData from "../assets/js/toolbardata";
    import uploadDialog from "../components/upload-dialog";
    import testListDialog from "../components/test_list";
    import Paginator from "../assets/js/paginator";
    const tabulator = () => import(/* webpackChunkName: "tabulator" */"tabulator-tables")
    import { Stack, StackItem } from "vue-stack-grid";
    import Quill from "quill";
    import mathquill4quill from "mathquill4quill/mathquill4quill";
    import mixins from "../mixins";

    /* eslint-disable no-console */

export default { 
    components: {Stack, StackItem},
    mixins: [mixins],
    data(){
        return {
            pageData: {
                showTestBuilderToolBar: true,
                showAppDrawer: false,
                pageTitle: 'Test Builder'
            },
            Tabulator: null,
            quill: null,
            open: false,
            currentTab: "question_tab",
            images: [],
            questionsReady: false,
            formstate: {},
            question: null,
            questionIndex: 0,
            questionNo: [],
            lastQuestionNo: 0,
            questions: [],
            groupQuestions: {},
            questionList: [],
            questionGroup: {},
            questionNavPos: 0,
            groupTable: null,
            groups: [],
            tests: [],
            testId: null,
            testName: "csc test",
            testDuration: 0,
            time: 0,
            selectable: false,
            selectState: "select",
            editable: true,
            inProgress: false,
            width: 600,
            height: 400,
            showLoading: false,
            loadingMessage: "",
            saving: false,
            uploadFile: null,
            paginator: null,
            MathQuillConfigured: false,
            mathField: null,
            mathFieldOption: '',
            scriptSrc: [
                'assets/jquery/dist/jquery.min.js', 
                'assets/katex/dist/katex.min.js', 
                'assets/mathquill-0.10.1/mathquill.min.js',
            ],
        };
    },
    props: ['test_id'],
    computed: {
        ...mapGetters(["userDetail"]),
        ...mapGetters(["pageTitle"]),
        ...mapGetters(['showTestListDialog']),
        
    },
    watch: {
        showTestListDialog () {
            if (this.showTestListDialog) 
                this.openTestListDialog()
        }
    },
    methods: { 
        loadScripts () {
            this.scriptSrc.forEach((url)=>{
                let tag = document.createElement('script')
                tag.setAttribute('src', url)
                tag.defer = true
                document.head.appendChild(tag)
            })
        },
        showQuestionEditor (index) {
            this.question = this.questions[index] //set question data to question editor
            this.questionIndex = index
            this.$nextTick(this.configQuill)
            this.open = true
        },
        hideModal() {
            //saving quill editor data
            if (this.quill) {
                //console.log(this.quill.getContents())
                let delta = this.removeEmbededContents(this.quill.getContents(), true)
                this.question.question_delta = JSON.stringify(delta)
                this.question.question = this.getDeltaHtml(delta, true)
                //console.log(this.question.question)
                this.quill.setContents([])
            }
            this.setQuestionGroups()
            this.open = false         
            this.updateQuestion()
            this.$nextTick(this.renderMath)
        },
        configQuill () {
            let editor = document.querySelector('#editor')
            if (!this.quill && editor) {
                this.quill = new Quill(editor, {
                placeholder: 'Question...',
                modules: {
                    formula: true,
                    toolbar: toolbarData.concat([['formula']])
                },
                theme: 'snow'
                });
            }
            //use mathquill for quill fomula formfield with help of mathquill4quill
            if (window && window.MathQuill && !this.MathQuillConfigured && this.quill) {
                var enableMathQuillFormulaAuthoring = mathquill4quill({Quill: Quill});
                enableMathQuillFormulaAuthoring(this.quill);
                this.MathQuillConfigured = true
            }
            if (this.quill && this.question.question_delta)
                this.quill.setContents(this.removeEmbededContents(JSON.parse(this.question.question_delta), true))
        },
        openformulaBox(id, optionIndex) {
            let el = document.querySelector('#' + id)
            let MQ = window.MathQuill.getInterface(2)
            this.mathField = MQ.MathField(el)
            this.mathFieldOption = optionIndex
            this.mathField.focus()
        },
        saveFormula(option) {
            option.answer += '$'+ this.mathField.latex() +'$ '
            this.mathField = null
            this.mathFieldOption = null
        },
        showMathField(optionIndex) {
            return this.mathFieldOption === optionIndex
        },
        removeEmbededContents(contents, keepFormula=false) {
            contents.ops.forEach((item, index)=>{
                if ((typeof item.insert == 'object') && (!keepFormula || !item.insert.formula))
                delete contents.ops[index]
            })
            return contents
        },
        getDeltaHtml(delta, formulaToString=false) {
            let newQuill = new Quill(document.createElement('div'));
            if (formulaToString) {
                delta.forEach((item)=>{
                if(typeof item.insert == 'object' && item.insert.formula)
                    item.insert = '$' + item.insert.formula + '$'
                })
            }  
            newQuill.setContents(delta)
            let htmlContent = newQuill.root.innerHTML
            //remove paragragh tag
            //htmlContent = htmlContent.slice(3).slice(0, htmlContent.length - 7)
            return htmlContent
        },
        changeTab (tabId) {
            this.currentTab = tabId
        },
        computeTime () {
            let min = this.testDuration
            let sec = 0
            function timePadding(time) {
                if (String(time).length < 2)
                time = '0' + time
                return time
            }
            if (!min) {
                min = Math.floor((45 * this.questions.length) / 60)
                sec = (45 * this.questions.length) % 60
            }
            let hour = Math.floor(min / 60)? Math.floor(min / 60) : 0
            let time = hour? [hour, min % 60, sec] : [min, sec]
            this.time = time.map(timePadding).join(':')
            
        },
        add () {
            if (this.currentTab === "question_tab") 
                this.addQuestion()
            else if (this.currentTab === "group_tab")
                this.addGroup()
            else
                this.addImage() 
        },
        setPaginator () {
            //setup pagination, jump to last position if paginator already exists
            if (this.paginator) {
                this.questionNavPos = this.paginator.pos
                this.paginator = new Paginator(this.questionList, 10,this.questionNavPos)
            } 
            else
                this.paginator = new Paginator(this.questionList, 10)
        },
        openTestListDialog () {
            this.$modal.show(
                testListDialog, 
                {
                openTest: this.openTest, 
                tests: this.tests, 
                addTest: this.addTest,
                removeTest: this.removeTest,
                openTestSettings: ()=>{},
                }
            )
            .then(()=>{})
            .catch(()=>{
                this.$modal.cancel()
                this.$store.commit('showTestListDialog', false)
            })
        },
        openTestById (id) {
            let testIndex
            //get test index
            this.tests.forEach((test, index)=>{
                if (test.id == id) testIndex = index
            })
            this.openTest (testIndex, false)
        },
        openTest (index, closeDialog=true) {
            this.testId = this.tests[index].id
            this.testName = this.tests[index].name
            this.testDuration = this.tests[index].duration
            this.computeTime()
            this.questions = []
            this.groupTable = null
            this.loadGroups()
            this.loadImages()
            this.loadQuestions()
            if (closeDialog) {
                this.$modal.cancel()
                this.$store.commit('showTestListDialog', false)
            }
        },
        loadTest () {
            this.$http({url: 'testapi/1/test/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.tests = resp.data
                if (this.test_id) this.openTestById(this.test_id)
                else this.openTestListDialog()
            })
            .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to load tests"
                this.showLoading = true
                //this.addTest()
            })
        },
        addTest (name) {
            let newTest = {name}
            this.$http({url: 'testapi/1/test/', data: newTest, method: 'POST' })
            .then(resp => {
                //console.log(resp)
                this.tests.push(resp.data)
            })
            .catch(err => {
                //console.log(err);
                newTest.id = this.tests.length + 1
                newTest.name = name || "new test title"
                newTest.localData = true
                //console.log(newTest)
                this.tests.push(newTest)
                this.openTestListDialog()
            })
        },
        removeTest (index) {
            const data = this.tests[index]
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ index +"/", method: 'DELETE' })
                .then(resp => {
                //console.log(resp)
                this.tests.splice(index, 1)
                this.loadingMessage = "Test removed"
                this.showLoading = true
                })
                .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to remove test"
                this.showLoading = true
                })
            } else {
                this.tests.splice(index, 1)
                this.loadingMessage = "test removed"
                this.showLoading = true
            }
        },/*
        updateTest () {
            const data = cell.getRow().getData()
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ this.testId +"/group/" + data.id + "/", data, method: 'PUT' })
                .then(resp => {
                //console.log(resp)
                cell.getRow().update(resp.data)
                this.loadingMessage = "Group updated"
                this.showLoading = true
                })
                .catch(err => {
                //console.log(err);
                cell.restoreOldValue()
                this.loadingMessage = "Failed to update group"
                this.showLoading = true
                })
            }
        },*/
        loadGroups () {
            let groupData = [
                {id:1, name:"Oli Bob", image: "an image", header_note: "use the illustration below"},
                {id:2, name:"Oli Bob", image: "an image", header_note: "use the illustration below"},
            ];
            this.$http({url: 'testapi/1/test/'+ this.testId +'/group/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.groups = resp.data
                this.setupTabulator()
            })
            .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to load groups"
                this.showLoading = true
                //this.groups = groupData
                //this.setupTabulator()
            })
            
        },
        addGroup () {
            //add new question group
            this.groupTable.setPage("last")
            let newGroup = {
                name: "", 
                test_data: this.testId, 
                image: "", 
                header_note: ""
            }
            this.$http({url: 'testapi/1/test/'+ this.testId +'/group/', data: newGroup, method: 'POST' })
            .then(resp => {
                //console.log(resp)
                this.groups.push(resp.data)
            })
            .catch(err => {
                //console.log(err);
                //newGroup.id = this.groups.length + 1
                //newGroup.localData = true
                //console.log(newGroup)
                //this.groups.push(newGroup)
            })
            
        },
        updateGroup (cell) {
            const data = cell.getRow().getData()
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ this.testId +"/group/" + data.id + "/", data, method: 'PUT' })
                .then(resp => {
                //console.log(resp)
                cell.getRow().update(resp.data)
                this.loadingMessage = "Group updated"
                this.showLoading = true
                })
                .catch(err => {
                    //console.log(err);
                    //cell.restoreOldValue()
                    this.loadingMessage = "Failed to update group"
                    this.showLoading = true
                })
            }
        },
        removeGroup (row) {
            const data = row.getData()
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ this.testId +"/group/" + data.id + "/", method: 'DELETE' })
                .then(resp => {
                //console.log(resp)
                row.delete()
                this.loadingMessage = "Group removed"
                this.showLoading = true
                this.setQuestionGroups()
                })
                .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to remove group"
                this.showLoading = true
                this.setQuestionGroups()
                })
            } else {
                //row.delete()
                this.loadingMessage = "Group removed"
                this.showLoading = true
                //this.setQuestionGroups()
            }
        },
        
        setQuestionNo () {
            this.questionNo = []
            this.lastQuestionNo = 0
            let groupItemIndex
            this.questionList.forEach((item)=>{
                this.lastQuestionNo++
                this.questionNo[item] = this.lastQuestionNo
                if(this.questionGroup[item]) {
                groupItemIndex = item
                this.questionGroup[groupItemIndex].from = this.lastQuestionNo
                } 
                else if (groupItemIndex)
                this.questionGroup[groupItemIndex].to = this.lastQuestionNo 
            })
            //console.log(this.questionNo)
        },
        setQuestionGroups () {
            //group questions
            this.groupQuestions = {}
            this.questionList = []
            this.questionGroup = {}
            this.questions.forEach((question, index)=>{
                let group = question.group
                if(!this.groupQuestions[group])
                this.groupQuestions[group] = [index]
                else if (this.groupQuestions[group].indexOf(index) == -1)
                this.groupQuestions[group].push(index)
            })
            //assign group object id to groups first questions
            Object.keys(this.groupQuestions).forEach((group)=>{
                //assign to non null question groups        
                let questionIndex = this.groupQuestions[group][0]
                if (group !== "null")
                this.questionGroup[questionIndex] = {group: this.getGroupById(group)}
                //join groups questions
                if(this.questions[this.groupQuestions[group][0]].group != null)
                this.questionList = this.questionList.concat(this.groupQuestions[group])
                else
                this.questionList.unshift(...this.groupQuestions[group])
            })
            //console.log(this.questionList)
            //console.log(this.groupQuestions)
            //console.log(this.questionGroup)
            this.setQuestionNo()
            this.setPaginator()
            this.questionNavPos
        },

        loadQuestions(){
            this.$http({url: 'testapi/1/test/'+ this.testId +'/question/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.questions = resp.data
                this.computeTime()
                this.setQuestionGroups()
                this.$nextTick(this.renderMath)
                this.questionsReady = true
            })
            .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to load questions"
                this.showLoading = true
                //this.addQuestion()
            })
        },
        addQuestion () {
            let newQuestion = {
                question: "",
                answer: "",
                test_data: this.testId,
                options: [
                {label: 'A', answer: ""},
                {label: 'B', answer: ""},
                {label: 'C', answer: ""},
                {label: 'D', answer: ""},
                {label: 'E', answer: ""},
                ],
                answer_type: "OPTION",
                file_type: "IMAGE",
                image: "",
                group: null,
                mark_scheme: ""
            }
            this.$http({url: 'testapi/1/test/'+ this.testId +'/question/', data: newQuestion, method: 'POST' })
            .then(resp => {
                //console.log(resp)
                this.questions.push(resp.data)
                this.question = this.questions[this.questions.length - 1] // set last question to question editor  
                this.computeTime()
                this.setQuestionGroups()
                this.questionsReady = true
            })
            .catch(err => {
                //console.log(err);
                //newQuestion.localData = true
                //newQuestion.id = this.questions.length
                //console.log(newQuestion)
                //this.questions.push(newQuestion)
                //this.question = this.questions[this.questions.length - 1]
                //this.computeTime()
                //this.setQuestionGroups()
                this.questionsReady = true
            })
        },
        updateQuestion(){
            let index = this.questionIndex
            const data = this.questions[index]
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ this.testId +"/question/" + data.id + "/", data, method: 'PUT' })
                .then(resp => {
                //console.log(resp)
                this.questions[index] = resp.data
                this.$nextTick(this.renderMath)
                this.loadingMessage = "question " + (index + 1) + " update successfull"
                this.showLoading = true
                })
                .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to update question " + (index + 1)
                this.showLoading = true
                })
            }
            //console.log(this.questions[index])
        },
        removeQuestion (index) {
            const data = this.questions[index]
            if (!data.localData) {
                this.$http({url: "testapi/1/test/"+ this.testId +"/question/" + data.id + "/", 
                data, 
                method: 'DELETE' })
                .then(resp => {
                //console.log(resp)
                this.questions.splice(index,1)
                this.loadingMessage = "question  removed successfully"
                this.showLoading = true
                this.setQuestionGroups()
                })
                .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to remove question"
                this.showLoading = true
                this.setQuestionGroups()
                })
            } else {
                //this.questions.splice(index,1)
                this.loadingMessage = "question  removed successfully"
                this.showLoading = true
                //this.setQuestionGroups()
            }
        },
        
        addOption (question) {
            let lastLabel = 65
            for(let option of question.options) {
                if (option.label.charCodeAt(0) >= lastLabel)
                lastLabel = option.label.charCodeAt(0)
            }
            if (lastLabel < 90) {
                question.options.push({
                label: String.fromCharCode(lastLabel + 1), 
                answer: ""
                })
            }
        },
        removeOption (question) {
            if(question.options.length > 0) {
                let removedOption = question.options.pop()
                if(question.answer === removedOption.label)
                question.answer = ""
            } 
        },
        fieldId (fieldName, question) {
            return fieldName + question.id
        },
        loadImages () {
            let images = [
                {
                id: "1",
                name: "one",
                image: "assets/img/images/img1.jpg"
                },
                {
                id: "2",
                name: "two",
                image: "assets/img/images/img2.jpg"
                }
            ]

            this.$http({url: 'testapi/1/test/' + this.testId + '/image/', method: 'GET' })
            .then(resp => {
                //console.log(resp)
                this.images = resp.data
            })
            .catch(err => {
                //console.log(err);
                //this.images = images
            })
        },
        addImage () {
            this.$modal.show(uploadDialog)
            .then((data) => {
                data.append('test_data', this.testId)
                //console.log(data)
                this.inProgress = true
                this.$http({url: 'testapi/1/test/' + this.testId + '/image/', 
                data,  
                headers: {'content-type': 'multipart/form-data'}, 
                method: 'POST' })
                .then(resp => {
                //console.log(resp)
                this.images.push(resp.data)
                this.inProgress = false
                })
                .catch(err => {
                //console.log(err);
                this.inProgress = false
                })
            })
        },
        removeImage(index) {
            const data = this.images[index]
            if (!data.localData) {
                this.$http({url: "testapi/1/test/" + this.testId + "/image/" + data.id + "/", method: 'DELETE' })
                .then(resp => {
                //console.log(resp)
                this.images.splice(index,1)
                this.loadingMessage = "image removed successfully"
                this.showLoading = true
                })
                .catch(err => {
                //console.log(err);
                this.loadingMessage = "Failed to remove image"
                this.showLoading = true
                })
            } else {
                this.images.splice(index,1)
                this.loadingMessage = "image  removed successfully"
                this.showLoading = true
            }
        },
        
        
        getImageById: function (id, getHtml=false, width=300, height=200) {
            for (let i in this.images) {
                if(this.images[i]["id"] == id) {
                if (getHtml)
                    return `<img src="${this.images[i]["image"]}" 
                        width="${width}" height="${height}" class="question-image">`
                else 
                    return this.images[i]
                } 
            }
            return null
        },
        getGroupById: function (id) {
            for (let i in this.groups) {
                if(this.groups[i]["id"] == id)
                return this.groups[i]
            }
            return null
        },
        //table actions
        selectionToggle: function () {
            if(!this.selectable) {
                this.selectable = true
                this.editable = false
                this.groupTable.showColumn("rowSelection")
                this.selectState = "cancel"
            } else {
                this.selectable = false
                this.groupTable.deselectRow()
                this.groupTable.hideColumn("rowSelection")
                this.selectState = "select"
                this.editable = true
            }
            
        },
        selectAllRows: function () {
            this.groupTable.selectRow()
        },
        deselectAllRows: function () {
            this.groupTable.deselectRow()
        },
        deleteSelectedRows: function () {
            let rows = this.groupTable.getSelectedRows()
            if(rows)
                for(let x = 0; x < rows.length; x++)
                this.removeGroup(rows[x])
        },
        setupTabulator: function () {
            if(this.Tabulator && this.groupTable === null) {
                
                let checkEdit = function () {
                return this.editable
                }.bind(this)

                let imageData = function(){
                let returnData = {'values': {}}
                for (let i in this.images) {
                        returnData['values'][this.images[i]["id"]] = this.images[i]["name"]
                }
                return returnData
                }.bind(this)

                let imageView = function(cell){
                let image = this.getImageById(cell.getValue(), true, 50, 50)
                return image || "Select image"
                }.bind(this)

                this.groupTable = new this.Tabulator("#group-table", {
                data: this.groups,
                reactiveData: true,
                layout: 'fitColumns',
                selectableRollingSelection: false,
                selectablePersistence: false,
                addRowPos: "bottom",
                pagination:"local",
                paginationSize:5,
                paginationSizeSelector:[5, 10, 20],
                paginationAddRow: "table",
                rowClick: function (e, row) {
                        row.toggleSelect()
                }.bind(this),
                selectableCheck: function () {
                        return this.selectable 
                }.bind(this),
                cellEdited: function (cell) {
                        this.updateGroup(cell)
                }.bind(this),
                columns: [
                        {field: "rowSelection", formatter:"rowSelection", visible: false,
                            titleFormatter:"rowSelection", hozAlign:"center", headerSort:false},
                        {field: "SNo.", formatter:"rownum", title:"SNo."},
                        {title: "Name", field: "name", editor: true, editable: checkEdit},
                        {title: "Header note", field: "header_note", editor: "textarea", 
                            editable: checkEdit, formatter: "textarea"},
                        {title: "Image", field: "image", editor: "select", formatter: imageView,
                            editable: checkEdit, editorParams: imageData},
                ],
                });
            }
        }
    },
    created: function () {
    },
    mounted: function() {
        tabulator()
        .then(({default: Tabulator})=>{
            this.Tabulator = Tabulator
            if(this.tests.length == 0) this.loadTest()
        })
        this.$store.commit('setPageData', this.pageData)
        this.loadScripts()
    },
};
</script>