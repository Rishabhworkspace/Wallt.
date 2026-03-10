// Personality-driven insight messages keyed by category ID
// Each entry has a title, message, and a saving tip

const INSIGHT_MESSAGES = {
  Food: {
    title: "The Foodie",
    message: "Your taste buds are living their best life! You've spent the most on food — clearly someone who appreciates a good meal.",
    tip: "Try meal-prepping on weekends. It can cut your food costs by up to 30% while keeping things delicious.",
    gradient: "from-orange-500/20 to-orange-600/5",
  },
  Travel: {
    title: "The Explorer",
    message: "Someone loves discovering new places! Your top spending is on travel — adventure is clearly your middle name.",
    tip: "Book flights on Tuesdays and use incognito mode to find better deals. Off-season travel can save you up to 40%.",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  Shopping: {
    title: "The Trendsetter",
    message: "Style doesn't come cheap, does it? Your shopping game is strong — you clearly know what you want.",
    tip: "Use the 48-hour rule: wait 2 days before buying non-essentials. You'll be surprised how many impulse buys you skip.",
    gradient: "from-pink-500/20 to-pink-600/5",
  },
  Health: {
    title: "The Wellness Warrior",
    message: "Investing in your health is the smartest spend of all. You're building a better version of yourself!",
    tip: "Look into annual gym memberships — they're often 40% cheaper than monthly plans. Your future self will thank you.",
    gradient: "from-red-500/20 to-red-600/5",
  },
  Education: {
    title: "The Lifelong Learner",
    message: "Knowledge is your currency! Your biggest investment is in learning — that's a return that never depreciates.",
    tip: "Many premium courses go on sale quarterly. Add them to your wishlist and wait for the next discount cycle.",
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
  Entertainment: {
    title: "The Fun Seeker",
    message: "All work and no play? Not you! You're keeping life exciting with your entertainment spending.",
    tip: "Bundle your streaming services or rotate them monthly — you'll still catch everything and save big.",
    gradient: "from-rose-500/20 to-rose-600/5",
  },
  Utilities: {
    title: "The Responsible One",
    message: "Keeping the lights on like a pro. Your utilities spending shows you're someone who values stability.",
    tip: "Switch to LED bulbs and smart plugs — they can reduce electricity bills by up to 25%.",
    gradient: "from-yellow-500/20 to-yellow-600/5",
  },
  Other: {
    title: "The Wildcard",
    message: "A bit of everything — you keep life interesting! Your spending is diverse and unpredictable.",
    tip: "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. It brings structure without killing the fun.",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
};

// Fallback when no expenses exist
const DEFAULT_INSIGHT = {
  title: "Getting Started",
  message: "Add some expenses to unlock your spending personality!",
  tip: "Start by logging your daily expenses — awareness is the first step to better money habits.",
  gradient: "from-gray-500/20 to-gray-600/5",
};

export function getInsight(topCategoryId) {
  return INSIGHT_MESSAGES[topCategoryId] || DEFAULT_INSIGHT;
}

export default INSIGHT_MESSAGES;
