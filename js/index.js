// GSAP Init & Defaults
gsap.defaults({
    duration: 1.75,
    ease: "power2.inOut",
});

let swiper = new Swiper(".swiper", {
    initialSlide: 1,
    effect: "cube",
    grabCursor: true,
    edgeSwipeThreshold: 5,
    cubeEffect: {
        shadow: true,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.84,
    },
});

const masterTimeline = gsap.timeline({
    paused: true,
});

const loader = document.getElementById("loader");
const portrait = document.getElementById("portrait");
const landscape = document.getElementById("landscape");
const iconContainer_l = document.getElementById("iconContainer_l");
const icon_l = document.getElementById("icon_l");
const iconContainer_p = document.getElementById("iconContainer_p");
const icon_p = document.getElementById("icon_p");
const iconFixed_p = document.getElementById("iconFixedContainer_p");
const contact_p = document.getElementById("contact_p");

const face = document.querySelectorAll(".face");
const leftContainer = document.querySelectorAll(".leftContainer");
const rightContainer = document.querySelectorAll(".rightContainer");
const leftTop = document.querySelectorAll(".leftTop");
const rightTop = document.querySelectorAll(".rightTop");
const leftBottom = document.querySelectorAll(".leftBottom");
const rightBottom = document.querySelectorAll(".rightBottom");

// Media Query & Listener
const mq = window.matchMedia("screen and (orientation: landscape)");

// Initialise
animateBox(mq);

function animateBox(mq) {
    if (mq.matches) {
        // Landscape
        masterTimeline.add(landscapeStartProps());
        masterTimeline.add(landscapeScale());
        masterTimeline.add(landscapeForward());
        masterTimeline.add(landscapeIn(), "-=0.25");
        gsap.to(icon_l, {
            scale: 1,
            duration: 1,
            delay: 3.75,
        });
        masterTimeline.play();
        masterTimeline.add(landscapeEndProps());
    } else {
        // Portrait
        masterTimeline.add(portraitStartProps());
        masterTimeline.add(portraitScale());
        masterTimeline.add(portraitForward());
        masterTimeline.add(portraitIn(), "-=0.25");
        gsap.to(icon_p, {
            scale: 1,
            duration: 1,
            delay: 4,
        });
        masterTimeline.play();
        masterTimeline.add(portraitEndProps());
    }
}

// On Resize
try {
    // Chrome, Firefox & Safari 14<
    mq.addEventListener("change", (e) => {
        if (masterTimeline.progress() < 1) {
            animateBox(mq);
        }
        if (mq.matches) {
            masterTimeline.seek(0).clear();
            masterTimeline.add(landscapeEndProps());
        } else {
            masterTimeline.seek(0).clear();
            masterTimeline.add(portraitEndProps());
        }
    });
} catch (e1) {
    try {
        // Safari >13
        mq.addListener((e) => {
            if (masterTimeline.progress() < 1) {
                animateBox(mq);
            }
            if (mq.matches) {
                masterTimeline.seek(0).clear();
                masterTimeline.add(landscapeEndProps());
            } else {
                masterTimeline.seek(0).clear();
                masterTimeline.add(portraitEndProps());
            }
        });
    } catch (e2) {
        console.error(e2);
    }
}

// On swipe
swiper.on("sliderMove", function () {
    gsap.to(iconContainer_p, {
        autoAlpha: 0,
        duration: 0.5,
    });
});

swiper.on("transitionEnd", function () {
    if (swiper.activeIndex === 1) {
        gsap.to(iconContainer_p, {
            autoAlpha: 1,
            duration: 0.5,
        });
    } else if (swiper.activeIndex === 0 || swiper.activeIndex === 2) {
        gsap.set(iconContainer_p, {
            autoAlpha: 0,
        });
    }
});

swiper.on("slideChangeTransitionStart", function () {
    if (swiper.activeIndex === 0 || swiper.activeIndex === 2) {
        gsap.to(iconContainer_p, {
            autoAlpha: 0,
            duration: 0.5,
        });
    }
});

// Detect swipe
portrait.addEventListener("touchstart", startTouch, false);
portrait.addEventListener("touchmove", moveTouch, false);

let initialX = null;
let initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (initialX === null) {
        return;
    }
    if (initialY === null) {
        return;
    }
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
        } else {
        }
    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            swiper.slideNext(1000);
        } else {
            // swiped down
            swiper.slidePrev(1000);
        }
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
}

/**
 ***********************************************
 * Icon
 ***********************************************
 **/

const open_l = document.getElementById("open_l");
const closed_l = document.getElementById("closed_l");

function animateLandscape() {
    if (mq.matches) {
        // Check if main animation is not in progress
        if (masterTimeline.progress() === 0 || masterTimeline.progress() === 1) {
            if (isVisible(landscape)) {
                open_l.style.visibility = "visible";
                closed_l.style.visibility = "hidden";
                // Check if panels are down, unflip before starting animation
                if (structuringFlip.progress() === 1) {
                    structuringFlip.reverse();
                    structuringHover.reverse();
                    setTimeout(function () {
                        masterTimeline.seek(0).clear();
                        masterTimeline.add(landscapeEndProps());
                        masterTimeline.add(landscapeOut());
                        masterTimeline.add(landscapeBackward(), "-=0.2");
                        masterTimeline.play();
                    }, 1000);
                } else if (designingFlip.progress() === 1) {
                    designingFlip.reverse();
                    designingHover.reverse();
                    setTimeout(function () {
                        masterTimeline.seek(0).clear();
                        masterTimeline.add(landscapeEndProps());
                        masterTimeline.add(landscapeOut());
                        masterTimeline.add(landscapeBackward(), "-=0.2");
                        masterTimeline.play();
                    }, 1000);
                    // If no panels down, start animation
                } else {
                    masterTimeline.seek(0).clear();
                    masterTimeline.add(landscapeEndProps());
                    masterTimeline.add(landscapeOut());
                    masterTimeline.add(landscapeBackward(), "-=0.2");
                    masterTimeline.play();
                }
            } else {
                open_l.style.visibility = "hidden";
                closed_l.style.visibility = "visible";
                masterTimeline.seek(0).clear();
                masterTimeline.add(landscapeStartProps());
                masterTimeline.add(landscapeForward());
                masterTimeline.add(landscapeIn(), "-=0.2");
                masterTimeline.play();
                masterTimeline.add(landscapeEndProps());
            }
        }
    }
}

const open_p = document.getElementById("open_p");
const closed_p = document.getElementById("closed_p");

function animatePortrait() {
    if (!mq.matches) {
        // Check if main animation is not in progress
        if (masterTimeline.progress() === 0 || masterTimeline.progress() === 1) {
            if (isVisible(portrait)) {
                open_p.style.visibility = "visible";
                closed_p.style.visibility = "hidden";
                masterTimeline.seek(0).clear();
                masterTimeline.add(portraitEndProps());
                masterTimeline.add(portraitOut());
                masterTimeline.add(portraitBackward(), "-=0.25");
                masterTimeline.play();
            } else {
                open_p.style.visibility = "hidden";
                closed_p.style.visibility = "visible";
                masterTimeline.seek(0).clear();
                masterTimeline.add(portraitStartProps());
                masterTimeline.add(portraitForward());
                masterTimeline.add(portraitIn(), "-=0.25");
                masterTimeline.play();
                masterTimeline.add(portraitEndProps());
            }
        }
    }
}

function animateCube() {
    if (mq.matches) {
        animateLandscape();
    } else {
        animatePortrait();
    }
}

function isVisible(el) {
    const element = window.getComputedStyle(el);
    if (element.display !== "none" && element.opacity === "1") {
        return true;
    }
}

/**
 ***********************************************
 * Landscape
 ***********************************************
 **/

function landscapeScale() {
    const timeline = gsap.timeline();
    timeline.from(loader, {
        duration: 1,
        scale: 0.75,
        autoAlpha: 0,
    });
}

function landscapeIconScale() {
    const timeline = gsap.timeline();
    timeline.to("#icon_l", {
        scale: 1,
        duration: 2,
    });
}

function landscapeStartProps() {
    const timeline = gsap.timeline();
    timeline.set("#loader, .leftContainer, .rightContainer, .face, .rightTop, .leftTop", {
        clearProps: "all",
    });
    timeline.set(landscape, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(portrait, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(loader, {
        autoAlpha: 1,
        zIndex: 2,
        display: "flex",
    });
    timeline.set(iconContainer_l, {
        autoAlpha: 1,
        display: "block",
    });
    timeline.set(iconContainer_p, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(leftContainer, {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        "--rotX": "-25deg",
        "--rotY": "-45deg",
    });
    timeline.set(rightContainer, {
        alignItems: "flex-end",
        justifyContent: "flex-start",
        "--rotX": "-25deg",
        "--rotY": "45deg",
    });
    timeline.set(face, {
        width: "50vh",
        height: "50vh",
    });
    timeline.set(leftTop, {
        "--rotX": "90deg",
        "--offsetY": "0",
        "--offsetZ": "0",
    });
    timeline.set(rightTop, {
        "--rotX": "90deg",
        "--offsetY": "-0.1px",
    });
    return timeline;
}

function landscapeEndProps() {
    const timeline = gsap.timeline();
    timeline.set("#loader, .leftContainer, .rightContainer, .face, .rightTop, .leftTop", {
        clearProps: "all",
    });
    timeline.set(landscape, {
        autoAlpha: 1,
        display: "flex",
    });
    timeline.set(portrait, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(loader, {
        autoAlpha: 0,
        zIndex: 0,
        display: "none",
    });
    timeline.set(iconContainer_l, {
        autoAlpha: 1,
        display: "block",
    });
    timeline.set(iconContainer_p, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(icon_l, {
        scale: 1,
    });
    timeline.set(leftContainer, {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        "--rotX": "0deg",
        "--rotY": "0deg",
    });
    timeline.set(rightContainer, {
        alignItems: "flex-end",
        justifyContent: "flex-start",
        "--rotX": "0deg",
        "--rotY": "0deg",
    });
    timeline.set(face, {
        width: "50vw",
        height: "50vh",
    });
    timeline.set(leftTop, {
        "--rotX": "0deg",
        "--offsetY": "0",
        "--offsetZ": "0",
    });
    timeline.set(rightTop, {
        "--rotX": "0deg",
        "--offsetY": "0",
    });
    return timeline;
}

function landscapeIn() {
    const timeline = gsap.timeline();
    timeline.to(landscape, {
        autoAlpha: 1,
        display: "flex",
        duration: 0.5,
    });
    timeline.to(
        loader,
        {
            autoAlpha: 0,
            display: "none",
            duration: 0.25,
        },
        "-=0.25"
    );
    return timeline;
}

function landscapeOut() {
    const timeline = gsap.timeline();
    timeline.to(loader, {
        autoAlpha: 1,
        display: "flex",
        duration: 0.5,
    });
    timeline.to(
        landscape,
        {
            autoAlpha: 0,
            display: "none",
            duration: 0.25,
        },
        "-=0.25"
    );
    return timeline;
}

function landscapeForward() {
    const timeline = gsap.timeline();
    timeline.set(loader, {
        zIndex: 0,
    });
    timeline.to(
        rightTop,
        {
            "--rotX": "0deg",
            "--offsetY": "0vh",
        },
        "-=0.5"
    );
    timeline.to(
        leftTop,
        {
            "--rotX": "0deg",
            "--offsetY": "0px",
            "--offsetZ": "0vh",
        },
        "-=0.5"
    );
    timeline.to(
        ".leftContainer, .rightContainer",
        {
            "--rotX": "0deg",
            "--rotY": "0deg",
        },
        "-=0.5"
    );
    timeline.to(
        face,
        {
            width: "50vw",
            height: "50vh",
        },
        "<"
    );
    return timeline;
}

function landscapeBackward() {
    const timeline = gsap.timeline();
    timeline.to(face, {
        width: "50vh",
        height: "50vh",
    });
    timeline.to(
        leftContainer,
        {
            "--rotX": "-25deg",
            "--rotY": "-45deg",
        },
        "<"
    );
    timeline.to(
        rightContainer,
        {
            "--rotX": "-25deg",
            "--rotY": "45deg",
        },
        "<"
    );
    timeline.to(
        leftTop,
        {
            "--rotX": "90deg",
            "--offsetY": "0",
            "--offsetZ": "0",
        },
        "-=0.5"
    );
    timeline.to(
        rightTop,
        {
            "--rotX": "90deg",
            "--offsetY": "-0.1vh",
        },
        "-=0.5"
    );
    return timeline;
}

/**
 ***********************************************
 * Portrait
 ***********************************************
 **/

function portraitScale() {
    const timeline = gsap.timeline();
    timeline.from(loader, {
        duration: 1,
        scale: 0.85,
        autoAlpha: 0,
    });
}

function portraitIconScale() {
    const timeline = gsap.timeline();
    timeline.to("#icon_p", {
        scale: 1,
    });
}

function portraitIn() {
    const timeline = gsap.timeline();
    timeline.to(contact_p, {
        autoAlpha: 1,
        duration: 1,
    });
    timeline.to(
        portrait,
        {
            autoAlpha: 1,
            display: "flex",
            duration: 1,
        },
        "<"
    );
    timeline.to(loader, {
        autoAlpha: 0,
        display: "none",
        duration: 0.5,
    });
    return timeline;
}

function portraitOut() {
    const timeline = gsap.timeline();
    timeline.to(loader, {
        autoAlpha: 1,
        display: "flex",
        duration: 0.5,
    });
    timeline.to(
        portrait,
        {
            autoAlpha: 0,
            display: "none",
            duration: 0.25,
        },
        "-=0.25"
    );
    timeline.to(
        contact_p,
        {
            autoAlpha: 0,
            duration: 0.25,
        },
        "<"
    );
    return timeline;
}

function portraitStartProps() {
    const timeline = gsap.timeline();
    timeline.set("#loader, .leftContainer, .rightContainer, .face, .rightTop, .leftTop", {
        clearProps: "all",
    });
    timeline.set(landscape, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(portrait, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(loader, {
        autoAlpha: 1,
        zIndex: 2,
        display: "flex",
    });
    timeline.set(iconContainer_l, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(iconContainer_p, {
        autoAlpha: 1,
        display: "block",
    });
    timeline.set(contact_p, {
        autoAlpha: 0,
    });
    timeline.set(leftContainer, {
        alignItems: "center",
        justifyContent: "flex-end",
        "--rotX": "-35deg",
        "--rotY": "-45deg",
        "--transX": "0vw",
    });
    timeline.set(rightContainer, {
        alignItems: "center",
        justifyContent: "flex-end",
        "--rotX": "-35deg",
        "--rotY": "45deg",
        "--transX": "0vw",
    });
    timeline.set(face, {
        height: "50vw",
        width: "50vw",
    });
    timeline.set(leftTop, {
        "--rotX": "90deg",
        "--offsetX": "0vh",
        "--offsetY": "0vh",
        "--offsetZ": "0",
    });
    timeline.set(leftBottom, {
        "--offsetX": "0vw",
    });
    timeline.set(rightTop, {
        "--rotX": "90deg",
        "--offsetX": "0vh",
        "--offsetY": "-0.1vh",
        "--offsetZ": "0vh",
    });
    timeline.set(rightBottom, {
        "--offsetX": "0vh",
    });
    return timeline;
}

function portraitEndProps() {
    const timeline = gsap.timeline();
    timeline.set("#loader, .leftContainer, .rightContainer, .face, .rightTop, .leftTop", {
        clearProps: "all",
    });
    timeline.set(landscape, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(portrait, {
        autoAlpha: 1,
        display: "flex",
    });
    timeline.set(loader, {
        autoAlpha: 0,
        zIndex: 0,
        display: "none",
    });
    timeline.set(iconContainer_l, {
        autoAlpha: 0,
        display: "none",
    });
    timeline.set(iconContainer_p, {
        autoAlpha: 1,
        display: "block",
    });
    timeline.set(contact_p, {
        autoAlpha: 1,
    });
    timeline.set(icon_p, {
        scale: 1,
    });
    timeline.set(leftContainer, {
        alignItems: "center",
        justifyContent: "flex-end",
        "--rotX": "0deg",
        "--rotY": "0deg",
        "--transX": "25vw",
    });
    timeline.set(rightContainer, {
        alignItems: "center",
        justifyContent: "flex-end",
        "--rotX": "0deg",
        "--rotY": "90deg",
        "--transX": "25vw",
    });
    timeline.set(face, {
        height: () => {
            return window.innerHeight / 2;
        },
        width: "100vw",
    });
    timeline.set(leftTop, {
        "--rotX": "0deg",
        "--offsetX": "25vw",
        "--offsetY": "0vh",
        "--offsetZ": "0vw",
    });
    timeline.set(leftBottom, {
        "--offsetX": "25vw",
    });
    timeline.set(rightTop, {
        "--rotX": "0deg",
        "--offsetX": "25vh",
        "--offsetY": "0vh",
        "--offsetZ": "25vw",
    });
    timeline.set(rightBottom, {
        "--offsetX": "25vh",
        "--offsetZ": "25vw",
    });
    return timeline;
}

function portraitForward() {
    const timeline = gsap.timeline({
        onComplete: function () {
            swiper.update();
        },
    });
    timeline.set(loader, {
        zIndex: 0,
    });
    timeline.to(rightTop, {
        "--rotX": "0deg",
        "--offsetX": "0vh",
        "--offsetY": "0vh",
        "--offsetZ": "0vh",
    });
    timeline.to(
        leftTop,
        {
            "--rotX": "0deg",
            "--offsetX": "0vh",
            "--offsetY": "0.1vh",
            "--offsetZ": "0vh",
        },
        "-=0.5"
    );
    timeline.to(
        leftContainer,
        {
            duration: 4.5,
            "--rotX": "0deg",
            "--rotY": "0deg",
            "--transX": "25vw",
        },
        0
    );
    timeline.to(
        rightContainer,
        {
            duration: 4.5,
            "--rotX": "0deg",
            "--rotY": "90deg",
            "--transX": "25vw",
        },
        0
    );
    timeline.to(
        face,
        {
            duration: 1.5,
            height: () => {
                return window.innerHeight / 2;
            },
            width: "100vw",
        },
        "-=1.5"
    );
    timeline.to(
        leftTop,
        {
            duration: 1.5,
            "--offsetX": "25vw",
        },
        "<"
    );
    timeline.to(
        leftBottom,
        {
            duration: 1.5,
            "--offsetX": "25vw",
        },
        "<"
    );
    timeline.to(
        rightTop,
        {
            duration: 1.5,
            "--rotX": "0deg",
            "--offsetX": "25vh",
            "--offsetY": "0vh",
            "--offsetZ": "25vw",
        },
        "<"
    );
    timeline.to(
        rightBottom,
        {
            duration: 1.5,
            "--offsetX": "25vh",
            "--offsetZ": "25vw",
        },
        "<"
    );
    return timeline;
}

function portraitBackward() {
    const timeline = gsap.timeline();
    timeline.to(rightBottom, {
        duration: 1.5,
        "--offsetX": "0vh",
        "--offsetZ": "0vw",
    });
    timeline.to(
        rightTop,
        {
            duration: 1.5,
            "--rotX": "0deg",
            "--offsetX": "0vh",
            "--offsetY": "0vh",
            "--offsetZ": "0vw",
        },
        "<"
    );
    timeline.to(
        leftBottom,
        {
            duration: 1.5,
            "--offsetX": "0vw",
        },
        "<"
    );
    timeline.to(
        leftTop,
        {
            duration: 1.5,
            "--offsetX": "0vw",
        },
        "<"
    );
    timeline.to(
        face,
        {
            duration: 1.5,
            height: "50vw",
            width: "50vw",
        },
        "<"
    );
    timeline.to(
        rightContainer,
        {
            duration: 4.5,
            "--rotX": "-35deg",
            "--rotY": "45deg",
            "--transX": "0vw",
        },
        "-=1.5"
    );
    timeline.to(
        leftContainer,
        {
            duration: 4.5,
            "--rotX": "-35deg",
            "--rotY": "-45deg",
            "--transX": "0vw",
        },
        "<"
    );
    timeline.to(
        leftTop,
        {
            "--rotX": "90deg",
            "--offsetX": "0vh",
            "--offsetY": "0vh",
            "--offsetZ": "0",
        },
        "-=1.5"
    );
    timeline.to(
        rightTop,
        {
            "--rotX": "90deg",
            "--offsetX": "0vh",
            "--offsetY": "-0.1vh",
            "--offsetZ": "0vh",
        },
        "-=0.5"
    );
    return timeline;
}

/**
 ***********************************************
 * Panels etc.
 ***********************************************
 **/

// Underlines & Buttons
const designingUnderlineP_l = document.querySelectorAll(".designingUnderlineP_l");
const designingUnderline_l = document.querySelectorAll(".designingUnderline_l");
const structuringUnderlineP_l = document.querySelectorAll(".structuringUnderlineP_l");
const structuringUnderline_l = document.querySelectorAll(".structuringUnderline_l");
const aboutUnderlineP_l = document.querySelectorAll(".aboutUnderlineP_l");
const aboutUnderline_l = document.querySelectorAll(".aboutUnderline_l");

// Triggers Landscape
const designingTrigger_l = document.querySelectorAll(".designingTrigger_l");
const structuringTrigger_l = document.querySelectorAll(".structuringTrigger_l");
const aboutTrigger_l = document.querySelectorAll(".aboutTrigger_l");

// Triggers Portrait
const designingTrigger_p = document.querySelectorAll(".designingTrigger_p");
const structuringTrigger_p = document.querySelectorAll(".structuringTrigger_p");
const aboutTrigger_p = document.querySelectorAll(".aboutTrigger_p");
const techTrigger_p = document.querySelectorAll(".techTrigger_p");

// Panels Landscape
const designingPanel_l = document.getElementById("designingPanel_l");
const structuringPanel_l = document.getElementById("structuringPanel_l");
const iconPanel_l = document.getElementById("iconPanel_l");
const left_l = document.getElementById("left_l");
const right_l = document.getElementById("right_l");
const aboutPanel_l = document.getElementById("aboutPanel_l");
const designingFront_l = document.getElementById("designingFront_l");
const structuringFront_l = document.getElementById("structuringFront_l");

// Panels Portrait
const techPanel_p = document.getElementById("techPanel_p");

// Timelines
const techFlip = gsap.timeline({
    paused: true,
});
const designingFlip = gsap.timeline({
    paused: true,
});
const designingHover = gsap.timeline({
    paused: true,
});
const structuringFlip = gsap.timeline({
    paused: true,
});
const structuringHover = gsap.timeline({
    paused: true,
});
const aboutFlip = gsap.timeline({
    paused: true,
});
const aboutHover = gsap.timeline({
    paused: true,
});

/**
 * Design Panel Animations
 */
designingFlip.to(designingPanel_l, {
    rotateX: "-180deg",
    zIndex: "99",
    duration: 1.25,
});
designingFlip.to(
    structuringPanel_l,
    {
        zIndex: "-99",
        autoAlpha: 0,
        duration: 0.25,
    },
    "-=0.25"
);
// Hover
designingHover.to(designingUnderlineP_l, {
    color: "white",
    duration: 0.3,
    ease: "power1",
});
designingHover.to(
    designingUnderline_l,
    {
        height: "100%",
        duration: 0.3,
        ease: "power1",
    },
    "<"
);
designingHover.to(
    designingFront_l,
    {
        backgroundColor: "blue",
        color: "white",
        duration: 0.3,
        ease: "power1",
    },
    "<"
);

designingTrigger_l.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        if (structuringFlip.progress() > 0) {
            structuringFlip.reverse();
            structuringHover.reverse();
            designingHover.play();
            setTimeout(function () {
                designingFlip.play();
            }, 500);
        } else {
            if (designingFlip.progress() === 0) {
                designingFlip.play();
                designingHover.play();
            }
            if (designingFlip.progress() === 1) {
                designingFlip.reverse();
                designingHover.reverse();
            }
        }
    });
    trigger.addEventListener("mouseenter", () => {
        if (designingFlip.progress() === 0) {
            designingHover.play();
        }
    });
    trigger.addEventListener("mouseleave", () => {
        if (
            (designingFlip.progress() === 0 && structuringFlip.progress() === 0) ||
            (designingFlip.progress() === 0 && structuringFlip.progress() === 1)
        ) {
            designingHover.reverse();
        }
    });
});

/**
 * Structuring Panel Animations
 */
structuringFlip.to(structuringPanel_l, {
    rotateX: "180deg",
    zIndex: "99",
    duration: 1.25,
});
structuringFlip.to(
    designingPanel_l,
    {
        zIndex: "-99",
        autoAlpha: 0,
        duration: 0.25,
    },
    "-=0.25"
);
// Hover
structuringHover.to(structuringUnderlineP_l, {
    color: "white",
    duration: 0.3,
    ease: "power1",
});
structuringHover.to(
    structuringUnderline_l,
    {
        height: "100%",
        duration: 0.3,
        ease: "power1",
    },
    "<"
);
structuringHover.to(
    structuringFront_l,
    {
        backgroundColor: "blue",
        color: "white",
        duration: 0.3,
        ease: "power1",
    },
    "<"
);

structuringTrigger_l.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        if (designingFlip.progress() > 0) {
            designingFlip.reverse();
            designingHover.reverse();
            structuringHover.play();
            setTimeout(function () {
                structuringFlip.play();
            }, 500);
        } else {
            if (structuringFlip.progress() === 0) {
                structuringFlip.play();
                structuringHover.play();
            }
            if (structuringFlip.progress() === 1) {
                structuringFlip.reverse();
                structuringHover.reverse();
            }
        }
    });
    trigger.addEventListener("mouseenter", () => {
        if (structuringFlip.progress() === 0) {
            structuringHover.play();
        }
    });
    trigger.addEventListener("mouseleave", () => {
        if (
            (structuringFlip.progress() === 0 && designingFlip.progress() === 0) ||
            (structuringFlip.progress() === 0 && designingFlip.progress() === 1)
        ) {
            structuringHover.reverse();
        }
    });
});

/**
 * About Panel Animations
 */
aboutFlip.set(left_l, {
    zIndex: "99",
});
aboutFlip.set(iconPanel_l, {
    z: "1",
});
aboutFlip.to(aboutPanel_l, {
    rotateY: "180deg",
    duration: 1.25,
});
aboutFlip.to(
    iconPanel_l,
    {
        rotateY: "180deg",
        duration: 1.25,
    },
    "<"
);
aboutFlip.to(
    icon_l,
    {
        autoAlpha: 0,
        duration: 0.25,
    },
    "=-0.5"
);
aboutFlip.to(
    designingPanel_l,
    {
        autoAlpha: 0,
        zIndex: "-99",
        duration: 0.25,
    },
    "<"
);
aboutFlip.to(
    structuringPanel_l,
    {
        autoAlpha: 0,
        zIndex: "-99",
        duration: 0.25,
    },
    "<"
);

// Hover
aboutHover.to(aboutUnderlineP_l, {
    color: "white",
    duration: 0.3,
    ease: "power1",
});
aboutHover.to(
    aboutUnderline_l,
    {
        height: "100%",
        duration: 0.3,
        ease: "power1",
    },
    "<"
);

aboutTrigger_l.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        if (aboutFlip.progress() === 0) {
            aboutFlip.play();
            aboutHover.play();
        }
        if (aboutFlip.progress() === 1) {
            aboutFlip.reverse();
            aboutHover.reverse();
        }
    });
    trigger.addEventListener("mouseenter", () => {
        if (aboutFlip.progress() === 0) {
            aboutHover.play();
        }
    });
    trigger.addEventListener("mouseleave", () => {
        if (aboutFlip.progress() === 0) {
            aboutHover.reverse();
        }
    });
});

/**
 * Portrait Panel Animations
 */

techFlip.set(techPanel_p, {
    autoAlpha: 1,
});
techFlip.to(
    techPanel_p,
    {
        rotateY: "0deg",
        duration: 2,
    },
    "<"
);

designingTrigger_p.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        swiper.slideTo(0, 1000);
    });
});
structuringTrigger_p.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        swiper.slideTo(2, 1000);
    });
});
aboutTrigger_p.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        swiper.slideTo(1, 1000);
    });
});
techTrigger_p.forEach(function (trigger) {
    trigger.addEventListener("click", () => {
        if (techFlip.progress() === 0) {
            techFlip.play();
        }
        if (techFlip.progress() === 1) {
            techFlip.reverse();
        }
    });
});
