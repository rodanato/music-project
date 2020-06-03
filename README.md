<h1 style="color: skyblue;">
  Frontend Documentation
</h1>

## Run the frontend

1) **Use nvm version**
```sh
nvm use
```

2) **Install all dependencies**
```sh
rm -rf node_modules/ && npm i
```

3) **Run the project**
```sh
npm run develop
```


## Deployment

1) **Run the deploy command**
```sh
npm run deploy
```


## Folder structure

    .
    ├── cedarfair                  # Backend files
    ├── node                    
    │   ├── park-sites-v2          # Frontend files
    │   │   ├── assets             # Put here all the fonts, images and icons
    │   │   ├── build              # Here will be the build files
    │   │   ├── cypress            # Testing files
    │   │   ├── freemarker         
    │   │   │   ├── macros         # (The idea is to prefer reusable webcomponents)
    │   │   │   └── ...                
    │   │   ├── src            
    │   │   │   ├── styles         # Base scss files and general styles files
    │   │   │   ├── modules        # Global, section or by page js and scss files
    │   │   │   ├── webcomponents  # Components logic and styles
    │   │   └── ...                



## How to start working

>IMPORTANT: Before you can start you should take a look to the folder structure and css vars above.

* Identify the page or section you are about to work on, it should be a hippo component with a ftl file inside `node/park-sites-v2/freemarker/components/${component-type}/${comp-name}.ftl`
* After that you should create a `scss` file for the hippo component inside `node/park-sites-v2/src/modules/${comp-name}/${comp-name}.scss` to add all the styles for that section/page.
* If needed, you can create any reusable webcomponent to put inside that page/section.
You should add them on `node/park-sites-v2/src/webcomponents/` inside its own folder.
* All these `scss` and `js` files should be injected on the ftl file.

** If you need to add new global styles or mixins you can do it inside `node/park-sites-v2/src/styles/`, but those should be imported on `src/styles/styles.scss`

### Example
    .
    ├── node                    
    │   ├── park-sites-v2          
        │   │   ├── freemarker         
    │   │   │   │   ├── components         
    │   │   │   │   │   ├── catalog-components         
    │   │   │   │   │   │   ├── ${comp-name}.ftl         
    │   │   │   │   │   ├── page-components         
    │   │   │   │   │   ├── static-components         
    │   │   ├── src            
    │   │   │   ├── modules
    │   │   │   │   ├── ${comp-name}/
    │   │   │   │   │   ├── ${comp-name}.js
    │   │   │   │   │   ├── ${comp-name}.scss
    │   │   │   ├── webcomponents
    │   │   │   │   ├── ${wecomponent-1}/
    │   │   │   │   │   ├── ${wecomponent-1}.js
    │   │   │   │   │   ├── ${wecomponent-1}.scss
    │   │   │   │   ├── ${wecomponent-2}/
    │   │   │   │   │   ├── ${wecomponent-2}.js
    │   │   │   │   │   ├── ${wecomponent-2}.scss
    │   │   │   ├── styles
    │   │   │   │   │   ├── _${base-styles-file-name}.scss
    │   │   │   │   │   ├── ${general-styles-file-name}.scss
    │   │   └── ...                


### Styles


#### CSS Framework
We are using the css framework `Bulma.css`, so you can read all the docs in this link.

[Bulma](https://bulma.io/documentation/)

#### Theming vars to be customized using Resource Bundles
>IMPORTANT: RB should keep the name sequence

Review them here `node/park-sites-v2/src/styles/_theme.scss`

