import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'
import './styles/tokens.css'
import './styles/legacy-tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components/navigation.css'
import './styles/components/buttons.css'
import './styles/components/hero.css'
import './styles/components/sections.css'
import './styles/components/featured-project.css'
import './styles/components/yin-yang-project-scene.css'
import './styles/components/project-cards.css'
import './styles/components/systems-contact.css'
import './styles/components/pages-and-drawer.css'
import './styles/animation-keyframes.css'
import './styles/responsive.css'
import './styles/themes/theme.css'
import './styles/themes/light-overrides.css'
import './styles/themes/light-featured-yinyang.css'
import './styles/themes/light-navigation-responsive.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
