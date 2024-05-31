# API Data Fetching and Presentation

This project gets data from an API, processes it, and displays it in the DOM in an organized way.

The API that we will be using for this case will be:
[JSONPlaceholder](https://jsonplaceholder.typicode.com)


## Project Structure

- **index.html**: The main HTML file that serves as the entry point of the application.
- **css/styles.css**: CSS file containing styles for the publication catalog.
- **js/app.js**: JavaScript file responsible for fetching data from the API and rendering it in the publication catalog.
- **assets**: Directory containing various resources used in the project.
    - **icons**: Subdirectory containing graphical icons used for the project.

The project consists of three main exercises:

1. Fetch data from the API.
2. Process the fetched data.
3. Present the data in the DOM.

### 1. Fetch Data from the API

```javascript
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
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
```
The function getDataApiPlaceHolder makes an HTTP GET request to the URL provided in the config.js file. If the request is successful, the data is returned in JSON format. If there is an error during the request, it is caught and logged to the console, and the function returns an empty array.
### 2. Process the Fetched Data
```javascript
/********************************
Exercise 2: Data processing
 ********************************/
const sortPublicationsByTitle = (publications) => {
    return publications.sort((a, b) => a.title.localeCompare(b.title));
};
```
The function sortPublicationsByTitle takes an array of publications and sorts them alphabetically by the title. It uses the localeCompare method to compare the titles, taking into account locale-specific conventions.

For exercise number two, a JavaScript method was used to alphabetically sort the posts. The sorting is done using the `localeCompare` method. You can find more information about this method in the official MDN documentation:

[Array.prototype.sort() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

[String.prototype.localeCompare() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)


### 3. Present the Data in the DOM
```javascript
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
```
The function showPublicationsHtml takes an array of publications and creates HTML elements for each one. Each publication is represented as a div with a title and a body, which are added to the publications container in the DOM.
### Initialize the Application
```javascript
/* INITIALIZE APP */
const initApp = async () => {
    let publications = await getDataApiPlaceHolder();
    publications = sortPublicationsByTitle(publications);
    showPublicationsHtml(publications);
};

document.addEventListener('DOMContentLoaded', initApp);
```
The function initApp coordinates the three main tasks: fetching, processing, and displaying the posts. It is called when the DOM content is fully loaded, ensuring that the necessary DOM elements are available.

### Project Files
`index.html`
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>API - Publication Catalog</title>
    <link rel="stylesheet" href="./css/styles.css">
    <script type="module" src="./js/app.js"></script>
</head>
<body>
<h1 class="title">List of Publications</h1>
<div id="publication-container"></div>
</body>
</html>
```
This HTML file (index.html) serves as the main entry point for the API-powered publication catalog project. It defines the structure of the webpage and includes necessary metadata, stylesheets, and JavaScript files.

`assets`
The assets directory houses essential resources utilized to enhance both the visual appeal and functionality of your project.
`icon.png`
This PNG icon serves as a visual representation for publications within your project

`config.js`
```javascript
const config = {
    API_URL: 'https://jsonplaceholder.typicode.com'
};

export default config;
```
This file contains the project's configuration, including the base URL of the API.

`app.js`
```javascript
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
```
This JavaScript script interacts with an API to fetch publication data and displays it on a web page. It imports configuration settings from the `config.js` file, including the base URL of the API. The script defines three main functions: `getDataApiPlaceHolder`, which fetches data from the API endpoint "/posts" and handles any errors during the request; `sortPublicationsByTitle`, which sorts the fetched publications alphabetically by title; and `showPublicationsHtml`, which dynamically generates HTML elements for each publication and displays them in the DOM. Finally, the script initializes the app when the HTML page is fully loaded by calling the `initApp` function.


`styles.css`
```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.title {
    text-align: center;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Georgia', serif;
    letter-spacing: 1px;
    text-transform: capitalize;
    line-height: 1.2;
    padding: 10px 0;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

#publication-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.publication {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: calc(33.333% - 40px);
    box-sizing: border-box;
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 10px;
}

.publication:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.publication-title {
    font-size: 1.5em;
    font-family: 'Playfair Display', serif;
    margin: 0;
    color: #333;
}

.publication-body {
    font-size: 1em;
    font-family: 'Lora', serif;
    line-height: 1.6;
    color: #666;
}

.publication-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

```
