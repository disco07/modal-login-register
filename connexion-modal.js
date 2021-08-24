const tabs = () => {
    const tabs = document.querySelectorAll('.js-tabs a');
    tabs.forEach(tab => tab.addEventListener('click', () => {
        const div = tab.parentNode.parentNode.parentNode;
        const li = tab.parentNode;
        const activeTabs = div.querySelector('.tabs-content .active');
        const toDisplay = div.querySelector(tab.getAttribute('href'));
        if(li.classList.contains('.active')) {
            return
        }

        div.querySelector('.js-tabs .active').classList.remove('active');
        li.classList.add('active');

        activeTabs.classList.add('fadeScroll');
        activeTabs.classList.remove('in');

        const transitionend = function() {
            this.classList.remove('fadeScroll');
            this.classList.remove('active');
            toDisplay.classList.add('active');
            toDisplay.classList.add('fadeScroll');
            toDisplay.offsetWidth
            toDisplay.classList.add('in');
            activeTabs.removeEventListener('transitionend', transitionend)
        }
        
        activeTabs.addEventListener('transitionend', transitionend)
    }))
}


let modal = null
const openModal = function(e) {
    e.preventDefault()
    tabs()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
    e.preventDefault()
    if (modal === null) {
        return
    }
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(m => {
    m.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if (e.hey === 'Escape' || e.key === 'Esc') {
        closeModal(e)
    }
})