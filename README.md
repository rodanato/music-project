<h1 style="color: skyblue;">
  Frontend Documentation
</h1>

## Run the frontend

1) **Use nvm version**
```sh
nvm use
```

2) **Install yarn**
```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
```

2) **Install all dependencies**
```sh
rm -rf node_modules/ && yarn
```

3) **Run the project**
```sh
yarn start
```


>IMPORTANT: Manual deployment should be avoided.

## Deployment

1) **Create a PR from your branch to develop**
2) **When it's approved and merged, the deployment to the test env will be done automatically**


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



## How to create a component

>IMPORTANT: Before you can start you should take a look to the folder structure.

* Identify the folder you are going to put it
* organism, molecule, atom... in component-name.organism.tsx
* Separate the types in component-name.types.tsx
* Separate the styles in component-name.styles.tsx

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
We are using the css framework `EmotionJs`, so you can read all the docs in this link.

[EmotionJs](https://emotion.sh/docs/introduction)

Review theme here `src/utils/theme.tsx`

