/* ============================================================
   आज़ादी Map — verified event locations plotted against
   assets/map/india_outline.svg (equirectangular, N37.5 S5.0
   W67.0 E99.0). Position is computed from real coordinates:
     left% = (lon - 67)   / 32   * 100
     top%  = (37.5 - lat) / 32.5 * 100
   ============================================================ */

const MAP_WIKI = (title) => `https://en.wikipedia.org/wiki/${title}`;

const MAP_EVENTS = [
  {
    place: "Barrackpore", left: 66.78, top: 45.32, year: "1857",
    title: "Mangal Pandey's Revolt",
    text: "A sepoy of the 34th Bengal Native Infantry attacks his officers on 29 March 1857 — an act of defiance widely credited with sparking the countrywide uprising that followed.",
    link: MAP_WIKI("Mangal_Pandey")
  },
  {
    place: "Jhansi", left: 36.19, top: 37.08, year: "1857–58",
    title: "The Rani of Jhansi's Stand",
    text: "Rani Lakshmibai refuses to surrender her state to the British and leads her own troops into the 1857 uprising, becoming its most fearless symbol.",
    link: MAP_WIKI("Rani_of_Jhansi")
  },
  {
    place: "Plassey", left: 66.44, top: 42.22, year: "1757",
    title: "The Battle of Plassey",
    text: "Robert Clive's East India Company army defeats the Nawab of Bengal here — the moment the Company stops trading and starts ruling.",
    link: MAP_WIKI("Battle_of_Plassey")
  },
  {
    place: "Calcutta", left: 66.75, top: 45.94, year: "1905 & 1946",
    title: "Partition of Bengal — and Direct Action Day",
    text: "Lord Curzon's 1905 partition of Bengal ignites the Swadeshi movement. Four decades later, Calcutta is the site of the devastating Direct Action Day violence of August 1946.",
    link: MAP_WIKI("Partition_of_Bengal_(1905)")
  },
  {
    place: "Muzaffarpur", left: 57.47, top: 35.02, year: "1908",
    title: "Khudiram Bose's Bombing Attempt",
    text: "Khudiram Bose and Prafulla Chaki attempt to bomb a British magistrate's carriage. Bose is hanged at 18, the youngest revolutionary executed by the British.",
    link: MAP_WIKI("Khudiram_Bose")
  },
  {
    place: "Amritsar", left: 24.59, top: 18.06, year: "1919",
    title: "Jallianwala Bagh",
    text: "British troops fire without warning on an unarmed crowd in a walled garden, killing hundreds — a massacre that turns a reformist movement into a national one.",
    link: MAP_WIKI("Jallianwala_Bagh_massacre")
  },
  {
    place: "Lahore", left: 22.94, top: 18.31, year: "1929 & 1931",
    title: "The Lahore Congress — and Bhagat Singh's Execution",
    text: "Congress declares Purna Swaraj at its 1929 Lahore session. In 1931, Bhagat Singh, Rajguru, and Sukhdev are hanged here. Lahore lies in present-day Pakistan.",
    link: MAP_WIKI("Execution_of_Bhagat_Singh,_Rajguru_and_Sukhdev")
  },
  {
    place: "Gorakhpur", left: 51.16, top: 33.05, year: "1922",
    title: "Chauri Chaura",
    text: "A protest turns violent near this town; a mob kills 22 policemen. Gandhi calls off the entire Non-Cooperation Movement in response.",
    link: MAP_WIKI("Chauri_Chaura_incident")
  },
  {
    place: "Allahabad", left: 46.41, top: 37.08, year: "1931",
    title: "Chandrashekhar Azad's Last Stand",
    text: "Surrounded by police at Alfred Park, Azad fights until his last bullet, then takes his own life rather than be captured — keeping his vow to die free.",
    link: MAP_WIKI("Chandrashekhar_Azad")
  },
  {
    place: "Dandi", left: 17.97, top: 50.58, year: "1930",
    title: "The Salt March",
    text: "Gandhi ends his 240-mile march here, breaking the British salt law by making salt from the sea — the spark for nationwide civil disobedience.",
    link: MAP_WIKI("Salt_March")
  },
  {
    place: "Bombay", left: 18.22, top: 56.98, year: "1885, 1942 & 1946",
    title: "Congress Founded — Quit India — Naval Mutiny",
    text: "The Indian National Congress holds its first session here in 1885. Gandhi launches Quit India from Gowalia Tank Maidan in 1942. Royal Indian Navy ratings mutiny here in 1946.",
    link: MAP_WIKI("Indian_National_Congress")
  },
  {
    place: "Delhi", left: 31.91, top: 27.35, year: "1929, 1945 & 1947",
    title: "The Assembly Bomb, the Red Fort Trials, and Midnight",
    text: "Bhagat Singh and Batukeshwar Dutt bomb the Central Legislative Assembly in 1929. Captured INA officers are tried at the Red Fort in 1945. On 15 August 1947, the tricolour rises over the Red Fort.",
    link: MAP_WIKI("Indian_Independence_Day")
  },
];
