const blocks = document.querySelectorAll('.block');
window.addEventListener('scroll', () => {
    const trigger = window.innerHeight * 0.8;

    blocks.forEach(block => {
        const top = block.getBoundingClientRect().top;
        if (top < trigger) {
            block.classList.add('show');
        }
    });
});
/* анім при скролі */