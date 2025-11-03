console.log("Email extension: loaded success.");

function showToneSelector(aiButton, onSelect) {
  // Remove existing popup if any
  const existingPopup = document.querySelector('.tone-selector-popup');
  if (existingPopup) existingPopup.remove();

  // Create popup
  const popup = document.createElement('div');
  popup.className = 'tone-selector-popup';
  Object.assign(popup.style, {
    position: 'absolute',
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '8px',
    padding: '4px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: '9999',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '14px',
    color: '#202124',
    width: '180px',

    // 🔹 Scroll-related styling
    maxHeight: '160px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc transparent',
  });

  // Chrome / Edge scrollbar styling
  popup.style.cssText += `
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #999;
    }
  `;

  // Add tone options
  const tones = ['Professional', 'Friendly', 'Casual', 'Formal', 'Sarcastic', 'Crisp'];
  tones.forEach(tone => {
    const option = document.createElement('div');
    option.textContent = tone;
    Object.assign(option.style, {
      padding: '8px 16px',
      cursor: 'pointer',
      userSelect: 'none',
    });
    option.addEventListener('mouseenter', () => option.style.background = '#f1f3f4');
    option.addEventListener('mouseleave', () => option.style.background = 'transparent');
    option.addEventListener('click', () => {
      onSelect(tone);
      closePopup();
    });
    popup.appendChild(option);
  });

  // Attach popup inside Gmail toolbar
  const toolbar = aiButton.closest('.btC, .aDh, .gU.Up, [role="toolbar"]');
  if (!toolbar) return;
  toolbar.style.position = 'relative';
  toolbar.appendChild(popup);

  // Position popup below the AI button
  const rect = aiButton.getBoundingClientRect();
  const toolbarRect = toolbar.getBoundingClientRect();
  popup.style.top = `${rect.bottom - toolbarRect.top + 6}px`;
  popup.style.left = `${rect.left - toolbarRect.left}px`;

  // Subtle fade-in animation
  popup.style.opacity = '0';
  popup.style.transform = 'translateY(-6px)';
  popup.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  requestAnimationFrame(() => {
    popup.style.opacity = '1';
    popup.style.transform = 'translateY(0)';
  });

  // Close popup when clicking outside
  function handleOutsideClick(e) {
    if (!popup.contains(e.target) && !aiButton.contains(e.target)) {
      closePopup();
    }
  }
  document.addEventListener('click', handleOutsideClick);

  // Cleanup
  function closePopup() {
    popup.style.opacity = '0';
    popup.style.transform = 'translateY(-6px)';
    setTimeout(() => popup.remove(), 150);
    document.removeEventListener('click', handleOutsideClick);
  }
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.margin = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        'a3s.aiL',
        'gmail_quote',
        '[role="presentation"]'
    ];

    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        } 
        return '';
    }
}

function findComposeToolBar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];

    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        } 
        return null;
    }
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolBar = findComposeToolBar();
    if (!toolBar) {
        console.log("Toolbar not found.");
        return;
    }

    console.log("Toolbar found, Generating AI button.");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();

        console.log("AI Reply button clicked. Showing tone selector...");
        showToneSelector(button, async (selectedTone) => {
            console.log("Tone selected:", selectedTone);
            try {
                button.innerHTML = 'Generating Reply...';
                button.disabled = true;

                const emailContent = getEmailContent();
                if (!emailContent) {
                    alert("Could not extract email content!");
                    return;
                }

                // const response = await fetch('http://localhost:8080/api/email/generate', {
                const response = await fetch('https://email-writer-assistant-s3kc.onrender.com/api/email/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        emailContent: emailContent,
                        tone: selectedTone
                    })
                });

                if (!response.ok) {
                    throw new Error('API Request Failed.');
                }

                const generatedResponse = await response.text();
                const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

                if (composeBox) {
                    composeBox.focus();
                    document.execCommand('insertText', false, generatedResponse);
                } else {
                    console.error('Compose box not found!!');
                }
            } catch (error) {
                console.error(error);
                alert('Failed to generate the response.');
            } finally {
                button.innerHTML = 'AI Reply';
                button.disabled = false;
            }
        });
    });

    toolBar.insertBefore(button, toolBar.firstChild);
}


// function injectButton() {
//     const existingButton = document.querySelector('.ai-reply-button');
//     if(existingButton) existingButton.remove();

//     const toolBar = findComposeToolBar();
//     if(!toolBar){
//          console.log("Toolbar not found.");
//          return;
//     }
//     console.log("Toolbar found, Generating AI button.");
//     const button = createAIButton();
//     button.classList.add('ai-reply-button');

//     button.addEventListener('click', async () => {
//         showToneSelector(async (selectedTone) => {
//         try{
//             button.innerHTML = 'Generating Reply...';
//             button.disabled = true;

//             const emailContent = getEmailContent(); 
//             const response =  await fetch('http://localhost:8080/api/email/generate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     emailContent: emailContent,
//                     tone: selectedTone
//                 })
//             });

//             if(!response.ok){
//                 throw new Error('API Request Failed.');
//             }

//             const generatedResponse = await response.text();
//             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

//             if(composeBox){
//                 composeBox.focus();
//                 document.execCommand('insertText', false, generatedResponse);
//             }
//             else{
//                 console.error('Compose box not found!!');
//             }
//         } catch(error){
//             console.error(error);
//             alert('Failed to generate the response.');
//         } finally{
//             button.innerHTML = 'AI Reply';
//             button.disabled = false;
//         }
//     });
//     });

//     toolBar.insertBefore(button, toolBar.firstChild);
// }

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        } 
    }
});

observer.observe(document.body, {
    childList:true,
    subtree:true
})