const { createApp } = Vue;

createApp({
    vuetify: new Vuetify(), // Vuetifyプラグインの初期化
    data() {
        return {
            characters: [
                { id: 'typeA', value: '【ほのぼの】男1', label: '【ほのぼの】男1' },
                { id: 'typeB', value: '【ほのぼの】女1', label: '【ほのぼの】女1' },
                { id: 'typeC', value: 'other', label: 'その他' }
            ],
            selectedCharacter: '【ほのぼの】男1',
            otherCharacterName: ''
        };
    },
    methods: {
        downloadCSV() {
            let character = this.selectedCharacter === 'other' ? this.otherCharacterName : this.selectedCharacter;
            if (!character) {
                return alert('キャラクター名が入力されていません。');
            }
            const csvContent = `キャラクター名\n${character}`;
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'character.csv';
            link.click();
            URL.revokeObjectURL(url);
        }
    }
}).use(Vuetify).mount('#app');
