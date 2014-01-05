(function () {
    var //other members
        runApp = {},
        middle_bar_show = {},
        middle_bar_hide = {},
        display_logo = {},
        
        //door configuration namespace
        doors = {
            doors_close: {},
            doors_open: {},

            //left-margin values of left gate and right gate for completely closed state
            doors_closed: {
                left_margin: -20,
                right_margin: 45
            },

            //left-margin values of left gate and right gate for completely open state
            doors_opened: {
                left_margin: -60,
                right_margin: 85
            },

            //left-margin values of left gate and right gate for ajar gates
            doors_ajar: {
                left_margin: -35,
                right_margin: 60
            }
        },
        
        //middle bar configuration namespace
        middle_bar = {
            max_left: 13,
            min_top: 10,
            min_left: -4,
            max_top: 135,
            shift_top: -20,
            shift_left: 10
        },
        
        //DOM configuration namespace
        dom = {
            container: document.getElementById('container'),
            background: document.getElementById('background-div'),
            background_text: document.getElementById('background-div-text')
        };

    //function for closing the doors by increasing or decreasing respective left margins
    doors.doors_close = function (left_door, right_door, callback) {
        var current_left = doors.doors_opened.left_margin,
            current_right = doors.doors_opened.right_margin;

        //self invoking function for closing left door
        (function left_close () {
            left_door.style.left = current_left + '%';
            current_left += 3;
            if (current_left <= doors.doors_closed.left_margin) {
                setTimeout(left_close, 20);
            }
        }());

        //self invoking function for closing right door
        (function right_close () {
            right_door.style.left = current_right + '%';
            current_right -= 3;
            if (current_right >= doors.doors_closed.right_margin) {
                setTimeout(right_close, 20);
            }
        }());
        if (callback !==undefined) {
            setTimeout(callback, 1000);
        }
    };

    //function for opening the doors by increasing or decreasing respective left margins
    doors.doors_open = function (left_door, right_door, callback) {
        var current_left = doors.doors_closed.left_margin,
            current_right = doors.doors_closed.right_margin;

        //self invoking function for closing left door
        (function left_open () {
            left_door.style.left = current_left + '%';
            current_left -= 3;
            if (current_left >= doors.doors_ajar.left_margin) {
                setTimeout(left_open, 10);
            }
        }());

        //self invoking function for closing right door
        (function right_open () {
            right_door.style.left = current_right + '%';
            current_right += 3;
            if (current_right <= doors.doors_ajar.right_margin) {
                setTimeout(right_open, 10);
            }
        }());
        if (callback !== undefined) {
            setTimeout(callback, 1500);
        }
    };

    //function to create text bar in between doors
    // html: pass the html to be written in the div between doors 
    middle_bar_show = function (html, callback) {
        var background_style = dom.background.style,
            current_top = middle_bar.max_top,
            current_left = middle_bar.min_left;
        
        background_style.width = 65 + '%';
        background_style.height = 80 + '%';
        background_style.opacity = 1;
        dom.background.className = dom.background.className + " rotated";
        
        //setting the HTML of inner div
        dom.background_text.style.fontSize = '6vw';
        dom.background_text.style.fontFamily = 'quantum';
        dom.background_text.style.lineHeight = '2ex';
        dom.background_text.style.paddingLeft = "14%";
        dom.background_text.style.paddingTop = "14%";
        dom.background_text.innerHTML = html;
        
        //push the middle division up
        (function move_up () {
            background_style.top = current_top + '%';
            current_top -= 5;
            if (current_top >= middle_bar.min_top) {
                setTimeout(move_up, 10);
            }
        }());
        
        //push the middle division right
        (function move_right () {
            background_style.marginLeft = current_left + '%';
            current_left += 0.675;
            if (current_left <= middle_bar.max_left) {
                setTimeout(move_right, 10);
            }
        }());
        setTimeout(function () {
            middle_bar_hide(callback);
        }, 1500);
    };

    //function to hide text bar fom between doors
    middle_bar_hide = function (callback) {
        var current_top = middle_bar.min_top,
            current_left = middle_bar.max_left,
            current_opacity = 1;
        //function for small sliding up of background_text and fading
        (function slide_up () {
            current_top -= 5;
            current_left += 0.5;
            current_opacity -= 0.3;
            dom.background.style.top = current_top + "%";
            dom.background.style.marginLeft = current_left + "%";
            dom.background.style.opacity = current_opacity;
            console.log(dom.background.style.top);
            if (current_top > middle_bar.shift_top) {
                setTimeout(slide_up, 10);
            }
        }());
        if (callback !== undefined) {
            setTimeout(callback,300);
        }
    };
    
    //function to display SI logo at the end of the animation
    display_logo = function () {
        var footer = document.getElementById('si-logo'),
            bottom = 14,
            current_bottom = -25;
        (function push_up_logo() {
            footer.style.bottom = current_bottom + "%";
            current_bottom += 3;
            if (current_bottom <= bottom) {
                setTimeout(push_up_logo, 10);
            }
        }());
    };
    
    //function to call all other functions
    runApp = function () {
        var left_door,
            right_door;

        left_door = document.getElementById('left-door');
        right_door = document.getElementById('right-door');
        
        //close doors initially
        setTimeout(function () {
            doors.doors_close(left_door, right_door, function () {
                document.getElementById('container-bg').style.backgroundImage = '../images/road.jpg';
            });
            //fade background image of TT13
            // $(dom.background).animate({'opacity':0},600, function () {
            // });
        }, 900);
        
        //set the open doors margins to new ajar values 
        doors.doors_opened.left_margin = doors.doors_ajar.left_margin;
        doors.doors_opened.right_margin = doors.doors_ajar.right_margin;
        
        //open doors and dispay middle panel
        setTimeout(function () {
            doors.doors_open(left_door, right_door);
            middle_bar_show("<span>Ajay Kumar Garg</span><br/><span style='margin-left:10%;'> Engineering</span><br/> <span                                         style='margin-left:15%;'>College</span>", function () {
                middle_bar_show("<span style='margin-left: 25%;'>Annual</span><br/><span style='margin-left:3%;'>Technical                                             Festival</span><br/> <span style='margin-left:25%;'>2014</span>", function () {
                    middle_bar_show("<br/><span style='margin-left: 22%;'>Is Back!</span>", function () {
                        doors.doors_close(left_door, right_door, display_logo);
                    });
                });
                
            });
        }, 2000);
    };

    //begin execution of the script by calling runApp function on document ready
    $(function () {
        $('.pwd').lettering();
        $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();
        $('#si-logo').click(function () {
            window.location = 'http://www.silive.in';
        });
        runApp();
    });
}());