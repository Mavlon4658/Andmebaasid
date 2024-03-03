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
                e.preventDefault();
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

    $('.main_accordion').each(function (idx, el) {
        $(el).find('.main_accordion__head').click(function () {
            $(el).find('.main_accordion__body').slideToggle(300)
        })
    })

    let mouseDown = false;
    let startX, scrollLeft;
    const slider = document.querySelector('.overflo_x_scroll');
    
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