
$(document).ready(function() {
    document.querySelector('.header a').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        
        setTimeout(function() {
            window.location.reload();
        }, 1000);

        
    });

    /* toggling navigation bar */
    let menuIcon = document.querySelector('#menu-icon');
    let navBar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a')

    window.onload = () => {
        // Set only 'Home' as active on page load
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    };


    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height){
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);

        menuIcon.classList.remove('fa-xmark');
        navBar.classList.remove('active');
    }

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navBar.classList.toggle('active');
    }



    /* revealing sections on scroll */
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal('.home-content, heading',{origin: 'top'});
    ScrollReveal().reveal('.home-img, .skills-container, .projects-box, .contact form',{origin: 'bottom'});
    ScrollReveal().reveal('.home-content h1, .about-img',{origin: 'left'});
    ScrollReveal().reveal('.home-content p, .about-content',{origin: 'right'});


    /* toggling Accessibility box */
    document.querySelector('.accessibility-container').style.display = "none";
    document.querySelector('.accessibility-btn').addEventListener('click', function() {
        var container = document.querySelector('.accessibility-container');
        var accessibilityBtn = document.querySelector('.accessibility-btn');
        if (container.style.display === "none") {
            container.style.display = "flex";
            accessibilityBtn.classList.add('active');
        } else {
            container.style.display = "none";
            accessibilityBtn.classList.remove('active');
        };
    });

    /* changing feature for homepage */
    const options = {
        strings: ['Software Engineer', 'BackEnd Developer', 'Linux Programmer', 'Web Developer'],
        typeSpeed: 75,
        backSpeed: 75,
        backdelay: 4000,
        loop: true,
    };
    const typed = new Typed('.home-content h3 span', options);


   
    var highlightedElement = null;
    var screenReader = false;
    let speech = new SpeechSynthesisUtterance();
    let instructions = "Accessibility Reader Enabled. To hear what's on the screen, hover over an element and press the space bar. To stop talking, press any other key. To disable the reader, press the accessibility button and untoggle the Accessibility Reader icon."
    var magnifier = false;
    let instructions2 = "Accessibility Magnifier Enabled. With the accessible magnifier turned on, please hover over an item and press space to zoom in. Press space to reset. To turn off this feature, untoggle the Accessibility Magnifier icon."
    var Color = false;
    let instructions3 = "High Contrast Enabled. To turn off this feature, untoggle the High Contrast icon."
    window.speechSynthesis.onvoiceschanged = function() {
        let voices = window.speechSynthesis.getVoices();
        speech.voice = voices[2]; // change this to the index of the desired voice
    };


    /* Screen Reader */
    document.querySelector('.fa-solid.fa-ear-listen').addEventListener('click', function() {
        var icon = document.querySelector('.fa-solid.fa-ear-listen');
        screenReader = !screenReader;
        if (!magnifier && screenReader && !Color) {$
            speech.text = instructions;
            speechSynthesis.speak(speech);
            icon.classList.add('active', 'screen-reader-text');
        } else{ 
            screenReader = false;
            speechSynthesis.cancel();
            icon.classList.remove('active', 'screen-reader-text');
        }  
        document.addEventListener('keydown', function(e) {
            speechSynthesis.cancel();
            if (e.code == 'Space') {
                e.preventDefault();
                // Speak the text of the highlighted element or the alt text of an image
                if (highlightedElement && !magnifier && screenReader && !Color) {
                    var text;
                    if (highlightedElement.tagName.toLowerCase() === 'img') {
                        text = $(highlightedElement).attr('alt') || $(highlightedElement).attr('src');
                    } else {
                        text = $(highlightedElement).text();
                    }
                    
                    speech.text = text;
                    speechSynthesis.speak(speech);
                }
            } else {
                // Stop speaking and remove highlight
                speechSynthesis.cancel();
                if (highlightedElement) {
                    $(highlightedElement).removeClass('screen-reader-text');
                    highlightedElement = null;
                }
                // Remove highlight from the icon
                $(this).removeClass('screen-reader-text');
            }
        });

        $("*:not(body)").hover(
            // Hover out event handler
            function(ev) {
                if (!magnifier && screenReader && !Color){
                    // Add 'highlight' class to the current element
                    $(this).addClass('screen-reader-text');
                    highlightedElement = this;
        
                    // Prevent event from triggering on other elements
                    ev.stopPropagation();
                }
            },
            function(ev) {
                if (!magnifier && screenReader && !Color){
                    // Remove 'highlight' class from the current element
                    $(this).removeClass('screen-reader-text');
                    highlightedElement = null;
                }
            }
        );
    });


    /* Magnifier */
    document.querySelector('.fa-solid.fa-magnifying-glass').addEventListener('click', function() {
        var icon = document.querySelector('.fa-solid.fa-magnifying-glass');
        magnifier = !magnifier;
        if (magnifier && !screenReader && !Color ) {                
            speech.text = instructions2;
            speechSynthesis.speak(speech);
            icon.classList.add('active', 'screen-reader-text');

        } else{ 
            magnifier = false;
            speechSynthesis.cancel();
            icon.classList.remove('active', 'screen-reader-text');
            return;
        }  
        $("*:not(body)").hover(
            function(ev) {
                if (magnifier && !screenReader && !Color){
                    $(this).addClass('screen-reader-text');
                    highlightedElement = this;
                    ev.stopPropagation();
                }
            },
            function(ev) {
                if (magnifier && !screenReader && !Color){
                    $(this).removeClass('screen-reader-text');
                    highlightedElement = null;
                }
            }
        );

        $('h1, h2, h3, h4, h5, h6, p, header, navbar, span').click(function() {
            highlightedElement = this;
        });
 
        $(document).keydown(function(e) {
            speechSynthesis.cancel();
            if (e.key === ' ') {
                if ($("#mydiv").length) {
                    $("#mydiv").remove();
                } else if (highlightedElement && magnifier && !screenReader && !Color) {
                    let content;
                    if (highlightedElement.nodeType === Node.TEXT_NODE) {
                        content = highlightedElement.nodeValue;
                    } else {
                        content = highlightedElement.outerHTML;
                    }
                    $("body").append($("<div id='mydiv'>" + content + "</div>"));
                    $("#mydiv").css({
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        'z-index': 10,
                        'font-size': '30px',
                        'border-radius': '10px',
                        'background-color': 'white',
                        'padding': '20px',
                        'max-width': '80%',
                        'max-height': '80%',
                        'overflow': 'auto',
                        'color': 'black'
                    });
                }
                e.preventDefault();
            }
        });
    });

    /* Color contrast */
    document.querySelector('.fa-solid.fa-eye').addEventListener('click', function() {
        var icon = document.querySelector('.fa-solid.fa-eye');
        Color = !Color;
        if (Color && !screenReader && !magnifier) {
            speech.text = instructions3;
            speechSynthesis.speak(speech);
            $(document).keydown(function(e) {
                speechSynthesis.cancel();
            });
            document.documentElement.classList.add('active');
            icon.classList.add('active');
        } else {
            Color = false;
            speechSynthesis.cancel();
            document.documentElement.classList.remove('active');;
            icon.classList.remove('active');
            return;
        }
    });

    /* Contact form */
    document.querySelector('#myForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        let formData = new URLSearchParams(new FormData(event.target));
    
        try {
            let response = await fetch('http://localhost:3000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            let data = await response.text();
    
            alert(data);
    
            // Clear all input fields in the form
            event.target.querySelectorAll('input, textarea').forEach(input => input.value = '');
        } catch (error) {
            console.error('Error:', error);
        }
    });

});


