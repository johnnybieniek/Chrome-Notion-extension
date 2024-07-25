document.getElementById('processBtn').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendUrlToBackend
    });
  });
  
  function sendUrlToBackend() {
    const url = window.location.href;
    console.log('Sending URL to backend:', url);
    fetch('https://notion-extension-backend.onrender.com/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  