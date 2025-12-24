// Snowflakes Animation
function createSnowflakes() {
  const container = document.getElementById('snowflakes');
  const snowflakeCount = 50;
  
  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    container.appendChild(snowflake);
  }
}

// Create Mini Town
function createMiniTown() {
  const town = document.getElementById('miniTown');
  const houses = [
    { left: '10%', width: 60, height: 80, windows: 2 },
    { left: '25%', width: 70, height: 95, windows: 3 },
    { left: '42%', width: 55, height: 70, windows: 2 },
    { left: '58%', width: 75, height: 100, windows: 4 },
    { left: '75%', width: 65, height: 85, windows: 3 },
    { left: '88%', width: 58, height: 75, windows: 2 }
  ];

  houses.forEach((h, idx) => {
    const house = document.createElement('div');
    house.className = 'house';
    house.style.left = h.left;
    
    const body = document.createElement('div');
    body.className = 'house-body';
    body.style.width = h.width + 'px';
    body.style.height = h.height + 'px';
    
    const roof = document.createElement('div');
    roof.className = 'house-roof';
    body.appendChild(roof);

    // Chimney
    if (idx % 2 === 0) {
      const chimney = document.createElement('div');
      chimney.className = 'chimney';
      chimney.style.width = '12px';
      chimney.style.height = '20px';
      body.appendChild(chimney);

      // Smoke particles
      for (let i = 0; i < 3; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        smoke.style.top = (-50 - i * 8) + 'px';
        smoke.style.right = (18 - i * 2) + 'px';
        smoke.style.animationDelay = (i * 0.5) + 's';
        body.appendChild(smoke);
      }
    }
    
    // Windows
    for (let i = 0; i < h.windows; i++) {
      const window = document.createElement('div');
      window.className = 'house-window';
      window.style.width = '12px';
      window.style.height = '14px';
      const col = i % 2;
      const row = Math.floor(i / 2);
      window.style.left = (15 + col * 25) + 'px';
      window.style.top = (20 + row * 25) + 'px';
      window.style.animationDelay = (Math.random() * 2) + 's';
      body.appendChild(window);
    }
    
    house.appendChild(body);
    town.appendChild(house);
  });
}

// Photo Modal Functionality
const photoFrames = document.querySelectorAll('.photo-frame');
const modal = document.getElementById('photoModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalNote = document.getElementById('modalNote');

// Track clicked photos for mailbox trigger
let clickedPhotos = new Set();
const totalPhotos = photoFrames.length;

photoFrames.forEach((frame, index) => {
  frame.addEventListener('click', () => {
    const img = frame.querySelector('img');
    const title = frame.getAttribute('data-title');
    const note = frame.getAttribute('data-note');
    
    modalImage.src = img.src;
    modalTitle.textContent = title;
    modalNote.textContent = note;
    modal.classList.add('active');

    // Track this photo as clicked
    clickedPhotos.add(index);
    
    // Check if all photos have been clicked
    if (clickedPhotos.size === totalPhotos) {
      showMailbox();
    }
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Mailbox Functionality
const mailboxContainer = document.getElementById('mailboxContainer');
const mailboxButton = document.getElementById('mailboxButton');
const mailboxModal = document.getElementById('mailboxModal');
const mailboxModalClose = document.getElementById('mailboxModalClose');

function showMailbox() {
  setTimeout(() => {
    mailboxContainer.classList.add('show');
  }, 500);
}

mailboxButton.addEventListener('click', () => {
  mailboxModal.classList.add('active');
});

mailboxModalClose.addEventListener('click', () => {
  mailboxModal.classList.remove('active');
});

mailboxModal.addEventListener('click', (e) => {
  if (e.target === mailboxModal) {
    mailboxModal.classList.remove('active');
  }
});

createSnowflakes();
createMiniTown();

// Music Player Functionality
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeControl = document.getElementById('volumeControl');
const musicText = musicToggle.querySelector('.music-text');

let isPlaying = false;

// Set initial volume
bgMusic.volume = 0.7;

// Toggle play/pause
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicText.textContent = 'Play Music';
    isPlaying = false;
  } else {
    bgMusic.play();
    musicToggle.classList.add('playing');
    musicText.textContent = 'Pause Music';
    isPlaying = true;
  }
});

// Volume control
volumeControl.addEventListener('input', (e) => {
  bgMusic.volume = e.target.value / 100;
});

// Christmas Tree Animation
MorphSVGPlugin.convertToPath("polygon");

var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function (s) {
    return document.querySelector(s);
  },
  selectAll = function (s) {
    return document.querySelectorAll(s);
  },
  pContainer = select(".pContainer"),
  mainSVG = select(".mainSVG"),
  star = select("#star"),
  sparkle = select(".sparkle"),
  tree = select("#tree"),
  showParticle = true,
  particleColorArray = [
    "#E8F6F8",
    "#ACE8F8",
    "#F6FBFE",
    "#A2CBDC",
    "#B74551",
    "#5DBA72",
    "#910B28",
    "#910B28",
    "#446D39"
  ],
  particleTypeArray = ["#star", "#circ", "#cross", "#heart"],
  particlePool = [],
  particleCount = 0,
  numParticles = 201;

gsap.set("svg", {
  visibility: "visible"
});

gsap.set(sparkle, {
  transformOrigin: "50% 50%",
  y: -100
});

// Create Christmas Lights
function createChristmasLights() {
  const treeLightsContainer = select('.treeLights');
  const lightPositions = [
    { x: 290, y: 180 }, { x: 320, y: 200 }, { x: 350, y: 190 },
    { x: 380, y: 210 }, { x: 410, y: 200 }, { x: 440, y: 220 },
    { x: 300, y: 250 }, { x: 340, y: 270 }, { x: 380, y: 260 },
    { x: 420, y: 280 }, { x: 460, y: 270 },
    { x: 310, y: 320 }, { x: 350, y: 340 }, { x: 390, y: 330 },
    { x: 430, y: 350 }, { x: 470, y: 340 },
    { x: 320, y: 390 }, { x: 360, y: 410 }, { x: 400, y: 400 },
    { x: 440, y: 420 }, { x: 480, y: 410 }
  ];

  const lightColors = ['#FFE5B4', '#FFD700', '#FFF8DC', '#FFFACD', '#F0E68C'];

  lightPositions.forEach((pos, i) => {
    const light = document.createElementNS(xmlns, 'circle');
    light.setAttribute('cx', pos.x);
    light.setAttribute('cy', pos.y);
    light.setAttribute('r', '3');
    light.setAttribute('fill', lightColors[i % lightColors.length]);
    light.setAttribute('class', 'tree-light');
    light.style.animationDelay = (Math.random() * 2) + 's';
    light.style.filter = 'blur(1px)';
    treeLightsContainer.appendChild(light);
  });

  // Animate lights in after tree animation
  gsap.to('.tree-light', {
    opacity: 1,
    delay: 12,
    duration: 1,
    stagger: 0.05
  });
}

let getSVGPoints = (path) => {
  let arr = [];
  var rawPath = MotionPathPlugin.getRawPath(path)[0];
  rawPath.forEach((el, value) => {
    let obj = {};
    obj.x = rawPath[value * 2];
    obj.y = rawPath[value * 2 + 1];
    if (value % 2) {
      arr.push(obj);
    }
  });

  return arr;
};

let treePath = getSVGPoints(".treePath");
var treeBottomPath = getSVGPoints(".treeBottomPath");
var mainTl = gsap.timeline({ delay: 0, repeat: 0 }),
  starTl;

function flicker(p) {
  gsap.killTweensOf(p, { opacity: true });
  gsap.fromTo(
    p,
    {
      opacity: 1
    },
    {
      duration: 0.07,
      opacity: Math.random(),
      repeat: -1
    }
  );
}

function createParticles() {
  var i = numParticles,
    p,
    particleTl,
    step = numParticles / treePath.length,
    pos;
  while (--i > -1) {
    p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
    mainSVG.appendChild(p);
    p.setAttribute("fill", particleColorArray[i % particleColorArray.length]);
    p.setAttribute("class", "particle");
    particlePool.push(p);
    gsap.set(p, {
      x: -100,
      y: -100,
      transformOrigin: "50% 50%"
    });
  }
}

var getScale = gsap.utils.random(0.5, 3, 0.001, true);

function playParticle(p) {
  if (!showParticle) {
    return;
  }
  var p = particlePool[particleCount];
  gsap.set(p, {
    x: gsap.getProperty(".pContainer", "x"),
    y: gsap.getProperty(".pContainer", "y"),
    scale: getScale()
  });
  var tl = gsap.timeline();
  tl.to(p, {
    duration: gsap.utils.random(0.61, 6),
    physics2D: {
      velocity: gsap.utils.random(-23, 23),
      angle: gsap.utils.random(-180, 180),
      gravity: gsap.utils.random(-6, 50)
    },
    scale: 0,
    rotation: gsap.utils.random(-123, 360),
    ease: "power1",
    onStart: flicker,
    onStartParams: [p],
    onRepeat: (p) => {
      gsap.set(p, {
        scale: getScale()
      });
    },
    onRepeatParams: [p]
  });

  particleCount++;
  particleCount = particleCount >= numParticles ? 0 : particleCount;
}

function drawStar() {
  starTl = gsap.timeline({ onUpdate: playParticle });
  starTl
    .to(".pContainer, .sparkle", {
      duration: 6,
      motionPath: {
        path: ".treePath",
        autoRotate: false
      },
      ease: "linear"
    })
    .to(".pContainer, .sparkle", {
      duration: 1,
      onStart: function () {
        showParticle = false;
      },
      x: treeBottomPath[0].x,
      y: treeBottomPath[0].y
    })
    .to(
      ".pContainer, .sparkle",
      {
        duration: 2,
        onStart: function () {
          showParticle = true;
        },
        motionPath: {
          path: ".treeBottomPath",
          autoRotate: false
        },
        ease: "linear"
      },
      "-=0"
    )
    .from(
      ".treeBottomMask",
      {
        duration: 2,
        drawSVG: "0% 0%",
        stroke: "#FFF",
        ease: "linear"
      },
      "-=2"
    );
}

createParticles();
drawStar();
createChristmasLights();

mainTl
  .from([".treePathMask", ".treePotMask"], {
    duration: 6,
    drawSVG: "0% 0%",
    stroke: "#FFF",
    stagger: {
      each: 6
    },
    duration: gsap.utils.wrap([6, 1, 2]),
    ease: "linear"
  })
  .from(
    ".treeStar",
    {
      duration: 3,
      scaleY: 0,
      scaleX: 0.15,
      transformOrigin: "50% 50%",
      ease: "elastic(1,0.5)"
    },
    "-=4"
  )
  .to(
    ".sparkle",
    {
      duration: 3,
      opacity: 0,
      ease:
        "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})"
    },
    "-=0"
  )
  .to(
    ".treeStarOutline",
    {
      duration: 1,
      opacity: 1,
      ease:
        "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})"
    },
    "+=1"
  );

mainTl.add(starTl, 0);
gsap.globalTimeline.timeScale(1.5);