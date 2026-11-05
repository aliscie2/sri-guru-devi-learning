export type Lesson = { id: string; title: string; minutes: number; paragraphs: string[]; reflection: string; youtubeId?: string };
export type Course = { id: string; title: string; category: string; description: string; image: string; imageAlt: string; label: string; duration: string; lessons: Lesson[]; externalUrl?: string; sourceUrl: string };

// Reading guides are introductory editorial previews, not an official course syllabus.
// Replace or extend these records with the foundation's approved lessons and YouTube IDs.
export const courses: Course[] = [
  {
    id: 'advaita-kshama', title: 'The way of forgiveness', category: 'Introduction',
    description: 'A gentle introduction to Advaita Kshama and the practice of letting go.',
    image: 'swami.jpg', imageAlt: 'Sri Swami Sai Krsna walking with a devotee', label: 'Reading guide', duration: '3 short lessons',
    sourceUrl: 'https://www.srigurudevifoundation.org/new-page-1',
    lessons: [
      { id: 'begin', title: 'Begin where you are', minutes: 2, paragraphs: ['Advaita Kshama is the path of nondual forgiveness taught by Sri Swami Sai Krsna. This short reading guide introduces the foundation’s language and points you toward its own teachings.', 'There is no test to pass here. Read slowly, take a moment to reflect, and continue when you are ready.'], reflection: 'What brings you to this practice today?' },
      { id: 'letting-go', title: 'The practice of letting go', minutes: 3, paragraphs: ['The foundation describes Kshama Kriya as forgiveness or letting go for the sake of pure awareness. It is one of the central practices of the path.', 'Let this introduction be a starting point. For personal guidance or the full instruction, you can speak directly with the foundation.'], reflection: 'Is there something you are ready to meet with a little more openness?' },
      { id: 'everyday', title: 'Carry it into your day', minutes: 2, paragraphs: ['Learning continues beyond the page. Return to a passage that speaks to you, make time for reflection, and explore the foundation’s recordings and gatherings at your own pace.', 'The Song of Life is the foundation’s free six-day online course. You can find it in the learning library when you are ready to go further.'], reflection: 'What is one small way you could make room for reflection tomorrow?' },
    ],
  },
  {
    id: 'breath-awareness', title: 'Return to the breath', category: 'Daily practice',
    description: 'Meet Shivanapanasati: the simple practice of watching the natural breath.',
    image: 'quiet-valley.jpg', imageAlt: 'Soft morning light over the hills', label: 'Reading guide', duration: '3 short lessons',
    sourceUrl: 'https://www.srigurudevifoundation.org/practices',
    lessons: [
      { id: 'notice', title: 'A moment of awareness', minutes: 2, paragraphs: ['Shivanapanasati is the foundation’s practice of breath awareness. Swami’s instruction is: “Be willing to watch the breath all day.”', 'This guide is a brief introduction. The foundation’s practices page offers the original instruction and a way to ask questions.'], reflection: 'Take a quiet moment to notice your natural breath.' },
      { id: 'return', title: 'Gently return', minutes: 2, paragraphs: ['In the practice described by the foundation, attention returns to the natural breath. Nothing needs to be added or controlled.', 'Let the practice remain simple. If your attention wanders, notice that too, and return gently.'], reflection: 'How does it feel to observe without trying to change anything?' },
      { id: 'space', title: 'Make a little space', minutes: 2, paragraphs: ['A small pause can be part of an ordinary day. The foundation also offers shared meditation sessions for those who would like to practise with others.', 'Find current session details through the foundation’s official channels. You can return to this guide whenever you like.'], reflection: 'Where in your day could you make space for a quiet pause?' },
    ],
  },
  {
    id: 'song-of-life', title: 'The Song of Life', category: 'Online course',
    description: 'Explore nondual forgiveness in the foundation’s free six-day course.',
    image: 'song-of-life.jpg', imageAlt: 'The foundation’s Song of Life course artwork', label: 'Official course', duration: '6 days · Free',
    externalUrl: 'https://the-song-of-life-online.teachable.com/l/pdp/the-song-of-life-online-course',
    sourceUrl: 'https://www.srigurudevifoundation.org/', lessons: [],
  },
];

export function getCourse(id: string) { return courses.find(c => c.id === id); }
