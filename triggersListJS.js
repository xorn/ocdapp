const tWords = JSON.parse(window.localStorage.getItem('tWordsJ')) || [];
const nWords = JSON.parse(window.localStorage.getItem('nWordsJ')) || [];
const tImages = [];
var tImagesSrc = JSON.parse(window.localStorage.getItem('tImagesJ')) || [];
const nImages = [];
const nImagesSrc = JSON.parse(window.localStorage.getItem('nImagesJ')) || [];
const tAudio = [];
const tAudioSrc = JSON.parse(window.localStorage.getItem('tAudioJ')) || [];
const nAudio = [];
const nAudioSrc = JSON.parse(window.localStorage.getItem('nAudioJ')) || [];
const tvideo = [];
const nvideo = [];
var combinedTArray = [];
var combinedNArray = [];

var defaultElement = document.getElementById("defaultA")
defaultElement.classList.add("changeColor");

$(document).ready(function() {
    var targetElement = $("#ulBar").find("LI");
    targetElement.click(function() {
        $(this).siblings().removeClass("changeColor");
        $(this).addClass("changeColor");

    });
});

showWords();

function showWords() {
    var pictures = document.getElementById("hiddenImages");
    var words = document.getElementById("hiddenWords");
    var audio = document.getElementById("hiddenAudio");
    var videos = document.getElementById("hiddenVideos");
    var tDivHeader = document.getElementById("tDivHeader");
    var nDivHeader = document.getElementById("nDivHeader");

    if (words.style.display === "none") {
        words.style.display = "block";
        pictures.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
        document.getElementById("tWordsDiv").style.display = "block";
        document.getElementById("nWordsDiv").style.display = "block";
        document.getElementById("tVideoDiv").style.display = "none";
        document.getElementById("nVideoDiv").style.display = "none";
        document.getElementById("tImagesDiv").style.display = "none";
        document.getElementById("nImagesDiv").style.display = "none";
        document.getElementById("tAudioDiv").style.display = "none";
        document.getElementById("nAudioDiv").style.display = "none";
        tDivHeader.innerHTML  = "Trigger Words";
        nDivHeader.innerHTML  = "Neutral Words";
    } else {
        words.style.display = "block";
        pictures.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
    }

}

function showPictures() {

    var pictures = document.getElementById("hiddenImages");
    var words = document.getElementById("hiddenWords");
    var audio = document.getElementById("hiddenAudio");
    var videos = document.getElementById("hiddenVideos");
    var tDivHeader = document.getElementById("tDivHeader");
    var nDivHeader = document.getElementById("nDivHeader");

    if (pictures.style.display === "none") {
        pictures.style.display = "block";
        words.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
        tDivHeader.innerHTML  = "Trigger Images";
        nDivHeader.innerHTML  = "Neutral Images";
        document.getElementById("tWordsDiv").style.display = "none";
        document.getElementById("nWordsDiv").style.display = "none";
        document.getElementById("tImagesDiv").style.display = "block";
        document.getElementById("nImagesDiv").style.display = "block";
        document.getElementById("tVideoDiv").style.display = "none";
        document.getElementById("nVideoDiv").style.display = "none";
        document.getElementById("tAudioDiv").style.display = "none";
        document.getElementById("nAudioDiv").style.display = "none";
    } else {
        words.style.display = "block"
        pictures.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
    }

}

function showAudio() {

    var pictures = document.getElementById("hiddenImages");
    var words = document.getElementById("hiddenWords");
    var audio = document.getElementById("hiddenAudio");
    var videos = document.getElementById("hiddenVideos");

    if (audio.style.display === "none") {
        audio.style.display = "block";
        words.style.display = "none";
        pictures.style.display = "none";
        videos.style.display = "none";
        tDivHeader.innerHTML  = "Trigger Audio";
        nDivHeader.innerHTML  = "Neutral Audio";
        document.getElementById("tWordsDiv").style.display = "none";
        document.getElementById("nWordsDiv").style.display = "none";
        document.getElementById("tImagesDiv").style.display = "none";
        document.getElementById("nImagesDiv").style.display = "none";
        document.getElementById("tAudioDiv").style.display = "block";
        document.getElementById("nAudioDiv").style.display = "block";
        document.getElementById("tVideoDiv").style.display = "none";
        document.getElementById("nVideoDiv").style.display = "none";
    } else {
        words.style.display = "block"
        pictures.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
    }

}

function showVideos() {

    var pictures = document.getElementById("hiddenImages");
    var words = document.getElementById("hiddenWords");
    var audio = document.getElementById("hiddenAudio");
    var videos = document.getElementById("hiddenVideos");

    if (videos.style.display === "none") {
        videos.style.display = "block";
        tDivHeader.innerHTML  = "Trigger Video";
        nDivHeader.innerHTML  = "Neutral Video";
        words.style.display = "none";
        audio.style.display = "none";
        pictures.style.display = "none";
        document.getElementById("tWordsDiv").style.display = "none";
        document.getElementById("nWordsDiv").style.display = "none";
        document.getElementById("tImagesDiv").style.display = "none";
        document.getElementById("nImagesDiv").style.display = "none";
        document.getElementById("tAudioDiv").style.display = "none";
        document.getElementById("nAudioDiv").style.display = "none";
        document.getElementById("tVideoDiv").style.display = "block";
        document.getElementById("nVideoDiv").style.display = "block";
    } else {
        words.style.display = "block"
        pictures.style.display = "none";
        audio.style.display = "none";
        videos.style.display = "none";
    }

}

//tWords

displayPreviousTWords();

function displayPreviousTWords() {
    document.getElementById('tWordsDiv').innerHTML ='<ul> <li>' + tWords.join('</li> <br></br> <li>') + '</li> </ul>'
    var listItem = $("#tWordsDiv").find("LI");
    var i;
    for (i = 0; i < tWords.length; i++) {
        combinedTArray.push("tWord");
        var button = document.createElement("button");
        var x = document.createTextNode("\u00D7");
        button.appendChild(x);
        button.id = 'xbutton' + i;
        button.classList.add("button");
        button.classList.add("xbuttons");
        button.classList.add("hidden");
        button.style.width = "60px";
        button.style.height = "60px";
        button.style.transform = "scale(.7, .7)"
        button.style.borderRadius = "50px";
        button.style.margin = "-10px";
        listItem[i].appendChild(button);
    }

};

if (tWords.length > 0) {
displayPreviousTWords();
}

function addTWord(){

    var tWord = document.getElementById("tWordsDiv");
    tWords.push(document.getElementById("tWordsInput").value);
    window.localStorage.setItem('tWordsJ', JSON.stringify(tWords));
    document.getElementById("tWordsInput").value = ""
    displayPreviousTWords();
};

function removeTToggle(button) {
    var removeButton = document.getElementById("removeTWords");
    switch(button.value) {
        case "OFF":
        activateTButtons();
        button.value = "ON";
        removeButton.innerHTML = "Done";
        for (i = 0; i < tWords.length; i++) {
            var btn = document.getElementById("xbutton" + i);
            btn.classList.remove("hidden");
        }

        break;

        case "ON":
        button.value = "OFF";
        removeButton.innerHTML = "Remove Trigger Words";
        for (i = 0; i < tWords.length; i++) {
            var btn = document.getElementById("xbutton" + i);
            btn.classList.add("hidden");
        }
        displayPreviousTWords();

        break;
    }
}

function activateTButtons() {
    var xbuttons = document.getElementsByClassName("xbuttons");
    var i;
    for (i = 0; i < tWords.length; i++) {
      xbuttons[i].onclick = function() {
        var listItem = this.parentElement;
        listItem.style.display = "none";
        var index = tWords.indexOf(tWords[i]);
        tWords.splice(index, 1)
        window.localStorage.setItem('tWordsJ', JSON.stringify(tWords));
        }
    }
}

//nWords

displayPreviousNWords();

function displayPreviousNWords() {
    document.getElementById('nWordsDiv').innerHTML ='<ul> <li>' + nWords.join('</li> <br></br> <li>') + '</li> </ul>'
    var listItem = $("#nWordsDiv").find("LI");
    var i;
    for (i = 0; i < nWords.length; i++) {
        var button = document.createElement("button");
        var x = document.createTextNode("\u00D7");
        button.appendChild(x);
        button.id = 'xbutton2' + i;
        button.classList.add("button");
        button.classList.add("xbuttons2");
        button.classList.add("hidden");
        button.style.width = "60px";
        button.style.height = "60px";
        button.style.transform = "scale(.7, .7)"
        button.style.borderRadius = "50px";
        button.style.margin = "-10px";
        listItem[i].appendChild(button);
    }

};

if (tWords.length > 0) {
displayPreviousNWords();
}

function addNWord(){

    var nWord = document.getElementById("nWordsDiv");
    combinedNArray.push("nWord");
    nWords.push(document.getElementById("nWordsInput").value);
    window.localStorage.setItem('nWordsJ', JSON.stringify(nWords));
    document.getElementById("nWordsInput").value = ""
    displayPreviousNWords();
};

function removeNToggle(button) {
    var removeButton = document.getElementById("removeNWords");
    switch(button.value) {
        case "OFF":
        activateNButtons();
        button.value = "ON";
        removeButton.innerHTML = "Done";
        for (i = 0; i < nWords.length; i++) {
            var btn = document.getElementById("xbutton2" + i);
            btn.classList.remove("hidden");
        }

        break;

        case "ON":
        button.value = "OFF";
        removeButton.innerHTML = "Remove Neutral Words";
        for (i = 0; i < nWords.length; i++) {
            var btn = document.getElementById("xbutton2" + i);
            btn.classList.add("hidden");
        }
        displayPreviousNWords();

        break;
    }
}

function activateNButtons() {
    var xbuttons = document.getElementsByClassName("xbuttons2");
    var i;
    for (i = 0; i < nWords.length; i++) {
      xbuttons[i].onclick = function() {
        var listItem = this.parentElement;
        listItem.style.display = "none";
        var index = nWords.indexOf(nWords[i]);
        nWords.splice(index, 1)
        window.localStorage.setItem('nWordsJ', JSON.stringify(nWords));
        }
    }
}

//TImages

const tImagesDiv = document.getElementById('tImagesDiv');
  tImagesDiv.innerHTML = '';

showPreviousImages();

function addTImageUrl(item) {
    var url = document.getElementById("tImageUrl").value
    tImagesSrc.push(url)
    window.localStorage.setItem('tImagesJ', JSON.stringify(tImagesSrc));
    const img = document.createElement('img');
    img.src = url
    img.style.maxWidth = "400px"
    tImagesDiv.appendChild(img);
    combinedTArray.push('tImage');
    url = "";
};

function showPreviousImages() {
    tImagesSrc.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = tImagesSrc[index]
    img.style.maxWidth = "400px"
    tImagesDiv.appendChild(img);
    combinedTArray.push('tImage')
  });
}

function addImage(imageBlob) {
  tImages.push(imageBlob);
  combinedTArray.push("tImage");

}

function redrawImages(imageBlob) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageBlob);
    img.style.maxWidth = "400px"
    tImagesDiv.appendChild(img);
  };

function addImageAndRedraw() {
  const fileInput = document.getElementById('tFileInput');
  if (fileInput.files.length > 0) {
    addImage(fileInput.files[0]);
    redrawImages(fileInput.files[0]);
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function removeTImages() {
    window.localStorage.removeItem('tImagesJ');
    tImagesDiv.innerHTML = '';
};


const button = document.getElementById('addImageFileButton');
button.addEventListener('click', addImageAndRedraw);

// base 64 image conversion

button.addEventListener('click', function() {
  var files = document.getElementById('tFileInput').files;
  if (files.length > 0) {
    getBase64(files[0]);
  }
});

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     tImagesSrc.push(reader.result)
     window.localStorage.setItem('tImagesJ', JSON.stringify(tImagesSrc));
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

//NImages

const nImagesDiv = document.getElementById('nImagesDiv');
  nImagesDiv.innerHTML = '';

showPreviousNImages();

function addNImageUrl(item) {
    var url = document.getElementById("nImageUrl").value
    nImagesSrc.push(url)
    window.localStorage.setItem('nImagesJ', JSON.stringify(nImagesSrc));
    const img = document.createElement('img');
    img.src = url
    img.style.maxWidth = "400px"
    nImagesDiv.appendChild(img);
    combinedNArray.push('nImage');
    url = "";
};

function showPreviousNImages() {
    nImagesSrc.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = nImagesSrc[index];
    img.style.maxWidth = "400px";
    nImagesDiv.appendChild(img);
    combinedNArray.push('nImage')
  });
}

function addNImage(imageBlob) {
  nImages.push(imageBlob);
  combinedNArray.push("nImage");

}

function redrawNImages(imageBlob) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageBlob);
    img.style.maxWidth = "400px"
    nImagesDiv.appendChild(img);
  };

function addNImageAndRedraw() {
  const fileInput = document.getElementById('nFileInput');
  if (fileInput.files.length > 0) {
    addNImage(fileInput.files[0]);
    redrawNImages(fileInput.files[0]);
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function removeNImages() {
    window.localStorage.removeItem('nImagesJ');
    nImagesDiv.innerHTML = '';
};


const nButton = document.getElementById('addNImageFileButton');
nButton.addEventListener('click', addNImageAndRedraw);

// base 64 image conversion

nButton.addEventListener('click', function() {
  var files = document.getElementById('nFileInput').files;
  if (files.length > 0) {
    getNBase64(files[0]);
  }
});

function getNBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     nImagesSrc.push(reader.result)
     window.localStorage.setItem('nImagesJ', JSON.stringify(nImagesSrc));
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

//audio files

//taudio

displayPreviousTAudio();

function displayPreviousTAudio() {
    tAudioSrc.forEach((item, index) => {
    const aud = document.createElement('audio');
    aud.controls = 'controls';
    aud.src = tAudioSrc[index]
    tAudioDiv.appendChild(aud);
    combinedTArray.push('tAudio')
  });
}
function getTAudioBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     tAudioSrc.push(reader.result)
     window.localStorage.setItem('tAudioJ', JSON.stringify(tAudioSrc));
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function redrawTAudio(file) {
    const tAudioDiv = document.getElementById('tAudioDiv')
    const aud = document.createElement('audio');
    aud.controls = 'controls';
    aud.src = URL.createObjectURL(file);
    tAudioDiv.appendChild(aud);
  };

function addTAudio(tAudioBlob) {
  tAudio.push(tAudioBlob);
  combinedTArray.push("tAudio");
}

const tAudioButton = document.getElementById('tAudioButton');
tAudioButton.addEventListener('click', addTAudioAndRedraw);
tAudioButton.addEventListener('click', function() {
  var files = document.getElementById('tAudioInput').files;
  if (files.length > 0) {
    getTAudioBase64(files[0]);
  }
});

function addTAudioAndRedraw() {
  const tAudioInput = document.getElementById('tAudioInput');
  if (tAudioInput.files.length === 1) {
    addTAudio(tAudioInput.files[0]);
    redrawTAudio(tAudioInput.files[0]);
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function removeTAudio() {
        window.localStorage.removeItem('tAudioJ');
        var audio = document.getElementById('tAudioDiv')
        audio.innerHTML = '';
    }

//nAudio

displayPreviousNAudio();

function displayPreviousNAudio() {
    nAudioSrc.forEach((item, index) => {
    const aud = document.createElement('audio');
    aud.controls = 'controls';
    aud.src = nAudioSrc[index]
    nAudioDiv.appendChild(aud);
    combinedNArray.push('nAudio')
  });
}
function getNAudioBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     nAudioSrc.push(reader.result)
     window.localStorage.setItem('nAudioJ', JSON.stringify(nAudioSrc));
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function redrawNAudio(file) {
    const divForNAudio = document.getElementById('nAudioDiv')
    const aud = document.createElement('audio');
    aud.controls = 'controls';
    aud.src = URL.createObjectURL(file);
    divForNAudio.appendChild(aud);
  };

function addNAudioAndRedraw() {
  const nAudioInput = document.getElementById('nAudioInput');
  if (nAudioInput.files.length === 1) {
    addNAudio(nAudioInput.files[0]);
    redrawNAudio(nAudioInput.files[0]);
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function addNAudio(NAudioBlob) {
  nAudio.push(NAudioBlob);
  combinedTArray.push("nAudio");
}

const nAudioButton = document.getElementById('nAudioButton');
nAudioButton.addEventListener('click', addNAudioAndRedraw);
nAudioButton.addEventListener('click', function() {
  var files = document.getElementById('nAudioInput').files;
  if (files.length > 0) {
    getNAudioBase64(files[0]);
  }
});

function removeNAudio() {
        window.localStorage.removeItem('nAudioJ');
        var audio = document.getElementById('nAudioDiv')
        audio.innerHTML = '';
    }

//tVideos

function redrawTVideo(file) {
    const divForTVideo = document.getElementById('tVideoDiv')
    const vid = document.createElement('video');
    vid.controls = 'controls';
    vid.src = URL.createObjectURL(file);
    vid.style.width = "200px"
    divForTVideo.appendChild(vid);

}

function addTVideoAndRedraw() {
  const tVideoInput = document.getElementById('tVideoInput');
  if (tVideoInput.files.length === 1) {
    addTVideo(tVideoInput.files[0]);
    redrawTVideo(tVideoInput.files[0])
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function addTVideo(TVideoBlob) {
  tvideo.push(TVideoBlob);
  combinedTArray.push("tvideo");
}

const tVideoButton = document.getElementById('tVideoButton');
tVideoButton.addEventListener('click', addTVideoAndRedraw);

//nVideos

function redrawNVideo(file) {
    const divForNVideo = document.getElementById('nVideoDiv')
    const vid = document.createElement('video');
    vid.controls = 'controls';
    vid.src = URL.createObjectURL(file);
    vid.style.width = "200px"
    divForNVideo.appendChild(vid);

}

function addNVideoAndRedraw() {
  const nVideoInput = document.getElementById('nVideoInput');
  if (nVideoInput.files.length === 1) {
    addNVideo(nVideoInput.files[0]);
    redrawNVideo(nVideoInput.files[0]);
  } else {
    alert('No file selected. Select a file and try again.');
  }
}

function addNVideo(NVideoBlob) {
  nvideo.push(NVideoBlob);
  combinedNArray.push("nvideo");
}

const nVideoButton = document.getElementById('nVideoButton');
nVideoButton.addEventListener('click', addNVideoAndRedraw);
