<h1 style="color: skyblue;">
  Music project Documentation
</h1>


## Tools
- React
- Firebase
- XState
- EmotionJs
- Flow
- Jest
- Storybook
- Swiper


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

[Test env](https://social-music-addd0.web.app/)
[Prod env](https://music-project-prod.web.app/)


## Folder structure

    .
    ├── functions/                              # Firebase cloud functions
    ├── src/                    
    │   ├── utils/                              # Helper functions, etc
    │   ├── shared/                             # Shared components
    │   ├── services/                           # Frontend services, firebase implementation
    │   ├── app/                                # App components
    │   │   ├── main               
    │   │   │   ├── example        
    │   │   │   │   ├── example.atom.js         # Organism, molecule or atom component type
    │   │   │   │   ├── example.styles.js       # Styles file using emotion
    │   │   │   │   ├── example.types.js        # Types created for the component (flow)
    │   │   │   │   ├── example.test.js         # Jest unit test
    │   │   │   │   ├── example.stories.js      # Storybook file
    │   │   │   └── ...                

        

### Utils

* Constants: Place here any constant needed globally
* Global Styles: Styles are isolated by component, so put any needed global css class here
* Helpers: Any helper function
* Responsive: Established sizes and breakpoints, responsive function to set styles for each breakpoint(3) configured
* Typography: Typo classes
* Themes: Change, add or remove themes


### Styles

Prefer to use string CSS EmotionJs propertie to set styles for a component, then use it inside a component like this

```js
export const exampleComponent: string = `
  height: 100%;
  width: 100%;
`;
```

```html
    <div css={[exampleComponent]}><div>
```



[EmotionJs](https://emotion.sh/docs/introduction)

