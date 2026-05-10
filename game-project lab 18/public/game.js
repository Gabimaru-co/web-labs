$(document).ready(function () {
    let currentNumber = 1;
    let timeLeft = 60;
    let timer;
    let gameCounter = 0;
    let results = [];
    startGame();
    $('#restartBtn').click(function () {
        startGame();
    });

    function startGame() {
        clearInterval(timer);
        currentNumber = 1;
        timeLeft = 60;
        $('#timer').text(timeLeft);
        createNumbers();
        startTimer();
    }

    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;
            $('#timer').text(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Час вийшов!');
                startGame();
            }
        }, 1000);
    }

    function createNumbers() {
        $('#gameField').empty();
        let numbers = [];
        for (let i = 1; i <= 20; i++) {
            numbers.push(i);
        }
        numbers = shuffle(numbers);
        numbers.forEach(number => {
            let block = $('<div>');
            block.addClass('number');
            block.text(number);
            block.css({
                background: randomColor(),
                fontSize: randomSize()
            });
            block.click(function () {
                if (number === currentNumber) {
                    $(this).addClass('correct');
                    currentNumber++;
                    if (currentNumber > 20) {
                        clearInterval(timer);
                        let usedTime = 60 - timeLeft;
                        alert(`Вітаємо! Ви пройшли гру за ${usedTime} секунд`);
                        saveResult(usedTime);
                        startGame();
                    }
                } else {
                    alert('Не вірна цифра');
                }
            });
            $('#gameField').append(block);
        });
    }

    function randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function randomSize() {
        let sizes = [
            '20px',
            '24px',
            '28px',
            '32px',
            '36px'
        ];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function saveResult(time) {
        gameCounter++;
        results.push({
            game: `Гра ${gameCounter}`,
            time: time
        });
        updateTable();
    }
    function updateTable() {
        $('#statsTable').empty();
        let bestTime = Math.min(...results.map(r => r.time));
        results.forEach(result => {
            let row = $('<tr>');
            if (result.time === bestTime) {
                row.addClass('best-result');
            }
            row.append(`<td>${result.game}</td>`);
            row.append(`<td>${result.time} с.</td>`);
            $('#statsTable').append(row);
        });
    }
});