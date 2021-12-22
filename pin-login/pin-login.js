class PinLogin{
    constructor ({el, loginEndpoint, redirectTo, maxNumber = Infinity}){
        this.el = {
            main: el,
            numPad: el.querySelector(".pin-login__numpad"),
            textDisplay: el.querySelector(".pin-login__text")
        };
        this.loginEndpoint = loginEndpoint;
        this.redirectTo = redirectTo;
        this.maxNumber = maxNumber;
        this.value = "";

        this._generatePad();
    }
    _generatePad(){
        const padLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "backspace", "2", "done",
        ];
        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEL = document.createElement("div");

            keyEL.classList.add("pin-login--key");
            keyEL.classList.toggle("material-icons", isNaN(key));
            keyEL.textContent = key;
            keyEL.addEventListener("click", () => {this._handleKeyPress(key)})
        });
    }
}