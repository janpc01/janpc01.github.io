// TempleOS 16 colors
function getRandomColor() {
    const colors = [
        '#000000', '#0000AA', '#00AA00', '#00AAAA',
        '#AA0000', '#AA00AA', '#AA5500', '#AAAAAA',
        '#555555', '#5555FF', '#55FF55', '#55FFFF',
        '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function applyRandomColors() {
    if (!document.body.classList.contains('temple-theme')) return;

    // Walk through all text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while ((node = walker.nextNode())) {
        if (node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE') continue;

        const text = node.textContent;
        const coloredHTML = Array.from(text).map(char => {
            if (char.trim() === '') return char; // Preserve spaces
            return `<span style="color: ${getRandomColor()}">${char}</span>`;
        }).join('');

        // Create a temporary wrapper span
        const wrapper = document.createElement('span');
        wrapper.innerHTML = coloredHTML;
        node.parentNode.replaceChild(wrapper, node);
    }
}

function resetColors() {
    document.querySelectorAll('span.temple-letter').forEach(span => {
        const textNode = document.createTextNode(span.textContent);
        span.parentNode.replaceChild(textNode, span);
    });
}

function toggleTempleTheme() {
    const body = document.body;
    body.classList.toggle('temple-theme');

    if (body.classList.contains('temple-theme')) {
        applyRandomColors();
    } else {
        resetColors();
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
