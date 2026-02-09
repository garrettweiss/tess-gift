/**
 * Site copy — single source of truth.
 * Edit this file and save; the app will use these strings everywhere.
 * Location-specific copy (stories, reflection prompts, directions) lives in stops.ts.
 */

export const COPY = {
  /** Page title (also set on document) */
  pageTitle: 'Hidden London',

  welcome: {
    photoAlt: 'From us — with love',
    title: 'Our delayed Christmas gift adventure is here',
    body1:
      "Sorry this is late but we couldn't figure out what to get you lol. We decided on a chance to see London in a new way… hopefully see some stuff that a local wouldn't even know about, but we think these are the things that truly make London great….not the creation of Greenwich or 7 premier league teams or the red coats taking over the world or King Charles.",
    body2: "You'll need the full day for this. Only start when you're really ready.",
    ctaFirst:
      "Yes, I have a full day and I'm willing to commit it for an adventure I don't know the details of.",
    ctaStart: 'Start my adventure',
  },

  opening: {
    title: 'London, But Not the Bits Everyone Sees',
    body1: "This is not a tour.\nIt's a walk through things people pass forever without stopping.",
    body2: "You'll be given directions, but not explanations.\nNames will come later. But also, we built this site just for you so its not up to full encryption standards, so don't try and cheat.",
    button: 'Begin',
    subtext: "Take your time. Skip anything that doesn't feel right.",
  },

  arrival: {
    header: 'Prove it!',
    body: 'Take a selfie at the spot which shows us where you are!',
    button: 'Take the photo',
    testPhotoButton: 'Test photo',
    subtext: "This isn't for anyone else.",
    coordinatesLabel: 'Coordinates (for manual check):',
  },

  camera: {
    errorInsecure:
      'The camera only works on a secure connection (https). Open this page using the https:// URL from the dev server, then on your phone accept the certificate warning so the camera can run.',
    errorNoPermission:
      'Camera access is needed to take the photo. Check that Safari has permission for this site in Settings → Safari → Camera.',
    backButton: 'Back',
    overlayLine1: 'Find something worth remembering.',
    overlayLine2: 'You can include yourself if you want.',
    captureButton: 'Capture',
  },

  confirmPhoto: {
    header: 'Hold on to this moment?',
    usePhoto: 'Use this photo',
    retake: 'Retake',
    subtext: 'Once you continue, this becomes part of the day.',
  },

  reveal: {
    detailSubtext: 'A detail most people never stop for.',
    youWereHere: 'You were here.',
    continueButton: 'Continue',
  },

  reflection: {
    defaultPrompt: 'What do you think most people walk past here without noticing?',
    placeholder: 'A thought, a detail, a feeling — or nothing at all.',
    continueButton: 'Continue',
    skipButton: 'Skip',
  },

  betweenStops: {
    header: 'Between Stops',
    button: "When you're ready",
  },

  navigation: {
    firstStopBody: "Here's your first stop. When you're ready, head there.",
    nextStopBody: "When you're ready, here's where to go next.",
    bestWay: 'Best way to get there:',
    recommended: '(recommended)',
    takeMeThere: 'Take me there',
    coordinatesLabel: 'Coordinates (for manual search):',
  },

  enRoute: {
    header: 'On the way',
    body1: "You don't need to do anything right now.",
    body2: "The city will let you know when you're close.",
    arrivedButton: "I've arrived",
  },

  final: {
    header: "That was the last stop.",
    body1: "You didn't see everything.",
    body2: 'You just learned where to look.',
    button: 'Complete the Field Guide',
  },

  poster: {
    header: 'Complete the Field Guide',
    body: 'One poster from the day. Your photos, your route.',
    sizeLabel: 'Size:',
    sizeA3: 'A3',
    size8x10: '8×10',
    noPhotos: 'No photos yet. Complete at least one stop to create your poster.',
    readySubtext: 'Ready to download. Change size above if you prefer.',
    downloadPdf: 'Download PDF',
    createPoster: 'Create your poster',
    posterTitle: 'Hidden London: In Plain Sight',
    posterSubtitlePrefix: 'Kyle & Tess',
  },

  progressionTracker: {
    back: '← Back',
    stationOf: 'Station',
    of: 'of',
    allDone: 'All done',
    toGo: 'to go',
    atLabel: 'At:',
    allStationsComplete: 'All stations complete',
    placesYouveBeen: "Places you've been",
    stepLabels: {
      welcome: '—',
      opening: '—',
      arrival: 'Arrived',
      camera: 'Photo',
      'confirm-photo': 'Photo',
      reveal: 'Reveal',
      reflection: 'Reflect',
      'between-stops': 'Next station…',
      navigation: 'Next station…',
      'en-route': 'En route',
      final: 'Final stop',
      poster: 'Complete',
    },
  },

  restartButton: {
    label: 'Restart',
    title: 'Restart from beginning (testing)',
    ariaLabel: 'Restart from beginning',
  },

  visitedPlaces: {
    title: "Places you've been",
    close: 'Close',
    dialogAriaLabel: "Places you've been",
    closeAriaLabel: 'Close',
  },

  posterPdf: {
    title: 'Hidden London: In Plain Sight',
    subtitlePrefix: 'Kyle & Tess',
    footer: "London didn't change. You just learned where to look.",
    noPhotos: 'No photos to include.',
    photoPlaceholder: 'Photo',
  },
} as const;

export type Copy = typeof COPY;
