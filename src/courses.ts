export type Lesson = { id: string; title: string; minutes: number; paragraphs: string[]; youtubeId?: string };
export type Course = { id: string; title: string; category: string; description: string; image: string; imageAlt: string; label: string; duration: string; lessons: Lesson[]; externalUrl?: string; sourceUrl: string };

// Teaching passages are verbatim excerpts from the sourceUrl, not an authored syllabus.
// Keep IDs stable so existing browser-local progress remains available.
export const courses: Course[] = [
  {
    "id": "advaita-kshama",
    "title": "Kshama Kriya",
    "category": "Practices",
    "description": "Nondual Forgiveness",
    "image": "swami.jpg",
    "imageAlt": "Sri Swami Sai Krsna walking with a devotee",
    "label": "Website excerpts",
    "duration": "3 excerpts",
    "sourceUrl": "https://www.srigurudevifoundation.org/practices",
    "lessons": [
      {
        "id": "begin",
        "title": "Kshama Kriya",
        "minutes": 1,
        "paragraphs": [
          "Kshama Kriya - This is the central practice of Gurudevi Yoga. The Act of Forgiving (Kshama) + Breath Awareness (Shivanapanasati) = Kshama Kriya."
        ]
      },
      {
        "id": "letting-go",
        "title": "Ksana - Moments",
        "minutes": 1,
        "paragraphs": [
          "Ksana, means a moment or instant. There is no way to quantify your time spent with eternity."
        ]
      },
      {
        "id": "everyday",
        "title": "Sambandha - Connection",
        "minutes": 1,
        "paragraphs": [
          "Sambandha, means connection, relationship, and refers to that eternal bond the soul has with the Source of creation."
        ]
      }
    ]
  },
  {
    "id": "breath-awareness",
    "title": "Shivanapanasati",
    "category": "Practices",
    "description": "Breath Awareness",
    "image": "quiet-valley.jpg",
    "imageAlt": "Morning light over forested hills",
    "label": "Website excerpts",
    "duration": "3 excerpts",
    "sourceUrl": "https://www.srigurudevifoundation.org/practices",
    "lessons": [
      {
        "id": "notice",
        "title": "Shivanapanasati",
        "minutes": 1,
        "paragraphs": [
          "Shivanapanasati - Breath Awareness. “Be willing to watch the Breath all day.”"
        ]
      },
      {
        "id": "return",
        "title": "Primary Instruction",
        "minutes": 1,
        "paragraphs": [
          "Sit twice a day, once with eyes closed, once with eyes open for a focused practice watching the breath."
        ]
      },
      {
        "id": "space",
        "title": "Breath Awareness",
        "minutes": 1,
        "paragraphs": [
          "Every moment you can spare between activities or in the midst of them take a few moments to acknowledge the breath and your existence and try to watch it throughout the day the best you can."
        ]
      }
    ]
  },
  {
    "id": "song-of-life",
    "title": "The Song of Life",
    "category": "Online course",
    "description": "The Song of Life Online Course is a six day program",
    "image": "song-of-life.jpg",
    "imageAlt": "The Song of Life course artwork",
    "label": "Online course",
    "duration": "6 days · Free",
    "externalUrl": "https://the-song-of-life-online.teachable.com/l/pdp/the-song-of-life-online-course",
    "sourceUrl": "https://www.srigurudevifoundation.org/",
    "lessons": []
  }
];

export function getCourse(id: string) { return courses.find(c => c.id === id); }
