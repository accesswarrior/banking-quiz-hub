// js/games/werewolf/rules.js

function assignRoles(playerCount) {
  // Simple distribution: 2 werewolves, 1 seer, 1 doctor, rest villagers
  const roles = [];
  const numWerewolves = 2;
  const numSeer = 1;
  const numDoctor = 1;
  const numVillagers = playerCount - numWerewolves - numSeer - numDoctor;

  for (let i = 0; i < numWerewolves; i++) roles.push('werewolf');
  for (let i = 0; i < numSeer; i++) roles.push('seer');
  for (let i = 0; i < numDoctor; i++) roles.push('doctor');
  for (let i = 0; i < numVillagers; i++) roles.push('villager');

  // Shuffle roles
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }
  return roles;
}
