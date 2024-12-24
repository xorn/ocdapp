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

    var hoverAudio = $("#hoverNoise")[0];
    $(".button").mouseover(function() {
    hoverAudio.play();
    });

    var clickAudio = $("#clickNoise")[0];
    $(".button").click(function() {
    clickAudio.play();
    });

    var wrongAudio = document.getElementById("wrongNoise");

    var eButton = document.getElementById("e");
    var fButton = document.getElementById("f");

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

    // function showInstructions() {
        
    //     document.getElementById("questionText").classList.remove("hidden"); 
    //     document.getElementById("questionText").classList.remove("smallScale");
    //     document.getElementById("question").style.zIndex = "0";
    //     document.getElementById("backButton").style.zIndex = "0";    
    //     document.getElementById("questionText").classList.remove("scaleDown");
    //     document.getElementById("questionText").classList.add("scaleUp");   
        

    //     setTimeout(function() {
    //     document.getElementById("questionText").style.display = "block";
    //     }, 3000);
    // }

    // function hideInstructions() {
    //     document.getElementById("questionText").classList.add("scaleDown");
    //     document.getElementById("questionText").classList.remove("scaleUp");
    //     setTimeout(function() {
    //         document.getElementById("question").style.zIndex = "10";
    //         document.getElementById("questionText").classList.add("hidden");
    //         document.getElementById("questionText").classList.add("smallScale");
    //         document.getElementById("backButton").style.zIndex = "10";
    //     }, 2000);
    // }

    function hideStart() {
        document.getElementById("start").classList.add("fadeOut");
        setTimeout(function() {
            document.getElementById("start").classList.add("hidden");
        }, 2000);
    };

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

    var letter;

    function determineStart() {
        if (combinedTArray.length !== 0 && combinedNArray.length !== 0) {
            hideStart();
            beginTraining();
        } else if (combinedTArray.length == 0 && combinedNArray.length !==0) {
            alert("Insufficient trigger media. Please enter some trigger media in the Triggers List.")
        } else if (combinedTArray.length !== 0 && combinedNArray.length ==0) {
            alert("insufficient neutral media. Please enter some neutral media in the Triggers List.")
        } else {
            alert("insufficient trigger and neutral media. Please enter some trigger and neutral media in the Triggers List.")
        }
    }

    function beginTraining(){

        document.getElementById("letter").classList.add("hidden");

        var media = Math.random();
        var nothing = ""
        var mediaType


        if (media <= .5) {
            var tArrayType = combinedTArray[Math.floor(Math.random() * combinedTArray.length)]
            switch (tArrayType) {
                case "tWord":
                    media = tWords[Math.floor(Math.random() * tWords.length)];
                    mediaType = "word"
                    setTimeout(mediaTime, 600);
                    setTimeout(letterTime, 1100);
                    setTimeout(removeMedia, 1100);
                break;

                case "tImage":
                    mediaType = "image"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var img = document.createElement('img');
                    img.src = tImagesSrc[Math.floor(Math.random() * tImagesSrc.length)];
                    displayedMedia.appendChild(img);
                    img.style.width = "200px";
                    setTimeout(mediaTime, 600);
                    setTimeout(letterTime, 1100);
                    setTimeout(removeMedia, 1100);
                break;

                case "tAudio":
                    mediaType = "audio"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var img = document.createElement('img');
                    var finalTAudio = tAudioSrc[Math.floor(Math.random() * tAudioSrc.length)]
                    var aud = new Audio(finalTAudio);
                    img.src = "assets/images/giphy.gif"
                    img.style.width = "200px";
                    displayedMedia.appendChild(img);
                    displayedMedia.appendChild(aud)

                    setTimeout(mediaTime, 600)

                    if (progressdone == false) {
                        setTimeout(playAudio, 600) 
                    }
                    function playAudio() {
                        aud.play();
                    }
                    aud.onended = function() {
                        letterTime(); removeMedia();
                    }


                break;

                case "tVideo":
                    mediaType = "video"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var finalTVideo = tVideo[Math.floor(Math.random() * tVideo.length)]
                    var vid = document.createElement('video');
                    vid.src = URL.createObjectURL(finalTVideo);
                    vid.style.width = "300px"
                    displayedMedia.appendChild(vid)

                    setTimeout(mediaTime, 600)

                    if (progressdone == false) {
                        setTimeout(playVideo, 600) 
                    }
                    function playVideo() {
                        vid.play();
                    }
                    vid.onended = function() {
                        letterTime(); removeMedia();
                    }
                break;
            }
        } else {
            var nArrayType = combinedNArray[Math.floor(Math.random() * combinedNArray.length)]
            switch (nArrayType) {
                case "nWord":
                    media = nWords[Math.floor(Math.random() * nWords.length)];
                    mediaType = "word"
                    setTimeout(mediaTime, 600) 
                    setTimeout(letterTime, 1100) 
                    setTimeout(removeMedia, 1100)
                break;

                case "nImage":
                    mediaType = "image"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var img = document.createElement('img');
                    img.src = nImagesSrc[Math.floor(Math.random() * nImagesSrc.length)];
                    displayedMedia.appendChild(img);
                    img.style.width = "200px";
                    setTimeout(mediaTime, 600) 
                    setTimeout(letterTime, 1100) 
                    setTimeout(removeMedia, 1100)

                break;

                case "nAudio":
                    mediaType = "audio"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var img = document.createElement('img');
                    var finalNAudio = nAudioSrc[Math.floor(Math.random() * nAudioSrc.length)]
                    var aud = new Audio(finalNAudio);
                    img.src = "assets/images/giphy.gif"
                    img.style.width = "200px";
                    displayedMedia.appendChild(img);
                    displayedMedia.appendChild(aud);
                    setTimeout(mediaTime, 600)

                    if (progressdone == false) {
                        setTimeout(playAudio, 600)
                    }  
                    function playAudio() {
                        aud.play();
                    }
                    aud.onended = function() {
                        letterTime(); removeMedia();
                    }


                break;

                case "nVideo":
                mediaType = "video"
                    var displayedMedia = document.getElementById("displayedMedia");
                    var finalNVideo = nVideo[Math.floor(Math.random() * nVideo.length)]
                    var vid = document.createElement('video');
                    vid.src = URL.createObjectURL(finalNVideo);
                    vid.style.width = "300px"
                    displayedMedia.appendChild(vid)

                    setTimeout(mediaTime, 600)

                    if (progressdone == false) {
                        setTimeout(playVideo, 600) 
                    }
                    function playVideo() {
                        vid.play();
                    }
                    vid.onended = function() {
                        letterTime(); removeMedia();
                    }
                break;
            }
        }

        function mediaTime() {
            var position = Math.random();
            var displayedMedia = document.getElementById("displayedMedia");

            displayedMedia.classList.remove("hidden");

            if (position <= .5) {
                displayedMedia.style.top = "190px";   
            } else {
                displayedMedia.style.top = "571px";
            }

            switch (mediaType) {
                case "word":
                displayedMedia.innerHTML = media;
                break;
            } 
        }

        function letterTime() {
            letter = Math.random();
            var letterPosition = Math.random();

            if (letter <= .5) {
                letter = "E"
            } else {
                letter = "F"
            }

            if (letterPosition <= .5) {
                document.getElementById("letter").classList.remove("hidden");
                document.getElementById("letter").innerHTML = letter;
                // document.getElementById("questionText").classList.remove("totalCenter");
                document.getElementById("letter").style.top = "190px";

            } else {
                document.getElementById("letter").classList.remove("hidden");
                document.getElementById("letter").innerHTML = letter;
                // document.getElementById("questionText").classList.remove("totalCenter");
                document.getElementById("letter").style.top = "571px";
            }
        }

        function removeMedia() {
            var displayedMedia = document.getElementById("displayedMedia");
            displayedMedia.innerHTML = "";
            displayedMedia.classList.add("hidden");
        }
    };

   
//keyboard input for E and F buttons

    document.onkeydown = function (e) {

        e = e || window.event;

        switch (e.which || e.keyCode) {
            case 69 : checkE();
            eButton.classList.add("button-active");
                break;
            case 70 : checkF();
            fButton.classList.add("button-active");
                break;
        }
    }

    document.onkeyup = function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case 69 : 
                eButton.classList.remove("button-active");
            break;
            case 70 : 
                fButton.classList.remove("button-active");
            break;
        }
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

 // upon pressing the E or F button, determines whether answer was correct

    function checkE() {

        switch (letter) {

            case "E":
            if (progressdone == true) {
                console.log("Congrats on finishing training ;)")
            } else {
                progress();
                beginTraining();
                $('#e').get(0).click();

            }
            break;

            case "F":
            if (progressdone == true) {
                
            } else {
                beginTraining();
                $('#f').get(0).click();
                clickAudio.pause();
                wrongAudio.play();
            }
            break;
        }
    } 

    function checkF() {

        switch (letter) {

            case "F":
            if (progressdone == true) {
                console.log("Congrats on finishing training ;)")
            } else {
                progress();
                beginTraining();
                $('#f').get(0).click();
            }
            break;

            case "E":
            if (progressdone == true) {
                
            } else {
                beginTraining();
                $('#e').get(0).click();
                clickAudio.pause();
                wrongAudio.play();
            }
            break;
        } 
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

    function showPopup(value) {
        document.getElementById(value).classList.remove("hidden");
        document.getElementById(value).classList.add("tilt-in-fwd-tl");
    }

    function hidePopup(value) {
        document.getElementById(value).classList.add("tilt-back-fwd-tl");
    }


