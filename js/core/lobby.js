// js/core/lobby.js

let currentSessionId = null;
let currentPlayerId = null;
let isModerator = false;

// Render lobby content based on whether user is moderator or player
function renderLobby(sessionId, playerId, isMod) {
  currentSessionId = sessionId;
  currentPlayerId = playerId;
  isModerator = isMod;

  const lobbyContent = document.getElementById('lobby-content');
  lobbyContent.innerHTML = `
    <p>Room Code: <strong>${sessionId}</strong></p>
    <ul class="player-list" id="player-list">
      <!-- Players will be listed here -->
    </ul>
    <button id="ready-btn">Ready</button>
    ${isModerator ? '<button id="start-btn" disabled>Start Game (need 8+ ready)</button>' : ''}
    <button id="logout-btn">Logout</button>
  `;

  // Set up real-time listener for players
  db.collection(`sessions/${sessionId}/players`).onSnapshot(snapshot => {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';
    let readyCount = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement('li');
      li.textContent = `${data.username} ${data.ready ? '✔️' : ''}`;
      playerList.appendChild(li);
      if (data.ready) readyCount++;
    });

    // Enable start button if readyCount >= 8 and user is moderator
    if (isModerator && document.getElementById('start-btn')) {
      document.getElementById('start-btn').disabled = readyCount < 8;
    }
  });

  // Attach event listeners
  document.getElementById('ready-btn').addEventListener('click', toggleReady);
  if (isModerator) {
    document.getElementById('start-btn').addEventListener('click', startGame);
  }
  document.getElementById('logout-btn').addEventListener('click', logout);
}

async function toggleReady() {
  const playerRef = db.collection(`sessions/${currentSessionId}/players`).doc(currentPlayerId);
  const doc = await playerRef.get();
  const current = doc.data().ready || false;
  await playerRef.update({ ready: !current });
}

async function startGame() {
  // Call engine to assign roles and reveal them
  const playersSnapshot = await db.collection(`sessions/${currentSessionId}/players`).get();
  const players = [];
  playersSnapshot.forEach(doc => {
    players.push({ id: doc.id, ...doc.data() });
  });
  const roles = assignRoles(players.length); // from game rules

  // Update each player's document with their role
  const batch = db.batch();
  players.forEach((player, index) => {
    const role = roles[index];
    batch.update(db.collection(`sessions/${currentSessionId}/players`).doc(player.id), {
      role: role,
      alive: true
    });
  });
  await batch.commit();

  // Show role screen to the current user
  const myRole = players.find(p => p.id === currentPlayerId).role;
  showRoleScreen(myRole, isModerator ? players.map(p => ({ name: p.username, role: p.role })) : null);
}
