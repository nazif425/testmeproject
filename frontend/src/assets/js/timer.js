class TestTimer{
	constructor(app){
		if (!app) {
			this.error = true
			//console.log("config object required, none provided");
		}
		else if(isNaN(Number(app.time))){
			this.error = true
			//console.log("invaild time");
		}
		else {
			this.display = app.updateTimer;
			this.status = "off";
			this.seconds = 0;
			this.minute = Number(app.time);
			this.error = false
			this.app = app;
		}

		this.timeChange = ()=>{
			let hour;
			let display = "";
			let minute = this.minute;
			
			if((hour = Math.floor(this.minute / 60))){
				minute = this.minute % 60;
				display += this.myPad(2, "0", String(hour)) + ":";
			}
			display += this.myPad(2, "0", String(minute)) + ":";
			display += this.myPad(2, "0", String(this.seconds));
			this.display(display);
			
			if(!this.minute && !this.seconds){ 
				this.stop();
				return;
			}

			if( this.seconds == 0 ){
				this.minute -= 1;
				this.seconds = 59;
			} else {
				this.seconds -= 1;
			}
		}
	}
	
	start(){
		if(this.status == "off"){
			this.status = "on";
			this.app.start();
			this.stopInterval = setInterval(this.timeChange, 1000);
		}
	}
	stop(){
		if(this.status == "on"){
			this.status = "off";
			clearInterval(this.stopInterval);
			if(this.app) {
				if(this.app.running())
					this.app.stop();
			}
		}
	}
	myPad(length, char, str){
		while(str.length < length){
			str = char+str;
		}
		return str;
	}
}
export default TestTimer;