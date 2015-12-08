var imgSlider = {
    'carousel': document.getElementsByClassName("carousel-inner")[0],
    'leftBtn': document.getElementsByClassName("carousel-navigation")[0],
    'rightBtn': document.getElementsByClassName("carousel-navigation")[1],
    'current': 0,
    'slidesCount': document.getElementsByClassName("carousel-inner")[0].children.length,
    'buttonContainer': document.getElementsByClassName("control-buttons")[0],


    'init': function() {
        this.createButtons();
        var that = this;
        this.leftBtn.onclick = function() {
            that.showPrev();
            that.activeButton();
        };
        this.rightBtn.onclick = function() {
            that.showNext();
            that.activeButton();
        };

        var buttons = this.buttonContainer.getElementsByTagName("button");
        var buttonsCount = buttons.length;

        for (var i = 0; i < buttonsCount; i += 1) {
            buttons[i].onclick = function(e) {

                that.showByIndex(Number(this.dataset.index));
                that.activeButton();
            };
        }
    },
    'showByIndex': function(slideTo) {
        this.carousel.style.transform = "translateX(" + - (slideTo) * 100 + "%)";
        this.current = slideTo;
    },
    'showLast': function () {
        this.showByIndex(this.slidesCount - 1);
    },
    'showFirst': function () {
        this.showByIndex(0);
    },
    'showNext': function () {
        if (this.current === (this.slidesCount - 1)) {
            this.showFirst();
        } else {
            this.showByIndex(this.current + 1);
        }
    },
    'showPrev': function () {
        if (this.current === 0) {
            this.showLast();
        } else {
            this.showByIndex(this.current - 1);
        }
    },
    'createButtons': function () {
        for (i = 0; i < this.slidesCount; i++) {
            this.buttonContainer.innerHTML = this.buttonContainer.innerHTML + "<button data-index='" + i + "' type='button'></button>";
        }
        this.buttonContainer.getElementsByTagName("button")[this.current].className += "active";
    },
    'activeButton': function() {
        this.buttonContainer.getElementsByClassName("active")[0].classList.remove("active");
        this.buttonContainer.getElementsByTagName("button")[this.current].className += "active";
    }
};
imgSlider.init();

document.getElementsByClassName("form-submit")[0].onclick = function(){

    var nameVal = document.getElementsByClassName("name-input")[0].value,
        emailVal = document.getElementsByClassName("email-input")[0].value,
        messageTextVal = document.getElementsByClassName("message")[0].value;

    var fields = {
        name: nameVal,
        email: emailVal,
        messageText: messageTextVal
    };

    var errorMsg = {
        empty: "cannot be empty",
        notvalid: "is not valid"
    };
    var errors = {};

    for (var f in fields){

        if (!fields[f].trim().length){
            errors[f] = f + ": " + errorMsg.empty;
        }
    }

    if(!errors.email){
        if(!/\@/.test(fields.email)){
            errors.email = "email: " + errorMsg.notvalid;
        }
    }

    if (Object.keys(errors).length) {
        printError(errors);
    } else {
        printSuccess();
    }

    return false;
};
function printSuccess(){
    document.getElementById("error-list").innerHTML = '';
    document.getElementById("error-list").innerHTML = '<li>Message has been sent</li>';
}
function printError(errors){
    document.getElementById("error-list").innerHTML = '';
    for ( var error in errors ) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(errors[error]);
        node.appendChild(textnode);
        document.getElementById("error-list").appendChild(node);
    }
}

function smoothScroll() {
    var $data = document.getElementsByClassName("smoothScroll"),
        $buttons = [];

    for ($btn in $data) {
        $buttons.push($data[$btn]);
    }

    $buttons.forEach(function ($button) {
        $button.onclick = function() {
            var id = this.getAttribute("href").substr(1),
                anchor = document.getElementById(id),
                distanceFromTop = anchor.offsetTop,
                distance = anchor.offsetTop - document.documentElement.scrollTop,
                docHeight = document.documentElement.offsetHeight,
                screenHeight = document.documentElement.clientHeight,
                step = 20;

            function scroll() {
                setTimeout(function() {

                    var newDistance = anchor.offsetTop - document.documentElement.scrollTop;

                    if ((document.documentElement.scrollTop + screenHeight) >= docHeight) {
                        return;
                    }

                    if (distance > 0) {
                        if (newDistance >= 20) {
                            window.scrollBy(0, step);
                            scroll();
                        } else {
                            window.scrollTo(0, distanceFromTop);
                        }
                    } else {
                        if (newDistance <= -20) {
                            window.scrollBy(0, -20);
                            scroll();
                        } else {
                            window.scrollTo(0, distanceFromTop);
                        }
                    }
                }, 5);
            }
            scroll();

            return false;
        }
    });
}

smoothScroll();
