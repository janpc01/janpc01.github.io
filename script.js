function getRandomColor() {
    const colors = [
        '#FFFFFF', '#55FF55', '#FF5555', '#5555FF', 
        '#FFFF55', '#FF55FF', '#55FFFF', '#AAAA00'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function applyRandomColors() {
    if (!document.body.classList.contains('temple-theme')) return;
    
    // Select all text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        // Skip if parent is script or style
        if (node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE') continue;
        
        // Create a span for each letter
        const span = document.createElement('span');
        span.innerHTML = Array.from(node.textContent).map(char => 
            char === ' ' ? ' ' : `<span style="color: ${getRandomColor()}">${char}</span>`
        ).join('');
        
        // Replace the text node with our colored span
        node.parentNode.replaceChild(span, node);
    }
}

function toggleTempleTheme() {
    const body = document.body;
    body.classList.toggle('temple-theme');
    
    if (body.classList.contains('temple-theme')) {
        applyRandomColors();
    } else {
        // Reset all colored spans back to normal text
        document.querySelectorAll('span > span').forEach(span => {
            const text = span.textContent;
            if (span.parentNode.childNodes.length === 1) {
                const textNode = document.createTextNode(text);
                span.parentNode.parentNode.replaceChild(textNode, span.parentNode);
            }
        });
    }
    
    localStorage.setItem('templeTheme', body.classList.contains('temple-theme'));
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('templeTheme');
    
    if (savedTheme === 'true') {
        document.body.classList.add('temple-theme');
        applyRandomColors();
    }
    
    themeToggle.addEventListener('click', toggleTempleTheme);
});
