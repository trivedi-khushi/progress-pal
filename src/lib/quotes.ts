const startingQuotes = [
  "Every journey begins with a single step. 🌱",
  "You showed up. That's already winning.",
  "Small moves, big results. Keep going!",
  "The hardest part is starting. You've done it!",
  "Progress, not perfection. 💪",
  "Day one or one day? You chose day one.",
  "You're planting seeds today. 🌿",
  "Momentum starts with one click.",
];

const buildingQuotes = [
  "Look at you building a streak! 🔥",
  "Consistency is your superpower.",
  "You're in the zone. Don't stop now!",
  "Halfway isn't far. You're getting there.",
  "This is where habits are forged. ⚡",
  "The compound effect is real.",
  "You're proving it to yourself.",
  "Brick by brick, you're building something great.",
];

const pushingQuotes = [
  "Past the halfway mark! The finish line is calling. 🏁",
  "You're unstoppable right now.",
  "More done than left. Feel that momentum!",
  "The mountain peak is in sight. 🏔️",
  "Your future self is cheering you on.",
  "Discipline > motivation. And you have both.",
  "You're in elite territory now. 💎",
  "Keep this energy. You're incredible.",
];

const almostQuotes = [
  "SO CLOSE. Don't you dare stop! 🚀",
  "The finish line is right there!",
  "You can practically taste victory. 🏆",
  "Just a few more. You've got this!",
  "This is the final push. Make it count!",
  "Almost legendary. Keep clicking! ⭐",
  "The home stretch. Pure determination.",
  "You're about to make it happen!",
];

const completionQuotes = [
  "🎉 YOU DID IT! Absolutely incredible!",
  "🏆 Goal crushed! You're a legend!",
  "✨ 100% complete. Take a bow!",
  "🎊 Mission accomplished! Celebrate this!",
  "🌟 You proved it's possible. What's next?",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getQuote(percentage: number): string {
  if (percentage >= 100) return randomFrom(completionQuotes);
  if (percentage >= 75) return randomFrom(almostQuotes);
  if (percentage >= 50) return randomFrom(pushingQuotes);
  if (percentage >= 25) return randomFrom(buildingQuotes);
  return randomFrom(startingQuotes);
}
