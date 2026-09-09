// js/games/werewolf/ui.js

function showRoleScreen(myRole, allRolesInfo) {
  const roleContent = document.getElementById('role-content');
  let html = `<div class="role-card">You are: <strong>${myRole.toUpperCase()}</strong></div>`;

  if (allRolesInfo) {
    // Moderator sees all roles
    html += `<h3>All Roles</h3><ul class="player-list">`;
    allRolesInfo.forEach(p => {
      html += `<li>${p.name}: ${p.role}</li>`;
    });
    html += `</ul>`;
  }

  roleContent.innerHTML = html;
  showScreen('role-screen');
}
