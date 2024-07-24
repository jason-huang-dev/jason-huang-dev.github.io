/*
  Animated Responsive Site - Scroll Animation Code
  Source: https://github.com/Maclinz/animated_responsive_site
  Author: Maclinz (https://github.com/Maclinz)

  The following code is part of the Animated Responsive Site project by Maclinz.
  It has been adapted for use in this project with proper attribution.

  Original License: N/A
*/

const pageOverlay = document.querySelector('.page-overlay')
const navItems = document.querySelectorAll('.nav-item');
const headerContent = document.querySelector('.header-content');
const mouse = document.querySelector('.mouse');
const sections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const navigation = document.querySelector('.navigation');

document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
})

function openModal(message) {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('modalMessage').innerText = message;
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function submitForm() {
    document.getElementById('contactForm').submit();
    //window.alert("Form successfully submitted!");
    // Display a success message using the modal
    openModal('Form successfully submitted!');
}

//controller
const controller = new ScrollMagic.Controller()

//timeline
const tl = gsap.timeline({defaults: {duration: 1}})


tl.fromTo(pageOverlay, {x: 0}, {x: '100%'})
    .fromTo(header, {opacity: 0, y: -60}, {opacity: 1, y: 0}, '-=1')
    .fromTo(navigation, {opacity: 0, y: -60}, {opacity: 1, y: 0}, '-=1')
    .fromTo(navItems, {opacity: 0, y: -60}, {opacity: 1, y: 0, stagger: 0.10}, '-=1.3')
    .fromTo(headerContent, {opacity: 0, y: -60}, {opacity: 1, y: 0}, '-=1.3')
    .fromTo(mouse, {opacity: 0}, {opacity: 1})

const scrollAnimations = () =>{
    sections.forEach((section) => {
        const tl = gsap.timeline({defaults: {duration: 1}})
        tl.fromTo(section, {opacity: 0, y: -50, scale: 0}, {opacity: 1, y:0, scale: 1})

        //scroll magci scene
        let scene = new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 1,
            reverse: false
        })
        .setTween(tl)
        //.addIndicators({colorStart: 'white', colorTrigger: 'white'})
        .addTo(controller)
    })
}

scrollAnimations()
