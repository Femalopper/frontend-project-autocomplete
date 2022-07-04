let alternatingWords = `aardvark,
adroitness
absurd
adviser
accrue
aftermath
acme
aggregate
adrift
alkali
adult
almighty
afflict
amulet
ahead
amusement
aimless
antenna
Algol
applicant
allow
Apollo
alone
armistice
ammo
article
ancient
asteroid
apple
Atlantic
artist
atmosphere
assume
autopsy
Athens
Babylon
atlas
backwater
Aztec
barbecue
baboon
belowground
backfield
bifocals
backward
bodyguard
banjo
bookseller
beaming
borderline
bedlamp
bottomless
beehive
Bradbury
beeswax
bravado
befriend
Brazilian
Belfast
breakaway
berserk
Burlington
billiard
businessman
bison
butterfat
blackjack
Camelot
blockade
candidate
blowtorch
cannonball
bluebird
Capricorn
bombast
caravan
bookshelf
caretaker
brackish
celebrate
breadline
cellulose
breakup
certify
brickyard
chambermaid
briefcase
Cherokee
Burbank
Chicago
button
clergyman
buzzard
coherence
cement
combustion
chairlift
commando
chatter
company
checkup
component
chisel
concurrent
choking
confidence
chopper
conformist
Christmas
congregate
clamshell
consensus
classic
consulting
classroom
corporate
cleanup
corrosion
clockwork
councilman
cobra
crossover
commence
crucifix
concert
cumbersome
cowbell
customer
crackdown
Dakota
cranky
decadence
crowfoot
December
crucial
decimal
crumpled
designing
crusade
detector
cubic
detergent
dashboard
determine
deadbolt
dictator
deckhand
dinosaur
dogsled
direction
dragnet
disable
drainage
disbelief
dreadful
disruptive
drifter
distortion
dropper
document
drumbeat
embezzle
drunken
enchanting
Dupont
enrollment
dwelling
enterprise
eating
equation
edict
equipment
egghead
escapade
eightball
Eskimo
endorse
everyday
endow
examine
enlist
existence
erase
exodus
escape
fascinate
exceed
filament
eyeglass
finicky
eyetooth
forever
facial
fortitude
fallout
frequency
flagpole
gadgetry
flatfoot
Galveston
flytrap
getaway
fracture
glossary
framework
gossamer
freedom
graduate
frighten
gravity
gazelle
guitarist
Geiger
hamburger
glitter
Hamilton
glucose
handiwork
goggles
hazardous
goldfish
headwaters
gremlin
hemisphere
guidance
hesitate
hamlet
hideaway
highchair
holiness
hockey
hurricane
indoors
hydraulic
indulge
impartial
inverse
impetus
involve
inception
island
indigo
jawbone
inertia
keyboard
infancy
kickoff
inferno
kiwi
informant
klaxon
insincere
locale
insurgent
lockup
integrate
merit
intention
minnow
inventive
miser
Istanbul
Mohawk
Jamaica
mural
Jupiter
music
leprosy
necklace
letterhead
Neptune
liberty
newborn
maritime
nightbird
matchmaker
Oakland
maverick
obtuse
Medusa
offload
megaton
optic
microscope
orca
microwave
payday
midsummer
peachy
millionaire
pheasant
miracle
physique
misnomer
playhouse
molasses
Pluto
molecule
preclude
Montana
prefer
monument
preshrunk
mosquito
printer
narrative
prowler
nebula
pupil
newsletter
puppy
Norwegian
python
October
quadrant
Ohio
quiver
onlooker
quota
opulent
ragtime
Orlando
ratchet
outfielder
rebirth
Pacific
reform
pandemic
regain
Pandora
reindeer
paperweight
rematch
paragon
repay
paragraph
retouch
paramount
revenge
passenger
reward
pedigree
rhythm
Pegasus
ribcage
penetrate
ringbolt
perceptive
robust
performance
rocker
pharmacy
ruffled
phonetic
sailboat
photograph
sawdust
pioneer
scallion
pocketful
scenic
politeness
scorecard
positive
Scotland
potato
seabird
processor
select
provincial
sentence
proximate
shadow
puberty
shamrock
publisher
showgirl
pyramid
skullcap
quantity
skydive
racketeer
slingshot
rebellion
slowdown
recipe
snapline
recover
snapshot
repellent
snowcap
replica
snowslide
reproduce
solo
resistor
southward
responsive
soybean
retraction
spaniel
retrieval
spearhead
retrospect
spellbind
revenue
spheroid
revival
spigot
revolver
spindle
sandalwood
spyglass
sardonic
stagehand
Saturday
stagnate
savagery
stairway
scavenger
standard
sensation
stapler
sociable
steamship
souvenir
sterling
specialist
stockman
speculate
stopwatch
stethoscope
stormy
stupendous
sugar
supportive
surmount
surrender
suspense
suspicious
sweatband
sympathy
swelter
tambourine
tactics
telephone
talon
therapist
tapeworm
tobacco
tempest
tolerance
tiger
tomorrow
tissue
torpedo
tonic
tradition
topmost
travesty
tracker
trombonist
transit
truncated
trauma
typewriter
treadmill
ultimate
Trojan
undaunted
trouble
underfoot
tumor
unicorn
tunnel
unify
tycoon
universe
uncut
unravel
unearth
upcoming
unwind
vacancy
uproot
vagabond
upset
vertigo
upshot
Virginia
vapor
visitor
village
vocalist
virus
voyager
Vulcan
warranty
waffle
Waterloo
wallet
whimsical
watchword
Wichita
wayside
Wilmington
willow
Wyoming
woodlark
yesteryear
Zulu
Yucatan`;

alternatingWords = alternatingWords.split(/[\s,]+/); // convert string to array, separating words with commas or any spaces

const autocomplete = (selector, btn) => {
  const confirmOrSubmitBtn = document.getElementById(btn);
  const copyButton = document.getElementById("copy__button");
  let numOfFilledInputs = 0;
  const inputs = document.querySelectorAll(selector);

  inputs.forEach((input, index) => {
    inputs[0].focus();
    input.classList.add("autocomplete-input");
    const wrap = document.createElement("div"); // wrap for input
    wrap.className = "autocomplete-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const list = document.createElement("div"); // the list of hints
    list.className = "autocomplete-list";
    wrap.appendChild(list);

    let listItems = [];
    let focusedItem = -1;

    //launch visiability of the list of hints
    const setActive = (active = true) => {
      if (active) {
        wrap.classList.add("active");
      } else {
        wrap.classList.remove("active");
      }
    };

    //focus item of the list during pressing arrow down, up or tab keys
    const focusItem = (ind) => {
      if (!listItems.length) return false;
      if (ind > listItems.length - 1) return focusItem(0);
      if (ind < 0) return focusItem(listItems.length - 1);
      focusedItem = ind;
      unfocusAllItems();
      listItems[focusedItem].classList.add("focused");
      listItems[focusedItem].scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    };

    const unfocusAllItems = () => {
      listItems.forEach((item) => {
        item.classList.remove("focused");
      });
    };

    const selectItem = (index) => {
      if (!listItems[index]) return false;
      input.value = listItems[index].innerText;
      setActive(false);
    };

    const btnVisiabilitySwitch = () => {
      if (numOfFilledInputs === inputs.length) {
        confirmOrSubmitBtn.removeAttribute("disabled");
        if (btn === "submit__button") {
          copyButton.focus();
        } else confirmOrSubmitBtn.focus();
      } else {
        confirmOrSubmitBtn.setAttribute("disabled", "disabled");
      }
    };

    //focus next field after filling current field
    const autofocus = (field) => {
      const nextField = +field.getAttribute("tabindex") + 1;

      for (let i = inputs.length; (i -= 1); ) {
        const currentInput = inputs[i].getAttribute("tabindex");
        if (currentInput == nextField) inputs[i].focus();
      }
    };

    btnVisiabilitySwitch();

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      let paste = (e.clipboardData || window.clipboardData).getData("text");
      paste = paste.trim();
      let copiedInputs = paste.split(/[\s,]+/);
      let currentInputIndex = index;
      copiedInputs = copiedInputs.slice(0, inputs.length - currentInputIndex);

      for (let i = 0; i < copiedInputs.length; i += 1) {
        if (inputs[currentInputIndex].classList.contains("filled")) {
          numOfFilledInputs -= 1;
        }
        inputs[currentInputIndex].value = copiedInputs[i];
        if (alternatingWords.includes(inputs[currentInputIndex].value)) {
          inputs[currentInputIndex].classList.add("filled");
          numOfFilledInputs += 1;
          btnVisiabilitySwitch();
          if (!confirmOrSubmitBtn.hasAttribute("disabled")) {
            copyButton.focus();
          } else {
            autofocus(inputs[currentInputIndex]);
          }
        } else {
          inputs[currentInputIndex].classList.remove("filled");
        }
        currentInputIndex += 1;
      }
    });

    input.addEventListener("input", () => {
      const value = input.value;
      if (!value) return setActive(false);

      listItems = []; //clear the array on every input change
      list.innerHTML = ""; //clear the list of hints on every input change

      const inputLetters = value.toLowerCase().split("");
      //filter the list of hints according to the pressed key
      const filterHintsList = (letter, arr) =>
        arr.filter((word) => {
          word = word.toLowerCase();
          if (
            word[inputLetters.indexOf(letter)] === letter &&
            word[inputLetters.lastIndexOf(letter)] === letter
          ) {
            return word;
          }
        });

      //the corresponding list of hints
      const filteredHintsList = inputLetters.reduce((acc, letter) => {
        acc = filterHintsList(letter, acc);
        return acc;
      }, alternatingWords);

      filteredHintsList.map((word) => {
        //map each word of the corresponding list of hints
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.innerText = word;
        list.appendChild(item);
        listItems.push(item);
        //clicking the mapped word
        item.addEventListener("click", function () {
          selectItem(listItems.indexOf(item));
          if (selectItem && !input.classList.contains("filled")) {
            input.classList.add("filled");
            numOfFilledInputs += 1;
            autofocus(input);
            btnVisiabilitySwitch();
          }
        });
      });

      if (listItems.length > 0) {
        focusItem(0);
        setActive(true);
      } else {
        setActive(false);
      }
      //changing the filled field
      if (input.classList.contains("filled")) {
        input.classList.remove("filled");
        numOfFilledInputs -= 1;
        btnVisiabilitySwitch();
      }
    });

    //event is fired when a key is pressed
    input.addEventListener("keydown", (e) => {
      const keyCode = e.keyCode;

      if (keyCode === 40) {
        // arrow down
        e.preventDefault();
        focusedItem += 1;
        focusItem(focusedItem);
      } else if (keyCode === 38) {
        // arrow up
        if (focusedItem > 0) focusedItem -= 1;
        focusItem(focusedItem);
        e.preventDefault();
      } else if (keyCode === 27) {
        // escape
        setActive(false);
      } else if (keyCode === 13) {
        // enter
        e.preventDefault();
        selectItem(focusedItem);
        if (
          alternatingWords.includes(input.value) &&
          !input.classList.contains("filled")
        ) {
          input.classList.add("filled");
          numOfFilledInputs += 1;
          autofocus(input);
          btnVisiabilitySwitch();
        } else if (
          !alternatingWords.includes(input.value) &&
          input.classList.contains("filled")
        ) {
          input.classList.remove("filled");
          autofocus(input);
          numOfFilledInputs -= 1;
          btnVisiabilitySwitch();
        } else if (
          !alternatingWords.includes(input.value) &&
          !input.classList.contains("filled")
        ) {
          autofocus(input);
        } else if (
          alternatingWords.includes(input.value) &&
          input.classList.contains("filled")
        ) {
          autofocus(input);
        }
      } else if (keyCode === 8) {
        // delete
        if (input.classList.contains("filled")) {
          input.classList.remove("filled");
          numOfFilledInputs -= 1;
          btnVisiabilitySwitch();
        }
      } else if (keyCode === 9) {
        // tab
        if (focusedItem >= 0 && !input.classList.contains("filled")) {
          //focus on elements in the list of hints
          e.preventDefault();
          focusedItem++;
          focusItem(focusedItem);
        }
      }
    });

    //clicking somewhere else excluding inputs
    document.body.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) setActive(false);
    });
  });
};

const confirmForm = (submittedStr, strToConfirm, inputsToConfirm) => {
  const title = document.getElementById("title");

  if (submittedStr === strToConfirm) {
    inputsToConfirm.forEach((input) => {
      title.style.display = "none";
      const success = document.getElementById("success");
      success.style.display = "flex";
      input.setAttribute("disabled", "disabled");
      input.classList.add("input__out");
      btn = document.getElementById("confirm__button");
      btn.setAttribute("disabled", "disabled");
      btn.classList.add("btn_out");
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mistake! Try again!",
      confirmButtonColor: "rgba(127, 255, 212, 0.4)",
    });
  }
};
