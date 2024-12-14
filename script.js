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

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip script, style tags, and the theme toggle button
                if (node.parentNode.tagName === 'SCRIPT' || 
                    node.parentNode.tagName === 'STYLE' || 
                    node.parentNode.classList.contains('theme-toggle')) {
                    return NodeFilter.FILTER_REJECT;
                }
                // Skip empty text nodes
                if (node.textContent.trim() === '') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    let node;
    while ((node = walker.nextNode())) {
        const text = node.textContent;
        const wrapper = document.createElement('span');
        wrapper.className = 'temple-text';
        wrapper.innerHTML = Array.from(text).map(char => {
            if (char === ' ') return ' ';
            return `<span class="temple-letter" style="color: ${getRandomColor()}">${char}</span>`;
        }).join('');
        node.parentNode.replaceChild(wrapper, node);
    }
}

function resetColors() {
    document.querySelectorAll('.temple-text').forEach(wrapper => {
        const text = wrapper.textContent;
        const textNode = document.createTextNode(text);
        wrapper.parentNode.replaceChild(textNode, wrapper);
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
