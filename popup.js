document.getElementById('processBtn').addEventListener('click', async () => {
  console.log('Process button clicked');
  const checkboxes = document.querySelectorAll('input[name="category"]:checked');
  const messageElement = document.getElementById('message');
  
  if (checkboxes.length === 0) {
    messageElement.textContent = 'Error: Choose a category';
    messageElement.style.color = 'red';
    return;
  }
  
  if (checkboxes.length > 1) {
    messageElement.textContent = 'Error:Too many categories';
    messageElement.style.color = 'red';
    return;
  }
  
  const category = checkboxes[0].value;
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: sendUrlToBackend,
    args: [category]
  });

  // Display success message
  messageElement.textContent = 'Sent to the server!';
  messageElement.style.color = 'green';
});

function sendUrlToBackend(category) {
  const url = window.location.href;
  console.log('Sending URL to backend:', url, 'Category:', category);
  fetch('https://notion-extension-backend.onrender.com/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url, category: category }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
