/* Your JS here. */
console.log('Hello World!')

// Modal
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.getElementsByClassName('portfolio_item');
    const closeButtons = document.getElementsByClassName('modal_close');

    // Open
    for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];

        trigger.addEventListener('click', () => {
            if (trigger.attributes['data-modal-target']) {
                const targetID = trigger.attributes['data-modal-target'].value;
                const modal = document.getElementById(targetID);

                if (modal && modal.className.indexOf('is-open') === -1) {
                    modal.className += ' is-open';
                }
            }
        })
    }

    // Close
    for (let i = 0; i < closeButtons.length; i++) {
        const button = closeButtons[i];

        button.addEventListener('click', () => {
            let modal = button.parentElement;

            // Try to manually find the parent .modal-overlay
            while (modal && modal.className.indexOf('modal_overlay') === -1) {
                modal = modal.parentElement;
            }

            if (modal) {
                modal.className = modal.className.replace(' is-open', '')
            }
        })
    }
});

// Carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementsByClassName('carousel_track')[0];
    const slides = document.getElementsByClassName('carousel_slide');
    const prev_button = document.getElementsByClassName('carousel_prev')[0];
    const next_button = document.getElementsByClassName('carousel_next')[0];

    
    if (!track || !prev_button || !next_button || slides.length === 0) return;
    
    let len = slides.length;
    let currIdx = 0;

    function updateCarousel() {
        track.style.transform = 'translateX(-' + (currIdx * 100) + '%)';
    }

    // prev button
    prev_button.addEventListener('click', () => {
        if (currIdx === 0) {
            currIdx = len - 1;
        } else {
            currIdx -= 1;
        }
        updateCarousel();
    });

    // next button
    next_button.addEventListener('click', () => {
        currIdx = (currIdx + 1) % len;
        updateCarousel();
    });
})

// Navbar Resizing
document.addEventListener('DOMContentLoaded', () => {
    const header_section = document.getElementsByClassName("header_container")[0];
    const scroll_limit = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scroll_limit) {
            header_section.classList.add('is-shrunken');
        } else {
            header_section.classList.remove('is-shrunken');
        }
    });
})

// Position Indicator
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementsByTagName('header')[0];

    const nav_sections = [
        {section: document.getElementById('portfolio'), link: document.getElementsByClassName('portfolio_navbar')[0]},
        {section: document.getElementById('about'), link: document.getElementsByClassName('about_navbar')[0]},
        {section: document.getElementById('contact'), link: document.getElementsByClassName('contact_navbar')[0]}
    ]

    function updateActivateLink() {
        const navbar_height = navbar.offsetHeight;
        let curr_link = null;

        for (let i = 0; i < nav_sections.length; i++) {
            const section = nav_sections[i].section.getBoundingClientRect();

            // Check which section has been activated
            if (section.top <= navbar_height && section.bottom > navbar_height) {
                curr_link = nav_sections[i].link;
                break;
            }
        }

        const scroll_bottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (scroll_bottom) {
            curr_link = nav_sections[nav_sections.length - 1].link;
        }

        for (let i = 0; i < nav_sections.length; i++) {
            nav_sections[i].link.classList.remove('activate_link');
        }

        if (curr_link) {
            curr_link.classList.add('activate_link');
        }
    }

    window.addEventListener('scroll', updateActivateLink);
    updateActivateLink();
})