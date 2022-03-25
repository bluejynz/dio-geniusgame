const toggleOpacity = (element) => {
    element.classList.toggle('selected');
    setTimeout(() => {
        element.classList.toggle('selected');
    }, 500);
}