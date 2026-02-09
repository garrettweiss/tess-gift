import type { Stop } from '../types';

/**
 * London stops — route order from Hoxton (start).
 * Story and reflection per location; transport = how to get here from previous stop.
 */
export const STOPS: Stop[] = [
  {
    id: 'stop-1',
    hiddenName: 'The Crypt Gallery',
    storyText: `Art, beneath the noise.

Back in 1822, when people still feared grave robbers and believed in stylish decomposition, this crypt was designed as the final resting spot for the slightly better-off souls. Crypt burials were seen as an “upgrade” from the muddy village plots, crowded with fellow corpses and worms. And let’s be honest–the church also made a tidy profit from the whole affair. That is, until 1854, when authorities decided enough was enough. No more new tenants.

But times change. Where once the air was thick with eternal rest, it now hums with fresh paint and artistic ambition. Since 2002, this former death vault has been transformed into a buzzing gallery space. Today, it’s not mourning that’s shared here, but inspiration, emotions, and a good dose of contemporary creativity. From burial shrouds to canvas, from solemn silence to gallery whispers.

And yes–we sometimes suspect that if some of the long-gone residents could see the modern art displayed here now, they might just roll over in their finely decayed coffins. Not out of outrage… just confusion. But hey–a little artistic disorientation never hurt the dead. Probably.

So come on in, make yourself at home among the shadows of the past–and just remember: if these walls could talk… they’d probably mumble something about their eternal slumber being rudely interrupted by experimental art installations. But let’s be honest–it’s a lot livelier now, isn’t it?`,
    reflectionPrompt: 'What kinds of spaces make you slow down without asking?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '28 min from Hoxton', recommended: true },
      { mode: 'tube', label: 'Tube', description: "King's Cross / St Pancras then short walk", recommended: false },
    ],
    lat: 51.52745671760761,
    lng: -0.12913362505918136,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-2',
    hiddenName: "Clifford's Inn Passage",
    storyText: `Urban design, solving a very human problem.

In medieval times it served as the main entrance to Clifford’s Inn of Chancery, an institution for training barristers. By the 19th century, the passageway became little more than a small shadowy alleyway off a street filled with various drinking establishments—precisely the place where those frequenting such establishments would drunkenly stagger for a pee.

In a time when sewage still filled the streets and the Thames itself ran with death, urination in a secluded alley was certainly not surprising. Over time, however, the persistent pummel of piddle began to take a toll, corroding the brick walls that made up these alleyways. To prevent further damage, urine deflectors were installed along the length of Cliffords Inn Passage. There are long strips of metal, angled to drain the urine into the gutter (or onto the shoes of its source).

Although this effectively combatted the unsanitary practices of the time, many "gentlemen" were miffed at the urine deflectors introduction. One reportedly commented in 1809: "In London a man may sometimes walk a mile before he can meet with a suitable corner; for so accommodating are the owners of doorways, passages, and angles, that they seem to have exhausted invention in the ridiculous barricades and shelves, grooves, and one fixed above another, to conduct the stream into the shoes of the luckless wight who shall dare to profane the intrenchments.`,
    reflectionPrompt: "What modern problems do you think we'll someday solve with quiet design instead of rules?",
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '20 min from Crypt Gallery', recommended: true },
      { mode: 'walk', label: 'Walk', description: 'Through the old streets', recommended: false },
      { mode: 'tube', label: 'Tube', description: 'Temple or Chancery Lane', recommended: false },
    ],
    lat: 51.51421634231714,
    lng: -0.1104050767328446,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-3',
    hiddenName: 'The Morpeth Arms',
    photoInstruction: "Get a beer when you arrive... you'll see.",
    storyText: `Politics, punishment, and a pint.

The Morpeth Arms is among the creepiest of old pubs in London. In addition to originally being used as a prison and transfer facility for the old Millbank penitentiary, the building was also a deportation holding centre for convicts being shipped off to Australia.  

Convicts would be led from their cells at Millbank through the tunnels below ground, where they would be locked up temporarily before being taken aboard a ship or a carriage. The tension of the space can still be felt in the air, which has a distinctly eerie vibe. Millbank Prison closed in 1890, but the underground cells remained. 

It's now a typical London pub with beer, food, and loyal patrons, but the dark history of the cells in the basement hasn't been forgotten. Bar staff have reported seeing movements or items replaced, and a general feeling of unease when closing up at the end of the night. The phantom feelings have gotten to the point there's a closed-circuit TV with a camera fixed on the cells monitoring for spectral activity. 

The other notable feature of Morpeth Arms is its "Spying Room." The room is on the second floor of the pub, decorated in a 1920s style and themed after Mata Hari, the infamous dancer and double agent. Its windows, which just so happen to look out upon the British Intelligence Service building across the street, are adorned with binoculars so pub patrons can spy on the spies. MI5 and FBI agents are said to occassionally call in for a pint.`,
    reflectionPrompt: 'Where do people go now to argue about things that matter?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: "30 min from Clifford's Inn — get a beer", recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Pimlico or Vauxhall', recommended: false },
    ],
    lat: 51.48941341865928,
    lng: -0.1287043888578314,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-4',
    hiddenName: 'Oldest Door in London',
    directions: "At Westminster Abbey, a most amazing find just off of the main abbey, leading to the Chapter House. If not looking out for it, you might just pass it by.",
    storyText: `A threshold that refused to disappear.

A most amazing find just off of the main abbey, leading to the Chapter House. If not looking out for it, you might just pass it by. This door has seen so much history pass it by.

This storied door in Westminster Abbey comprises five vertical oak planks held together with three horizontal battens and iron straps. Most unusually the battens are recessed into the planks so that the door is flush on both sides.  In 2005, the door was dated using a process known as dendrochronology. A study showed that the wood was felled after 1032 and the door itself was constructed sometime in the 1050s, during the reign of King Edward the Confessor.`,
    reflectionPrompt: 'What do you think this door has seen that never made it into a history book?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '17 min from Morpeth Arms', recommended: true },
      { mode: 'bus', label: 'Bus', description: 'Alternative if preferred', recommended: false },
    ],
    lat: 51.49889827688931,
    lng: -0.12888081275935134,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-5',
    hiddenName: 'The Embassy of Texas',
    storyText: `Not an embassy. Very serious about that.

Berry Brothers & Rudd is one of London's most venerable wine merchants. Located a few doors down from St. James's Palace in the City of Westminster, they have been providing wines, ports, and whiskeys to the monarchs of England since King George II, but they were also the onetime landlords for the Embassy of the Republic of Texas.

Built in 1730, the distinguished property at 4 St James's Street is steeped in history and peculiar secrets. Under the shop floor lies two whole acres of wine cellars and caves which run underneath St. James's Street. The Georgian rooms had once held a brothel and a notorious gambling den, and the courtyard at the back was also home to bear-baiting, cock-fighting and London's last ever public duel. Napoleon III even lived here in exile whilst plotting his return to France.

But between 1836 and 1845 it was home to perhaps one its most unusual tenants; for the space above the wine shop was briefly home to the Embassy of the Republic of Texas. At the time of its founding, Texas was an independent sovereign country with its borders under threat from both the United States and Mexico. Then-President-of-Texas Sam Houston sent Dr. Ashbel Smith, the Secretary of State, to be the Texan diplomatic representative in England in an effort to build international sentiment for their country. A second Embassy was also established in France, located in what is now the Hôtel de Vendôme. 

Texas finally joined the Union in 1845, despite the Crown's support of its independence, and the Embassy in London was closed. Taking full advantage of their desirable location above one of London's best wine shops, the Texan delegation departed the capital leaving a £160 rent bill outstanding.

Today, the historic wine shop is still thriving, but the peculiar chapter of their Texan tenants is long forgotten. Next door is a tiny alleyway called Pickering Place; where a small plaque marks the entrance to the Embassy's rooms. Still proudly bearing the name of "The Republic Of Texas" it reads,

"Texas Legation in this building was the legation for the ministers from the Republic of Texas to the Court of St. James 1842 - 1845."

The onetime Republic of Texas, although consigned to history, still lives on in the hearts of Texans; in 1986 to mark the Texas sesquicentennial, 26 members of the Anglo-Texan society visited the wine shop, dressed in full buckskins, to settle the outstanding rent debt still owed by the Republic of Texas.`,
    reflectionPrompt: 'What gives something legitimacy — paperwork, or persistence?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '20 min from Oldest Door', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Green Park or Hyde Park Corner', recommended: false },
    ],
    lat: 51.50601301930971,
    lng: -0.13948798626443984,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-6',
    hiddenName: 'Audley Square Spy Lamp Post',
    storyText: `A signal hidden in a familiar shape.

London has a particular association with spies: the Special Operations Executive, MI5, MI6, 007, and all that. However, there is more to London’s espionage heritage than tuxedoed, suave operatives with a preference for how they like their martinis.

During the Cold War, the Soviet Union’s KGB had numerous agents at work in London. While some could operate under diplomatic cover, many others did not. These “illegal” agents, after gathering their information, needed some way to pass it discreetly onto their KGB superiors. Their reports would be left at selected drop sites, also known as dead letter boxes.

One such dead letter box was an inconspicuous lamp post in Audley Square, just outside the University Women’s Club at No. 2. Starting in the 1950s, agents would leave their documents behind the small door to the rear of the post. To indicate there was a message waiting, a chalk mark was made near the base.

The existence of this dead letter box was only revealed to British Intelligence after the 1985 extraction of their secret agent Colonel Oleg Gordievsky from under the watchful eyes of the KGB in Moscow. In a strange coincidence, back in the early '60s No. 3 Audley Square was used as an office by Cubby Broccoli and Harry Saltzman when they were casting the role of a certain James Bond—all the while unaware of the real-life spies who may have been lurking just outside.

`,
    reflectionPrompt: 'What feels ordinary now that might not be, if you knew the full story?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '15 min from Embassy of Texas', recommended: true },
      { mode: 'bus', label: 'Bus', description: 'Along Piccadilly', recommended: false },
    ],
    lat: 51.507285806450895,
    lng: -0.15065173560241757,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-7',
    hiddenName: 'Tomb of Hannah Courtoy',
    directions: "Although the mausoleum is the largest in the cemetery, it is partly hidden by trees and could be hard to spot. It is located on the east side of the cemetery about halfway between the cemetery's north and south ends and can be seen from the central walkway.",
    storyText: `A woman, sealed away with unanswered questions.

Deep inside Brompton Cemetery in London resides a large mausoleum. This is the tomb of Hannah Courtoy, a wealthy woman who died in 1849. According to official records, she is interred inside this tomb along with two of her three adult daughters. However, according to local legend, the tomb also contains a working time machine. 

Before Hannah Courtoy died, she was friends with a renowned Egyptologist named Joseph Bonomi. Bonomi was convinced that he had discovered the secrets of time travel through studying Egyptian hieroglyphics. Bonomi teamed up with engineer Samuel Warner to create a time machine.

With the financial backing of Hannah Courtoy, they built their time machine and placed it inside this tomb in Brompton Cemetery where it has remained ever since. The key to the tomb has been lost and the tomb hasn't been opened for over 100 years. `,
    reflectionPrompt: 'What kind of secret do you think people are most afraid to write down?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '20 min to cemetery', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Brompton or Fulham Broadway', recommended: false },
    ],
    lat: 51.4861482073084,
    lng: -0.1911814448485018,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-8',
    hiddenName: "Queen Caroline's Bath",
    storyText: `A private ritual, hidden in plain sight.

In the southwest part of Greenwich Park, tucked behind hedges, fences, and a rather large and slightly obstructive sign, are the remains of a Georgian bath. This was once part of the long-since demolished Montague House, the residence of the woman who would later in life be Queen of the United Kingdom.

Princess Caroline of Brunswick married Prince George in 1795. It was a marriage of convenience, as it conveniently brought George a lot of money. The prince had already married, though that union was deemed illegal, and he was not keen at all on his new bride. He thought Caroline to be unattractive and unhygienic, and decided the only way to get through the wedding was to be incredibly drunk.

After one year of marriage and one child, Caroline was deemed by her husband to have served her purpose, and the couple became separated for the rest of Caroline’s life. In 1801, she moved into Montague House in Greenwich, where she held many wild parties, and, according to much rumor, orgies. It was during her residency that the bath was installed in a glasshouse accessed through a door from the main building.

While living in Montague House, Caroline was rumored to have had many liaisons with admirals, captains, and politicians. Though she was cleared of adultery by a royal commission, her behavior was said to be open to "unfavorable interpretations." Unhappy with her life in England, Caroline went into exile in Italy in 1814. George, now Prince Regent and rid of his unwanted wife, ordered Montague house to be demolished.

Hidden beneath paving and flower beds for many years, the sunken bath was rediscovered first in 1909, covered once more in the 1980s, then fully excavated and restored in 2001.`,
    reflectionPrompt: "Where do you think people go when they don't want to be witnessed?",
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '1 hr 10 min from cemetery', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Then short walk', recommended: false },
    ],
    lat: 51.47281591165408,
    lng: -0.0006473485224695497,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-9',
    hiddenName: 'The Mayflower Pub',
    photoInstruction: "Get a beer when you arrive... you'll see.",
    storyText: `A place for departures, returns, and pauses.

Though it claims to be the oldest pub on the River Thames, this riverside pub's real claim to fame is that patrons have a clear shot at seeing where the Mayflower was moored before its departure for the New World. Because of crowding upriver, the historic ship was tied up here before heading off on the first leg of its journey to the Americas.

Though the captain of the Mayflower and his trusty vessel typically transported wine, they were hired in 1620 to bring a cohort of religious separatists to the New World. The ship was moored here while it was prepared for the long, transatlantic voyage. The Mayflower Pub overlooks the spot where the ship remained until setting sail for Southampton, England during the first part of its trip.

The pub now stands where The Shippe pub was in the 16th century. The building that is now the Mayflower Pub changed hands many times over the centuries and received quite a few makeovers. It was given its current name in 1957 to honor its connection with the ship that ferried in the colonists who would become some of the first permanent settlers of the land that eventually became the United States. It's just over four miles from the heart of London, giving visitors who want to pop in a chance to escape the crowded city center.

Back in the 19th century, The Mayflower was permitted to sell stamps to travelers and boatmen alike. This service is still provided today. The bar is the only such establishment in England to offer postage for both local and international letters and cards. While at the bar, descendants of the original sailing vessel are encouraged to sign the visitor's book.

The captain of the Mayflower died shortly after returning from bringing the Pilgrims to the New World. He’s buried in an unmarked grave in the cemetery at Saint Mary the Virgin, a church just a minute’s walk from the pub. 

This is a good place to end ... not because it's final, but because it invites reflection of the role that London had on creating the greatest country in the history of the world.`,
    reflectionPrompt: 'What would you leave behind if you boarded a ship with no return?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: "45 min from Queen Caroline's Bath — get a beer", recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Rotherhithe then short walk', recommended: false },
    ],
    lat: 51.501886495375636,
    lng: -0.05369534449454617,
    photo: null,
    completed: false,
  },
];

export const BETWEEN_STOPS_PROMPTS = [
  'Achie wants to know: If this place were a novel, what would the first sentence be?',
  'Achie wants to know: Rename this place as if it were a pub.',
  'Achie wants to know: What would someone argue about here, 100 years ago?',
  'Achie wants to know: What sound would you take with you?',
  'Achie wants to know: Who do you imagine has stood exactly here before?',
];
