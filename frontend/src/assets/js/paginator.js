class QNav{
	constructor(list, perPage=10, start=1){
      this.list = list;
		this.groupList = {}
		this.pos = start
      let newGroup = []
      let index = 0
      let lastGroupKey = 1
      let totalGroup = Math.ceil(this.list.length / perPage)
      while (lastGroupKey <= totalGroup) {
         newGroup.push(this.list[index++])
         if (newGroup.length == perPage 
            || index == this.list.length)  {
            this.groupList[lastGroupKey++] = newGroup.slice(0)
            if (index == this.list.length) break;
            newGroup = []
			}
      }
		//console.log(this.groupList)
      this.restart();
	}
	restart(){
		if (!this.groupList[this.pos]) 
			this.pos = 1;
		this.back = false;
		this.front = false;
		if (this.groupList[this.pos - 1])
			this.back = true;
      if (this.groupList[this.pos + 1]) 
         this.front = true;
		this.outOfRange = false;
	}
	current(){
		return this.groupList[this.pos];
	}

	next(){
		if(this.front) {
			this.back = true;
			++this.pos;
         if (this.groupList[this.pos + 1]) 
				this.front = true;
			else
				this.front = false
			return this.current()
		} else return false;
	}

	prev(){
		if(this.back) {
			this.front = true;
			--this.pos;
         if (this.groupList[this.pos - 1]) 
				this.back = true;
			else 
				this.back = false
			return this.current()
		} else return false;
	}
	jumpTo(here){
		if(Object.keys(this.groupList).indexOf(here) != -1){
			this.pos = Number(here);
			if (this.groupList[this.pos - 1]) 
				this.back = true;
			else 
				this.back = false
         if (this.groupList[this.pos + 1]) 
				this.front = true;
			else
				this.front = false
			return this.current();
		} 
		else {
			return false;
		}
	}
	jumpToElement(here){
		let group
      Object.keys(this.groupList).forEach((groupKey)=>{
         if(this.groupList[groupKey].indexOf(here) != -1)
            group = groupKey
		})
       if(group){  
			return this.jumpTo(group)
		} else return false;
	}
}
export default QNav;