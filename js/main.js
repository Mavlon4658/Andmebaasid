if ($('.resizer-x').length) {
    (function () {
        "use strict";
    
        // horizontal direction
        (function resizableX() {
            const resizer = document.querySelector(".resizer-x");
            resizer.addEventListener("mousedown", onmousedown);
            resizer.addEventListener("touchstart", ontouchstart);
    
            // for mobile
            function ontouchstart(e) {
                e.preventDefault();
                resizer.addEventListener("touchmove", ontouchmove);
                resizer.addEventListener("touchend", ontouchend);
            }
            function ontouchmove(e) {
                e.preventDefault();
                let block = $('.resizable-block')[0].getBoundingClientRect();
                if (e.touches[0].clientX > block.left && e.touches[0].clientX < block.left + block.width) {
                    const clientX = e.touches[0].clientX;
                    const deltaX = clientX - (resizer._clientX || clientX);
                    resizer._clientX = clientX;
                    const l = resizer.previousElementSibling;
                    const r = resizer.nextElementSibling;
                    // LEFT
                    if (deltaX < 0) {
                        const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
                        l.style.flex = `0 ${w < 10 ? 0 : w}px`;
                        r.style.flex = "1 0";
                    }
                    // RIGHT
                    if (deltaX > 0) {
                        const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
                        r.style.flex = `0 ${w < 10 ? 0 : w}px`;
                        l.style.flex = "1 0";
                    }
                }
            }
            function ontouchend(e) {
                e.preventDefault();
                resizer.removeEventListener("touchmove", ontouchmove);
                resizer.removeEventListener("touchend", ontouchend);
                delete e._clientX;
            }
    
            // for desktop
            function onmousedown(e) {
                e.preventDefault();
                document.addEventListener("mousemove", onmousemove);
                document.addEventListener("mouseup", onmouseup);
            }
            function onmousemove(e) {
                let block = $('.resizable-block')[0].getBoundingClientRect();
                e.preventDefault();
                if (e.clientX > block.left && e.clientX < block.left + block.width) {
                    const clientX = e.clientX;
                    const deltaX = clientX - (resizer._clientX || clientX);
                    resizer._clientX = clientX;
                    const l = resizer.previousElementSibling;
                    const r = resizer.nextElementSibling;
                    // LEFT
                    if (deltaX < 0) {
                        const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
                        l.style.flex = `0 ${w < 10 ? 0 : w}px`;
                        r.style.flex = "1 0";
                    }
                    // RIGHT
                    if (deltaX > 0) {
                        const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
                        r.style.flex = `0 ${w < 10 ? 0 : w}px`;
                        l.style.flex = "1 0";
                    }
                }
            }
            function onmouseup(e) {
                e.preventDefault();
                document.removeEventListener("mousemove", onmousemove);
                document.removeEventListener("mouseup", onmouseup);
                delete e._clientX;
            }
        })();
    })();
}

$(document).ready(function () {
    $('.solution__form_submit').click(function (e) {
        e.preventDefault();

        for (let i = 1; i <= 4; i++) {
            if (i != 4) {
                let time = 100 * i;
                setTimeout(() => {
                    $($('.solution__loading .spinner-grow')[i-1]).removeClass('d-none')
                }, time);
            }
            $('.solution__loading').removeClass('d-none').addClass('d-flex');
        }



        setTimeout(() => {
            $('.solution__loading').removeClass('d-flex').addClass('d-none')
            $('.solution__result').removeClass('d-none')
            $('.solution__loading .spinner-grow').removeClass('d-flex').addClass('d-none')
        }, 4000);
    })

    $('.main_accordion').each(function (idx, el) {
        // $(el).find('.main_accordion__head').click(function () {
        //     $(el).find('.main_accordion__body').slideToggle(300)
        // })
        $(el).find('.main_accordion__head')[0].addEventListener('click', function (e) {
            if (e.target != $(el).find('.main_accordion__head .text')[0]) {
                $(el).find('.main_accordion__body').slideToggle(300);
                $(el).toggleClass('active')
            }
        })
    })

    $('.overflo_x_scroll').each(function (idx, el) {
        let mouseDown = false;
        let startX, scrollLeft;
        const slider = el;
        
        if (slider) {
            const startDragging = (e) => {
                mouseDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            }
            
            const stopDragging = (e) => {
                mouseDown = false;
            }
            
            const move = (e) => {
                e.preventDefault();
                if (!mouseDown) { return; }
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            }
            
            // Add the event listeners
            slider.addEventListener('mousemove', move, false);
            slider.addEventListener('mousedown', startDragging, false);
            slider.addEventListener('mouseup', stopDragging, false);
            slider.addEventListener('mouseleave', stopDragging, false);
        }
    })

    let certificates_img = document.querySelectorAll('.table_structure img');
    if (certificates_img.length) {
        certificates_img.forEach((img, idx) => {
            img.onclick = () => {
                let src = [];
                certificates_img.forEach(item => {
                    src.push({
                        'src': item.getAttribute('src'),
                        'thumb': item.getAttribute('src'),
                        'subHtml': ''
                    });
                })
                $('#lightgallery').remove();
                const galleryContainer = document.createElement('div');
                galleryContainer.id = 'lightgallery';
                document.body.appendChild(galleryContainer);
                lightGallery(galleryContainer, {
                    dynamic: true,
                    dynamicEl: src,
                    index: idx
                });
            }
        })
    }

    $('.date-picker').datepicker();
})