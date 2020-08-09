import timerRefs from './DOM-elements';

export default class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.timeObj;
        this.intervalId = null;
    }
    getValues() {
        const targetDate = new Date(this.targetDate);
        const deltaTime = targetDate.getTime() - Date.now();
        return {
            days: Math.floor(deltaTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
                (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
            mins: Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
            secs: Math.floor((deltaTime % (1000 * 60)) / 1000),
        };
    }
    createMarkUp() {
        timerRefs.days.textContent = this.timeObj.days;
        timerRefs.hours.textContent = this.timeObj.hours;
        timerRefs.mins.textContent = this.timeObj.mins;
        timerRefs.secs.textContent = this.timeObj.secs;
    }
    changeTime() {
        this.timeObj.secs--;
        switch (-1) {
            case this.timeObj.secs:
                this.timeObj.secs = 59;
                this.timeObj.mins--;
                break;
            case this.timeObj.mins:
                this.timeObj.mins = 59;
                this.timeObj.hours--;
                break;
            case this.timeObj.hours:
                this.timeObj.hours = 23;
                this.timeObj.days--;
                break;
            case this.timeObj.days:
                this.timeObj.days = 0
                clearInterval(this.intervalId);
        }
        this.createMarkUp();
    }
    setTimer() {
        this.timeObj = this.getValues();
        this.createMarkUp();
        this.intervalId = setInterval(() => {
            this.changeTime();
        }, 1000);
    }
}
