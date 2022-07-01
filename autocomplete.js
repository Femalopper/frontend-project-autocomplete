let alternatingWords = `aardvark
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

alternatingWords = alternatingWords.split("\n");

const autocomplete = (selector, btn) => {
  const button = document.getElementById(btn);
  const copyButton = document.getElementById("copy__button");

  let numOfFilledInputs = 0;
  let inputs = document.querySelectorAll(selector);

  inputs.forEach((input, index) => {
    inputs[0].focus();
    input.classList.add("autocomplete-input");
    let wrap = document.createElement("div");
    wrap.className = "autocomplete-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    let list = document.createElement("div");
    list.className = "autocomplete-list";
    wrap.appendChild(list);

    let listItems = [];
    let focusedItem = -1;

    const setActive = (active = true) => {
      if (active) {
        wrap.classList.add("active");
      } else {
        wrap.classList.remove("active");
      }
    };

    const focusItem = (index) => {
      if (!listItems.length) return false;
      if (index > listItems.length - 1) return focusItem(0);
      if (index < 0) return focusItem(listItems.length - 1);
      focusedItem = index;
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

    const buttonSwitcher = () => {
      if (numOfFilledInputs === inputs.length) {
        button.removeAttribute("disabled");
        if (btn === "submit__button") {
          copyButton.focus();
        } else button.focus();
      } else {
        button.setAttribute("disabled", "disabled");
      }
    };

    const autofocus = (field) => {
      let current = +field.getAttribute("tabindex") + 1;
      for (let i = inputs.length; (i -= 1); ) {
        let next = inputs[i].getAttribute("tabindex");
        if (next == current) inputs[i].focus();
      }
    };

    buttonSwitcher();

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
          buttonSwitcher();
          if (!button.hasAttribute("disabled")) {
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
      let str = input.value;
      if (!str) return setActive(false);

      listItems = [];
      list.innerHTML = "";

      let arrOfInputSymbols = str.toLowerCase().split("");

      const filteredList = (letter, arr) =>
        arr.filter((word) => {
          word = word.toLowerCase();
          if (
            word[arrOfInputSymbols.indexOf(letter)] === letter &&
            word[arrOfInputSymbols.lastIndexOf(letter)] === letter
          ) {
            return word;
          }
        });

      arrOfInputSymbols = arrOfInputSymbols.reduce((acc, element) => {
        acc = filteredList(element, acc);
        return acc;
      }, alternatingWords);

      arrOfInputSymbols.map((word) => {
        let item = document.createElement("div");
        item.className = "autocomplete-item";
        item.innerText = word;
        list.appendChild(item);
        listItems.push(item);

        item.addEventListener("click", function () {
          selectItem(listItems.indexOf(item));
          if (selectItem && !input.classList.contains("filled")) {
            input.classList.add("filled");
            numOfFilledInputs += 1;
            autofocus(input);
            buttonSwitcher();
          }
        });
      });

      if (listItems.length > 0) {
        focusItem(0);
        setActive(true);
      } else {
        setActive(false);
      }
    });

    input.addEventListener("keydown", (e) => {
      let keyCode = e.keyCode;

      if (inputs.length === numOfFilledInputs && keyCode !== 17) {
        input.classList.remove("filled");
        numOfFilledInputs -= 1;
        buttonSwitcher();
      }

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
        input.blur();
        if (
          alternatingWords.includes(input.value) &&
          !input.classList.contains("filled")
        ) {
          input.classList.add("filled");
          numOfFilledInputs += 1;
          autofocus(input);
          buttonSwitcher();
        } else if (
          alternatingWords.includes(input.value) &&
          input.classList.contains("filled")
        ) {
          autofocus(input);
        } else if (
          !alternatingWords.includes(input.value) &&
          input.classList.contains("filled")
        ) {
          input.classList.remove("filled");
          autofocus(input);
          numOfFilledInputs -= 1;
          buttonSwitcher();
        } else if (
          !alternatingWords.includes(input.value) &&
          !input.classList.contains("filled")
        ) {
          autofocus(input);
        }
      } else if (keyCode === 8) {
        // delete
        if (input.classList.contains("filled")) {
          input.classList.remove("filled");
          numOfFilledInputs -= 1;
          buttonSwitcher();
        }
      } else if (keyCode === 9) {
        // tab
        setActive(false);
      }
    });

    document.body.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) setActive(false);
      if (
        !alternatingWords.includes(input.value) &&
        input.classList.contains("filled")
      ) {
        input.classList.remove("filled");
        numOfFilledInputs -= 1;
        buttonSwitcher();
      }
    });
  });
};

const confirmForm = (str1, str2, arrOfInputs2) => {
  const title = document.getElementById("title");

  if (str1 === str2) {
    arrOfInputs2.forEach((input) => {
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
