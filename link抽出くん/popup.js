document.getElementById('extract').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractLinks
        }, (injectionResults) => {
            const links = injectionResults[0].result;
            const container = document.getElementById('links');
            container.innerHTML = '';
            links.forEach(link => {
                const a = document.createElement('a');
                a.textContent = link;
                a.href = link;
                a.className = 'link'; // CSSクラスを追加
                const div = document.createElement('div');
                div.appendChild(a);
                container.appendChild(div);
            });
        });
    });
});

function extractLinks() {
    const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    return links;
}
