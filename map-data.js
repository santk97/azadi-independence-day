/* ============================================================
   आज़ादी Map — verified event locations plotted against
   assets/map/india_outline.svg (equirectangular, N37.5 S5.0
   W67.0 E99.0). Position is computed from real coordinates:
     left% = (lon - 67)   / 32   * 100
     top%  = (37.5 - lat) / 32.5 * 100
   Sorted chronologically; yearSort drives the year scrubber.
   ============================================================ */

const MAP_WIKI = (title) => `https://en.wikipedia.org/wiki/${title}`;

const MAP_EVENTS = [
  {
    place: "Surat", left: 18.22, top: 50.25,
    year: "1608", yearSort: 1608,
    title: "The East India Company Arrives",
    text: "Captain William Hawkins anchors the Company ship Hector at Surat — the Company's first foothold on Indian soil, and the seed of nearly 340 years of British presence.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Gezicht_op_de_haven_van_S%C5%ABrat_%28Gujar%C4%81t%29%2C_SK-A-4778.jpg/330px-Gezicht_op_de_haven_van_S%C5%ABrat_%28Gujar%C4%81t%29%2C_SK-A-4778.jpg",
    link: MAP_WIKI("William_Hawkins_(fl._c._1600)")
  },
  {
    place: "Plassey", left: 66.44, top: 42.22,
    year: "1757", yearSort: 1757,
    title: "The Battle of Plassey",
    text: "Robert Clive's East India Company army defeats the Nawab of Bengal here — the moment the Company stops trading and starts ruling.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg/330px-Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg",
    link: MAP_WIKI("Battle_of_Plassey")
  },
  {
    place: "Vellore", left: 37.91, top: 75.63,
    year: "1806", yearSort: 1806,
    title: "The Vellore Mutiny",
    text: "Sepoys at Vellore Fort rise up against new East India Company dress regulations seen as an assault on their faith — the first large-scale armed mutiny against Company rule, half a century before 1857.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/%E0%A7%A7%E0%A7%AE%E0%A7%A6%E0%A7%AC_%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A7%87%E0%A6%B0_%E0%A6%AD%E0%A7%87%E0%A6%B2%E0%A7%8B%E0%A6%B0_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%B9%E0%A7%87%E0%A6%B0_%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%AE%E0%A7%8D%E0%A6%AD.jpg/330px-%E0%A7%A7%E0%A7%AE%E0%A7%A6%E0%A7%AC_%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A7%87%E0%A6%B0_%E0%A6%AD%E0%A7%87%E0%A6%B2%E0%A7%8B%E0%A6%B0_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%B9%E0%A7%87%E0%A6%B0_%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%AE%E0%A7%8D%E0%A6%AD.jpg",
    link: MAP_WIKI("Vellore_mutiny")
  },
  {
    place: "Meerut", left: 33.47, top: 26.22,
    year: "1857", yearSort: 1857,
    title: "The Sepoy Mutiny Begins",
    text: "Sepoys of the Bengal Army mutiny at Meerut over cartridges rumoured to be greased with animal fat, touching off the countrywide uprising of 1857.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Indian_Rebellion_of_1857.jpg/330px-Indian_Rebellion_of_1857.jpg",
    link: MAP_WIKI("Indian_Rebellion_of_1857")
  },
  {
    place: "Barrackpore", left: 66.78, top: 45.32,
    year: "1857", yearSort: 1857,
    title: "Mangal Pandey's Revolt",
    text: "A sepoy of the 34th Bengal Native Infantry attacks his officers on 29 March 1857 — an act of defiance widely credited with sparking the countrywide uprising that followed.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mangal_Pandey_1984_stamp_of_India.jpg/330px-Mangal_Pandey_1984_stamp_of_India.jpg",
    link: MAP_WIKI("Mangal_Pandey")
  },
  {
    place: "Jhansi", left: 36.19, top: 37.08,
    year: "1857–58", yearSort: 1857,
    title: "The Rani of Jhansi's Stand",
    text: "Rani Lakshmibai refuses to surrender her state to the British and leads her own troops into the 1857 uprising, becoming its most fearless symbol.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Rani_of_jhansi.jpg",
    link: MAP_WIKI("Rani_of_Jhansi")
  },
  {
    place: "Kanpur", left: 41.66, top: 34.0,
    year: "1857", yearSort: 1857,
    title: "The Siege of Cawnpore",
    text: "Besieged Company forces and civilians are promised safe passage out of Cawnpore, then attacked as they board boats to leave — one of the bloodiest episodes of the 1857 uprising.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Massacre_in_the_boats_off_Cawnpore_-_The_history_of_the_Indian_Mutiny_%281858-1859%29%2C_opposite_336_-_BL.jpg/330px-Massacre_in_the_boats_off_Cawnpore_-_The_history_of_the_Indian_Mutiny_%281858-1859%29%2C_opposite_336_-_BL.jpg",
    link: MAP_WIKI("Siege_of_Cawnpore")
  },
  {
    place: "Lucknow", left: 43.59, top: 32.77,
    year: "1857", yearSort: 1857,
    title: "The Siege of Lucknow",
    text: "Rebel sepoys lay siege to the British Residency at Lucknow for nearly five months — one of the longest and most fiercely fought sieges of the 1857 uprising.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/7th_Hussars%2C_charging_a_body_of_the_Mutineer%27s_Cavalry.jpg/330px-7th_Hussars%2C_charging_a_body_of_the_Mutineer%27s_Cavalry.jpg",
    link: MAP_WIKI("Siege_of_Lucknow")
  },
  {
    place: "Bombay", left: 18.22, top: 56.98,
    year: "1885", yearSort: 1885,
    title: "The Indian National Congress Founded",
    text: "Allan Octavian Hume convenes the first session of the Indian National Congress in Bombay, founding the organisation that would lead the independence movement for the next six decades.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/A_O_Hume.jpg/330px-A_O_Hume.jpg",
    link: MAP_WIKI("Indian_National_Congress")
  },
  {
    place: "Calcutta", left: 66.75, top: 45.94,
    year: "1905", yearSort: 1905,
    title: "The Partition of Bengal",
    text: "Lord Curzon partitions Bengal along religious lines, hoping to weaken nationalist sentiment — it instead ignites the Swadeshi movement and mass boycotts of British goods.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Babu_Bipin_Chandra_Pal_from_Andhrapatrika_samvatsaradi_sanchika_1911_%28page_199_crop%29.jpg/330px-Babu_Bipin_Chandra_Pal_from_Andhrapatrika_samvatsaradi_sanchika_1911_%28page_199_crop%29.jpg",
    link: MAP_WIKI("Partition_of_Bengal_(1905)")
  },
  {
    place: "Muzaffarpur", left: 57.47, top: 35.02,
    year: "1908", yearSort: 1908,
    title: "Khudiram Bose's Bombing Attempt",
    text: "Khudiram Bose and Prafulla Chaki attempt to bomb a British magistrate's carriage. Bose is hanged at 18, the youngest revolutionary executed by the British.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Khudiram_Bose_1905.jpg/330px-Khudiram_Bose_1905.jpg",
    link: MAP_WIKI("Khudiram_Bose")
  },
  {
    place: "Port Blair", left: 80.41, top: 79.63,
    year: "1911", yearSort: 1911,
    title: "Transported to the Cellular Jail",
    text: "Vinayak Damodar Savarkar is transported to the Cellular Jail on the Andaman Islands to serve two life sentences, joining hundreds of revolutionaries held in solitary confinement for their part in the freedom struggle.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Front_View_of_Cellular_Jail%2C_Port_Blair.JPG/330px-Front_View_of_Cellular_Jail%2C_Port_Blair.JPG",
    link: MAP_WIKI("Cellular_Jail")
  },
  {
    place: "Champaran", left: 56.0, top: 33.38,
    year: "1917", yearSort: 1917,
    title: "Gandhi's First Satyagraha",
    text: "Gandhi arrives in Champaran to investigate the forced indigo cultivation of local farmers — his first act of civil disobedience on Indian soil, and the start of his rise as a national leader.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dr_Rajendra_Pd._DR.Anugrah_Narayan_Sinha.jpg/330px-Dr_Rajendra_Pd._DR.Anugrah_Narayan_Sinha.jpg",
    link: MAP_WIKI("Champaran_Satyagraha")
  },
  {
    place: "Kheda", left: 17.75, top: 45.38,
    year: "1918", yearSort: 1918,
    title: "The Kheda Satyagraha",
    text: "Gandhi and a young Vallabhbhai Patel organise Kheda's farmers to withhold taxes after a failed harvest, winning a suspension of revenue collection in one of Patel's first major campaigns alongside Gandhi.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gandhi_Kheda_1918.jpg/330px-Gandhi_Kheda_1918.jpg",
    link: MAP_WIKI("Kheda_Satyagraha")
  },
  {
    place: "Amritsar", left: 24.59, top: 18.06,
    year: "1919", yearSort: 1919,
    title: "Jallianwala Bagh",
    text: "British troops fire without warning on an unarmed crowd in a walled garden, killing hundreds — a massacre that turns a reformist movement into a national one.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Jallianwala_Bagh_in_Day_light.JPG/330px-Jallianwala_Bagh_in_Day_light.JPG",
    link: MAP_WIKI("Jallianwala_Bagh_massacre")
  },
  {
    place: "Nagpur", left: 37.78, top: 50.31,
    year: "1920", yearSort: 1920,
    title: "Non-Cooperation Adopted",
    text: "The Indian National Congress formally adopts Gandhi's Non-Cooperation programme at its Nagpur session, turning the freedom struggle into India's first true mass movement.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/330px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
    link: MAP_WIKI("Non-cooperation_movement_(1919%E2%80%931922)")
  },
  {
    place: "Gorakhpur", left: 51.16, top: 33.05,
    year: "1922", yearSort: 1922,
    title: "Chauri Chaura",
    text: "A protest turns violent near this town; a mob kills 22 policemen. Gandhi calls off the entire Non-Cooperation Movement in response.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Chauri_Chaura_Land_Mark.jpg/330px-Chauri_Chaura_Land_Mark.jpg",
    link: MAP_WIKI("Chauri_Chaura_incident")
  },
  {
    place: "Vaikom", left: 29.38, top: 85.38,
    year: "1924", yearSort: 1924,
    title: "The Vaikom Satyagraha",
    text: "Volunteers of every caste court arrest for walking the public road outside the Vaikom temple — a 20-month non-violent campaign against untouchability that draws Gandhi's direct support.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/EVR_Statue%2C_Vaikom.JPG/330px-EVR_Statue%2C_Vaikom.JPG",
    link: MAP_WIKI("Vaikom_Satyagraha")
  },
  {
    place: "Kakori", left: 42.83, top: 32.7,
    year: "1925", yearSort: 1925,
    title: "The Kakori Conspiracy",
    text: "Revolutionaries led by Ram Prasad Bismil rob a train carrying government treasury funds near Kakori — a daring act that leads to Bismil's and Ashfaqulla Khan's execution the following year.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Ram_parsad_bismal.tif/lossy-page1-330px-Ram_parsad_bismal.tif.jpg",
    link: MAP_WIKI("Kakori_conspiracy")
  },
  {
    place: "Lahore", left: 22.6, top: 18.05,
    year: "1928", yearSort: 1928,
    title: "Lala Lajpat Rai's Fatal Injuries",
    text: "Lala Lajpat Rai leads a protest against the all-British Simon Commission and is beaten by police; he dies of his injuries weeks later, a death that hardens a generation of revolutionaries. Lahore lies in present-day Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahatma_Lala_Lajpat_Rai.jpg/330px-Mahatma_Lala_Lajpat_Rai.jpg",
    link: MAP_WIKI("Lala_Lajpat_Rai")
  },
  {
    place: "Bardoli", left: 19.13, top: 50.4,
    year: "1928", yearSort: 1928,
    title: "The Bardoli Satyagraha",
    text: "Vallabhbhai Patel leads Bardoli's farmers in refusing to pay a steep tax hike; the government backs down, and the women of Bardoli give Patel the title 'Sardar' — chief — that stays with him for life.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Gandhi_and_Sadar_Patel_Bardoli_Satyagraha.jpg/330px-Gandhi_and_Sadar_Patel_Bardoli_Satyagraha.jpg",
    link: MAP_WIKI("Bardoli_Satyagraha")
  },
  {
    place: "Lahore", left: 22.94, top: 18.31,
    year: "1929", yearSort: 1929,
    title: "The Lahore Congress: Purna Swaraj",
    text: "The Indian National Congress declares Purna Swaraj — complete independence — as its goal, and fixes 26 January as the date for Indians to pledge themselves to it every year. Lahore lies in present-day Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/The_Indian_National_Congress_moves_toward_independence.cropped.jpg/330px-The_Indian_National_Congress_moves_toward_independence.cropped.jpg",
    link: MAP_WIKI("Purna_Swaraj")
  },
  {
    place: "Delhi", left: 31.91, top: 27.35,
    year: "1929", yearSort: 1929,
    title: "The Assembly Bomb",
    text: "Bhagat Singh and Batukeshwar Dutt throw a bomb into the Central Legislative Assembly to protest repressive laws, deliberately courting arrest to put their revolutionary politics on public trial.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Comrade_Batukeshswar_Dutt.jpg/330px-Comrade_Batukeshswar_Dutt.jpg",
    link: MAP_WIKI("Bhagat_Singh")
  },
  {
    place: "Ahmedabad", left: 17.44, top: 44.52,
    year: "1930", yearSort: 1930,
    title: "The Salt March Begins",
    text: "Gandhi sets out from his Sabarmati Ashram with 78 followers on a 240-mile march to the sea, launching the Salt Satyagraha.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/330px-GANDHI_ASHRAM_03.jpg",
    link: MAP_WIKI("Sabarmati_Ashram")
  },
  {
    place: "Dandi", left: 17.97, top: 50.58,
    year: "1930", yearSort: 1930,
    title: "The Salt March Ends",
    text: "Gandhi ends his 240-mile march here, breaking the British salt law by making salt from the sea — the spark for nationwide civil disobedience.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Marche_sel.jpg/330px-Marche_sel.jpg",
    link: MAP_WIKI("Salt_March")
  },
  {
    place: "Peshawar", left: 14.31, top: 10.74,
    year: "1930", yearSort: 1930,
    title: "The Qissa Khwani Bazaar Massacre",
    text: "British troops open fire on an unarmed crowd protesting the arrest of Khudai Khidmatgar leaders, killing scores of Pashtun non-violent volunteers. Peshawar lies in present-day Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Undated_picture_of_Bacha_Khan_1.jpg/330px-Undated_picture_of_Bacha_Khan_1.jpg",
    link: MAP_WIKI("Qissa_Khwani_massacre")
  },
  {
    place: "Chittagong", left: 77.59, top: 46.65,
    year: "1930", yearSort: 1930,
    title: "The Chittagong Armoury Raid",
    text: "Surya Sen leads dozens of young revolutionaries in a coordinated raid on two British armouries, briefly declaring a provisional independent government before the group scatters into the hills. Chittagong lies in present-day Bangladesh.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chittagong_Armoury%2C_Bengal_Presidency.jpg/330px-Chittagong_Armoury%2C_Bengal_Presidency.jpg",
    link: MAP_WIKI("Chittagong_armoury_raid")
  },
  {
    place: "Vedaranyam", left: 40.16, top: 83.45,
    year: "1930", yearSort: 1930,
    title: "Rajaji's Salt March",
    text: "C. Rajagopalachari leads a parallel salt march from Trichinopoly to Vedaranyam on the Tamil coast, breaking the salt law in the south just as Gandhi does at Dandi in the west.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chakravarthi_Rajagopalachari.jpg",
    link: MAP_WIKI("C._Rajagopalachari")
  },
  {
    place: "Allahabad", left: 46.41, top: 37.08,
    year: "1931", yearSort: 1931,
    title: "Chandrashekhar Azad's Last Stand",
    text: "Surrounded by police at Alfred Park, Azad fights until his last bullet, then takes his own life rather than be captured — keeping his vow to die free.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Chandrasekhar_Azad.jpg/330px-Chandrasekhar_Azad.jpg",
    link: MAP_WIKI("Chandrashekhar_Azad")
  },
  {
    place: "Lahore", left: 23.2, top: 18.55,
    year: "1931", yearSort: 1931,
    title: "Execution of Bhagat Singh, Rajguru & Sukhdev",
    text: "Bhagat Singh, Rajguru, and Sukhdev are hanged in Lahore Central Jail for the killing of a British police officer, becoming three of the movement's most enduring martyrs. Lahore lies in present-day Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lahore_conspiracy_case_poster_9th_Oct_193o_jindal_sunam_12x9_copy_%28cropped%29.jpg/330px-Lahore_conspiracy_case_poster_9th_Oct_193o_jindal_sunam_12x9_copy_%28cropped%29.jpg",
    link: MAP_WIKI("Bhagat_Singh_Sukhdev_Rajguru")
  },
  {
    place: "Poona", left: 17.1, top: 48.6,
    year: "1932", yearSort: 1932,
    title: "The Poona Pact",
    text: "Gandhi's fast unto death in Yerwada Jail forces a compromise with B. R. Ambedkar over separate electorates for the depressed classes, reshaping India's constitutional path.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/330px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
    link: MAP_WIKI("Poona_Pact")
  },
  {
    place: "Bombay", left: 18.6, top: 57.4,
    year: "1942", yearSort: 1942,
    title: "Quit India Launched",
    text: "Gandhi launches the Quit India Movement from Gowalia Tank Maidan, demanding an immediate British withdrawal with the cry of 'Do or Die'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Quit_india_Movement_Collage.png/330px-Quit_india_Movement_Collage.png",
    link: MAP_WIKI("Quit_India_Movement")
  },
  {
    place: "Delhi", left: 32.05, top: 26.7,
    year: "1942", yearSort: 1942,
    title: "The Cripps Mission Fails",
    text: "Sir Stafford Cripps offers India dominion status after the war in exchange for wartime cooperation; Congress rejects it as a 'post-dated cheque on a crashing bank,' and Gandhi launches Quit India months later.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Stafford_Cripps_1947.jpg/330px-Stafford_Cripps_1947.jpg",
    link: MAP_WIKI("Cripps_Mission")
  },
  {
    place: "Calcutta", left: 66.4, top: 46.1,
    year: "1943", yearSort: 1943,
    title: "The Bengal Famine",
    text: "Wartime policy failures and a cyclone-hit harvest combine to kill an estimated two to three million people in Bengal — a catastrophe that fuels the case that British rule could no longer be trusted with Indian lives.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dead_or_dying_children_on_a_Calcutta_street_%28the_Statesman_22_August_1943%29.jpg/330px-Dead_or_dying_children_on_a_Calcutta_street_%28the_Statesman_22_August_1943%29.jpg",
    link: MAP_WIKI("Bengal_famine_of_1943")
  },
  {
    place: "Delhi", left: 32.3, top: 27.7,
    year: "1945", yearSort: 1945,
    title: "The Red Fort Trials",
    text: "Captured Indian National Army officers are tried for treason at the Red Fort — the trials backfire on the British, uniting Indian public opinion behind the defendants.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/INA_trial_IN_Red_Fort.jpg/330px-INA_trial_IN_Red_Fort.jpg",
    link: MAP_WIKI("Indian_National_Army_trials")
  },
  {
    place: "Simla", left: 31.78, top: 19.69,
    year: "1945", yearSort: 1945,
    title: "The Simla Conference",
    text: "Viceroy Lord Wavell gathers India's political leaders at the Viceregal Lodge to negotiate self-government — the talks collapse over how power would be shared between Congress and the Muslim League.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Simla_conference.JPG/330px-Simla_conference.JPG",
    link: MAP_WIKI("Simla_Conference")
  },
  {
    place: "Bombay", left: 17.85, top: 56.55,
    year: "1946", yearSort: 1946,
    title: "The Royal Indian Navy Mutiny",
    text: "Royal Indian Navy ratings mutiny aboard ships and shore establishments in Bombay harbour, a sign that even the armed forces' loyalty to the Raj was breaking down.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/BC_Dutt.jpg/330px-BC_Dutt.jpg",
    link: MAP_WIKI("Royal_Indian_Navy_mutiny")
  },
  {
    place: "Calcutta", left: 67.15, top: 46.3,
    year: "1946", yearSort: 1946,
    title: "Direct Action Day",
    text: "The Muslim League's Direct Action Day call sets off days of communal violence in Calcutta, killing thousands and hardening the case for Partition.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Calcutta_1946_riot.jpg/330px-Calcutta_1946_riot.jpg",
    link: MAP_WIKI("Direct_Action_Day")
  },
  {
    place: "Noakhali", left: 75.31, top: 45.02,
    year: "1946", yearSort: 1946,
    title: "Gandhi's Noakhali March",
    text: "Amid communal riots in East Bengal, Gandhi walks barefoot from village to village on a four-month peace mission, appealing for Hindu-Muslim unity. Noakhali lies in present-day Bangladesh.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Gandhi_in_Noakhali.jpg",
    link: MAP_WIKI("Noakhali_riots")
  },
  {
    place: "Delhi", left: 31.5, top: 27.0,
    year: "1947", yearSort: 1947,
    title: "Midnight of Freedom",
    text: "At midnight on 15 August 1947, India's tricolour rises over the Red Fort as the country wakes to independence after nearly two centuries of British rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Chandni_Chowk_on_15_August_1947.jpg/330px-Chandni_Chowk_on_15_August_1947.jpg",
    link: MAP_WIKI("Indian_Independence_Day")
  },
];
