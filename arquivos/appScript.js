
document.getElementById('menuBtn').onclick = () => toggleOverlay('menuOverlay');
document.getElementById('profileBtn').onclick = () => toggleOverlay('profileOverlay');
document.getElementById('publishBtn').onclick = () => publishPost();
document.getElementById('searchBtn').onclick = () => filterPosts();

function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

function closeOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'none';
}

function publishPost() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('serviceDesc').value;
    const images = document.getElementById('serviceImages').files;
    
    if (name && description && images.length > 0) {
        const newPost = document.createElement('div');
        newPost.classList.add('post');

        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            imageUrls.push(URL.createObjectURL(images[i]));
        }

        newPost.onclick = () => openPost(name, description, '(00) 00000-0000', imageUrls);
        
        newPost.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <div class="carousel">${createImageCarousel(imageUrls)}</div>
        `;
        
        document.getElementById('mainContent').prepend(newPost);
        
        alert('Postagem publicada com sucesso!');
        closeOverlay('menuOverlay');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function createImageCarousel(images) {
    return images.map(imageUrl => `<img src="${imageUrl}" alt="Imagem do Serviço">`).join('');
}

function openPost(name, service, contact, images) {
    const postDetails = `
        <h3 class="nome-pessoa">${name}</h3>
        
        <div class="carousel">${createImageCarousel(images)}</div>
        <p class="servico-feito">faz: ${service}</p>
          <div class="numero-area" style="display: flex; align-items: center;" >
            <p class="numero-de-contato">Contato: ${contact}</p>
            <button class="btn-copiar" style="margin-left: 10px;" onclick="copyToClipboard('${contact}')">Copiar</button>
        </div>

        <button class="btn Voltar" onclick="closeOverlay('postOverlay')">Voltar</button>
    `;
    document.getElementById('postDetails').innerHTML = postDetails;
    toggleOverlay('postOverlay');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Número copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

function filterPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const name = post.querySelector('h3').textContent.toLowerCase();
        const description = post.querySelector('p').textContent.toLowerCase();
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

