import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import ViewCharacters from './pages/ViewCharacters.jsx'
import EditCharacter from './pages/EditCharacter.jsx'
import CreateCharacter from './pages/CreateCharacter.jsx'
import CharacterDetails from './pages/CharacterDetails.jsx'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCharacter title='Dream Fit | Customize' />
    },
    {
      path:'/characters',
      element: <ViewCharacters title='Dream Fit | Custom Characters' />
    },
    {
      path: '/characters/:id',
      element: <CharacterDetails  title='Dream Fit | Custom Characters' />
    },
    {
      path: '/characters/edit/:id',
      element: <EditCharacter title='Dream Fit | Custom Characters' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App