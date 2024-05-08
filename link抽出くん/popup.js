document.getElementById('extract').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: extractLinks
        }, (injectionResults) => {
            let links = injectionResults[0].result;
            let container = document.getElementById('links');
            container.innerHTML = '';
            links.forEach(link => {
                let div = document.createElement('div');
                div.textContent = link;
                container.appendChild(div);
            });
        });
    });
});

function extractLinks() {
    let links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    return links;
}
