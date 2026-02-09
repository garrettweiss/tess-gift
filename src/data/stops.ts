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

This space was built for the dead, then repurposed for the living. The crypt sits just below the city's surface — close enough to hear it, far enough to ignore it.

Art here rotates constantly. Nothing settles in for long. That impermanence feels intentional. It matches the room.

While the streets above reward speed and certainty, this place asks for stillness. People often arrive by accident. Most leave changed, even if they can't explain why.

London keeps its best rooms underground.`,
    reflectionPrompt: 'What kinds of spaces make you slow down without asking?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '28 min from Hoxton', recommended: true },
      { mode: 'tube', label: 'Tube', description: "King's Cross / St Pancras then short walk", recommended: false },
    ],
    lat: 51.5318,
    lng: -0.1262,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-2',
    hiddenName: "Clifford's Inn Passage",
    storyText: `Urban design, solving a very human problem.

These angled stones were never meant to be admired. They were installed for one purpose: to redirect urine away from walls, shoes, and reputations.

Victorian London liked to pretend it was refined. The city itself knew better.

Instead of moralizing, someone designed a solution. Not a law. Not a speech. A slope. It worked.

These deflectors are an accidental monument to practicality — proof that cities are shaped as much by embarrassment as by ambition.`,
    reflectionPrompt: "What modern problems do you think we'll someday solve with quiet design instead of rules?",
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '20 min from Crypt Gallery', recommended: true },
      { mode: 'walk', label: 'Walk', description: 'Through the old streets', recommended: false },
      { mode: 'tube', label: 'Tube', description: 'Temple or Chancery Lane', recommended: false },
    ],
    lat: 51.5136,
    lng: -0.1078,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-3',
    hiddenName: 'The Morpeth Arms',
    photoInstruction: "Get a beer when you arrive... you'll see.",
    storyText: `Politics, punishment, and a pint.

This pub sits across from where prisoners once waited to be executed. The proximity feels intentional, even if it wasn't.

People have always needed places to talk through uncomfortable truths — preferably with alcohol. The Morpeth Arms has been serving that purpose for generations.

It reminds you that history didn't happen in museums. It happened in rooms like this, between conversations, compromises, and bad decisions.`,
    reflectionPrompt: 'Where do people go now to argue about things that matter?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: "30 min from Clifford's Inn — get a beer", recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Pimlico or Vauxhall', recommended: false },
    ],
    lat: 51.499,
    lng: -0.125,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-4',
    hiddenName: 'Oldest Door in London',
    storyText: `A threshold that refused to disappear.

This door has outlasted arguments, regimes, fires, and whatever people once thought was permanent. It was built to separate inside from outside — and has been doing that job quietly ever since.

Most people hurry past it without realizing how rare it is for anything in this city to stay put. London is very good at rebuilding itself. It forgets on purpose.

This door didn't.

It has absorbed centuries of weather, hands, impatience, and habit. Nothing dramatic happened here today. That's the point. Survival is the story.`,
    reflectionPrompt: 'What do you think this door has seen that never made it into a history book?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '17 min from Morpeth Arms', recommended: true },
      { mode: 'bus', label: 'Bus', description: 'Alternative if preferred', recommended: false },
    ],
    lat: 51.5074,
    lng: -0.1278,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-5',
    hiddenName: 'The Embassy of Texas',
    storyText: `Not an embassy. Very serious about that.

Texas once considered itself a nation — and this building remembers. Though it has no official diplomatic status today, the name stuck, along with the attitude.

London has always collected outsiders: exiles, dreamers, people passing through on their way to something else. Texas fit right in.

This place exists because someone insisted it mattered — and because no one bothered to argue long enough to remove it.

Cities are shaped by confidence as much as authority.`,
    reflectionPrompt: 'What gives something legitimacy — paperwork, or persistence?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '20 min from Oldest Door', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Green Park or Hyde Park Corner', recommended: false },
    ],
    lat: 51.509,
    lng: -0.147,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-6',
    hiddenName: 'Audley Square Spy Lamp Post',
    storyText: `A signal hidden in a familiar shape.

This lamp post once spoke in flashes. During World War II, it was used to send coded messages to intelligence agents passing through the square.

Nothing about it looks special. That was the point.

Espionage rarely announces itself. It hides inside everyday objects, trusting that people will overlook what feels ordinary. This lamp did its work by blending in perfectly.

The most effective secrets are the ones no one thinks to question.`,
    reflectionPrompt: 'What feels ordinary now that might not be, if you knew the full story?',
    transportRecommendations: [
      { mode: 'walk', label: 'Walk', description: '15 min from Embassy of Texas', recommended: true },
      { mode: 'bus', label: 'Bus', description: 'Along Piccadilly', recommended: false },
    ],
    lat: 51.5095,
    lng: -0.1492,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-7',
    hiddenName: 'Tomb of Hannah Courtoy',
    storyText: `A woman, sealed away with unanswered questions.

Hannah Courtoy was buried here in 1849, along with her daughters — and a reputation for secrets. The tomb was sealed so completely that even the church lost access to it.

No one knows exactly why.

There are theories: hidden inventions, dangerous ideas, money, embarrassment. The truth may be less exciting — or far stranger. History has a habit of leaving women as footnotes, then acting surprised when the details go missing.

What remains is a locked stone container and a lot of speculation. In a city obsessed with documentation, this is a rare blank space.`,
    reflectionPrompt: 'What kind of secret do you think people are most afraid to write down?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '20 min to cemetery', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Brompton or Fulham Broadway', recommended: false },
    ],
    lat: 51.4842,
    lng: -0.1906,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-8',
    hiddenName: "Queen Caroline's Bath",
    storyText: `A private ritual, hidden in plain sight.

This bath was built for a queen who needed privacy more than luxury. Caroline of Brunswick did not fit neatly into royal expectations, and this place reflects that — tucked away, personal, slightly defiant.

It's not grand. It's not impressive. It's intimate.

History usually preserves the public versions of people. Their speeches. Their scandals. Their official portraits. Places like this remind you that power also includes the desire to be unseen.

This bath survived because it didn't matter enough to remove. That quietness is why it's still here.`,
    reflectionPrompt: "Where do you think people go when they don't want to be witnessed?",
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: '1 hr 10 min from cemetery', recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Then short walk', recommended: false },
    ],
    lat: 51.5034,
    lng: -0.1396,
    photo: null,
    completed: false,
  },
  {
    id: 'stop-9',
    hiddenName: 'The Mayflower Pub',
    photoInstruction: "Get a beer when you arrive... you'll see.",
    storyText: `A place for departures, returns, and pauses.

Named after the ship that carried people away from England forever, this pub sits by the river as if waiting for something to happen.

Ships left from nearby. Lives changed permanently. History usually frames those moments as destiny. Standing here, they feel more like decisions made by tired people with limited information.

The river hasn't changed much. The reasons people stop beside it have.

This is a good place to end — not because it's final, but because it invites reflection.`,
    reflectionPrompt: 'What would you leave behind if you boarded a ship with no return?',
    transportRecommendations: [
      { mode: 'bus', label: 'Bus', description: "45 min from Queen Caroline's Bath — get a beer", recommended: true },
      { mode: 'tube', label: 'Tube', description: 'Rotherhithe then short walk', recommended: false },
    ],
    lat: 51.501,
    lng: -0.071,
    photo: null,
    completed: false,
  },
];

export const BETWEEN_STOPS_PROMPTS = [
  'If this place were a novel, what would the first sentence be?',
  'Rename this place as if it were a pub.',
  'What would someone argue about here, 100 years ago?',
  'What sound would you take with you?',
  'Who do you imagine has stood exactly here before?',
];
