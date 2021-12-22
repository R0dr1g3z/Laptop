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
            "backspace", "0", "done",
        ];
        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEL = document.createElement("div");

            keyEL.classList.add("pin-login__key");
            keyEL.classList.toggle("material-icons", isNaN(key));
            keyEL.textContent = key;
            keyEL.addEventListener("click", () => {this._handleKeyPress(key)})
            this.el.numPad.appendChild(keyEL);

            if (insertBreak){
                this.el.numPad.appendChild(document.createElement("br"));
            }
        });
    }
    _handleKeyPress(key){
        switch(key){
            case "backspace":
                this.value = this.value.substring(0, this.value.length - 1);
                break;
                case "done":
                    this._attemptLogin();
                    break;
                    default:
                        if (this.value.length < this.maxNumber && !isNaN(key)){
                            this.value += key;
                        }
                        break;
        }
        this._updateValueText();
    }
    _updateValueText(){
        this.el.textDisplay.value = "_".repeat(this.value.length);
        this.el.textDisplay.classList.remove("pin-login__text--error");
    }
    _attemptLogin(){
        if(this.value.length > 0){
            fetch(this.loginEndpoint,{
                method: "post",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                body: `pincode=${this.value}`
            }).then(resposne => {
                if (resposne.status === 200){
                    window.location.href = this.redirectTo;
                } else {
                    this.el.textDisplay.classList.add("pin-login__text--error");
                }
            })
        }
    }
}