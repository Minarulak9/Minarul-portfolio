//selectors 
const headerImg = document.querySelector('header .header-img');
const header = document.querySelector('header');
const nav = document.querySelector('#nav');
const mobileNav = document.querySelector('.links');
const mobileNavLines = document.querySelector('.lines');

const sectionUser = document.querySelector('#User');
const userBox = document.querySelector('.box');
const contactUs = document.querySelector('#contact');

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const btnSubmit = document.querySelector('.submit');
const fullName = document.querySelector('.full-name');

const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
const controls = document.querySelector('.controls');
const sliderContainer = document.querySelector('.slider-con');
const rightArrow = document.querySelector('.btn-right');
const leftArrow = document.querySelector('.btn-left');
const subRightArrow = document.querySelector('.sub-right-btn');
const subLeftArrow = document.querySelector('.sub-left-btn');
const schoolImg = document.querySelector('.school-img');
const btnTop = document.querySelector('.go-top');


const pages = document.querySelectorAll('.page');

btnTop.addEventListener('click',(e)=>{
    header.scrollIntoView()
    e.target.classList.remove('go-top-active')
})


btnSubmit.addEventListener("click",(e)=>{
    if (firstName.value!=='' && lastName.value!=='') {
        fullName.innerHTML = `<h2>Hi, <span style="color:orange;">${firstName.value}</span> I wish for your succsess. I am minarul thank you for visiting 😘👋</h2>`
        e.target.parentElement.querySelector('.submit').remove()
    }else{
        firstName.focus()
    }
})


// sticky nav
const stickyNav = (entries)=>{
    entries.forEach(res=>{
        res.isIntersecting?nav.classList.remove('active-nav'):nav.classList.add('active-nav')
    })
}
let navHeight = nav.getBoundingClientRect().height
let sectionUserObserver = new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0
    // rootMargin:`-${navHeight}px`
})
sectionUserObserver.observe(header)

const boxAnimation = (entries) =>{
    entries.forEach(entrie=>{
        if (entrie.isIntersecting && entrie.intersectionRatio == 1) {
            entrie.target.classList.remove('animation')
            userObserver.disconnect()
        }
    })
}

let userObserver = new IntersectionObserver(boxAnimation,{
    root:null,
    threshold:1
})
userObserver.observe(userBox)
// slider
slides.forEach((slide, index)=>{
    dots.insertAdjacentHTML('beforeend',`<span class='dot' data-slide=${index}>●</span>`)
})
let allDots = dots.querySelectorAll('.dot');

slides.forEach((slide,index) =>{
    slide.style.transform = `translateX(${index*100}%)`
})
let currentSlide = 0;
const goSlide = (slideIndex) =>{
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`
    })
    allDots.forEach(d=>{
        d.classList.remove('active-dot')
    })
    dots.querySelector(`span[data-slide='${slideIndex}']`).classList.add('active-dot');
    slideIndex<slides.length-1?slides[+slideIndex+1].style.transform=`translateX(100%) scale(.1)`:null;
}
goSlide(1)
dots.addEventListener('click',(e)=>{
    if (e.target.hasAttribute('data-slide')) {
        goSlide(e.target.dataset.slide)
    }
})

rightArrow.addEventListener('click',(e)=>{
    currentSlide < slides.length-1? currentSlide++ : currentSlide = 0;
    goSlide(currentSlide)
})
leftArrow.addEventListener('click',(e)=>{
    currentSlide > 0 ? currentSlide-- : currentSlide = slides.length-1;
    goSlide(currentSlide)
})

// school image sliding..
let currentSchoolImg = 0;
subRightArrow.addEventListener('click',()=>{
    currentSchoolImg<8?currentSchoolImg++:currentSchoolImg=0;
    schoolImg.src=`./img/school${currentSchoolImg}.jpg`
    schoolImg.style.filter = 'blur(3px)'
    setTimeout(() => {
        schoolImg.style.filter = 'blur(0)'
    }, 300);
})
subLeftArrow.addEventListener('click',()=>{
    currentSchoolImg>0?currentSchoolImg--:currentSchoolImg=8;
    schoolImg.src=`./img/school${currentSchoolImg}.jpg`
    console.log('mak');
    schoolImg.style.filter = 'blur(3px)'
    setTimeout(() => {
        schoolImg.style.filter = 'blur(0)'
    }, 300);
})


const slideFade = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            goSlide(currentSlide)
            // slideObserver.disconnect()
            btnTop.classList.add('go-top-active')
        }
    })
} 
let slideObserver = new IntersectionObserver(slideFade,{
    root:null,
    threshold:.5,
})
slideObserver.observe(sliderContainer);
const containerFade = (entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting) {
            e.target.classList.remove('fadeContainer')
            containerObserver.disconnect()
        }
    })
}


// mobile nav
mobileNavLines.addEventListener("click",()=>{
    mobileNav.classList.toggle('active')
})
let links = mobileNav.querySelectorAll('.link');
mobileNav.addEventListener("click",(e)=>{
    if (e.target.hasAttribute('href')) {
        links.forEach(link=>{
            link.classList.remove('active')
        })
        mobileNav.classList.remove('active')
       e.target.classList.add('active')
    }

})

// page activation 

const pageActive = (entries)=>{
    entries.forEach(entrie=>{
        if(entrie.isIntersecting){
            let links = mobileNav.querySelectorAll('a.link')
            links.forEach(link=>{
                link.classList.remove('active')
            })
            mobileNav.querySelector(`a[href="#${entrie.target.id}"]`).classList.add('active')
        }
    })
}
let pageObserver = new IntersectionObserver(pageActive,{
    root:null,
    threshold:.85
})
pages.forEach(page=>{
    pageObserver.observe(page)
})