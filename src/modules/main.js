const img = document.createElement("img");
document.body.append(img);

img.src = "../media/placholder-img.png";

const imgUrl = new URL("../media/placeholder-img.png", import.meta.url);

img.src = imgUrl;

console.log(import.meta);

document.body.append(img);
