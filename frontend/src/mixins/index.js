import renderMathInElement from "katex/contrib/auto-render/auto-render.js";

let mixins = {
   methods: {
      renderMath () {
         renderMathInElement(
            document.getElementById("question-list"),
            {
               delimiters: [
                  {left: "$$", right: "$$", display: true},
                  {left: "$", right: "$", display: false}
               ]
            }
         )
      },
      jumpTo(item){
         this.paginator.jumpToElement(item)
         this.$nextTick(()=>{
            this.$scrollTo('#q'+ item)
            this.$nextTick(this.renderMath)
         })
      },
      next(){
         this.paginator.next()
         this.$nextTick(this.renderMath)
      },
      prev(){
         this.paginator.prev()
         this.$nextTick(this.renderMath)
      },
      answerType (answerId, question) {
         return answerId == question.answer_type
      },
      sortOptions (options) {
         let currentLabel = 65
         let sortedOptions = []
         while (sortedOptions.length < options.length) {
            for(let i in options) {
               if (options[i].label === String.fromCharCode(currentLabel)) {
                     currentLabel++
                     sortedOptions.push(options[i])
               }
            }
         }
         return sortedOptions
      },
   }
}
export default mixins