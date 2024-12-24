
    const tWords = JSON.parse(window.localStorage.getItem('tWordsJ')) || [];
    const nWords = JSON.parse(window.localStorage.getItem('nWordsJ')) || [];
    const tImagesSrc = JSON.parse(window.localStorage.getItem('tImagesJ')) || [];
    const nImagesSrc = JSON.parse(window.localStorage.getItem('nImagesJ')) || [];
    const tAudioSrc = JSON.parse(window.localStorage.getItem('tAudioJ')) || [];
    const nAudioSrc = JSON.parse(window.localStorage.getItem('nAudioJ')) || [];
    const tVideo = [];
    const nVideo = [];
    const combinedTArray = [];
    const combinedNArray = [];

    var progressdone = false

    var caratStatus = "opened"

    var hoverAudio = $("#hoverNoise")[0];
    $(".button, .slicedImages, input, #expandButton").mouseover(function() {
    hoverAudio.play();
    });

    function playHover() {
        hoverAudio.play();

        if (hoverAudio.duration > 0) {
            hoverAudio.play();
        }
    }

    var clickAudio = $("#clickNoise")[0];
    $(".button, input, #expandButton").click(function() {
    clickAudio.play();
    });

    function playClick() {
        clickAudio.play();
    }

    var randomizeCB = document.getElementById("randomize");
    var selectCB = document.getElementById("select");

    var checkBoxStatus = localStorage.getItem("checkBoxStatus");

    //puzzle maker vars

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var parts = []
    // var img = new Image();
    var img = document.getElementById("image");

    var width
    var height

    var numRowsCols = 6;

    var puzzleBox = document.getElementById("puzzleBox")
 
    var pieceWidth
    var pieceHeight

    
    

    puzzleBox.style.width = (screen.width - 336) + "px"
    puzzleBox.classList.add("outsideDrop")
    puzzleBox.setAttribute("ondrop", "drop(event)");
    puzzleBox.setAttribute("ondragover", "allowDrop(event)");
    puzzleBox.setAttribute("onmouseover", "playHover();")
    puzzleBox.setAttribute("onclick", "onClick(event);")
    puzzleBox.setAttribute("ondragend", "dragEnd(event);")

    img.style.maxWidth = "60vw"
    img.style.maxHeight = "60vh"

    img.onload = function() {
    width = this.width;
    height = this.height;
    pieceWidth = ((((screen.width)*.6)-1)/numRowsCols) - 1
    pieceHeight = (height - (numRowsCols + 1)) / numRowsCols
    var frame = document.createElement("table");
    frame.setAttribute("id", "puzzleFrame");
    frame.style.width = width + "px";
    frame.style.height = height + "px";
    frame.classList.add("dropZone");
    frame.setAttribute("cellspacing", "0")
    frame.setAttribute("cellpadding", "0")
    frame.setAttribute("border", "0")
    var pos = img.getBoundingClientRect();
    frame.style.left = (pos.left - 336) + "px"
    var puzzleBox = document.getElementById("puzzleBox");
    puzzleBox.appendChild(frame);
        for (let i = 0; i < numRowsCols; i++) {
            const tr = frame.insertRow();
            for (let j = 0; j < numRowsCols; j++) {
                const td = tr.insertCell();
                // var remainderX = img.width % numRows
                // var remainderY = img.height % numRows
                td.style.border = "1px solid black";
                td.style.margin = "0px";
                td.style.padding = "0px";
                td.style.width = pieceWidth + "px";
                td.style.height = pieceHeight + "px";
                td.style.maxWidth = pieceWidth + "px";
                td.style.maxHeight = pieceHeight + "px";
                td.classList.add("dropZone");
                td.setAttribute("ondrop", "drop(event)")
                td.setAttribute("ondragover", "allowDrop(event)")
                td.setAttribute("ondragenter", "dragEnter(event)")
                td.setAttribute("draggable", "true");
                td.setAttribute("ondragstart", "drag(event)");
                td.setAttribute("ondrop", "drop(event)");
                td.setAttribute("onclick", "onClick(event);")
                td.setAttribute("id", "td" + i + j);
            }
        }
    }

    


    function refreshPage() {
        setTimeout(function() {
            location.reload();
        }, 5);
    }


    tWords.forEach((item, index) => {
            combinedTArray.push("tWord");
    });

    tImagesSrc.forEach((item, index) => {
            combinedTArray.push("tImage");
    });

    tAudioSrc.forEach((item, index) => {
            combinedTArray.push("tAudio");
    });

    nWords.forEach((item, index) => {
            combinedNArray.push("nWord");
    });

    nImagesSrc.forEach((item, index) => {
            combinedNArray.push("nImage");
    });

    nAudioSrc.forEach((item, index) => {
            combinedNArray.push("nAudio");
    });

    function updateArrays() {

        tVideo.forEach((item, index) => {
                combinedTArray.push("tVideo");
        });

        nVideo.forEach((item, index) => {
                combinedNArray.push("nVideo");
        });
    }

    function showInstructions() {
        
        document.getElementById("questionText").classList.remove("hidden"); 
        document.getElementById("questionText").classList.remove("smallScale");
        document.getElementById("question").style.zIndex = "0";
        document.getElementById("backButton").style.zIndex = "0";
        document.getElementById("expandButton").style.zIndex = "2";    
        document.getElementById("questionText").classList.remove("scaleDown");
        document.getElementById("questionText").classList.add("scaleUp");   
        

        setTimeout(function() {
        document.getElementById("questionText").style.display = "block";
        }, 3000);
    }

    function hideInstructions() {
        document.getElementById("questionText").classList.add("scaleDown");
        document.getElementById("questionText").classList.remove("scaleUp");
        setTimeout(function() {
            document.getElementById("question").style.zIndex = "10";
            document.getElementById("questionText").classList.add("hidden");
            document.getElementById("questionText").classList.add("smallScale");
            document.getElementById("backButton").style.zIndex = "10";
            document.getElementById("expandButton").style.zIndex = "5"; 
        }, 2000);
    }

    function hideStart() {
        document.getElementById("start").classList.add("fadeOut");
        setTimeout(function() {
            document.getElementById("start").classList.add("hidden");
        }, 2000);
    };

    function determineStart() {
        if (tImagesSrc.length !== 0 || tVideo.length !==0) {
            hideStart();
            beginTraining();
        } else {
            alert("Insufficient trigger images/videos. Please enter some trigger images in the Triggers List and/or upload trigger videos on this page.")
        }
    }

    function showVideos() {
        document.getElementById("videoTriggers").classList.remove("hidden"); 
        document.getElementById("videoTriggers").classList.remove("smallScale");
        document.getElementById("question").style.zIndex = "0";
        document.getElementById("backButton").style.zIndex = "0";    
        document.getElementById("videoTriggers").classList.remove("scaleDown");
        document.getElementById("videoTriggers").classList.add("scaleUp");
    }

    function hideVideos() {
        document.getElementById("videoTriggers").classList.add("scaleDown");
        document.getElementById("videoTriggers").classList.remove("scaleUp");
        setTimeout(function() {
            document.getElementById("question").style.zIndex = "10";
            document.getElementById("videoTriggers").classList.add("hidden");
            document.getElementById("videoTriggers").classList.add("smallScale");
            document.getElementById("backButton").style.zIndex = "10";
        }, 2000);
    }

// advances progress bar if answer was correct, determines if training is done

    function progress() {
        var v1=document.getElementById("progress").value;
        if (v1 < 199) {
            document.getElementById("progress").value= v1 + 1;
        }

        else {
            document.getElementById("progress").value= v1 + 1;
            progressdone = true
            finishTraining();
        }
    };

    function finishTraining() {
        document.getElementById("displayedMedia").style.visibility = "hidden";
        document.getElementById("letter").style.visibility = "hidden";

        document.getElementById("finished").classList.remove("hidden");
        document.getElementById("finished").classList.add("fadeIn");
    }

 
    //tVideos

    function redrawTVideo(file) {
        const tVideoDiv = document.getElementById('tVideoDiv')
        const vid = document.createElement('video');
        vid.controls = 'controls';
        vid.src = URL.createObjectURL(file);
        vid.style.width = "400px"
        vid.style.margin = "5px"
        vid.style.marginTop = "30px"
        tVideoDiv.appendChild(vid);

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
      tVideo.push(TVideoBlob);
    }

    const tVideoButton = document.getElementById('tVideoButton');
    tVideoButton.addEventListener('click', addTVideoAndRedraw);

    //nVideos

    function redrawNVideo(file) {
        const nVideoDiv = document.getElementById('nVideoDiv')
        const vid = document.createElement('video');
        vid.controls = 'controls';
        vid.src = URL.createObjectURL(file);
        vid.style.width = "400px"
        vid.style.margin = "5px"
        vid.style.marginTop = "30px"
        nVideoDiv.appendChild(vid);

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
      nVideo.push(NVideoBlob);
    }

    const nVideoButton = document.getElementById('nVideoButton');
    nVideoButton.addEventListener('click', addNVideoAndRedraw);

    function showHideSide() {
    	var carat = document.getElementById("expandCarat")
    	var leftContainer = document.getElementById("leftContainer")
    	var expandButton = document.getElementById("expandButton")
        var puzzleFrame = document.getElementById('puzzleFrame')
        var puzzleBox = document.getElementById('puzzleBox')
        var popup = document.getElementsByClassName('popup')
    	if (caratStatus == "opened") {
    		carat.innerHTML = "&#8250;";
    		caratStatus = "closed";
    		leftContainer.classList.add("hidden");
    		expandButton.style.left = "0px"
            puzzleBox.style.width = "100%"
            puzzleFrame.style.left = "50%"
            puzzleFrame.style.transform = "translateX(-50%)";
            puzzleFrame.style.width = "60vw"

            for (let i=0; i<popup.length;i++) {
                // popup[i].classList.remove("totalCenter");
                // // popup[i].style.top = ""
                popup[i].style.left= "386px"
                // popup[i].style.removeProperty("right")
                // popup[i].style.transform= ""
                // popup[i].classList.add("totalCenter");
            }



    	} else {
    		carat.innerHTML = "&#8249;"
    		caratStatus = "opened"
    		leftContainer.classList.remove("hidden");
    		expandButton.style.left = "330px"
            puzzleBox.style.width = (screen.width - 336) + "px"

            for (let i=0; i<popup.length;i++) {
                 popup[i].style.left= ""

            }

    	}
    }

    function checkSwitch(obj, classname) {
        var cbs = document.getElementsByClassName(classname);
        for (var i = 0; i < cbs.length; i++) {
            if (cbs[i].checked == true) {
                cbs[i].checked = false;   
            }    
        }

        setTimeout(function() {
            obj.checked = true;
        }, 1);
        
    }
    

    function checkBoxStatusFinder() {

        if (randomizeCB.checked == true) {
            checkBoxStatus = "randomize"
            localStorage.setItem("checkBoxStatus", checkBoxStatus);
        } else if (selectCB.checked == true) {
            checkBoxStatus = "select"
            localStorage.setItem("checkBoxStatus", checkBoxStatus);
        } else {
            checkBoxStatus = "randomize"
            localStorage.setItem("checkBoxStatus", checkBoxStatus);
        }
    }

    //changes puzzle selection mode

    window.onload = onPageLoad();

    function onPageLoad() {

        switch (checkBoxStatus) {
            case "randomize":
            img.src = tImagesSrc[Math.floor(Math.random() * tImagesSrc.length)];
            randomizeCB.checked = true;
            selectCB.checked = false;
            break;
            
            case "select":
            console.log("selectedImage")
            selectCB.checked = true;
            randomizeCB.checked = false;
        }

    };

    //puzzle piece maker

    var slicedImage = document.getElementsByClassName("slicedImages");

    function startPuzzle() {
        split();
    }

    function split() {

        for (var x = 0; x < numRowsCols; x++) {
            for (var y = 0; y < numRowsCols; y++) {

                canvas.width = pieceWidth;
                canvas.height = pieceHeight;

                ctx.drawImage(img, x*pieceWidth, y*pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                parts.push(canvas.toDataURL());

            }

        }

            //for test div

        for (var i = 0; i < numRowsCols*numRowsCols; i++) {
            var slicedImage = document.createElement('img');
            var puzzleBox = document.getElementById("puzzleBox")
            var left = Math.random() * puzzleBox.width;
            var top = Math.random() * puzzleBox.height;
            slicedImage.src = parts[i];
            slicedImage.setAttribute("class", "slicedImages");
            slicedImage.setAttribute("id", i);
            slicedImage.style.position = "absolute"
            slicedImage.style.left = Math.abs((Math.random() * puzzleBox.clientWidth) - pieceWidth) + "px";
            slicedImage.style.top = Math.abs((Math.random() * puzzleBox.clientHeight) - pieceHeight) + "px";
            slicedImage.setAttribute("draggable", "true");
            slicedImage.setAttribute("ondragstart", "drag(event)");
            slicedImage.setAttribute("ondrop", "drop(event)");
            slicedImage.setAttribute("ondragover", "allowDrop(event)");
            slicedImage.setAttribute("onmouseover", "playHover();")
            slicedImage.setAttribute("onclick", "onClick(event);")
            slicedImage.setAttribute("ondragend", "dragEnd(event);")
            // slicedImage.setAttribute("ondragenter", "dragEnter(event);")
            var pos = slicedImage.getBoundingClientRect();
            slicedImage.style.zIndex = (Math.random()*10);
            puzzleBox.appendChild(slicedImage);
        }
    }

    // drag settings of pieces

    var pieceSrc
    var id
    var firedOn
    var enteredId
    var piece
    var test
    let offsetX;
    let offsetY;
    var mouseX;
    var mouseY;
    var originalPosX
    var originalPosY

    function drag(event) {
        id = event.target.id
        event.dataTransfer.setData("text", id);
        event.dataTransfer.setData("url", event.target.src);
        piece = document.getElementById(id);
        event.dataTransfer.setData("background", event.target.src);
        // piece.style.display = "none"
        event.target.style.border = "3px"
        // event.target.classList.add('hideDrag');
        var pos = event.target.getBoundingClientRect();
        originalPosX = pos.left
        originalPosY = pos.top
        playClick();
    }

    function dragEnd(event) {
        // event.target.classList.add('hideDrag');
        offsetX = event.target.getBoundingClientRect().left
        offsetY = event.target.getBoundingClientRect().top
       
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        // console.log(event)
        if (event.target.classList.contains("dropZone")) {
            firedOn = event.srcElement.id;
            test = event.target
            enteredId = getIdNumber(firedOn);
            piece = event.srcElement
            // piece.style.width = (document.getElementById(firedOn).clientWidth) + "px"
            // piece.style.height = (document.getElementById(firedOn).clientHeight) + "px"
        }
    }

    function drop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var url = event.dataTransfer.getData("url");
        piece = document.getElementById(data);
        var ident = event.dataTransfer.getData("id");
        var td = event.target.id
        var status = event.dataTransfer.getData("status");
        var rect = event.target.getBoundingClientRect();
        var posX = event.pageX - rect.left
        var posY =  event.pageY - rect.top
        var x = event.clientX;
        var y = event.clientY;
        // var tdPosition = document.getElementById(td).getBoundingClientRect();
        piece.style.position = "relative"
        piece.style.removeProperty('left');
        piece.style.removeProperty('top');
        piece.classList.add("dropZone");
        clickAudio.play();

        if (event.target.tagName !== 'td') {
            piece.style.border = "3px solid black;"
            piece.style.position = "absolute"
            var translateLeft = posX - originalPosX;
            var translateUp = posY - originalPosY;
            console.log(originalPosX)
            // piece.style.left = originalPosX + (posX - translateLeft) + "px";
            // piece.style.top = originalPosY + (posY - translateUp) + "px";
            return;
        }

        // if (event.target.parentElement.firstChild.length > 0) {
        //     console.log(event.target.parentElement)
        //     event.target.remove();

            // event.target.parentElement.appendChild(piece);
        //     return;
        // }
        // if(document.getElementById(firedOn).childNodes.length > 0 || document.getElementById(firedOn).nodeName == "img") {
        //     // $("#" + firedOn + "img")
        // }
        // piece.style.width = (document.getElementById(firedOn).clientWidth) + "px"
        // piece.style.height = (document.getElementById(firedOn).clientHeight) + "px"
        // console.log(x + "," + y)
        // console.log(tdPosition.left + "," + tdPosition.top)
        var img2 = new Image();
        img2.src = parts[1];
        // $('#td' + enteredId).css("background-image", "url('" + img.src + "')")
        document.getElementById(firedOn).appendChild(piece);
        document.getElementById(firedOn).appendChild(piece);
        // piece.style.backgroundImage = ""
        var dataSrc = document.getElementById(data).src
        
        // for (var i = 0; i = tds.length; i++) {
        //     tds[i].style.backgroundImage = "url(" + parts[i] + ")"
        // }
    }

    function onClick(event) {
        event.preventDefault();
    }

    function getIdNumber(obj) {
        var string = obj.toString();
        var newstring = string.replace(/td/, '');
        return newstring
    }

    document.addEventListener('mousemove', mouse);

    function mouse(e) {
        mouseX = e.screenX
        mouseY = e.screenY
    }
    
    // Difficulty Settings


    // function checkDifficulty(obj, value) {
    //     var cbs = document.getElementsByClassName(value);
    //     for (var i = 0; i < cbs.length; i++) {
    //     cbs[i].checked = false;
    //     }
    //     obj.checked = true;
    //     console.log(obj)
    // }



    function switchDifficulty(difficulty) {

        switch(difficulty) {
            case easy:
                numRowsCols = 4;
            break;

            case medium:
                numRowsCols = 6;
            break;

            case hard:
                numRowsCols = 8;
            break;

            case veryHard:
                numRowsCols = 12;
            break;
        }

        localStorage.setItem("numRowsCols", numRowsCols);
        
    }

    function showPopup(value) {
        document.getElementById(value).classList.remove("tilt-back-fwd-tl");
        document.getElementById(value).classList.remove("hidden");
        document.getElementById(value).classList.add("tilt-in-fwd-tl");
        document.getElementById(value).style.top = "82px"
        document.getElementById(value).style.right = "252px"
    }

    function hidePopup(value) {
        document.getElementById(value).classList.remove("tilt-in-fwd-tl");
        document.getElementById(value).classList.add("tilt-back-fwd-tl");
        document.getElementById(value).style.top = "82px"
        document.getElementById(value).style.right = "252px"
    }






