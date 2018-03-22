const navBoxes = document.querySelectorAll('.menu > ul > li');
const background = document.querySelector('.dropdown-background');

// move the dropdown-background to align with dropdown-content
function alignDropdown(item) {
    const btn = item.firstElementChild;
	const menu = item.lastElementChild;
	const bdims = btn.getBoundingClientRect();
	const mdims = menu.getBoundingClientRect();
    const center = (bdims.width - mdims.width)/2;

    menu.style.marginLeft = center+"px";
    background.style.height = mdims.height+"px";
	background.style.width = mdims.width+"px";
	background.style.left = (bdims.x+center)+"px";
	background.style.top = (mdims.y+5)+"px";
}

// figure out which direction mouse is coming from
function leftRight(item) {
    // This is designed to detect whether the cursor is coming immediately
    // from the right or left. If you wanted to do more than nearest neighbor,
    // you'd have to apply .left to all previous siblings and .right to all
    // subsequent siblings.
    const menu = item.lastElementChild.firstElementChild;
    const left = item.previousElementSibling && item.previousElementSibling;
    const right = item.nextElementSibling && item.nextElementSibling;
    const oldLeft = document.querySelector('.left');
    const oldRight = document.querySelector('.right');

    if (item.classList.contains('left')) {
        menu.classList.add('slide');
        menu.style.transform = 'translateX(-3px)';
        setTimeout(() => menu.style.transform = 'translateX(0)', 10);
    } else if (item.classList.contains('right')) {
        menu.classList.add('slide');
        menu.style.transform = 'translateX(3px)';
        setTimeout(() => menu.style.transform = 'translateX(0)', 10);
    }
    
    // out with the old, in with the new
    oldLeft && oldLeft.classList.remove('left');
    oldRight && oldRight.classList.remove('right');
    left && item.previousElementSibling.classList.add('left');
    right && item.nextElementSibling.classList.add('right');
}

function handleEnter() {
    leftRight(this);
    this.classList.add('nav-mouseEnter');
    background.classList.add('open');
    // can't change from display:none and animate opacity simultaneously
    setTimeout(() => {this.classList.add('active')},1)
    alignDropdown(this);
}

function handleLeave() {
    this.classList.remove('nav-mouseEnter', 'active');
    background.classList.remove('open');
}

navBoxes.forEach(navBox => navBox.addEventListener('mouseenter', handleEnter));
navBoxes.forEach(navBox => navBox.addEventListener('mouseleave', handleLeave));