// TempleOS 16 colors
function getRandomColor() {
    const colors = [
        '#000000', '#0000AA', '#00AA00', '#00AAAA',
        '#AA0000', '#AA00AA', '#AA5500', '#AAAAAA',
        '#555555', '#5555FF', '#55FF55', '#55FFFF',
        '#FF5555', '#FF55FF', '#FFFF55',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function colorizeText(element) {
    if (element.nodeType === Node.TEXT_NODE && element.textContent.trim() !== '') {
        const wrapper = document.createElement('span');
        wrapper.className = 'temple-letter-wrapper';
        const text = element.textContent;
        
        wrapper.innerHTML = text.split('').map(char => 
            char === ' ' ? ' ' : `<span style="color: ${getRandomColor()}">${char}</span>`
        ).join('');
        
        element.parentNode.replaceChild(wrapper, element);
    } else {
        Array.from(element.childNodes).forEach(child => {
            if (child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                colorizeText(child);
            }
        });
    }
}

function applyRandomColors() {
    if (!document.body.classList.contains('temple-theme')) return;
    document.querySelectorAll('.temple-letter-wrapper').forEach(wrapper => wrapper.remove());
    colorizeText(document.body);
}

function resetColors() {
    document.querySelectorAll('.temple-letter-wrapper').forEach(wrapper => {
        const text = wrapper.textContent;
        const textNode = document.createTextNode(text);
        wrapper.parentNode.replaceChild(textNode, wrapper);
    });
}

function toggleTempleTheme() {
    const body = document.body;
    const templeElements = document.querySelectorAll('.temple-theme-only');
    body.classList.toggle('temple-theme');

    templeElements.forEach(el => {
        el.style.display = body.classList.contains('temple-theme') ? 'block' : 'none';
    });

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
