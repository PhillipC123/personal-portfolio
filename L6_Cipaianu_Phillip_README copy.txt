# Lab 5

**[Optional]** If what is being submitted is an individual Lab or Assignment. Otherwise, include a brief one paragraph description about the project.

* *Date Created*: 12 03 2025
* *Last Modification Date*: 13 03 2025
* *Repo URL*: https://git.cs.dal.ca/cipaianu/csci-3172/
* *Lab [GitHub] URL*: https://github.com/PhillipC123/csci3172
* *Lab URL*: https://git.cs.dal.ca/cipaianu/csci-3172/-/tree/main/labs/lab5
* *Web URL*: https://recipe-app3172.netlify.app/


## Authors

If what is being submitted is an individual Lab or Assignment, you may simply include your name and email address. Otherwise list the members of your group.

* [Phillip Eliat-Cipaianu](ph469663@dal.ca) - (Author)


## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [Netlify] (https://docs.netlify.com/get-started/) - Used to host and deploy server
* [Express.js] (https://expressjs.com/) - Used to handle API requests and responses

No additional frameworks besides:

* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling the Webpage
* [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Front-End Functionality

## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.


### netlify/functions/api.js

*Lines #1 - #35*

```
import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const api = express();
const router = express.Router();
const RECIPE_API_KEY = process.env.RECIPE_API_KEY;  // Use your Spoontacular API key

router.get("/recipes", async (req, res) => {
    console.log('Received request with query:', req.query.query);  // Check the query
    try {
        const query = req.query.query || "vegetarian";
        console.log('Fetching recipes for:', query);  // Check the query being used

        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${RECIPE_API_KEY}`
        );
        const data = await response.json();

        console.log('Received data:', data);  // Log the API response

        res.json({ recipes: data.results });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: "Server error" });
    }
});


api.use("/api", router);

export const handler = serverless(api);
```

The code above was created by adapting the code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) as shown below: 

```
import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const api = express();
const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY; // Add your API key in .e
nv
router.get("/weather", async (req, res) => {
const city = req.query.city;
if (!city) return res.status(400).json({ error: "City is required"
});
try {
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}
&appid=${API_KEY}&units=metric`
);
const data = await response.json();
if (data.cod !== 200) return res.status(404).json({ error: "Ci
ty not found" });
res.json({
city: data.name,
temperature: data.main.temp,
weather: data.weather[0].description,
});
} catch (error) {
res.status(500).json({ error: "Server error" });
}
});
api.use("/api/", router);
export const handler = serverless(api);
```

- <!---How---> The code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) was implemented by copy and pasting it into a new file, within the directory "netlify/functions/".
- <!---Why---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was used because it is compatible with netlify and follows the same functionality and purpose as my recipe application.
- <!---How---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was modified by connecting the spoonactular api instead of the weather api, and changing the various variables and paramters around to fit the new api. Change is needed because otherwise it will still expect an API related to weather.

### frontend/index.html

*Lines #1 - #18*

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Recipe App</h1>
        <input type="text" id="recipe" placeholder="Enter recipe type">
        <button onclick="getRecipes()">Get Recipes</button>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

The code above was created by adapting the code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) as shown below: 

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Weather App</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
<h1>Weather App</h1>
<input type="text" id="city" placeholder="Enter city name">
<button onclick="getWeather()">Get Weather</button>
<div id="result"></div>
</div>
<script src="script.js"></script>
</body>
</html>
```

- <!---How---> The code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) was implemented by copy and pasting it into a new file, within the directory "frontend".
- <!---Why---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was used because it is compatible with netlify and follows the same functionality and purpose as my recipe application.
- <!---How---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was modified by changing the titles, headers, ids, and function calls to work appropriately with the rest of the project. It wouldn't make sense to have a "Get Weather" button but rather a "Get Recipes" button instead.

### frontend/style.css

*Lines #1 - #98*

```
/* General Styles */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f8f9fa;
    color: #333;
    margin: 0;
    padding: 0;
}

/* Container Styling */
.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Heading */
h1 {
    font-size: 1.8rem;
    color: #0056b3;
}

/* Input & Button Styling */
input, button {
    padding: 12px;
    margin: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: all 0.3s ease-in-out; /* Ensure smooth transition */
}

/* Input Field */
input {
    width: 80%;
    max-width: 300px;
    outline: none;
}

input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    transform: scale(1.02); /* Subtle growth effect */
}

/* Button */
button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05); /* Slight pop-out effect */
}

button:focus {
    outline: 2px solid #0056b3;
    background-color: #004494;
}

/* Recipe List */
.recipe-list {
    list-style-type: none;
    padding: 0;
}

.recipe-list li {
    background: #e9ecef;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

.recipe-list li:hover {
    background: #d6d8db;
    transform: scale(1.02); /* Subtle lift effect */
}

/* Responsive Design */
@media (max-width: 600px) {
    .container {
        width: 90%;
        padding: 15px;
    }

    input {
        width: 100%;
    }
}
```

The code above was created by adapting the code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) as shown below: 

```
body {
font-family: Arial, sans-serif;
text-align: center;
}
.container {
margin-top: 50px;
}
input, button {
padding: 10px;
margin: 10px;
}
```

- <!---How---> The code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) was implemented by copy and pasting it into a new file within the directory "frontend".
- <!---Why---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was used because it provides a basic framework of how I want my page to look.
- <!---How---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was modified by changing the titles, headers, IDs, and function calls to work appropriately with the rest of the project. It wouldn't make sense to have a "Get Weather" button. Rather, a "Get Recipes" button makes more sense.

### frontend/script.js

*Lines #1 - #27*

```
async function getRecipes() {
    console.log("Fetching recipes...");  // Add this line to confirm the function is being called
    const query = document.getElementById("recipe").value;
    if (!query) {
        alert("Please enter a recipe query.");
        return;
    }

    const response = await fetch("/api/recipes?query=" + query);
    const data = await response.json();

	if (data.error) {
	    document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
	} else {
	    document.getElementById("result").innerHTML = `
	        <h2>Recipe Recommendations</h2>
	        <ul class="recipe-list">  <!-- Add a class to target the list -->
	            ${data.recipes.map(recipe => `
	                <li>
	                    <h3>${recipe.title}</h3>
	                    <img src="${recipe.image}" alt="${recipe.title}" />
	                </li>
	            `).join('')}
	        </ul>
	    `;
	}
}
```

The code above was created by adapting the code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) as shown below: 

```
async function getWeather() {
const city = document.getElementById("city").value;
if (!city) {
alert("Please enter a city name.");
return;
}
const response = await fetch(`/api/weather?city=${city}`);
const data = await response.json();
if (data.error) {
document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
} else {
document.getElementById("result").innerHTML = `
<h2>${data.city}</h2>
<p>Temperature: ${data.temperature}°C</p>
<p>Weather: ${data.weather}</p>
`;
}
}
```

- <!---How---> The code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) was implemented by copy and pasting it into a new file within the directory "frontend".
- <!---Why---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was used because it provides a basic functional framework for how I'd like to fetch data for recipes. It also seems to be compatible with Netlify which is also important.
- <!---How---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was modified by changing the function from getting weather data, to getting recipe data. Additionally, I added debugging statements to help with various issues. Also, Incorporated a more organized 'recipe-list' and an Array. map is used. This allows the content to display dynamically.

### netlify.toml

*Lines #1 - #9*

```
[functions]
directory = "netlify/functions"
node_bundler = "esbuild"

[[redirects]]
force = true
from = "/api/*"
status = 200
to = "/.netlify/functions/api/:splat"
```

The code above was created by adapting the code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) as shown below: 

```
[functions]
external_node_modules = ["express"]
node_bundler = "esbuild"

[[redirects]]
force = true
from = "/api/*"
status = 200
to = "/.netlify/functions/api/:splat"
```

- <!---How---> The code in [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View) was implemented by copy and pasting it into a new file within the root directory.
- <!---Why---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was used because it provides the neccesary settings for Netlify. These settings are impactful when deploying.
- <!---How---> [Lab5: Project Setup Guide](https://dal.brightspace.com/d2l/le/content/361473/viewContent/4794291/View)'s Code was modified by removing external_node_modules as it has an unneccesary dependency with express. This makes it more streamlined. Additionally, I set a directory path under functions, so everything is organized correctly.

## Description

The application I've decided to create is a Recipe Recommender. 
Essentially, it's a website that allows users to search for various recipes with API "Spoonacular".

For example, you could find recipes for "vegetarians", or for certain dietary restrictions, like "gluten free" or "sugar free". 

One of the limitations I encountered when dealing with the Spoonacular API is how easily fragile the itself API is. 

When I tried introducing nutrition and ingredient information, my entire application broke. This was most likely due to the GET request, and it's not working properly with the rest of my application.
 
I was not able to find a workaround for this issue, however, I was able to list various recipes and images associated with those recipes successfully.


## Portfolio Website - Main Testing
# Frontend Testing

1. **Check if navigation bar works correctly**
   - **Test Steps**:
     - Open app in browser.
     - Click on each link in navigation bar.
   - **Expected Result**: Each link should navigate to the correct page.
   - **Result**: [Passed] When each link is clicked, it navigates to the correct page.

2. **Check if Home, About, and Projects pages render properly**
   - **Test Steps**:
     - Open app in the browser.
     - Navigate to each page.
   - **Expected Result**: The pages should display their respective content without errors.
   - **Result**: [Passed] Pages are able to display their respective content without error

3. **Check if 404 page appears for unknown routes**
   - **Test Steps**:
     - Enter invalid URL path in the browser.
   - **Expected Result**: App should display a 404 page with a message and ability to navigate back.
   - **Result**: [Passed] When entering unknown route, 404 page appears with message and ability to navigate back.

# Accessibility Testing

1. **Ensuring Accessibility Compatability**
   - **Test Steps**:
     - Use Tab key to navigate throughout site.
     - Check if elements (links, buttons) are focusable.
   - **Expected Result**: Navigation and content should be accessible without a mouse being required.
   - **Result**: [Passed] API provides accurate recipe names and corresponding images.


## Artificial Intelligence Tools Used

If in completing your lab / assignment / project you used any Artificial Intelligence Tools or Plugins, then provide a list of the tools or plugins used, the prompt used, the code generated by the AI, where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

* [Chat GPT-4o mini](https://chatgpt.com/) - The AI Tool used


### Prompt Used on *Chat GPT-4o mini*

```
Please provide straightforward, yet professional css code for my Recipe Recommender Application online. Make sure to implement the WCAG guidelines to ensure basic accessibility considerations are met. Additionally, here is the standard style.css that was provided, it can be changed as needed: 

"
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

.container {
    margin-top: 50px;
}

input, button {
    padding: 10px;
    margin: 10px;
}"

Here is index.html as well for context: "<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Recommender App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Recipe Recommender</h1>
    <input type="text" id="query" placeholder="Enter recipe type ">
    <button onclick="getRecipes()">Get Recipes</button>
    <div id="result"></div>
</div>
<script src="script.js"></script>
</body>
</html>"
```

#### style.css
*Lines #1 - #68, #89 - #98*

```
/* General Styles */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f8f9fa;
    color: #333;
    margin: 0;
    padding: 0;
}

/* Container Styling */
.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Heading */
h1 {
    font-size: 1.8rem;
    color: #0056b3;
}

/* Input & Button Styling */
input, button {
    padding: 12px;
    margin: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: all 0.3s ease-in-out; /* Ensure smooth transition */
}

/* Input Field */
input {
    width: 80%;
    max-width: 300px;
    outline: none;
}

input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    transform: scale(1.02); /* Subtle growth effect */
}

/* Button */
button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05); /* Slight pop-out effect */
}

button:focus {
    outline: 2px solid #0056b3;
    background-color: #004494;
}

/* Responsive Design */
@media (max-width: 600px) {
    .container {
        width: 90%;
        padding: 15px;
    }

    input {
        width: 100%;
    }
}
```

- <!---How---> The code in [Chat GPT-4o mini](https://chatgpt.com/) was implemented by having a style.css located within the frontend folder, and then from there you place the code provided by ChatGPT. Several changes were made to make the various recipes display correctly, specifically, with removing the bullet symbols associated.

- <!---Why---> [Chat GPT-4o mini](https://chatgpt.com/)'s Code was used because the code provided meets the requirements I laid out, as being professional but simple, and following WCAG guidelines. The assurance of the code following my guidelines, is what prompted me to do it. CSS is quite complicated when dealing with many various components, and I'm not very skilled at it, so this is why ChatGPT was used. The final result for style.css is great, as the fields and containers look great.

- <!---How---> [Chat GPT-4o mini](https://chatgpt.com/)'s Code was modified by adding and modifying 'recipe-list' to have the recipe's listed without a bullet symbol. Additionally, styling was added to make it more adaptable.

## Acknowledgments

* Lectures & In-Class Examples
* Lab5: Project Setup Guide
