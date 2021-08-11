# .Mypaint
<p align="center">
  <img alt="Todos application image" src="https://raw.githubusercontent.com/OctupusPrime/portfolio/master/src/assets/img/work3.png">
</p>  


## Installation Setup
```bash
# clone code
git clone https://github.com/OctupusPrime/my-paint.git

# go to folder
cd my-paint

# install dependencies
npm install

# serve with hot reload at localhost:8080/my-paint
npm serve
```  

If you dont want install [**Live demo**](https://octupusprime.github.io/my-paint/)  
## Description  
  
Simple drawing app with play and save features in vuex.
### Key features : 
* **Saving notes to vuex**;
* **Convenient gui** _for draw_;
* **Change color for brush**;
* **Have an eraser**;
* **Have dark theme**;

## Documentation
### Plugins
| Name | Usage |
| --- | --- |
| [vuex](https://www.npmjs.com/package/vuex) | Used to store canvas and replay it |

### Folders
* #### assets
    It stores the **global styles** in the css folder, and the *gifs / images* folders hold the original gifs and photos (so you might think).
* #### components
    Store only one Canvas component in which all the logic happens.
* #### store
    Using for saving canvas to localstorage and replay it.
* #### App
    The application itself, where I put everything together.
* #### main
    Contains off all global components.

### Authors
[**Misha Sokil**](https://github.com/OctupusPrime)
### License
 MIT © Misha Sokil

**Thank you for your attention**