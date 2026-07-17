// Achievement definitions. These are fixed reference data, so they live in code
// rather than the database — the database only records which ones each student
// has unlocked (embedded on the User document).
export const ACHIEVEMENTS = [
  { code: 'first_build',   title: 'First PC Build', description: 'Complete your first full PC build.',        xp_reward: 100, badge_image: null },
  { code: 'correct_cpu',   title: 'Correct CPU',    description: 'Install a CPU that matches the socket.',     xp_reward: 50,  badge_image: null },
  { code: 'correct_ram',   title: 'Correct RAM',    description: 'Install RAM that matches the board.',        xp_reward: 50,  badge_image: null },
  { code: 'power_master',  title: 'Power Master',   description: 'Fit a power supply with enough wattage.',    xp_reward: 50,  badge_image: null },
  { code: 'cable_manager', title: 'Cable Manager',  description: 'Connect the power and data cables correctly.', xp_reward: 50, badge_image: null },
];

export const ACHIEVEMENTS_BY_CODE = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.code, a]));
