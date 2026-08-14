/* ============================================================
   आज़ादी Map — verified event locations plotted against
   assets/map/india_outline.svg (equirectangular, N37.5 S5.0
   W67.0 E99.0). Position is computed from real coordinates:
     left% = (lon - 67)   / 32   * 100
     top%  = (37.5 - lat) / 32.5 * 100
   Sorted chronologically; yearSort drives the year timeline.
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
    place: "Bombay", left: 18.05, top: 57.75,
    year: "1661", yearSort: 1661,
    title: "Bombay Ceded to England",
    text: "Bombay passes to the English Crown as part of Catherine of Braganza's dowry when she marries Charles II — the harbour that would later become the Company's, and then British India's, commercial capital.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bombay_Castle%2C_1666.jpg/330px-Bombay_Castle%2C_1666.jpg",
    link: MAP_WIKI("History_of_Bombay_under_Portuguese_rule_(1534%E2%80%931661)")
  },
  {
    place: "Purandar", left: 21.84, top: 59.11,
    year: "1665", yearSort: 1665,
    title: "The Treaty of Purandar",
    text: "Chhatrapati Shivaji, besieged by a Mughal army, surrenders most of his forts to keep his kingdom alive — a tactical retreat he would spend the next decade reversing.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shivaji_British_Museum.jpg/330px-Shivaji_British_Museum.jpg",
    link: MAP_WIKI("Treaty_of_Purandar")
  },
  {
    place: "Agra", left: 34.44, top: 31.75,
    year: "1666", yearSort: 1666,
    title: "Shivaji's Escape from Agra",
    text: "Held under house arrest at Aurangzeb's court, Shivaji smuggles himself out of Agra hidden in a basket of sweets — a daring escape that let him rebuild the Maratha resistance to Mughal rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shivaji_British_Museum.jpg/330px-Shivaji_British_Museum.jpg",
    link: MAP_WIKI("Shivaji")
  },
  {
    place: "Raigad", left: 20.13, top: 59.29,
    year: "1674", yearSort: 1674,
    title: "Shivaji Crowned Chhatrapati",
    text: "Shivaji is crowned Chhatrapati at Raigad Fort, formally founding the Maratha Empire — the first major Indian power to directly challenge both Mughal authority and European trading companies.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shivaji_British_Museum.jpg/330px-Shivaji_British_Museum.jpg",
    link: MAP_WIKI("Shivaji")
  },
  {
    place: "Bombay", left: 18.4, top: 56.2,
    year: "1686", yearSort: 1686,
    title: "The Company's First War with the Mughals",
    text: "Company forces attack Mughal ports around Bombay and Hooghly in a bid to win trading concessions by force — Aurangzeb's navy crushes them, and the humbled Company spends the next two decades begging its way back into Mughal favour.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/The_English_ask_pardon_of_Aurangzeb.jpg",
    link: MAP_WIKI("Anglo-Mughal_War_(1686%E2%80%931690)")
  },
  {
    place: "Calcutta", left: 66.55, top: 44.3,
    year: "1690", yearSort: 1690,
    title: "Job Charnock Settles Calcutta",
    text: "East India Company agent Job Charnock establishes a trading post on the Hooghly river at three villages that would grow into Calcutta — for over two centuries the capital of British India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Job_Charnock.jpg/330px-Job_Charnock.jpg",
    link: MAP_WIKI("Job_Charnock")
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
    place: "Wandiwash", left: 39.38, top: 76.92,
    year: "1760", yearSort: 1760,
    title: "The Battle of Wandiwash",
    text: "A British force under Eyre Coote crushes the French army in the Carnatic, deciding the long Anglo-French contest for control of India in Britain's favour once and for all.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bataille_de_Vandavachy_-_gagn%C3%A9e_par_les_Anglais_sur_les_Fran%C3%A7ais_le_22_janvier_1760_-_communiqu%C3%A9_par_d%27Estaing_-_btv1b532541002.jpg/330px-Bataille_de_Vandavachy_-_gagn%C3%A9e_par_les_Anglais_sur_les_Fran%C3%A7ais_le_22_janvier_1760_-_communiqu%C3%A9_par_d%27Estaing_-_btv1b532541002.jpg",
    link: MAP_WIKI("Battle_of_Wandiwash")
  },
  {
    place: "Pondicherry", left: 40.09, top: 78.65,
    year: "1761", yearSort: 1761,
    title: "The Fall of Pondicherry",
    text: "After Wandiwash, the British besiege and capture Pondicherry, the capital of France's Indian territories — French ambitions of an Indian empire never recover.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ruines_de_Pondichery_en_1762.jpg/330px-Ruines_de_Pondichery_en_1762.jpg",
    link: MAP_WIKI("Siege_of_Pondicherry_(1760)")
  },
  {
    place: "Buxar", left: 53.06, top: 36.71,
    year: "1764", yearSort: 1764,
    title: "The Battle of Buxar",
    text: "A combined army of the Mughal emperor, the Nawab of Awadh, and the Nawab of Bengal is crushed by the East India Company — the victory that wins the Company the Diwani, the right to collect revenue across Bengal, Bihar, and Odisha.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sir_Hector_Munro_by_David_Martin_%28cropped%29.jpg/330px-Sir_Hector_Munro_by_David_Martin_%28cropped%29.jpg",
    link: MAP_WIKI("Battle_of_Buxar")
  },
  {
    place: "Bombay", left: 17.3, top: 57.9,
    year: "1767", yearSort: 1767,
    title: "The First Anglo-Mysore War",
    text: "Haidar Ali of Mysore marches to the very gates of Madras and dictates peace terms to a startled East India Company — the first of four wars between Mysore and the British that would span three decades.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Anglo-Mysore_War_1_and_2.png/330px-Anglo-Mysore_War_1_and_2.png",
    link: MAP_WIKI("First_Anglo-Mysore_War")
  },
  {
    place: "Calcutta", left: 67.05, top: 44.6,
    year: "1773", yearSort: 1773,
    title: "The Regulating Act",
    text: "Parliament passes the Regulating Act, bringing the East India Company's Bengal government under state oversight for the first time and creating the post of Governor-General — the first step toward Crown rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Warren_Hastings_by_Sir_Joshua_Reynolds.jpg/330px-Warren_Hastings_by_Sir_Joshua_Reynolds.jpg",
    link: MAP_WIKI("Regulating_Act_of_1773")
  },
  {
    place: "Poona", left: 17.9, top: 47.8,
    year: "1775", yearSort: 1775,
    title: "The First Anglo-Maratha War Begins",
    text: "The Company backs a rival claimant to the Peshwa's throne, dragging it into war with the powerful Maratha Confederacy — the first serious military test of Company power against a major Indian state.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maratha_British_Treaty.JPG/330px-Maratha_British_Treaty.JPG",
    link: MAP_WIKI("First_Anglo-Maratha_War")
  },
  {
    place: "Wadgaon", left: 21.09, top: 58.31,
    year: "1779", yearSort: 1779,
    title: "The Battle of Wadgaon",
    text: "A Company army marching on Pune is surrounded and forced into a humiliating surrender by Maratha forces — one of the few outright British defeats of the entire colonial period.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maratha_British_Treaty.JPG/330px-Maratha_British_Treaty.JPG",
    link: MAP_WIKI("Battle_of_Wadgaon")
  },
  {
    place: "Mangalore", left: 24.56, top: 75.78,
    year: "1783", yearSort: 1783,
    title: "The Siege of Mangalore",
    text: "Tipu Sultan besieges the British garrison at Mangalore for nine months during the Second Anglo-Mysore War, forcing its surrender — one of Mysore's most stubborn stands against Company expansion.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/TipuSultan1790.jpg/330px-TipuSultan1790.jpg",
    link: MAP_WIKI("Siege_of_Mangalore")
  },
  {
    place: "Calcutta", left: 66.85, top: 44.9,
    year: "1784", yearSort: 1784,
    title: "Pitt's India Act",
    text: "Parliament places the East India Company's Indian territories under a government-appointed Board of Control, splitting power between the Company and the Crown for the first time.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Coat_of_arms_of_Great_Britain_%281714%E2%80%931801%29.svg/330px-Coat_of_arms_of_Great_Britain_%281714%E2%80%931801%29.svg.png",
    link: MAP_WIKI("Pitt%27s_India_Act")
  },
  {
    place: "Bangalore", left: 33.09, top: 75.48,
    year: "1791", yearSort: 1791,
    title: "The Siege of Bangalore",
    text: "Company forces under Lord Cornwallis storm Bangalore's fort during the Third Anglo-Mysore War, opening the road to Tipu Sultan's capital at Seringapatam.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Death_of_Colonel_Moorehouse_at_the_Storming_of_the_Pettah_Gate_of_Bangalore_7_March_1791.jpg/330px-The_Death_of_Colonel_Moorehouse_at_the_Storming_of_the_Pettah_Gate_of_Bangalore_7_March_1791.jpg",
    link: MAP_WIKI("Siege_of_Bangalore")
  },
  {
    place: "Srirangapatna", left: 30.6, top: 76.8,
    year: "1792", yearSort: 1792,
    title: "Tipu Sultan Cedes Half His Kingdom",
    text: "Besieged at his own capital, Tipu Sultan surrenders half of Mysore's territory and two of his young sons as hostages to end the Third Anglo-Mysore War — a humiliation he would spend the next seven years trying to reverse.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/The_definitive_treaty_by_the_hostage_princes_into_the_hands_of_Lord_Cornwallis_%28cropped%29.jpg/330px-The_definitive_treaty_by_the_hostage_princes_into_the_hands_of_Lord_Cornwallis_%28cropped%29.jpg",
    link: MAP_WIKI("Siege_of_Seringapatam_(1792)")
  },
  {
    place: "Srirangapatna", left: 30.28, top: 77.17,
    year: "1799", yearSort: 1799,
    title: "Tipu Sultan's Last Stand",
    text: "Tipu Sultan, the 'Tiger of Mysore', dies defending his capital against a Company siege — the fall of the last major Indian power capable of matching British arms in the south.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Tipu_death.jpg/330px-Tipu_death.jpg",
    link: MAP_WIKI("Siege_of_Seringapatam_(1799)")
  },
  {
    place: "Assaye", left: 27.59, top: 53.08,
    year: "1803", yearSort: 1803,
    title: "The Battle of Assaye",
    text: "A young Arthur Wellesley — later the Duke of Wellington — defeats a far larger Maratha army at Assaye, breaking Maratha power in the Deccan during the Second Anglo-Maratha War.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Battle_of_Assaye.jpeg/330px-Battle_of_Assaye.jpeg",
    link: MAP_WIKI("Battle_of_Assaye")
  },
  {
    place: "Delhi", left: 31.2, top: 26.5,
    year: "1803", yearSort: 1803,
    title: "Delhi Falls to the Company",
    text: "Company forces take Delhi from the Marathas; the Mughal emperor Shah Alam II passes under British protection, reduced from ruler to pensioner in his own capital.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Shahalam2.png/330px-Shahalam2.png",
    link: MAP_WIKI("Second_Anglo-Maratha_War")
  },
  {
    place: "Bharatpur", left: 32.78, top: 31.63,
    year: "1805", yearSort: 1805,
    title: "The Siege of Bharatpur",
    text: "A British siege of the fortress-state of Bharatpur ends in failure after repeated assaults are repelled — a rare setback that leaves Bharatpur independent for another four decades.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Colonel_Maitland_at_Bhurtpore.jpg/330px-Colonel_Maitland_at_Bhurtpore.jpg",
    link: MAP_WIKI("Siege_of_Bharatpur_(1805)")
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
    place: "Nalapani", left: 34.47, top: 22.09,
    year: "1814", yearSort: 1814,
    title: "The Battle of Nalapani",
    text: "A tiny Gurkha garrison under Balbhadra Kunwar holds a hilltop fort against a far larger British force for over a month in the opening battle of the Anglo-Nepalese War, impressing the British enough that they begin recruiting Gurkhas into their own army.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Death_of_Rollo_Gillespie_%28Cassell%27s_illustrated_history_of_India%29.png/330px-Death_of_Rollo_Gillespie_%28Cassell%27s_illustrated_history_of_India%29.png",
    link: MAP_WIKI("Battle_of_Nalapani")
  },
  {
    place: "Koregaon", left: 22.03, top: 58.65,
    year: "1818", yearSort: 1818,
    title: "The Battle of Koregaon",
    text: "A small Company force, including soldiers from the Mahar caste long excluded from Peshwa armies, holds off a much larger Peshwa force at Koregaon — the battle that ends Maratha power, and one still commemorated every January by Dalit communities as a symbol of resistance to caste oppression.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bhima_Koregaon_Victory_Pillar.jpg/330px-Bhima_Koregaon_Victory_Pillar.jpg",
    link: MAP_WIKI("Battle_of_Koregaon")
  },
  {
    place: "Barrackpore", left: 67.1, top: 44.95,
    year: "1824", yearSort: 1824,
    title: "The Barrackpore Mutiny",
    text: "Sepoys refuse orders to march to Burma by sea, fearing the loss of caste — the protest is crushed by artillery fire, a grim rehearsal for the far larger uprising that would follow three decades later.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chaterbengal.jpg/330px-Chaterbengal.jpg",
    link: MAP_WIKI("Barrackpore_mutiny_of_1824")
  },
  {
    place: "Calcutta", left: 67.0, top: 45.6,
    year: "1829", yearSort: 1829,
    title: "Sati is Abolished",
    text: "Governor-General Bentinck outlaws the practice of sati, acting on decades of campaigning by reformer Raja Ram Mohan Roy — one of the first major social reforms of the colonial era.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Portrait_of_Raja_Ram_Mohun_Roy%2C_1833.jpg/330px-Portrait_of_Raja_Ram_Mohun_Roy%2C_1833.jpg",
    link: MAP_WIKI("Bengal_Sati_Regulation,_1829")
  },
  {
    place: "Calcutta", left: 66.55, top: 46.55,
    year: "1835", yearSort: 1835,
    title: "Macaulay's Minute on Education",
    text: "Thomas Macaulay's Minute on Education redirects Indian schooling toward English-language, Western-style instruction, aiming to create 'a class of persons, Indian in blood and colour, but English in taste' — a policy whose effects still echo in Indian education.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Thomas_Babington_Macaulay2.jpg/330px-Thomas_Babington_Macaulay2.jpg",
    link: MAP_WIKI("English_Education_Act_1835")
  },
  {
    place: "Ferozeshah", left: 24.22, top: 20.46,
    year: "1845", yearSort: 1845,
    title: "The Battle of Ferozeshah",
    text: "One of the bloodiest battles of the First Anglo-Sikh War, fought over two days near Ferozepur — the British win, but at such heavy cost that the outcome is in doubt until the very end.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Battle_of_ferozeshah%28H_Martens%29.jpg/330px-Battle_of_ferozeshah%28H_Martens%29.jpg",
    link: MAP_WIKI("Battle_of_Ferozeshah")
  },
  {
    place: "Sobraon", left: 25.56, top: 19.38,
    year: "1846", yearSort: 1846,
    title: "The Battle of Sobraon",
    text: "The decisive final battle of the First Anglo-Sikh War: British forces storm the Sikh Army's fortified camp on the Sutlej, ending the war and forcing the Sikh Empire to cede Kashmir and the Jalandhar Doab.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/The_Battle_of_Sobraon_10_February_1846.jpg/330px-The_Battle_of_Sobraon_10_February_1846.jpg",
    link: MAP_WIKI("Battle_of_Sobraon")
  },
  {
    place: "Multan", left: 13.97, top: 22.46,
    year: "1848", yearSort: 1848,
    title: "The Siege of Multan",
    text: "A local governor's revolt against the Sikh regency escalates into a months-long siege that reignites war between the British and the Sikh Empire — the spark for the Second Anglo-Sikh War. Multan lies in present-day Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Shrine_Shah_Rukn-e-Alam.jpg/330px-Shrine_Shah_Rukn-e-Alam.jpg",
    link: MAP_WIKI("Siege_of_Multan")
  },
  {
    place: "Lahore", left: 21.9, top: 17.7,
    year: "1849", yearSort: 1849,
    title: "The Annexation of Punjab",
    text: "Defeat in the Second Anglo-Sikh War ends the Sikh Empire; the Company annexes Punjab outright, completing its conquest of the subcontinent's last major independent power.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/The_Battle_of_Gujrat.jpg/330px-The_Battle_of_Gujrat.jpg",
    link: MAP_WIKI("Second_Anglo-Sikh_War")
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
    place: "Delhi", left: 32.6, top: 28.1,
    year: "1857", yearSort: 1857,
    title: "The Siege of Delhi",
    text: "Rebel sepoys capture Delhi and proclaim the aged Mughal emperor Bahadur Shah Zafar their leader; a Company force besieges and retakes the city after months of fighting, ending Mughal rule for good.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/1857_cashmeri_gate_delhi.jpg/330px-1857_cashmeri_gate_delhi.jpg",
    link: MAP_WIKI("Siege_of_Delhi_(1857)")
  },
  {
    place: "Delhi", left: 32.15, top: 28.5,
    year: "1857", yearSort: 1857,
    title: "Bahadur Shah Zafar Proclaimed Leader",
    text: "The last Mughal emperor, a poet with no real army of his own, is proclaimed leader of the 1857 uprising by rebel sepoys — a symbolic figurehead whose later trial and exile to Rangoon closed the Mughal dynasty forever.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bahadur_Shah_II_of_India.jpg/330px-Bahadur_Shah_II_of_India.jpg",
    link: MAP_WIKI("Bahadur_Shah_Zafar")
  },
  {
    place: "Kanpur", left: 42.1, top: 34.4,
    year: "1857", yearSort: 1857,
    title: "Nana Sahib Leads the Revolt",
    text: "Denied the pension he believed was his due, Nana Sahib leads the rebel forces at Cawnpore before vanishing after the city's recapture — his fate never conclusively established.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Nana_sahib.png/330px-Nana_sahib.png",
    link: MAP_WIKI("Nana_Sahib")
  },
  {
    place: "Lucknow", left: 44.0, top: 33.2,
    year: "1857", yearSort: 1857,
    title: "Begum Hazrat Mahal's Regency",
    text: "With her husband the king exiled, Begum Hazrat Mahal declares her young son ruler of Awadh and leads the rebel administration from Lucknow, refusing British offers of amnesty to the end.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Begum_hazrat_mahal.jpg",
    link: MAP_WIKI("Hazrat_Mahal")
  },
  {
    place: "Gwalior", left: 34.94, top: 34.71,
    year: "1858", yearSort: 1858,
    title: "The Rani of Jhansi's Death",
    text: "Rani Lakshmibai dies at Gwalior leading a cavalry charge against Company forces, sword in hand — she is buried where she fell, and remembered as the rebellion's most fearless commander.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Rani_of_jhansi.jpg",
    link: MAP_WIKI("Rani_of_Jhansi")
  },
  {
    place: "Allahabad", left: 46.8, top: 36.7,
    year: "1858", yearSort: 1858,
    title: "The Crown Takes Over",
    text: "The Government of India Act 1858 abolishes East India Company rule and transfers its territories directly to the British Crown, read out at a durbar in Allahabad — the Company that had ruled since Plassey is dissolved.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Queen_Victoria_by_Bassano.jpg/330px-Queen_Victoria_by_Bassano.jpg",
    link: MAP_WIKI("Government_of_India_Act_1858")
  },
  {
    place: "Calcutta", left: 66.6, top: 46.75,
    year: "1861", yearSort: 1861,
    title: "The Indian Councils Act",
    text: "The Indian Councils Act of 1861 lets a handful of Indians sit on the Viceroy's legislative council for the first time — a token gesture toward representation that nationalists would spend the next sixty years demanding more of.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Coat_of_arms_of_the_United_Kingdom_%281837%29.svg/330px-Coat_of_arms_of_the_United_Kingdom_%281837%29.svg.png",
    link: MAP_WIKI("Indian_Councils_Act_1861")
  },
  {
    place: "Calcutta", left: 67.55, top: 45.1,
    year: "1863", yearSort: 1863,
    title: "Swami Vivekananda is Born",
    text: "Swami Vivekananda, the monk who would introduce Vedanta philosophy to the West and become one of modern India's most influential spiritual reformers, is born in Calcutta.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Swami_Vivekananda-1893-09-signed.jpg/330px-Swami_Vivekananda-1893-09-signed.jpg",
    link: MAP_WIKI("Swami_Vivekananda")
  },
  {
    place: "Porbandar", left: 15.06, top: 52.35,
    year: "1869", yearSort: 1869,
    title: "Gandhi is Born",
    text: "Mohandas Karamchand Gandhi is born in the small coastal town of Porbandar, Gujarat — the man who would lead India to independence through non-violent resistance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/330px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
    link: MAP_WIKI("Mahatma_Gandhi")
  },
  {
    place: "Calcutta", left: 66.1, top: 44.55,
    year: "1872", yearSort: 1872,
    title: "Sri Aurobindo is Born",
    text: "Sri Aurobindo, the revolutionary turned philosopher who would later found an ashram at Pondicherry, is born in Calcutta.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sri_aurobindo.jpg/330px-Sri_aurobindo.jpg",
    link: MAP_WIKI("Sri_Aurobindo")
  },
  {
    place: "Nadiad", left: 18.31, top: 45.57,
    year: "1875", yearSort: 1875,
    title: "Vallabhbhai Patel is Born",
    text: "Vallabhbhai Patel — the future 'Sardar' of Bardoli and the Iron Man who would unify over 500 princely states into one India — is born in Nadiad, Gujarat.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sardar_patel_%28cropped%29.jpg/330px-Sardar_patel_%28cropped%29.jpg",
    link: MAP_WIKI("Vallabhbhai_Patel")
  },
  {
    place: "Poona", left: 16.7, top: 48.2,
    year: "1876", yearSort: 1876,
    title: "The Poona Sarvajanik Sabha",
    text: "Reformers found the Poona Sarvajanik Sabha to petition the government on behalf of ordinary Indians — one of the earliest organised political associations, and a direct forerunner of the Indian National Congress.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Poona_Sarvajanik_Sabha_monthly_journal.jpg/330px-Poona_Sarvajanik_Sabha_monthly_journal.jpg",
    link: MAP_WIKI("Poona_Sarvajanik_Sabha")
  },
  {
    place: "Calcutta", left: 66.9, top: 45.7,
    year: "1878", yearSort: 1878,
    title: "The Vernacular Press Act",
    text: "Viceroy Lytton's Vernacular Press Act lets the government gag any Indian-language newspaper it judges seditious — a censorship law that only sharpens nationalist resolve.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coronet_of_a_British_Earl.svg/330px-Coronet_of_a_British_Earl.svg.png",
    link: MAP_WIKI("Vernacular_Press_Act,_1878")
  },
  {
    place: "Thorapalli", left: 33.84, top: 77.38,
    year: "1878", yearSort: 1878,
    title: "Rajagopalachari is Born",
    text: "C. Rajagopalachari — future leader of the Vedaranyam salt march and independent India's last Governor-General — is born near Hosur in present-day Tamil Nadu.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chakravarthi_Rajagopalachari.jpg",
    link: MAP_WIKI("C._Rajagopalachari")
  },
  {
    place: "Hyderabad", left: 36.5, top: 61.3,
    year: "1879", yearSort: 1879,
    title: "Sarojini Naidu is Born",
    text: "Sarojini Naidu, the poet and orator who would lead the Dharasana salt raid and become the first Indian woman to preside over the Indian National Congress, is born in Hyderabad.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sarojini_Naidu_in_1928.jpg/330px-Sarojini_Naidu_in_1928.jpg",
    link: MAP_WIKI("Sarojini_Naidu")
  },
  {
    place: "Calcutta", left: 67.3, top: 46.05,
    year: "1883", yearSort: 1883,
    title: "The Ilbert Bill Controversy",
    text: "A modest proposal to let senior Indian judges try European defendants triggers a furious backlash from British residents — the racial double standard it exposes helps convince Indian leaders that only organised political pressure, not British goodwill, would win them equality.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Support_for_the_Ilbert_Bill.jpg/330px-Support_for_the_Ilbert_Bill.jpg",
    link: MAP_WIKI("Ilbert_Bill")
  },
  {
    place: "Zeradei", left: 54.22, top: 34.92,
    year: "1884", yearSort: 1884,
    title: "Rajendra Prasad is Born",
    text: "Rajendra Prasad, the Champaran Satyagraha organiser who would become independent India's first President, is born in the village of Zeradei, Bihar.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Rajendra_Prasad_%28Indian_President%29%2C_signed_image_for_Walter_Nash_%28NZ_Prime_Minister%29%2C_1958_%2816017609534%29.jpg/330px-Rajendra_Prasad_%28Indian_President%29%2C_signed_image_for_Walter_Nash_%28NZ_Prime_Minister%29%2C_1958_%2816017609534%29.jpg",
    link: MAP_WIKI("Rajendra_Prasad")
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
    place: "Allahabad", left: 45.9, top: 36.3,
    year: "1889", yearSort: 1889,
    title: "Nehru is Born",
    text: "Jawaharlal Nehru, who would become Gandhi's chosen successor and independent India's first Prime Minister, is born in Allahabad to a prosperous barrister's family.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Nehru_in_the_Netherlands%2C_1957.jpg",
    link: MAP_WIKI("Jawaharlal_Nehru")
  },
  {
    place: "Imphal", left: 84.6, top: 39.4,
    year: "1891", yearSort: 1891,
    title: "The Anglo-Manipur War",
    text: "Manipur's brief but fierce resistance to British political control ends in defeat and annexation, its leaders executed — one of the last small kingdoms to fall to the Company's successor, the Crown.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kangla3.jpg/330px-Kangla3.jpg",
    link: MAP_WIKI("Anglo-Manipur_War")
  },
  {
    place: "Mhow", left: 27.41, top: 45.85,
    year: "1891", yearSort: 1891,
    title: "Ambedkar is Born",
    text: "Bhimrao Ramji Ambedkar, who would rise from a Dalit childhood of exclusion to draft the Constitution of India, is born in the military cantonment town of Mhow, Madhya Pradesh.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Dr._Bhimrao_Ambedkar.jpg/330px-Dr._Bhimrao_Ambedkar.jpg",
    link: MAP_WIKI("B._R._Ambedkar")
  },
  {
    place: "Poona", left: 17.5, top: 48.95,
    year: "1897", yearSort: 1897,
    title: "The Chapekar Brothers' Assassination",
    text: "The Chapekar brothers shoot dead the British plague commissioner they blame for brutal, humiliating house-to-house searches during a Poona epidemic — one of the first political assassinations of the nationalist era.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Revolutionary%2C_Damodar_Hari_Chapekar.jpg/330px-Revolutionary%2C_Damodar_Hari_Chapekar.jpg",
    link: MAP_WIKI("Chapekar_brothers")
  },
  {
    place: "Cuttack", left: 58.69, top: 52.4,
    year: "1897", yearSort: 1897,
    title: "Subhas Chandra Bose is Born",
    text: "Subhas Chandra Bose, the revolutionary who would later lead the Indian National Army against the Raj, is born in Cuttack, Odisha.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Subhas_Chandra_Bose_NRB.jpg/330px-Subhas_Chandra_Bose_NRB.jpg",
    link: MAP_WIKI("Subhas_Chandra_Bose")
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
    place: "Calcutta", left: 67.65, top: 46.9,
    year: "1906", yearSort: 1906,
    title: "The Swadeshi Movement Spreads",
    text: "In the years after the Partition of Bengal, the Swadeshi movement's boycott of British goods and promotion of Indian-made products spreads from Bengal into a nationwide economic weapon against colonial rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Concentrate_on_Charkha_and_Swadeshi_bazaar_art.jpg/330px-Concentrate_on_Charkha_and_Swadeshi_bazaar_art.jpg",
    link: MAP_WIKI("Swadeshi_movement")
  },
  {
    place: "Surat", left: 18.55, top: 49.95,
    year: "1907", yearSort: 1907,
    title: "The Surat Split",
    text: "The Indian National Congress splits at its Surat session between Tilak's 'Extremists', who want direct mass action, and the older 'Moderates', who favour petitions and reform — the party would not fully reunite for a decade.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Bal_Gangadhar_Tilak_%281856-1920%29.webp",
    link: MAP_WIKI("Surat_Split")
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
    place: "Calcutta", left: 66.2, top: 45.75,
    year: "1908", yearSort: 1908,
    title: "The Alipore Bomb Case",
    text: "Police raid a revolutionary cell in Calcutta and put Sri Aurobindo and dozens of others on trial for conspiracy; acquitted after a year in jail, Aurobindo withdraws from politics into spiritual life, while the case makes revolutionary terrorism a national talking point.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sri_aurobindo.jpg/330px-Sri_aurobindo.jpg",
    link: MAP_WIKI("Emperor_v._Aurobindo_Ghosh_and_Others")
  },
  {
    place: "Poona", left: 16.85, top: 49.1,
    year: "1908", yearSort: 1908,
    title: "Tilak's Sedition Trial",
    text: "Bal Gangadhar Tilak is tried for sedition over articles defending revolutionary violence and sentenced to six years in a Burmese prison — his defiant 'Swaraj is my birthright' speech at the trial becomes a rallying cry.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Bal_Gangadhar_Tilak_%281856-1920%29.webp",
    link: MAP_WIKI("Bal_Gangadhar_Tilak")
  },
  {
    place: "Nashik", left: 21.22, top: 53.86,
    year: "1909", yearSort: 1909,
    title: "The Assassination of Collector Jackson",
    text: "Young revolutionary Anant Laxman Kanhere shoots dead Nashik's district collector at a theatre — Kanhere is hanged at 19, one of the youngest revolutionaries executed by the British.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Revolutionary%2C_Anant_Lakshman_Kanhere.jpg/330px-Revolutionary%2C_Anant_Lakshman_Kanhere.jpg",
    link: MAP_WIKI("Anant_Laxman_Kanhere")
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
    place: "Delhi", left: 30.9, top: 27.9,
    year: "1911", yearSort: 1911,
    title: "The Delhi Durbar",
    text: "King George V is presented to a vast assembly of Indian princes and announces that the capital of British India will move from Calcutta to Delhi — the pageant marks the high tide of the Raj's pomp, even as the ground shifts beneath it.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Delhi_Durbar%2C_1911.jpg/330px-Delhi_Durbar%2C_1911.jpg",
    link: MAP_WIKI("Delhi_Durbar")
  },
  {
    place: "Delhi", left: 32.7, top: 26.4,
    year: "1912", yearSort: 1912,
    title: "The Attempt on Viceroy Hardinge",
    text: "A revolutionary hurls a bomb at Viceroy Hardinge as he makes his ceremonial entry into the new capital, wounding him — a shocking reminder that Delhi's grand durbars had not bought the Raj any real peace.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/An_assassination_attempt_on_Lord_Charles_Hardinge.jpg",
    link: MAP_WIKI("Delhi_conspiracy_case")
  },
  {
    place: "Lahore", left: 23.6, top: 17.9,
    year: "1915", yearSort: 1915,
    title: "The Ghadar Mutiny",
    text: "Indian revolutionaries returning from North America to spark an armed mutiny within the Indian Army are betrayed by an informer; the plot collapses and dozens are hanged, but the Ghadar Party's example inspires a generation of revolutionaries.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Lala_Har_Dayal_1987_stamp_of_India.jpg",
    link: MAP_WIKI("Ghadar_Mutiny")
  },
  {
    place: "Lucknow", left: 43.2, top: 32.3,
    year: "1916", yearSort: 1916,
    title: "The Lucknow Pact",
    text: "The Indian National Congress and the Muslim League, led by a young Muhammad Ali Jinnah, agree on a joint demand for self-government — the last time the two organisations would present a fully united front.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jinnah1945c.jpg/330px-Jinnah1945c.jpg",
    link: MAP_WIKI("Lucknow_Pact")
  },
  {
    place: "Madras", left: 41.47, top: 75.14,
    year: "1916", yearSort: 1916,
    title: "The Home Rule Movement",
    text: "Annie Besant and Bal Gangadhar Tilak launch parallel Home Rule Leagues demanding self-government within the British Empire, building the first genuinely mass nationalist organisation India had seen.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bal_Gangadhar_Tilak_in_Madras_1917.jpg/330px-Bal_Gangadhar_Tilak_in_Madras_1917.jpg",
    link: MAP_WIKI("Indian_Home_Rule_movement")
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
    place: "Delhi", left: 30.7, top: 26.2,
    year: "1919", yearSort: 1919,
    title: "The Rowlatt Act",
    text: "The Rowlatt Act lets the government imprison suspected revolutionaries without trial, extending wartime emergency powers into peacetime — Gandhi calls a nationwide hartal in protest, his first countrywide campaign.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Star_of_the_Order_of_the_Star_of_India_%28gold%29.svg/330px-Star_of_the_Order_of_the_Star_of_India_%28gold%29.svg.png",
    link: MAP_WIKI("Anarchical_and_Revolutionary_Crimes_Act,_1919")
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
    place: "Calcutta", left: 67.4, top: 45.5,
    year: "1920", yearSort: 1920,
    title: "Non-Cooperation is Launched",
    text: "At a special Congress session in Calcutta, chaired by Lala Lajpat Rai, Gandhi's Non-Cooperation programme is adopted for the first time, months before the Nagpur session makes it official party policy nationwide.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/India%2C_by_British_Information_Services%2C_1944_restored_version.jpg/330px-India%2C_by_British_Information_Services%2C_1944_restored_version.jpg",
    link: MAP_WIKI("Non-cooperation_movement_(1919%E2%80%931922)")
  },
  {
    place: "Ahmedabad", left: 18.05, top: 44.05,
    year: "1921", yearSort: 1921,
    title: "The Bonfire of Foreign Cloth",
    text: "Gandhi presides over huge public bonfires of imported cloth, urging Indians to spin and wear homespun khadi instead — the Swadeshi boycott turns economic self-reliance into a daily act of protest.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Concentrate_on_Charkha_and_Swadeshi_bazaar_art.jpg/330px-Concentrate_on_Charkha_and_Swadeshi_bazaar_art.jpg",
    link: MAP_WIKI("Swadeshi_movement")
  },
  {
    place: "Bombay", left: 17.6, top: 57.1,
    year: "1921", yearSort: 1921,
    title: "The Prince of Wales Riots",
    text: "Nationalists call a hartal to boycott the Prince of Wales's royal visit to Bombay; the protest turns into days of rioting, embarrassing both the colonial government and Gandhi, who briefly fasts in response.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/HRH_The_Prince_of_Wales_No_4_%28HS85-10-36416%29.jpg/330px-HRH_The_Prince_of_Wales_No_4_%28HS85-10-36416%29.jpg",
    link: MAP_WIKI("Prince_of_Wales_riots")
  },
  {
    place: "Malabar", left: 28.44, top: 81.08,
    year: "1921", yearSort: 1921,
    title: "The Malabar Rebellion",
    text: "Muslim Mappila peasants in Malabar rise up against British rule and landlord exploitation; the revolt is crushed with heavy loss of life, its legacy still debated between anti-colonial rebellion and communal violence.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/South_Malabar_1921.png/330px-South_Malabar_1921.png",
    link: MAP_WIKI("Malabar_rebellion")
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
    place: "Nagpur", left: 38.2, top: 49.9,
    year: "1923", yearSort: 1923,
    title: "The Flag Satyagraha",
    text: "Volunteers court arrest across Nagpur for the simple act of carrying the nationalist tricolour in public, defying a colonial ban on the flag — a campaign that establishes the tricolour as the symbol of the freedom struggle.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/1921_India_flag.svg/330px-1921_India_flag.svg.png",
    link: MAP_WIKI("Flag_Satyagraha")
  },
  {
    place: "Kakinada", left: 47.63, top: 63.11,
    year: "1923", yearSort: 1923,
    title: "The Congress Session at Kakinada",
    text: "The Indian National Congress meets in Kakinada as the Swarajist wing, which favours contesting British-run councils from within, debates strategy with those who favour continued boycott — a sign of the movement's growing reach into the south.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/District_Collector_Office_building_at_Kakinada.jpg/330px-District_Collector_Office_building_at_Kakinada.jpg",
    link: MAP_WIKI("Kakinada")
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
    place: "Bombay", left: 18.05, top: 56.3,
    year: "1928", yearSort: 1928,
    title: "The Simon Commission Arrives",
    text: "A commission to review India's constitution lands at Bombay with not a single Indian member on it; Congress greets it with black-flag protests and cries of 'Simon, go back' in every city it visits.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/The_simon_commission.jpg",
    link: MAP_WIKI("Simon_Commission")
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
    place: "Meerut", left: 33.9, top: 25.8,
    year: "1929", yearSort: 1929,
    title: "The Meerut Conspiracy Case",
    text: "The government puts 31 trade unionists and Communists on trial at Meerut for conspiracy against the King — the years-long trial backfires, turning its defendants into national celebrities and winning global sympathy for the labour movement.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Meerut_prisoners_outside_the_jail.jpg/330px-Meerut_prisoners_outside_the_jail.jpg",
    link: MAP_WIKI("Meerut_Conspiracy_case")
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
    place: "Dharasana", left: 18.13, top: 49.85,
    year: "1930", yearSort: 1930,
    title: "The Dharasana Satyagraha",
    text: "Led by Sarojini Naidu after Gandhi's arrest, hundreds of volunteers march on the Dharasana salt works and are beaten down in ordered ranks without raising a hand in defence — American journalist Webb Miller's eyewitness report turns world opinion against British rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Breaking_the_Salt_Law_by_picking_up_a_lump_of_natural_salt_at_Dandi.gif",
    link: MAP_WIKI("Dharasana_Satyagraha")
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
    place: "Chittagong", left: 78.0, top: 47.0,
    year: "1932", yearSort: 1932,
    title: "Pritilata Waddedar's Raid",
    text: "Revolutionary Pritilata Waddedar leads an armed raid on a Chittagong club that barred Indians; surrounded by police, she takes her own life rather than be captured, becoming one of the movement's most celebrated women revolutionaries.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Original_Archived_photo_of_Pritilata_Waddedar.jpg/330px-Original_Archived_photo_of_Pritilata_Waddedar.jpg",
    link: MAP_WIKI("Pritilata_Waddedar")
  },
  {
    place: "Kohima", left: 84.75, top: 36.4,
    year: "1932", yearSort: 1932,
    title: "Rani Gaidinliu's Uprising",
    text: "At just 16, Rani Gaidinliu leads a Naga uprising against British rule in the northeast; captured and imprisoned for 14 years, Nehru later gives her the title 'Rani' — queen — for her defiance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rani_Gaidinliu_1996_stamp_of_India.jpg/330px-Rani_Gaidinliu_1996_stamp_of_India.jpg",
    link: MAP_WIKI("Rani_Gaidinliu")
  },
  {
    place: "Bombay", left: 18.75, top: 56.85,
    year: "1934", yearSort: 1934,
    title: "The Congress Socialist Party Founded",
    text: "Younger Congress members impatient with Gandhian gradualism found the Congress Socialist Party, pushing the independence movement toward a more explicitly left-wing, anti-capitalist vision of a free India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/JP%2C_Lohia_%26_Benipuri_at_Kisan_Sabha_CSP_Patna_Rally%2C_August_1936.jpg/330px-JP%2C_Lohia_%26_Benipuri_at_Kisan_Sabha_CSP_Patna_Rally%2C_August_1936.jpg",
    link: MAP_WIKI("Congress_Socialist_Party")
  },
  {
    place: "Delhi", left: 30.4, top: 27.6,
    year: "1935", yearSort: 1935,
    title: "The Government of India Act 1935",
    text: "A sweeping new constitution grants Indian provinces self-government for the first time and lays the federal framework that independent India's own Constitution would later build on.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coat_of_arms_of_the_United_Kingdom_%281901%E2%80%931952%29.svg/330px-Coat_of_arms_of_the_United_Kingdom_%281901%E2%80%931952%29.svg.png",
    link: MAP_WIKI("Government_of_India_Act_1935")
  },
  {
    place: "Faizpur", left: 27.59, top: 50.19,
    year: "1936", yearSort: 1936,
    title: "Congress Meets in a Village",
    text: "For the first time, the Indian National Congress holds its annual session not in a city but in the small village of Faizpur, deliberately bringing the party's politics to rural India's farmers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/D_N_College_Faizpur_21.jpg/330px-D_N_College_Faizpur_21.jpg",
    link: MAP_WIKI("Faizpur")
  },
  {
    place: "Delhi", left: 31.4, top: 26.9,
    year: "1937", yearSort: 1937,
    title: "The 1937 Provincial Elections",
    text: "The Indian National Congress wins power in most provinces in India's first elections under the new constitution, forming ministries and governing large parts of the country for the first time — a dress rehearsal for national government a decade later.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Jawaharlal_Nehru_stamp_%28cropped%29.jpg/330px-Jawaharlal_Nehru_stamp_%28cropped%29.jpg",
    link: MAP_WIKI("1937_Indian_provincial_elections")
  },
  {
    place: "Haripura", left: 18.6, top: 50.75,
    year: "1938", yearSort: 1938,
    title: "Bose Elected Congress President",
    text: "Subhas Chandra Bose is elected Congress president at its Haripura session, presiding over a grand pageant designed by artist Nandalal Bose — within a year, his push for a tougher line against Gandhi's leadership would split the party.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Subhas_Chandra_Bose_NRB.jpg/330px-Subhas_Chandra_Bose_NRB.jpg",
    link: MAP_WIKI("Haripura")
  },
  {
    place: "Lahore", left: 22.3, top: 19.0,
    year: "1940", yearSort: 1940,
    title: "The Lahore Resolution",
    text: "The Muslim League adopts the Lahore Resolution calling for independent Muslim-majority states in the northwest and east of India — the formal beginning of the demand that would lead to Pakistan.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/All_India_Muslim_League_Working_Committee_Lahore_1940.jpg/330px-All_India_Muslim_League_Working_Committee_Lahore_1940.jpg",
    link: MAP_WIKI("Lahore_Resolution")
  },
  {
    place: "Calcutta", left: 66.35, top: 44.35,
    year: "1941", yearSort: 1941,
    title: "Bose's Escape",
    text: "Subhas Chandra Bose slips past British surveillance disguised as a Pathan insurance agent and flees Calcutta overland to Afghanistan and on to Germany, beginning his wartime bid to raise an army against the Raj.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Subhas_Chandra_Bose_NRB.jpg/330px-Subhas_Chandra_Bose_NRB.jpg",
    link: MAP_WIKI("Subhas_Chandra_Bose")
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
    place: "Poona", left: 17.35, top: 48.15,
    year: "1943", yearSort: 1943,
    title: "Kasturba Gandhi Dies in Detention",
    text: "Gandhi and his wife Kasturba are held at the Aga Khan Palace in Poona after his arrest for launching Quit India; Kasturba dies there in 1944 after 18 months of imprisonment, one of the movement's last personal costs before victory.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/330px-Pune_Palace.jpg",
    link: MAP_WIKI("Aga_Khan_Palace")
  },
  {
    place: "Kohima", left: 85.05, top: 36.7,
    year: "1944", yearSort: 1944,
    title: "The Battle of Kohima",
    text: "Japanese forces advancing toward India are stopped and thrown back at Kohima in some of the bloodiest fighting of the Second World War — a battle later voted 'Britain's Greatest Battle', fought on Indian soil.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/IND_003698_Garrison_Hill_Kohima.jpg/330px-IND_003698_Garrison_Hill_Kohima.jpg",
    link: MAP_WIKI("Battle_of_Kohima")
  },
  {
    place: "Imphal", left: 84.22, top: 38.98,
    year: "1944", yearSort: 1944,
    title: "The Battle of Imphal",
    text: "Alongside Kohima, the Battle of Imphal breaks Japan's invasion of India — the joint victory is the turning point of the Burma campaign and ends any prospect of an Axis foothold on Indian soil.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Gurkhas_advancing_with_Lee_tanks_to_clear_the_Japanese_from_Imphal-Kohima_road.jpg/330px-Gurkhas_advancing_with_Lee_tanks_to_clear_the_Japanese_from_Imphal-Kohima_road.jpg",
    link: MAP_WIKI("Battle_of_Imphal")
  },
  {
    place: "Moirang", left: 83.66, top: 40.0,
    year: "1944", yearSort: 1944,
    title: "The INA Reaches Indian Soil",
    text: "Subhas Chandra Bose's Indian National Army, fighting alongside Japanese forces, raises the Indian tricolour at Moirang in Manipur — briefly, this patch of Indian soil is free of British rule.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/INA_Memorial%2C_Moirang%2C_Manipur_%2812%29.jpeg/330px-INA_Memorial%2C_Moirang%2C_Manipur_%2812%29.jpeg",
    link: MAP_WIKI("Moirang")
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
  {
    place: "Junagadh", left: 10.84, top: 49.17,
    year: "1947", yearSort: 1947,
    title: "The Junagadh Crisis",
    text: "Junagadh's Muslim ruler accedes to Pakistan despite his state's Hindu majority and lack of any shared border; India intervenes, and a plebiscite overwhelmingly favours joining India instead — one of the first tests of Partition's messy borders.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/State_Flag_of_Junaghad.jpg/330px-State_Flag_of_Junaghad.jpg",
    link: MAP_WIKI("Junagadh_State")
  },
  {
    place: "Srinagar", left: 24.34, top: 10.52,
    year: "1947", yearSort: 1947,
    title: "Jammu and Kashmir Accedes to India",
    text: "As raiders backed by Pakistan advance on Srinagar, Maharaja Hari Singh signs the Instrument of Accession, formally and legally joining Jammu and Kashmir to India — Indian troops are airlifted in the next morning to defend the state.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Hari_Singh_1931.jpg/330px-Hari_Singh_1931.jpg",
    link: MAP_WIKI("Instrument_of_Accession_(Jammu_and_Kashmir)")
  },
  {
    place: "Hyderabad", left: 35.91, top: 61.91,
    year: "1948", yearSort: 1948,
    title: "The Integration of Hyderabad",
    text: "A year after independence, the Nizam of Hyderabad still refuses to join India; a swift Indian military action known as Operation Polo ends the standoff in days, folding the subcontinent's largest princely state into the union.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hyderabad_state_from_the_Imperial_Gazetteer_of_India%2C_1909.jpg/330px-Hyderabad_state_from_the_Imperial_Gazetteer_of_India%2C_1909.jpg",
    link: MAP_WIKI("Indian_annexation_of_Hyderabad")
  },
  {
    place: "Delhi", left: 31.7, top: 28.3,
    year: "1948", yearSort: 1948,
    title: "Gandhi's Assassination",
    text: "Mohandas Gandhi is shot dead at a prayer meeting in Delhi by Nathuram Godse, a Hindu nationalist who blamed him for conceding too much to Muslims during Partition — the nation that had just won its freedom loses the man most responsible for it.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gandhi_Smriti_Delhi.jpg/330px-Gandhi_Smriti_Delhi.jpg",
    link: MAP_WIKI("Assassination_of_Mahatma_Gandhi")
  },
  {
    place: "Delhi", left: 32.9, top: 27.1,
    year: "1949", yearSort: 1949,
    title: "The Constitution is Adopted",
    text: "The Constituent Assembly formally adopts the Constitution of India after nearly three years of drafting under B. R. Ambedkar's chairmanship — the longest written constitution in the world, and independent India's founding document.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Constitution_of_India.jpg/330px-Constitution_of_India.jpg",
    link: MAP_WIKI("Constitution_of_India")
  },
  {
    place: "Delhi", left: 31.1, top: 28.6,
    year: "1950", yearSort: 1950,
    title: "India Becomes a Republic",
    text: "The Constitution comes into force and India becomes a sovereign democratic republic, marked every year since as Republic Day — the final step from a British dominion to a fully self-governing nation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/330px-Emblem_of_India.svg.png",
    link: MAP_WIKI("Republic_Day_(India)")
  },
];
