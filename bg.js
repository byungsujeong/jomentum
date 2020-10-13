const body = document.querySelector("body");

const IMG_NUMBER = 11;

const patinImage = (imgNumber) => {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
};

const genRandom = () => {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
};

const initBg = () => {
    const randomNumber = genRandom();
    patinImage(randomNumber);
};

initBg();