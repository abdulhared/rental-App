// append.js
function getClientData() {
  const container = document.getElementById("client-list");
  
  // Clear table and show loading state
  container.innerHTML = `
    <tr>
      <td colspan="3" class="px-4 py-3 text-center text-xs text-gray-500">
        Loading data...
      </td>
    </tr>
  `;

  fetch("http://localhost:3001/clients")
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then((clients) => {
      // Clear loading state
      container.innerHTML = "";

      // Handle empty data
      if (!clients || clients.length === 0) {
        container.innerHTML = `
          <tr>
            <td colspan="3" class="px-4 py-3 text-center text-xs text-gray-500">
              No clients found
            </td>
          </tr>
        `;
        return;
      }

      // Populate table with actual data
      clients.forEach(client => {
        const row = document.createElement("tr");
        row.className = "hover:bg-gray-50";
        row.innerHTML = `
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${client.fullName || '-'}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${client.phone || '-'}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${client.roomNumber || '-'}</td>


          
          <button 
      data-id="${client.id}" 
      class="delete-btn text-red-600 hover:text-red-900 text-xs font-medium"
    >
      <i class="fas fa-trash-alt mr-1"></i> Delete
    </button>
  </td>
        `;
        container.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Fetch error:", err);
      container.innerHTML = `
        <tr>
          <td colspan="3" class="px-4 py-3 text-center text-xs text-red-500">
            Failed to load data. ${err.message}
          </td>
        </tr>
      `;
    });
}

// Load data when page opens
document.addEventListener('DOMContentLoaded', getClientData);


// Add after your getClientData() definition
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
    const button = e.target.classList.contains('delete-btn') ? e.target : e.target.closest('.delete-btn');
    const clientId = button.getAttribute('data-id');
    deleteClient(clientId);
  }
});

async function deleteClient(clientId) {
  if (!confirm("Delete this client permanently?")) return;
  
  try {
    const response = await fetch(`http://localhost:3001/clients/${clientId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      getClientData(); // Refresh the table
    } else {
      throw new Error('Failed to delete');
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting client");
  }
}
