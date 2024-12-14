function getRandomColor() {
    const colors = [
        '#FFFFFF', '#55FF55', '#FF5555', '#5555FF', 
        '#FFFF55', '#FF55FF', '#55FFFF', '#AAAA00'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function applyRandomColors() {
    if (!document.body.classList.contains('temple-theme')) return;
    
    const textNodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = textNodes.nextNode()) {
        const span = document.createElement('span');
        span.innerHTML = Array.from(node.textContent).map(char => 
            char === ' ' ? ' ' : `<span style="color: ${getRandomColor()}">${char}</span>`
        ).join('');
        node.parentNode.replaceChild(span, node);
    }
}

function toggleTempleTheme() {
    const body = document.body;
    body.classList.toggle('temple-theme');
    
    if (body.classList.contains('temple-theme')) {
        applyRandomColors();
    } else {
        // Reset all spans back to normal text
        document.querySelectorAll('.temple-theme span span').forEach(span => {
            const text = span.textContent;
            const textNode = document.createTextNode(text);
            span.parentNode.replaceChild(textNode, span);
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
