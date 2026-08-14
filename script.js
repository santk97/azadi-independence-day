/* ============================================================
   आज़ादी — behaviour
   ============================================================ */

/* ---- Ashoka Chakra, generated (24 spokes, as on the flag) ---- */
function buildChakra(svg){
  if(!svg) return;
  const ns = "http://www.w3.org/2000/svg";
  const cx = 50, cy = 50, rOuter = 46, rInner = 6, spokeInner = 9;
  svg.setAttribute("viewBox", "0 0 100 100");

  const ring = document.createElementNS(ns, "circle");
  ring.setAttribute("cx", cx); ring.setAttribute("cy", cy); ring.setAttribute("r", rOuter);
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "currentColor");
  ring.setAttribute("stroke-width", "2.5");
  svg.appendChild(ring);

  const hub = document.createElementNS(ns, "circle");
  hub.setAttribute("cx", cx); hub.setAttribute("cy", cy); hub.setAttribute("r", rInner);
  hub.setAttribute("fill", "currentColor");
  svg.appendChild(hub);

  const spokes = 24;
  for(let i = 0; i < spokes; i++){
    const angle = (i / spokes) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * spokeInner;
    const y1 = cy + Math.sin(angle) * spokeInner;
    const x2 = cx + Math.cos(angle) * rOuter;
    const y2 = cy + Math.sin(angle) * rOuter;
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", x1.toFixed(2)); line.setAttribute("y1", y1.toFixed(2));
    line.setAttribute("x2", x2.toFixed(2)); line.setAttribute("y2", y2.toFixed(2));
    line.setAttribute("stroke", "currentColor");
    line.setAttribute("stroke-width", "1.6");
    svg.appendChild(line);
  }
  svg.style.color = "var(--gold)";
}
["heroChakraBg","navChakra","footerChakra","quizChakraIcon","quizChakraIcon2"].forEach(id => buildChakra(document.getElementById(id)));

/* ---- Mobile nav menu ---- */
(function mobileNav(){
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMobileMenu");
  if(!toggle || !menu) return;
  const ICON_OPEN = '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
  const ICON_CLOSE = '<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
  const icon = document.getElementById("navToggleIcon");

  function setOpen(isOpen){
    menu.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    icon.innerHTML = isOpen ? ICON_CLOSE : ICON_OPEN;
  }

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll(".nav-mobile-link").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && menu.classList.contains("open")) setOpen(false);
  });
})();

/* ---- Hero backdrop: starfield, shooting stars, embers, parallax ---- */
(function heroBackdrop(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const starsWrap = document.getElementById("heroStars");
  const embersWrap = document.getElementById("heroEmbers");
  const canvas = document.getElementById("heroFx");
  const heroEl = document.querySelector(".hero");
  if(!heroEl) return;

  // Starfield: scattered points with individual twinkle timing
  if(starsWrap){
    const count = 90;
    const frag = document.createDocumentFragment();
    for(let i = 0; i < count; i++){
      const s = document.createElement("span");
      s.className = "star";
      const size = (Math.random() * 1.6 + 0.8).toFixed(2);
      s.style.left = (Math.random() * 100).toFixed(2) + "%";
      s.style.top = (Math.random() * 62).toFixed(2) + "%";
      s.style.setProperty("--s", size + "px");
      s.style.setProperty("--o", (Math.random() * 0.5 + 0.4).toFixed(2));
      s.style.setProperty("--dur", (Math.random() * 3 + 2.5).toFixed(2) + "s");
      s.style.setProperty("--delay", (Math.random() * 5).toFixed(2) + "s");
      frag.appendChild(s);
    }
    starsWrap.appendChild(frag);
  }

  // Embers: rising particles
  if(embersWrap && !reduceMotion){
    const count = 16;
    const frag = document.createDocumentFragment();
    for(let i = 0; i < count; i++){
      const e = document.createElement("span");
      e.className = "ember";
      e.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "%");
      e.style.setProperty("--sz", (Math.random() * 2.5 + 1.5).toFixed(2) + "px");
      e.style.setProperty("--dur", (Math.random() * 8 + 10).toFixed(2) + "s");
      e.style.setProperty("--delay", (Math.random() * 14).toFixed(2) + "s");
      e.style.setProperty("--drift", (Math.random() * 80 - 40).toFixed(0) + "px");
      frag.appendChild(e);
    }
    embersWrap.appendChild(frag);
  }

  // Shooting stars: occasional streak drawn on canvas
  if(canvas && !reduceMotion){
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let shooting = null;
    function spawnShootingStar(){
      const startX = Math.random() * w * 0.6 + w * 0.1;
      const startY = Math.random() * h * 0.25;
      const len = Math.random() * 90 + 70;
      const angle = Math.PI * 0.22;
      shooting = {
        x: startX, y: startY,
        vx: Math.cos(angle) * 9, vy: Math.sin(angle) * 9,
        life: 0, maxLife: 40, len
      };
    }
    function scheduleNext(){
      setTimeout(() => { spawnShootingStar(); scheduleNext(); }, Math.random() * 9000 + 7000);
    }
    scheduleNext();

    function frame(){
      ctx.clearRect(0, 0, w, h);
      if(shooting){
        shooting.life++;
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        const alpha = 1 - shooting.life / shooting.maxLife;
        if(alpha > 0){
          const tailX = shooting.x - Math.cos(0.22 * Math.PI) * shooting.len;
          const tailY = shooting.y - Math.sin(0.22 * Math.PI) * shooting.len;
          const grad = ctx.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        } else {
          shooting = null;
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Parallax: layers drift at different rates as the hero scrolls past
  if(!reduceMotion){
    const sky = document.getElementById("heroSky");
    const skyline = document.getElementById("heroSkyline");
    const sunWrap = document.getElementById("heroSunWrap");
    const stars = starsWrap;
    let ticking = false;
    function applyParallax(){
      const rect = heroEl.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      if(stars) stars.style.transform = `translateY(${progress * 40}px)`;
      if(sunWrap) sunWrap.style.transform = `translate(-50%, calc(45% + ${progress * -30}px))`;
      if(skyline) skyline.style.transform = `translateY(${progress * 60}px)`;
      if(sky) sky.style.transform = `translateY(${progress * 20}px)`;
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if(!ticking){ requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    applyParallax();
  }
})();

/* ---- Rotating verified quotes ---- */
const QUOTES = [
  { text: "At the stroke of the midnight hour, while the world sleeps, India will awake to life and freedom.", attr: "Jawaharlal Nehru · Constituent Assembly, 14 August 1947" },
  { text: "Give me blood, and I shall give you freedom!", attr: "Subhas Chandra Bose · Burma, July 1944" },
  { text: "Swaraj is my birthright, and I shall have it.", attr: "Bal Gangadhar Tilak" },
  { text: "I want world sympathy in this battle of Right against Might.", attr: "Mahatma Gandhi · on the eve of the Salt March, 1930" },
  { text: "Inquilab Zindabad.", attr: "Bhagat Singh, “Long live the revolution”" },
  { text: "Do or Die.", attr: "Mahatma Gandhi · launching the Quit India Movement, 8 August 1942" },
  { text: "The blows struck at me today will be the last nails in the coffin of British rule in India.", attr: "Lala Lajpat Rai · 1928" },
  { text: "मैं अपनी झांसी नहीं दूंगी — “I will not give up my Jhansi.”", attr: "Rani Lakshmibai · as popularly recorded" },
];

(function quoteRotator(){
  const textEl = document.getElementById("heroQuoteText");
  const citeEl = document.getElementById("heroQuoteCite");
  if(!textEl || !citeEl) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;

  function show(i){
    textEl.textContent = `“${QUOTES[i].text}”`;
    citeEl.textContent = QUOTES[i].attr;
  }

  if(reduceMotion) return;

  setInterval(() => {
    textEl.classList.add("fading");
    citeEl.classList.add("fading");
    setTimeout(() => {
      index = (index + 1) % QUOTES.length;
      show(index);
      textEl.classList.remove("fading");
      citeEl.classList.remove("fading");
    }, 500);
  }, 7000);
})();

/* ---- Heroes gallery data ---- */
const WIKI = (title) => `https://en.wikipedia.org/wiki/${title}`;

const HEROES = [
  {
    name: "Mahatma Gandhi", years: "1869 – 1948", role: "Leader, Civil Disobedience",
    img: "assets/heroes/gandhi.jpg", images: ["assets/heroes/gandhi_2.jpg"],
    imageCaption: "With the Natal Indian Congress in South Africa, where satyagraha was first tested",
    link: WIKI("Mahatma_Gandhi"),
    bio: "Trained as a barrister in London, he returned from two decades in South Africa to lead India's independence movement through non-violent resistance — non-cooperation, salt satyagraha, and Quit India.",
    bioLong: [
      "Born in Porbandar, trained as a barrister in London, and shaped by over two decades in South Africa, where he first developed satyagraha — non-violent resistance — while fighting discriminatory laws against Indian migrants.",
      "Returning to India in 1915, he took charge of the Congress and reoriented the freedom movement around mass, non-violent civil disobedience: the Non-Cooperation Movement of 1920, the Salt March of 1930, and the Quit India Movement of 1942 each drew millions of ordinary Indians into the struggle for the first time.",
      "He was assassinated on 30 January 1948, months after independence, by a Hindu nationalist opposed to his insistence on protecting India's Muslim minority — a final act of violence against a life built on its rejection."
    ],
    quote: "I want world sympathy in this battle of Right against Might. — on the eve of the Salt March, 1930"
  },
  {
    name: "Jawaharlal Nehru", years: "1889 – 1964", role: "First Prime Minister of India",
    img: "assets/heroes/nehru.jpg", images: ["assets/heroes/nehru_2.jpg"],
    imageCaption: "With Rabindranath Tagore, 1936",
    link: WIKI("Jawaharlal_Nehru"),
    bio: "A Congress leader since the 1920s and Gandhi's chosen successor, he became free India's first Prime Minister and delivered the address that named the moment of independence.",
    bioLong: [
      "Educated at Harrow and Cambridge, Nehru returned to India to practice law before being drawn into the Congress movement under Gandhi's influence in the early 1920s, becoming the voice of its younger, more left-leaning wing.",
      "He served multiple prison terms during the independence struggle — cumulatively over nine years — and rose to become Congress President and Gandhi's chosen successor.",
      "As India's first Prime Minister from 1947 to 1964, he set the country's early direction: parliamentary democracy, industrial planning, and a foreign policy of non-alignment during the Cold War."
    ],
    quote: "Long years ago we made a tryst with destiny. — Constituent Assembly, 14 August 1947"
  },
  {
    name: "Subhas Chandra Bose", years: "1897 – 1945", role: "Founder, Indian National Army",
    img: "assets/heroes/bose.jpg", images: ["assets/heroes/bose_2.jpg"],
    imageCaption: "At the inauguration of the India Society, Prague, 1926",
    link: WIKI("Subhas_Chandra_Bose"),
    bio: "“Netaji” escaped house arrest in 1941, reached Southeast Asia, and formed the Provisional Government of Free India and the Indian National Army to fight British rule from abroad.",
    bioLong: [
      "A brilliant student who cleared the Indian Civil Service exam in England before resigning it to join the freedom movement, Bose grew impatient with Gandhi's gradualism and pushed for a more assertive, even militant, path to independence.",
      "Placed under house arrest by the British in Calcutta in 1941, he escaped in disguise, travelled overland to Afghanistan and then by German and Japanese submarines to Southeast Asia — one of the most audacious escapes of the era.",
      "There he took command of the Indian National Army and formed the Provisional Government of Azad Hind, fighting alongside Japanese forces on the Indo-Burma frontier. He is reported to have died in a plane crash in Taiwan in August 1945, though the circumstances remain debated in India to this day."
    ],
    quote: "Give me blood, and I shall give you freedom! — Burma, July 1944"
  },
  {
    name: "Bhagat Singh", years: "1907 – 1931", role: "Revolutionary",
    img: "assets/heroes/bhagatsingh.jpg", images: ["assets/heroes/bhagatsingh_2.jpg"],
    imageCaption: "A poster from the 1929 hunger strike he led in jail with Batukeshwar Dutt",
    link: WIKI("Bhagat_Singh"),
    bio: "Hanged at 23 for the Assembly bombing and the killing of a British police officer, his fearless conduct through trial made him the era's most enduring symbol of youthful sacrifice.",
    bioLong: [
      "Drawn into revolutionary politics as a teenager, Bhagat Singh co-founded the Hindustan Socialist Republican Association, believing that armed resistance, not only non-violence, had a place in the fight for freedom.",
      "In 1929 he and Batukeshwar Dutt threw non-lethal bombs into the Central Legislative Assembly in Delhi to protest repressive laws, then courted arrest rather than flee — using the ensuing trial as a public platform for his ideas.",
      "Convicted for the earlier killing of a British police officer, he was hanged in Lahore on 23 March 1931 at the age of 23. His calm, articulate defiance through the trial made him a lasting symbol for a more radical generation of the movement."
    ],
    quote: "Inquilab Zindabad — “Long live the revolution,” the slogan he made immortal"
  },
  {
    name: "Rani Lakshmibai", years: "c. 1828 – 1858", role: "Warrior Queen of Jhansi",
    img: "assets/heroes/lakshmibai.jpg", images: ["assets/heroes/lakshmibai_2.png"],
    imageCaption: "Watercolour on ivory, c. 1857 — another period likeness, not a photograph",
    link: WIKI("Rani_of_Jhansi"),
    bio: "Refusing the British annexation of her state, she led her forces in the 1857 uprising and died on the battlefield at Gwalior — the revolt's most fearless symbol.",
    bioLong: [
      "Born Manikarnika Tambe in Varanasi, she became Queen of Jhansi through her marriage to Raja Gangadhar Rao and was widowed young, left with an adopted son the British refused to recognise as heir.",
      "When the East India Company annexed Jhansi under the Doctrine of Lapse, she refused to surrender it, and during the 1857 uprising led her own troops into battle against Company forces.",
      "She died fighting at Gwalior on 18 June 1858, sword in hand by most accounts, and became independent India's most enduring symbol of a woman warrior who chose death over submission."
    ],
    quote: "मैं अपनी झांसी नहीं दूंगी — “I will not give up my Jhansi,” as popularly recorded",
    photoNote: "Posthumous painting — no verified photograph survives"
  },
  {
    name: "Sardar Vallabhbhai Patel", years: "1875 – 1950", role: "“Iron Man of India”",
    img: "assets/heroes/patel.jpg", images: ["assets/heroes/patel_2.jpg"],
    imageCaption: "With Gandhi during the Bardoli Satyagraha, the campaign that earned him the title “Sardar”",
    link: WIKI("Vallabhbhai_Patel"),
    bio: "India's first Deputy Prime Minister and Home Minister, he is remembered above all for the political integration of over 560 princely states into the Indian Union after 1947.",
    bioLong: [
      "A successful lawyer before he joined the freedom movement, Patel organised peasant satyagrahas in Kheda and Bardoli that won him the title “Sardar,” meaning chief, and a reputation as an exceptional organiser.",
      "He served as a close lieutenant to Gandhi within the Congress and, after independence, became India's first Deputy Prime Minister and Home Minister.",
      "His defining achievement was persuading — and where necessary pressuring — over 560 princely states to accede to the Indian Union, a feat of political integration that gave the new republic its territorial shape."
    ]
  },
  {
    name: "Chandrashekhar Azad", years: "1906 – 1931", role: "Revolutionary",
    img: "assets/heroes/azad_csa.jpg", images: [],
    link: WIKI("Chandrashekhar_Azad"),
    bio: "A founder of the Hindustan Socialist Republican Association, he vowed never to be captured alive — and kept that vow in a final gun battle at Allahabad's Alfred Park in 1931.",
    bioLong: [
      "Arrested for the first time at 15 for participating in the Non-Cooperation Movement, Azad vowed after Gandhi called off that campaign to never again be taken alive by the British.",
      "He became a key organiser of the Hindustan Socialist Republican Association after the original founders were captured, mentoring younger revolutionaries including Bhagat Singh.",
      "Surrounded by police at Allahabad's Alfred Park on 27 February 1931, he fought until his last bullet and then shot himself rather than surrender, keeping the vow that gave him his adopted name — Azad, “the free.”"
    ],
    quote: "Azad we have lived, and Azad we shall die. — attributed, on his refusal to surrender"
  },
  {
    name: "Bal Gangadhar Tilak", years: "1856 – 1920", role: "“Lokmanya”, early nationalist leader",
    img: "assets/heroes/tilak.png", images: [],
    link: WIKI("Bal_Gangadhar_Tilak"),
    bio: "One of the first leaders to demand Swaraj as a matter of right rather than a colonial concession, he turned local festivals into vehicles of mass political awakening.",
    bioLong: [
      "A scholar and journalist known as “Lokmanya” — accepted by the people as their leader — Tilak was among the first Congress figures to demand Swaraj as an unconditional right rather than a favour to be negotiated from the British.",
      "He turned the Ganesh Chaturthi and Shivaji Jayanti festivals into vehicles for mass political gatherings at a time when public assembly was heavily restricted, pioneering a template for popular mobilisation later generations would build on.",
      "Imprisoned multiple times for sedition, including a six-year term in Mandalay, he co-founded the Home Rule League in 1916 and remained a defining voice of the movement's early, uncompromising wing until his death in 1920."
    ],
    quote: "Swaraj is my birthright, and I shall have it."
  },
  {
    name: "Sarojini Naidu", years: "1879 – 1949", role: "“Nightingale of India”, poet",
    img: "assets/heroes/naidu.jpg", images: ["assets/heroes/naidu_2.jpg"],
    imageCaption: "With Gandhi, 1930, during the Salt Movement she helped lead after his arrest",
    link: WIKI("Sarojini_Naidu"),
    bio: "Poet and orator, she became the first Indian woman President of the Congress and led the Dharasana Satyagraha after Gandhi's arrest during the Salt Movement.",
    bioLong: [
      "A published poet by her teens and educated at Cambridge, Naidu earned the epithet “Nightingale of India” for verse steeped in Indian imagery before turning fully to political life.",
      "She became the first Indian woman to serve as President of the Indian National Congress in 1925, and led the Dharasana Satyagraha in 1930 after Gandhi's arrest during the Salt Movement, directing the raid on the salt works while British police baton-charged unresisting protesters.",
      "After independence she was appointed Governor of the United Provinces, becoming free India's first woman governor."
    ]
  },
  {
    name: "Lala Lajpat Rai", years: "1865 – 1928", role: "“Punjab Kesari”",
    img: "assets/heroes/lajpatrai.jpg", images: [],
    link: WIKI("Lala_Lajpat_Rai"),
    bio: "A fiery orator of the movement's early “Lal-Bal-Pal” triumvirate, he died from injuries sustained leading a protest against the Simon Commission in 1928.",
    bioLong: [
      "Known as “Punjab Kesari” — the Lion of Punjab — Lajpat Rai was part of the fiery “Lal-Bal-Pal” triumvirate alongside Bal Gangadhar Tilak and Bipin Chandra Pal, who pushed the Congress toward a more assertive nationalism in the early 1900s.",
      "In 1928 he led a march in Lahore protesting the all-British Simon Commission, sent to recommend constitutional reform for India without a single Indian member.",
      "Police baton-charged the march and Lajpat Rai was struck repeatedly; he died from his injuries weeks later, on 17 November 1928 — a death that directly radicalised Bhagat Singh's generation of revolutionaries."
    ],
    quote: "The blows struck at me today will be the last nails in the coffin of British rule in India."
  },
  {
    name: "Maulana Abul Kalam Azad", years: "1888 – 1958", role: "Scholar-statesman",
    img: "assets/heroes/azad_akm.jpg", images: [],
    link: WIKI("Abul_Kalam_Azad"),
    bio: "The youngest-ever President of the Congress, and a lifelong voice for Hindu-Muslim unity against Partition, he became independent India's first Minister of Education.",
    bioLong: [
      "A scholar of Islamic theology fluent in several languages by his teens, Azad became the youngest-ever President of the Indian National Congress in 1923, at 35.",
      "A lifelong and outspoken opponent of the demand for Partition, he argued that a shared, plural India was both possible and necessary, and remained one of the most prominent Muslim leaders within the Congress rather than the Muslim League.",
      "After independence he became India's first Minister of Education, laying foundations for the country's university and school systems, including the establishment of the UGC and the IITs."
    ]
  },
  {
    name: "Khudiram Bose", years: "1889 – 1908", role: "Revolutionary",
    img: "assets/heroes/khudiram.jpg", images: ["assets/heroes/khudiram_2.jpg"],
    imageCaption: "Photographed in custody after his arrest, 1908",
    link: WIKI("Khudiram_Bose"),
    bio: "Hanged at 18 for a bombing attempt in Muzaffarpur, he remains the youngest revolutionary executed by the British — his calm at the gallows became folk legend within weeks.",
    bioLong: [
      "Orphaned young and drawn early into revolutionary politics in Bengal, Khudiram Bose joined a plot to assassinate a British magistrate, Douglas Kingsford, notorious for harsh sentences against nationalist activists.",
      "In April 1908 he and Prafulla Chaki threw a bomb at a carriage in Muzaffarpur they believed carried Kingsford; it killed two British women instead, and Chaki took his own life rather than be captured.",
      "Khudiram was arrested, tried, and hanged on 11 August 1908 at age 18 — the youngest revolutionary executed by the British — and his composure at the gallows turned him into folk legend within weeks, commemorated in songs still sung in Bengal."
    ]
  },
  {
    name: "Dr. B. R. Ambedkar", years: "1891 – 1956", role: "Chief architect of the Constitution",
    img: "assets/heroes/ambedkar.jpg", images: [],
    link: WIKI("B._R._Ambedkar"),
    bio: "A jurist and economist who rose from a caste branded untouchable, he chaired the drafting of India's Constitution and fought throughout for social as well as political freedom.",
    bioLong: [
      "Born into a family branded “untouchable” under the caste system, Ambedkar overcame systemic exclusion to earn doctorates from Columbia University and the London School of Economics, becoming one of the most highly educated Indians of his generation.",
      "He fought throughout his life for the rights of Dalits and other marginalised communities, arguing that political freedom from Britain would mean little without social freedom from caste oppression at home — a position that put him at times in direct tension with Gandhi.",
      "As chairman of the Constitution's Drafting Committee, he was the chief architect of independent India's Constitution, embedding protections against caste discrimination into its foundational law."
    ]
  },
  {
    name: "Mangal Pandey", years: "1827 – 1857", role: "Sepoy, 34th Bengal Native Infantry",
    img: "assets/heroes/mangalpandey.jpg", images: ["assets/heroes/mangalpandey_2.png"],
    imageCaption: "A contemporary illustration of the 1857 uprising his revolt is credited with sparking",
    link: WIKI("Mangal_Pandey"),
    bio: "His act of defiance at Barrackpore on 29 March 1857, and his execution weeks later, is widely regarded as the spark that lit the countrywide uprising of 1857.",
    bioLong: [
      "A sepoy in the 34th Bengal Native Infantry, Pandey's unit was among those issued new cartridges widely believed to be greased with cow and pig fat — an intolerable violation of both Hindu and Muslim religious practice.",
      "On 29 March 1857 at Barrackpore, he attacked British officers in a state of open mutiny, was overpowered, and executed on 8 April — weeks before the wider rebellion he is often credited with sparking broke out across northern India.",
      "Because he acted essentially alone and left no writings, much of what is said about his motives is inference from British court records — but his name became shorthand in Indian memory for the spark of 1857."
    ],
    photoNote: "Depicted on a 1984 commemorative stamp — no photograph exists"
  },
  {
    name: "Bhikaiji Cama", years: "1861 – 1936", role: "“Mother of the Indian Revolution”",
    img: "assets/heroes/bhikaijicama.jpg", images: ["assets/heroes/bhikaijicama_2.png"],
    imageCaption: "The flag she designed and unfurled in Stuttgart, 1907",
    link: WIKI("Bhikaiji_Cama"),
    bio: "Exiled for her revolutionary activity, she unfurled an early design of India's flag before an international audience in Stuttgart in 1907 — decades before independence.",
    bioLong: [
      "Born into a wealthy Bombay Parsi family, Cama took up nursing during a plague epidemic, contracted the disease herself, and left for Europe to recover — where she instead threw herself into revolutionary politics among Indian exiles.",
      "On 22 August 1907, addressing the International Socialist Congress in Stuttgart, she unfurled a flag of her own design — an early version of India's tricolour — and declared that this was the flag of India's independence, decades before the country actually won it.",
      "Exiled from British India for the rest of her life, she spent over three decades in Europe organising, writing, and funding revolutionary activity, earning the title “Mother of the Indian Revolution.”"
    ]
  }
];

const grid = document.getElementById("heroesGrid");
if(grid){
  grid.innerHTML = HEROES.map((h, i) => `
    <article class="hero-card" data-hero-index="${i}" tabindex="0" role="button" aria-label="Read more about ${h.name}">
      <img src="${h.img}" alt="${h.name}" loading="lazy">
      <div class="scrim"></div>
      ${h.photoNote ? `<span class="photo-note">${h.photoNote}</span>` : ""}
      <div class="meta">
        <span class="years">${h.years}</span>
        <h3>${h.name}</h3>
        <span class="role">${h.role}</span>
        <div class="bio">
          <p>${h.bio}</p>
          ${h.quote ? `<span class="quote-tag">&ldquo;${h.quote}&rdquo;</span>` : ""}
        </div>
      </div>
      <span class="hero-card-expand" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="15" height="15"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </article>
  `).join("");
}

/* ---- Hero modal: full story on click ---- */
(function heroModal(){
  const modal = document.getElementById("heroModal");
  if(!modal || !grid) return;
  const els = {
    carousel: document.getElementById("hmCarousel"),
    track: document.getElementById("hmCarouselTrack"),
    dots: document.getElementById("hmCarDots"),
    prevBtn: document.getElementById("hmCarPrev"),
    nextBtn: document.getElementById("hmCarNext"),
    years: document.getElementById("hmYears"),
    name: document.getElementById("hmName"),
    role: document.getElementById("hmRole"),
    body: document.getElementById("hmBody"),
    quote: document.getElementById("hmQuote"),
    link: document.getElementById("hmLink"),
    photoNote: document.getElementById("hmPhotoNote"),
    closeBtn: document.getElementById("hmClose"),
  };
  let lastFocused = null;
  let slides = [];
  let slideIndex = 0;

  function updateSlidePosition(){
    els.track.style.transform = `translateX(-${slideIndex * 100}%)`;
    els.dots.querySelectorAll(".hm-car-dot").forEach((d, i) => d.classList.toggle("active", i === slideIndex));
  }

  function goToSlide(i){
    if(!slides.length) return;
    slideIndex = ((i % slides.length) + slides.length) % slides.length;
    updateSlidePosition();
  }

  function renderSlides(hero){
    slides = [];
    if(hero.img) slides.push({ src: hero.img, caption: hero.photoNote || "" });
    (hero.images || []).forEach(src => slides.push({ src, caption: hero.imageCaption || "" }));

    els.track.innerHTML = slides.map(s => `
      <div class="hm-slide">
        <img src="${s.src}" alt="${hero.name}" loading="lazy">
        ${s.caption ? `<span class="hm-img-caption">${s.caption}</span>` : ""}
      </div>
    `).join("");
    els.dots.innerHTML = slides.map((_, i) => `<button class="hm-car-dot${i === 0 ? " active" : ""}" aria-label="Image ${i + 1} of ${slides.length}"></button>`).join("");
    els.carousel.classList.toggle("single", slides.length <= 1);
    slideIndex = 0;
    updateSlidePosition();
  }

  function open(hero){
    renderSlides(hero);
    els.years.textContent = hero.years;
    els.name.textContent = hero.name;
    els.role.textContent = hero.role;
    els.body.innerHTML = (hero.bioLong || [hero.bio]).map(p => `<p>${p}</p>`).join("");
    if(hero.quote){
      els.quote.style.display = "block";
      els.quote.innerHTML = `&ldquo;${hero.quote.split(" — ")[0]}&rdquo;${hero.quote.includes(" — ") ? `<cite>${hero.quote.split(" — ")[1]}</cite>` : ""}`;
    } else {
      els.quote.style.display = "none";
    }
    els.link.href = hero.link || "#";
    if(hero.photoNote){
      els.photoNote.textContent = hero.photoNote;
      els.photoNote.style.display = "block";
    } else {
      els.photoNote.style.display = "none";
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    els.closeBtn.focus();
  }

  function close(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if(lastFocused) lastFocused.focus();
  }

  els.prevBtn.addEventListener("click", () => goToSlide(slideIndex - 1));
  els.nextBtn.addEventListener("click", () => goToSlide(slideIndex + 1));
  els.dots.addEventListener("click", (e) => {
    const dot = e.target.closest(".hm-car-dot");
    if(!dot) return;
    goToSlide(Array.from(els.dots.children).indexOf(dot));
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".hero-card");
    if(!card) return;
    open(HEROES[Number(card.dataset.heroIndex)]);
  });
  grid.addEventListener("keydown", (e) => {
    if(e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".hero-card");
    if(!card) return;
    e.preventDefault();
    open(HEROES[Number(card.dataset.heroIndex)]);
  });

  els.closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if(e.target === modal || e.target.classList.contains("hm-backdrop")) close(); });
  document.addEventListener("keydown", (e) => {
    if(!modal.classList.contains("open")) return;
    if(e.key === "Escape") close();
    else if(e.key === "ArrowRight") goToSlide(slideIndex + 1);
    else if(e.key === "ArrowLeft") goToSlide(slideIndex - 1);
  });
})();

/* ---- Timeline: eras + varied card types (text / image / quote / stat) ---- */

const TIMELINE = [
  { type: "era", title: "Company to Crown", range: "1600 – 1858" },
  { type: "text", year: "1600", title: "A Trading Charter", link: WIKI("East_India_Company"),
    text: "Queen Elizabeth I grants a royal charter to a group of London merchants trading into the East Indies. Within a century and a half, that trading company will command armies and collect taxes across a subcontinent." },
  { type: "image", year: "1757", title: "The Battle of Plassey", link: WIKI("Battle_of_Plassey"),
    img: "assets/timeline/plassey.jpg", imgCaption: "Robert Clive meets Mir Jafar after Plassey, 1757 — painting",
    text: "Robert Clive's East India Company army defeats the Nawab of Bengal at Plassey through battlefield bribery as much as battle — the moment the Company stops trading and starts ruling." },
  { type: "text", year: "1857", title: "The First War of Independence", link: WIKI("Indian_Rebellion_of_1857"),
    text: "Sepoy Mangal Pandey's revolt at Barrackpore in March ignites a countrywide uprising against the East India Company. The Rani of Jhansi, Lakshmibai, becomes its most fearless symbol before falling in battle the following year." },
  { type: "text", year: "1858", title: "Crown Rule Begins", link: WIKI("Government_of_India_Act_1858"),
    text: "The Company is dissolved and India passes directly to the British Crown. A change of masters, not of condition — but the old order of merchant-rulers is over." },

  { type: "era", title: "The Idea of a Nation", range: "1885 – 1919" },
  { type: "image", year: "1885", title: "Indian National Congress Founded", link: WIKI("Indian_National_Congress"),
    img: "assets/timeline/inc_1885.jpg", imgCaption: "Delegates at the first Indian National Congress session, Bombay, 1885",
    text: "Meeting first in Bombay, the Congress becomes the organised political voice of a movement that had, until then, spoken in scattered revolts." },
  { type: "text", year: "1905", title: "Partition of Bengal & the Swadeshi Movement", link: WIKI("Partition_of_Bengal_(1905)"),
    text: "Lord Curzon divides Bengal along religious lines; the boycott of British goods that follows becomes India's first mass political mobilisation." },
  { type: "quote", quote: "Swaraj is my birthright, and I shall have it.", attr: "Bal Gangadhar Tilak, on the Swadeshi years" },
  { type: "text", year: "1907", title: "A Flag, Raised Abroad", link: WIKI("Bhikaiji_Cama"),
    text: "On 22 August, Bhikaiji Cama unfurls an early version of India's tricolour at the International Socialist Congress in Stuttgart — freedom announced to the world before it is won at home." },
  { type: "image", year: "1916", title: "Two Home Rule Leagues", link: WIKI("Indian_Home_Rule_movement"),
    img: "assets/heroes/tilak.png", imgCaption: "Bal Gangadhar Tilak, co-founder of the Home Rule movement",
    text: "Bal Gangadhar Tilak and Annie Besant separately launch Home Rule Leagues demanding self-government within the Empire — the first time the demand for self-rule organises itself into a nationwide campaign with branches and members." },
  { type: "image", year: "1919", title: "Jallianwala Bagh", link: WIKI("Jallianwala_Bagh_massacre"),
    img: "assets/timeline/jallianwala_well.jpg", imgCaption: "The Martyrs' Well at Jallianwala Bagh, where many jumped to escape the gunfire",
    text: "Weeks after the repressive Rowlatt Act, troops under General Dyer fire without warning on an unarmed crowd in a walled garden in Amritsar on 13 April. Hundreds are killed. The massacre turns a reformist movement into a national one." },

  { type: "era", title: "Mass Movement", range: "1920 – 1935" },
  { type: "text", year: "1920", title: "Non-Cooperation Movement", link: WIKI("Non-cooperation_movement_(1919%E2%80%931922)"),
    text: "Gandhi calls for a nationwide boycott of British courts, schools, and titles — the first mass campaign of organised non-violent resistance, drawing in millions who had never joined a political movement before." },
  { type: "image", year: "1922", title: "Chauri Chaura", link: WIKI("Chauri_Chaura_incident"),
    img: "assets/timeline/chauri_chaura.jpg", imgCaption: "The Chauri Chaura police station, site of the 1922 incident",
    text: "A protest in a small United Provinces town turns violent; a mob kills 22 policemen. Gandhi calls off the entire Non-Cooperation Movement in response — a costly, controversial insistence that the means matter as much as the end." },
  { type: "text", year: "1928", title: "Lala Lajpat Rai", link: WIKI("Lala_Lajpat_Rai"),
    text: "Injuries from a police lathi charge during protests against the all-British Simon Commission lead to his death on 17 November. “The blows struck at me today,” he had said, “will be the last nails in the coffin of British rule.”" },
  { type: "text", year: "1929", title: "Purna Swaraj", link: WIKI("Purna_Swaraj"),
    text: "At its Lahore session in December, Congress declares complete independence — Purna Swaraj — as its goal, and fixes 26 January as a day of pledge, later adopted as Republic Day." },
  { type: "image", year: "1930", title: "The Salt March", link: WIKI("Salt_March"),
    img: "assets/timeline/salt_march.jpg", imgCaption: "Gandhi and followers on the march to Dandi, March 1930",
    text: "Gandhi walks 240 miles to the sea at Dandi to break the salt law. Civil disobedience spreads across the country within weeks, and the world's press finally starts paying attention." },
  { type: "image", year: "1931", title: "Sacrifice at Lahore, Talks in London", link: WIKI("Execution_of_Bhagat_Singh,_Rajguru_and_Sukhdev"),
    img: "assets/heroes/bhagatsingh.jpg", imgCaption: "Bhagat Singh in jail, 1927",
    text: "Bhagat Singh, Rajguru, and Sukhdev are hanged in Lahore on 23 March; Chandrashekhar Azad had died in a shootout days earlier rather than surrender. That same year, Gandhi travels to London for the Second Round Table Conference — the two wings of the movement, militant and negotiating, running in parallel." },
  { type: "text", year: "1935", title: "Government of India Act", link: WIKI("Government_of_India_Act_1935"),
    text: "A new constitution grants limited provincial self-government while keeping ultimate power in British hands — reform enough to whet the appetite for full independence, not enough to satisfy it." },

  { type: "era", title: "The Final Push", range: "1942 – 1947" },
  { type: "text", year: "1942", title: "Quit India", link: WIKI("Quit_India_Movement"),
    text: "Gandhi's “Do or Die” call on 8 August triggers mass arrests overnight and the largest civil uprising since 1857, met with the harshest crackdown of the entire British period." },
  { type: "text", year: "1943", title: "Azad Hind & the INA", link: WIKI("Indian_National_Army"),
    text: "Subhas Chandra Bose forms the Provisional Government of Free India in Singapore and leads the Indian National Army under the cry: “Give me blood, and I shall give you freedom!”" },
  { type: "stat", year: "1943", title: "The Bengal Famine", link: WIKI("Bengal_famine_of_1943"), number: "3 million",
    text: "Wartime grain policy, hoarding, and administrative failure combine to starve Bengal even as food is diverted elsewhere for the war effort — a death toll the movement would not let the empire forget." },
  { type: "image", year: "1945", title: "The Red Fort Trials", link: WIKI("Indian_National_Army_trials"),
    img: "assets/timeline/ina_trial.jpg", imgCaption: "The INA trials underway at the Red Fort, Delhi",
    text: "Captured INA officers are tried for treason at the Red Fort. The prosecution backfires: outrage at trying soldiers who fought for India's freedom unites Congress, the Muslim League, and the public in a rare shared cause." },
  { type: "text", year: "1946", title: "Mutiny in the Fleet", link: WIKI("Royal_Indian_Navy_mutiny"),
    text: "Ratings of the Royal Indian Navy mutiny in Bombay harbour, joined in solidarity strikes ashore. The empire can no longer fully trust the forces meant to hold it together." },
  { type: "image", year: "1947", title: "Midnight of Freedom", link: WIKI("Indian_Independence_Day"),
    img: "assets/timeline/tryst_photo.jpg", imgCaption: "Nehru delivering the “Tryst with Destiny” address, 14 August 1947",
    text: "At midnight on 14/15 August, India awakens to freedom. Nehru delivers “Tryst with Destiny”; the tricolour rises over the Red Fort." },
  { type: "image", year: "1947", title: "Partition", link: WIKI("Partition_of_India"),
    img: "assets/timeline/partition_train.jpg", imgCaption: "A refugee train in Punjab, 1947",
    text: "Freedom arrives twinned with the largest mass migration in history — some fifteen million people displaced across a new border, hundreds of thousands killed in the communal violence that followed. The joy of independence is inseparable from this loss." },
];

const timelineEl = document.getElementById("timelineTrackInner");
if(timelineEl){
  let sideCounter = 0;
  timelineEl.innerHTML = TIMELINE.map(item => {
    if(item.type === "era"){
      return `
        <div class="tl-era reveal">
          <span class="tl-era-index">Chapter</span>
          <h3 class="tl-era-title">${item.title}</h3>
          <span class="tl-era-range">${item.range}</span>
        </div>
      `;
    }
    if(item.type === "quote"){
      return `
        <div class="tl-item tl-item--wide reveal">
          <div class="tl-dot-col"><div class="tl-dot"></div></div>
          <div class="tl-card-wide tl-card--quote">
            <blockquote>&ldquo;${item.quote}&rdquo;<cite>${item.attr}</cite></blockquote>
          </div>
        </div>
      `;
    }
    if(item.type === "image"){
      return `
        <div class="tl-item tl-item--wide reveal">
          <div class="tl-dot-col"><div class="tl-dot"></div></div>
          <div class="tl-card-wide tl-card--image">
            <div class="tl-img"><img src="${item.img}" alt="${item.title}" loading="lazy"><span class="tl-img-caption">${item.imgCaption}</span></div>
            <div class="tl-body">
              <span class="tl-year">${item.year}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              <a class="tl-readmore" href="${item.link}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
            </div>
          </div>
        </div>
      `;
    }
    if(item.type === "stat"){
      return `
        <div class="tl-item tl-item--wide reveal">
          <div class="tl-dot-col"><div class="tl-dot"></div></div>
          <div class="tl-card-wide tl-card--stat">
            <div><div class="tl-stat-number">${item.number}</div><div class="tl-stat-label">estimated deaths</div></div>
            <div class="tl-stat-body">
              <span class="tl-year">${item.year}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              <a class="tl-readmore" href="${item.link}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
            </div>
          </div>
        </div>
      `;
    }
    // default: text, alternating sides
    const rightSide = sideCounter % 2 === 1;
    sideCounter++;
    return `
      <div class="tl-item${rightSide ? " tl-item--right" : ""} reveal">
        <div class="tl-card">
          <span class="tl-year">${item.year}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <a class="tl-readmore" href="${item.link}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
        </div>
        <div class="tl-dot-col"><div class="tl-dot"></div></div>
      </div>
    `;
  }).join("");
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
revealEls.forEach(el => io.observe(el));

/* ---- Nav active link on scroll ---- */
const sections = ["timeline","heroes","stories","music"].map(id => document.getElementById(id)).filter(Boolean);
const navLinks = document.querySelectorAll(".nav-link");
const navIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if(!link) return;
    if(entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => navIo.observe(s));

/* ---- Timeline spine fill, tied to scroll progress through the track ---- */
const track = document.getElementById("timelineTrack");
const spineFill = document.getElementById("spineFill");
function updateSpine(){
  if(!track || !spineFill) return;
  const rect = track.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height;
  const progressed = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
  const pct = total > 0 ? (progressed / total) * 100 : 0;
  spineFill.style.height = pct + "%";
}
window.addEventListener("scroll", updateSpine, { passive: true });
window.addEventListener("resize", updateSpine);
updateSpine();

/* ============================================================
   Hero mini player — shuffles the site's playlist into a queue
   and drives a real YouTube IFrame player behind a custom
   spinning-disc skin.
   ============================================================ */
(function heroPlayer(){
  const mount = document.getElementById("ytPlayerMount");
  if(!mount) return;

  // "independence" playlist (PLSkEjGYspQWw) — 44 songs
  const PLAYLIST = ["wDheWYmNEhQ","l71aOtTJ1gE","wF_B_aagLfI","BKx_B1VZ2kw","nDsIy6kRhms","g62J-8nV5FI","Q3JMD4oaXlI","iii1NM-Zv1g","2n3iW1V-wIE","x5fYTPvrz4g","YHmYop9Bc_Q","TdmUuRELfWI","jDn2bn7_YSM","s_-tthrE0Hg","phXc6nu1vG0","c769V25pX08","4tiVPuLbbHg","yRmnGwqyEJY","-Dm-iScM23Y","GJEjUd0AjM4","OSEw6kv70Xw","1JRIhF3kh_8","c6PHJg9D_Sk","BeqcIyuNVZI","ddrx8288qwA","n6yTCblgAQQ","PIKLTEtntI8","yy8J1Z65Rzs","-0kPkqkrHPk","lWsGPxp4s1w","e1aI46jBNmA","LLw0-5lmxR4","ummGYA6gWME","MXg6Usdjl5c","X-DDknSzELI","9iIX4PBplAY","jKzCPLu98O4","Q0ySWaet1_U","cVQmLKVvd0M","JK-0qmxim80","CBtiEZNQimI","sSsw7QPrUk0","FGjQIHVUECk","diT_XLLJiF8"];

  function shuffle(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const queue = shuffle([...new Set(PLAYLIST)]);
  let currentIndex = 0;
  let player = null;
  let playerReady = false;
  let seeking = false;
  let skipCount = 0;

  const els = {
    discWrap: document.getElementById("hpDiscWrap"),
    art: document.getElementById("hpArt"),
    title: document.getElementById("hpTitle"),
    artist: document.getElementById("hpArtist"),
    seek: document.getElementById("hpSeek"),
    current: document.getElementById("hpCurrent"),
    duration: document.getElementById("hpDuration"),
    playBtn: document.getElementById("hpPlay"),
    playIcon: document.getElementById("hpPlayIcon"),
    playOverlay: document.getElementById("hpPlayOverlay"),
    prevBtn: document.getElementById("hpPrev"),
    nextBtn: document.getElementById("hpNext"),
    muteBtn: document.getElementById("hpMute"),
    volIcon: document.getElementById("hpVolIcon"),
    volSlider: document.getElementById("hpVolume"),
  };

  const ICON_PLAY = '<polygon points="6,4 20,12 6,20" fill="currentColor"/>';
  const ICON_PAUSE = '<rect x="5" y="4" width="5" height="16" fill="currentColor"/><rect x="14" y="4" width="5" height="16" fill="currentColor"/>';
  const ICON_VOL_ON = '<polygon points="3,9 8,9 13,4 13,20 8,15 3,15" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18.5 6a9 9 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
  const ICON_VOL_OFF = '<polygon points="3,9 8,9 13,4 13,20 8,15 3,15" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';

  function updateMuteIcon(muted){
    if(!els.volIcon) return;
    els.volIcon.innerHTML = muted ? ICON_VOL_OFF : ICON_VOL_ON;
    els.muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
  }

  function fmtTime(s){
    if(!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + String(sec).padStart(2, "0");
  }

  function setPlayingVisual(isPlaying){
    els.discWrap.classList.toggle("playing", isPlaying);
    els.playIcon.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
    els.playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  }

  let metaRequestId = 0;

  function loadTrackMeta(id){
    const requestId = ++metaRequestId;
    els.art.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    els.title.textContent = "Loading…";
    els.artist.textContent = " ";
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if(requestId !== metaRequestId) return;
        if(!data){ els.title.textContent = "Independence Day Mix"; return; }
        els.title.textContent = data.title || "Independence Day Mix";
        els.artist.textContent = data.author_name || "";
      })
      .catch(() => { if(requestId === metaRequestId) els.title.textContent = "Independence Day Mix"; });
  }

  function playIndex(index, autoplay){
    currentIndex = ((index % queue.length) + queue.length) % queue.length;
    const id = queue[currentIndex];
    loadTrackMeta(id);
    if(!player) return;
    if(autoplay) player.loadVideoById(id);
    else player.cueVideoById(id);
  }

  // Browsers only allow unmuted autoplay after a user gesture on the page, so
  // we start muted (always allowed) and unmute on the very first interaction.
  // The listeners are armed immediately (not inside onReady) because the
  // YouTube API loads asynchronously — a click before it's ready would
  // otherwise be missed and never retried, leaving the mix stuck muted.
  let userHasInteracted = false;

  function tryUnmute(){
    if(!player || !player.unMute) return;
    player.unMute();
    player.setVolume(Number(els.volSlider ? els.volSlider.value : 70));
    updateMuteIcon(false);
    if(player.getPlayerState && player.getPlayerState() !== YT.PlayerState.PLAYING){
      player.playVideo();
    }
  }

  function armFirstInteractionUnmute(){
    const docEvents = ["click", "keydown", "touchstart"];
    const unmuteOnce = () => {
      userHasInteracted = true;
      tryUnmute();
      docEvents.forEach(evt => document.removeEventListener(evt, unmuteOnce));
      window.removeEventListener("scroll", unmuteOnce);
    };
    docEvents.forEach(evt => document.addEventListener(evt, unmuteOnce, { passive: true }));
    window.addEventListener("scroll", unmuteOnce, { passive: true });
  }
  armFirstInteractionUnmute();

  window.onYouTubeIframeAPIReady = function(){
    player = new YT.Player("ytPlayerMount", {
      height: "100%", width: "100%",
      videoId: queue[0],
      playerVars: { controls: 0, disablekb: 1, modestbranding: 1, rel: 0, iv_load_policy: 3, playsinline: 1, origin: window.location.origin },
      events: {
        onReady: function(){
          playerReady = true;
          loadTrackMeta(queue[0]);
          player.setVolume(Number(els.volSlider ? els.volSlider.value : 70));
          if(userHasInteracted){
            // The user already clicked/scrolled before the player finished loading.
            tryUnmute();
          } else {
            player.mute();
            updateMuteIcon(true);
            player.playVideo();
          }
        },
        onStateChange: function(e){
          if(e.data === YT.PlayerState.PLAYING){
            setPlayingVisual(true);
            skipCount = 0;
            els.duration.textContent = fmtTime(player.getDuration());
          } else if(e.data === YT.PlayerState.PAUSED){
            setPlayingVisual(false);
          } else if(e.data === YT.PlayerState.ENDED){
            playIndex(currentIndex + 1, true);
          }
        },
        onError: function(){
          // Some label-owned videos block embedding; skip forward rather than stall.
          if(skipCount++ < queue.length) playIndex(currentIndex + 1, true);
        }
      }
    });
  };

  const ytScript = document.createElement("script");
  ytScript.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(ytScript);

  els.playBtn.addEventListener("click", () => {
    if(!playerReady) return;
    const state = player.getPlayerState();
    if(state === YT.PlayerState.PLAYING) player.pauseVideo();
    else player.playVideo();
  });
  els.playOverlay.addEventListener("click", () => els.playBtn.click());
  els.prevBtn.addEventListener("click", () => playIndex(currentIndex - 1, true));
  els.nextBtn.addEventListener("click", () => playIndex(currentIndex + 1, true));

  els.seek.addEventListener("input", () => { seeking = true; });
  els.seek.addEventListener("change", () => {
    if(!playerReady) return;
    const duration = player.getDuration() || 0;
    const target = (els.seek.value / 1000) * duration;
    player.seekTo(target, true);
    seeking = false;
  });

  if(els.volSlider){
    els.volSlider.style.setProperty("--vol-pct", els.volSlider.value + "%");
    els.volSlider.addEventListener("input", () => {
      const v = Number(els.volSlider.value);
      els.volSlider.style.setProperty("--vol-pct", v + "%");
      if(!playerReady) return;
      player.setVolume(v);
      if(v === 0){
        player.mute();
        updateMuteIcon(true);
      } else {
        if(player.isMuted()) player.unMute();
        updateMuteIcon(false);
      }
    });
  }
  if(els.muteBtn){
    els.muteBtn.addEventListener("click", () => {
      if(!playerReady) return;
      if(player.isMuted()){
        player.unMute();
        if(Number(els.volSlider.value) === 0){
          els.volSlider.value = 70;
          player.setVolume(70);
          els.volSlider.style.setProperty("--vol-pct", "70%");
        }
        updateMuteIcon(false);
      } else {
        player.mute();
        updateMuteIcon(true);
      }
    });
  }

  setInterval(() => {
    if(!playerReady || seeking) return;
    const state = player.getPlayerState();
    if(state !== YT.PlayerState.PLAYING) return;
    const duration = player.getDuration() || 0;
    const current = player.getCurrentTime() || 0;
    const pct = duration > 0 ? (current / duration) * 1000 : 0;
    els.seek.value = pct;
    els.seek.style.setProperty("--seek-pct", (pct / 10) + "%");
    els.current.textContent = fmtTime(current);
    els.duration.textContent = fmtTime(duration);
  }, 500);
})();
