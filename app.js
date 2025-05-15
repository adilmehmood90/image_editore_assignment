const inputFile = document.querySelector('#input-file');
const chooseImage = document.querySelector('#choose');
const previewImage = document.querySelector('.preview-img img');
const filterBtns = document.querySelectorAll('.filter-btns button');
const sliderName = document.querySelector('.slider-name');
const sliderValue = document.querySelector('.slider-value');
const slider = document.querySelector('.slider input');
const rotateBtns = document.querySelectorAll('.rotate-btns button');
const resetBtn = document.querySelector('#reset');
const saveBtn = document.querySelector('#save');


let brightness = 100,
saturate = 100,
invert = 0,
grayscale = 0,
contrast = 100,
opacity = 100,
blurImage =0,
hue = 0
rotate =  0,
hori = 1,
verti = 1;


const applyFilter = () => {
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%) contrast(${contrast}%) opacity(${opacity}%) blur(${blurImage}px) hue-rotate(${hue}deg)`;
    previewImage.style.transform = `rotate(${rotate}deg) scale(${hori}, ${verti})`;
}


rotateBtns.forEach(option => {
     option.addEventListener('click', () => {
          if(option.id == 'left'){
               rotate -= 90;
          }
          else if(option.id == 'right'){
               rotate += 90;
          }
            else if(option.id == 'hori'){
               hori = hori == 1 ? -1 : 1;
          }
             else if(option.id == 'verti'){
               verti = verti == 1 ? -1 : 1;
          }
          applyFilter()
     })
})

filterBtns.forEach(option => {
    option.addEventListener('click', () => {
        document.querySelector('.filter-btns .active').classList.remove('active');
        option.classList.add('active')
        sliderName.innerText = option.innerText;
        if(option.id == "brightness"){
            slider.max = 200;
            sliderValue.innerText = `${brightness}%`;
             slider.value = brightness;
        }
        else if(option.id == "saturate"){
            slider.max = 200;
            sliderValue.innerText = `${saturate}%`;
             slider.value = saturate;
        }
        else if(option.id == "invert"){
            slider.max = 100;
            sliderValue.innerText = `${invert}%`;
             slider.value = invert;
        }
        else if(option.id == "opacity "){
            slider.max = 100;
            sliderValue.innerText = `${opacity }%`;
             slider.value = opacity;
        }
        else if(option.id == "grayscale"){
            slider.max = 100;
            sliderValue.innerText = `${grayscale}%`;
             slider.value = grayscale;
        }
        else if(option.id == "contrast "){
            slider.max = 200;
            sliderValue.innerText = `${contrast }%`;
             slider.value = contrast;
        }
        else if(option.id == "hue-rotate"){
            slider.max = 360;
            sliderValue.innerText = `${hue }deg`;
             slider.value = hue;
        }
        else if(option.id == "blur"){
            slider.max = 20;
            sliderValue.innerText = `${blurImage}px`;
             slider.value = blurImage;
        }
    })
});





const loadImage = () => {
    let file = inputFile.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.style = `pointer-events:none;`;
    document.querySelector('.container').classList.remove('disable');
    filterBtns[0].click();
    resetFilter();

} 

const updateFilter = () => {
    let selectedFilter = document.querySelector('.filter-btns button.active');
    if(selectedFilter.id == 'brightness'){
        sliderValue.innerText = slider.value + "%";
        brightness = slider.value;
       
    }
    else if(selectedFilter.id == 'saturate'){
         sliderValue.innerText = slider.value + "%";
         saturate = slider.value;
         
    }
    else if(selectedFilter.id == 'invert'){
         sliderValue.innerText = slider.value + "%";
         invert = slider.value;
         
         
    }
    else if(selectedFilter.id == 'grayscale'){
         sliderValue.innerText = slider.value + "%";
         grayscale = slider.value;
         
    }
    else if(selectedFilter.id == 'opacity'){
         sliderValue.innerText = slider.value + "%";
         opacity = slider.value;
         
    }
    else if(selectedFilter.id == 'contrast'){
         sliderValue.innerText = slider.value + "%";
         contrast = slider.value;
         
    }
    else if(selectedFilter.id == 'hue-rotate'){
         sliderValue.innerText = slider.value + "deg";
         hue = slider.value;
         
    }
    else if(selectedFilter.id == 'blur'){
         sliderValue.innerText = slider.value + "px";
         blurImage = slider.value;
         
    }

    applyFilter()
}

const resetFilter =() => {
     brightness = 100,
saturate = 100,
invert = 0,
grayscale = 0,
contrast = 100,
opacity = 100,
blurImage =0,
hue = 0
rotate =  0,
hori = 1,
verti = 1;
applyFilter()
filterBtns[0].click()
}


const saveImage = () => {
     const  canvas = document.createElement('canvas');
     let ctx = canvas.getContext('2d');

     canvas.width = previewImage.naturalWidth + previewImage.naturalHeight;
     canvas.height = previewImage.naturalHeight + previewImage.naturalWidth;
     ctx.filter = `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) grayscale(${grayscale}%) contrast(${contrast}%) opacity(${opacity}%) blur(${blurImage}px) hue-rotate(${hue}deg)`;
     ctx.translate(canvas.width / 2, canvas.height /2);
     ctx.scale(hori,verti);
     if(rotate !=0){
          ctx.rotate(rotate * Math.PI / 180);
     }
     ctx.drawImage(previewImage, -previewImage.naturalWidth / 2, -previewImage.naturalHeight / 2, previewImage.naturalWidth, previewImage.naturalHeight);

     // document.body.appendChild(canvas);
     let link = document.createElement('a');
     link.download = "image.jpg";
     link.href = canvas.toDataURL();
     link.click();
}

chooseImage.addEventListener('click', () => inputFile.click());
previewImage.addEventListener('click', () => inputFile.click());
inputFile.addEventListener('click', loadImage);
slider.addEventListener('input', updateFilter);
resetBtn.addEventListener('click', resetFilter);
saveBtn.addEventListener('click', saveImage);