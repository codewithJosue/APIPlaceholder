//GET URL API
import config from './config.js';

/*****************************
 Exercise 1: Get data from the API
 *******************************/
const getDataApiPlaceHolder = async () => {
    try {
        const response = await fetch(`${config.API_URL}/posts`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        return data.slice(0,20);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};


/********************************
 Exercise 2: Data processing
 ********************************/
const sortPublicationsByTitle = (publications) => {
    return publications.sort((a, b) => a.title.localeCompare(b.title));
};


/*************************************
 Exercise 3: Presenting data in the DOM
 ***************************************/
const showPublicationsHtml = (publications) => {
    const publicationsContainer = document.getElementById('publication-container');
    publicationsContainer.innerHTML = '';

    publications.forEach(post => {
        const publicationElement = document.createElement('div');
        publicationElement.classList.add('publication');

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        const iconElement = document.createElement('img');
        iconElement.src = 'assets/icon.png';
        iconElement.alt = 'Publication Icon';
        iconElement.classList.add('publication-icon');

        const publicationTitle = document.createElement('h2');
        publicationTitle.classList.add('publication-title');
        publicationTitle.textContent = post.title;

        titleContainer.appendChild(iconElement);
        titleContainer.appendChild(publicationTitle);

        const publicationBody = document.createElement('p');
        publicationBody.classList.add('publication-body');
        publicationBody.textContent = post.body;

        publicationElement.appendChild(titleContainer);
        publicationElement.appendChild(publicationBody);
        publicationsContainer.appendChild(publicationElement);
    });
};


/* INITIALIZE APP */
const initApp = async () => {
    let publications = await getDataApiPlaceHolder();
    publications = sortPublicationsByTitle(publications);
    showPublicationsHtml(publications);
};

document.addEventListener('DOMContentLoaded', initApp);