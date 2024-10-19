/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));
/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelector("section[id]");
const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const sectionClass = current.querySelector(
      ".nav__menu a[href*=" + sectionId
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);
/*=============== SHOW SCROLL UP ===============*/
const scrollup = () => {
  const scrollup = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollup.classList.add("show-scroll")
    : scrollup.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollup);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});
sr.reveal(`.home__data, .footer__container, .footer__group`);
sr.reveal(`.home__img`, { delay: 700, origin: "bottom" });
sr.reveal(`.logos__img, .program__card , .pricing__card`, { interval: 100 });
sr.reveal(`.choose__img, .calculate__content `, { origin: "left" });
sr.reveal(`.choose__content, .calculate__img `, { origin: "right" });

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById("calculate-form"),
  calculateCm = document.getElementById("calculate-cm"),
  calculateKg = document.getElementById("calculate-kg"),
  calculateMsg = document.getElementById("calculate-message");

const calculateBmi = (e) => {
  e.preventDefault();

  if (calculateCm.value === "" || calculateKg.value === "") {
    calculateMsg.classList.remove("color-green");
    calculateMsg.classList.add("color-red");
    calculateMsg.textContent = "Fill In The Height And Weight";
    setTimeout(() => {
      calculateMsg.textContent = "";
    }, 3000);
  } else {
    const cm = calculateCm.value / 100,
      kg = calculateKg.value,
      bmi = Math.round(kg / (cm * cm));

    calculateMsg.classList.remove("color-red");
    calculateMsg.classList.add("color-green");

    if (bmi < 18.5) {
      calculateMsg.textContent = `Your BMI Is ${bmi} And You Are Skinny`;
    } else if (bmi < 25) {
      calculateMsg.textContent = `Your BMI Is ${bmi} And You Are Healthy`;
    } else {
      calculateMsg.textContent = `Your BMI Is ${bmi} And You Are Overweight`;
    }

    calculateCm.value = "";
    calculateKg.value = "";

    setTimeout(() => {
      calculateMsg.textContent = "";
    }, 4000);
  }
};

calculateForm.addEventListener("submit", calculateBmi);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form");  
const contactMsg = document.getElementById("contact-message");
const contactUser = document.getElementById("contact-user");
const ERROR_MESSAGE_TIMEOUT = 3000;

const validateForm = () => {
  if (contactUser.value.trim() === "") {
    contactMsg.classList.remove("color-green");
    contactMsg.classList.add("color-red");
    contactMsg.textContent = "You Must Enter Your Email";
    setTimeout(() => {
      contactMsg.textContent = "";
    }, ERROR_MESSAGE_TIMEOUT);
    return false;
  }

  return true;
};

const sendEmail = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const response = await emailjs.sendForm(
      "service_ptjsj8g",
      "template_crrk20n",
      "#contact-form",
      "itWmNqRl9t8Gx53Dz"
    );
    contactMsg.classList.add("color-green");
    contactMsg.textContent = "You Registered Successfully";

    setTimeout(() => {
      contactMsg.textContent = "";
    }, 3000);
  } catch (error) {
    alert("OOps! Something Has FAiled...", error);
  }

  contactUser.value = "";
};

contactForm.addEventListener("submit", sendEmail);
