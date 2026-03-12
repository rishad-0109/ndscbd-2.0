function showYear(yearId, btn){

    document.querySelectorAll('.executive-container')
    .forEach(c => c.classList.remove('active'));

    document.querySelectorAll('.year-btn')
    .forEach(b => b.classList.remove('active'));

    document.getElementById(yearId).classList.add('active');
    btn.classList.add('active');
}


function openModal(name, position, department, description, image){

    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-position').innerText = position;
    document.getElementById('modal-department').innerText = department;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-img').src = image;

    document.getElementById('modal').style.display = "flex";
}

function closeModal(){
    document.getElementById('modal').style.display = "none";
}

/* Close modal when clicking outside */
window.onclick = function(e){
    if(e.target == document.getElementById('modal')){
        closeModal();
    }
}