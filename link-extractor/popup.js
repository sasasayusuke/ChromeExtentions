// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementById('linkFiled')
    try {
        document.getElementById('extract').addEventListener('click', async function () {
            try {
                let links = await getContentsFromActiveTab(extractLinks)
                container.innerHTML = ''; // コンテナをクリア
                links.forEach(linkInfo => {
                    let a = document.createElement('a');
                    a.textContent = linkInfo.text; // リンクのテキストを表示
                    a.href = linkInfo.href;
                    a.className = 'link';
                    a.target = '_blank'; // 新しいタブでリンクを開く
                    let div = document.createElement('div');
                    div.appendChild(a);
                    container.appendChild(div);
                });
            } catch (error) {
                alert(`click時エラーが発生しました:${error}`)
            }
        })
    } catch (error) {
        alert(`load時エラーが発生しました:${error}`)
    }
})


function extractLinks() {
    // href属性とinnerTextをオブジェクトとして取得
    const links = Array.from(document.querySelectorAll('a')).map(a => ({
        href: a.href,
        text: a.innerText // innerTextも取得
    }))
    return links
}